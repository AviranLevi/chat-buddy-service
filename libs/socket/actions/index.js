import * as messageDB from '../../../src/dal/message'
import logger from '../../logger'
import { getAnswer } from '../../chatbot'

export const joinUser = async (socket, user, room) => {
  logger.debug(JSON.stringify({ user, room }, null, 4))
  const { name: roomName } = room
  const { _id } = user
}

export const userTyping = (socket, user) => {
  logger.info(`${user} is typing`)
  socket.broadcast.emit('notifyTyping')
}

export const userStopTyping = (socket, user) => {
  logger.info(`${user} stopped typing`)
  socket.broadcast.emit('notifyStopTyping')
}

export const sendMessage = async (socket, data) => {
  const { room: roomId } = data
  //save chat into db
  await messageDB.createMessage(data)
  const updatedMessages = await messageDB.getMessagesByRoomId(roomId)
  //send message to room.
  socket.emit('recivedMessages', updatedMessages)
}

export const sendChatBotAnswer = async (socket, data) => {
  const { message, room } = data
  const { answer } = await getAnswer(message)
  const chatBotMessageToDB = {
    message: answer,
    chatBot: true,
    room,
  }
  await messageDB.createMessage(chatBotMessageToDB)
  const updatedMessagesWithChatBot = await messageDB.getMessagesByRoomId(roomId)

  socket.emit('recievedChatBotMessage', updatedMessagesWithChatBot)
}

export const userDisconnect = (socket, user) => {
  socket.removeAllListeners()
  logger.warn(`${user} disconnected!`)
}
