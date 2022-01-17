import * as messageDB from '../../../src/dal/message'
import * as answerDB from '../../../src/dal/answer'
import * as questionDB from '../../../src/dal/qusetion'
import logger from '../../logger'
import { getAnswer } from '../../chatbot'

export const joinUser = async (socket, user, room) => {
  const { userName } = user
  const adminMessage = `${userName} joined the chat`
  socket.emit('joinUser', adminMessage)
}

export const userTyping = (socket, user, room) => {
  socket.emit('notifyTyping', { user, room })
}

export const userStopTyping = (socket, user, room) => {
  logger.info(`${user} stopped typing`)
  socket.emit('notifyStopTyping', { user, room })
}

export const sendMessage = async (socket, data) => {
  const { room: roomId } = data
  //save chat into db
  await messageDB.createMessage(data)
  //get all updated messages
  const updatedMessages = await messageDB.getMessagesByRoomId(roomId)
  //send message to room.
  socket.emit('recivedMessages', updatedMessages)
}

export const sendQuestion = async (socket, question) => {
  const dataToDB = {
    question,
    room: socket.id,
  }

  const results = await questionDB.createQuestion(dataToDB)
  socket.emit('recivedQuestion', results)
}

export const sendChatBotAnswer = async (socket, data) => {
  const { question } = data
  const { answer } = await getAnswer(message)
  const chatBotMessageToDB = {
    question,
    answer,
  }
  await answerDB.createAnswer(chatBotMessageToDB)
  const updatedMessagesWithChatBot = await messageDB.getMessagesByRoomId(roomId)

  socket.emit('recievedChatBotMessage', updatedMessagesWithChatBot)
}

export const userDisconnect = (socket, user) => {
  socket.removeAllListeners()
  logger.warn(`${user} disconnected!`)
}
