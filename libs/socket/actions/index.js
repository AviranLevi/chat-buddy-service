import * as messageDB from '../../../src/dal/message'
import * as answerDB from '../../../src/dal/answer'
import * as questionDB from '../../../src/dal/qusetion'
import moment from 'moment'
import logger from '../../logger'
import { getAnswer } from '../../chatbot'
import { cLog } from '../../../src/utils/general'

const currentTime = moment().format('HH:MM')

export const joinUser = async (socket, user, room) => {
  const { userName } = user
  const adminMessage = `${userName} joined the chat`
  socket.emit('joinUser', adminMessage)
}

export const joinChatBot = async (socket, user) => {
  const { answer } = await getAnswer('Hello')

  const chatBotMessage = {
    message: answer,
    time: currentTime,
    user: {
      userName: 'Max',
    },
  }
  socket.emit('joinChatBot', chatBotMessage)
}

export const userTyping = (socket, data) => {
  const { userName, roomId } = data
  logger.info(`${userName} start typing`)
  if (userName) {
    socket.emit('recivedTyping', { userName, roomId })
  }
}

export const userStopTyping = (socket, data) => {
  const { userName, roomId } = data
  logger.info(`${userName} stopped typing`)
  if (userName) {
    socket.emit('recivedStopTyping', { userName, roomId })
  }
}

export const sendMessage = async (socket, data) => {
  const { room: roomId, roomName } = data
  //save chat into db
  await messageDB.createMessage(data)
  //get all updated messages
  const updatedMessages = await messageDB.getMessagesByRoomId(roomId)
  //send message to room.
  socket.emit('recivedMessages', { updatedMessages, roomId, roomName })
}

export const getMessageFromChatBot = async (socket, question) => {
  const { answer } = await getAnswer(question)
  const chatBotMessageToDB = {
    question,
    answer,
  }
  await answerDB.createAnswer(chatBotMessageToDB)

  const chatBotMessage = {
    message: answer,
    time: currentTime,
    user: {
      userName: 'Max',
    },
  }
  socket.emit('recievedChatBotMessage', chatBotMessage)
}

export const userDisconnect = (socket, user) => {
  socket.removeAllListeners()
  logger.warn(`${user} disconnected!`)
}
