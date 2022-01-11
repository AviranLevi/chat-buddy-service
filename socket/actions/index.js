import * as messageDAL from '../../src/dal/message'
import * as userDAL from '../../src/dal/user'
import * as roomDAL from '../../src/dal/room'
import * as roomService from '../../src/services/room'
import logger from '../../src/logger'

export const joinUser = async (socket, user, room) => {
  const { name: roomName } = room
  const { _id } = user

  const roomData = {
    name: roomName,
    users: [_id],
    admin: _id,
  }

  await roomService.createRoom(roomData)
  socket.join(roomName)
  socket.broadcast.to(roomName).emit('adminMessage', { text: `${user.userName} has joined!` })
}

export const userTyping = (socket, user) => {
  logger.info(`${user} is typing`)
  socket.broadcast.emit('notifyTyping')
}

export const userStopTyping = (socket, user) => {
  logger.info(`${user} stopped typing`)
  socket.broadcast.emit('notifyStopTyping')
}

export const sendMessage = async (io, data) => {
  const { room: roomName } = data
  logger.debug('message: ' + JSON.stringify(data))
  //save chat to the database
  messageDAL.createMessage(data)

  //send message to room.
  io.to(roomName).emit('sendMessage', data)
}

export const userDisconnect = (socket, user) => {
  socket.removeAllListeners()
  logger.warn(`${user} disconnected!`)
}
