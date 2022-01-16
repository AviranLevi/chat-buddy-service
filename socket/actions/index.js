import * as messageDB from '../../src/dal/message'
import * as userDAL from '../../src/dal/user'
import * as roomDB from '../../src/dal/room'
import * as roomService from '../../src/services/room'
import logger from '../../src/logger'

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
  logger.debug('message: ' + JSON.stringify(data))
  //save chat to the database
  await messageDB.createMessage(data)
  const updatedMessages = await messageDB.getMessagesByRoomId(roomId)
  //send message to room.
  socket.emit('recivedMessages', updatedMessages)
}

export const userDisconnect = (socket, user) => {
  socket.removeAllListeners()
  logger.warn(`${user} disconnected!`)
}
