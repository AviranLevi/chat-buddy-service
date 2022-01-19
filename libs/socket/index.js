import io from 'socket.io'
import * as socketActions from './actions'
import logger from '../logger'

const socketIO = io(8900, {
  cors: {
    origin: 'http://localhost:3000',
  },
})

socketIO.on('connection', (socket) => {
  logger.info('user connected')

  //joined chatbot room
  socket.on('joinChatBot', (user) => socketActions.joinChatBot(socket, user))
  //joined the room
  socket.on('join', (user, room) => socketActions.joinUser(socket, user, room))
  //Someone is typing
  socket.on('typing', (user) => socketActions.userTyping(socket, user))
  //soemone stopped typing
  socket.on('stopTyping', (user) => socketActions.userStopTyping(socket, user))
  //sending message
  socket.on('roomMessage', (data) => socketActions.sendMessage(socket, data))
  //get question - chat bot
  socket.on('sendMessageToChatBot', (data) => socketActions.getMessageFromChatBot(socket, data))
  //user disconnected
  socket.on('disconnect', (userId) => socketActions.userDisconnect(socket, userId))
})
