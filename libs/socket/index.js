import io from 'socket.io'
import * as socketActions from './actions'
import logger from '../logger'
import { server } from '../../src'
import { CLIENT_URL_ORIGIN_SOCKET } from './config'

const origin = '*'

const socketIO = io(server, { cors: { origin } })

socketIO.on('connection', (socket) => {
  logger.info('user connected')

  //joined chatbot room
  socket.on('joinChatBot', (user) => socketActions.joinChatBot(socket, user))
  //joined the room
  socket.on('join', (user, room) => socketActions.joinUser(socket, user, room))
  //Someone is typing
  socket.on('typing', (data) => socketActions.userTyping(socket, data))
  //soemone stopped typing
  socket.on('stopTyping', (user) => socketActions.userStopTyping(socket, user))
  //sending message
  socket.on('roomMessage', (data) => socketActions.sendMessage(socketIO, data))
  //get question - chat bot
  socket.on('sendMessageToChatBot', (data) => socketActions.getMessageFromChatBot(socket, data))
  //user disconnected
  socket.on('disconnect', (userId) => socketActions.userDisconnect(socket, userId))
})
