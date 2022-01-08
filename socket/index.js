import io from 'socket.io'
import * as messageDAL from '../src/dal/message'
import * as userDAL from '../src/dal/user'
import logger from '../src/logger'

const socketIO = io(8900, {
  cors: {
    origin: 'http://localhost:3000',
  },
})

socketIO.on('connection', (socket) => {
  logger.info('user connected')

  //Someone is typing
  socket.on('typing', (user) => {
    logger.info('someone is typing', { user })
    socket.broadcast.emit('notifyTyping')
  })

  //when soemone stops typing
  socket.on('stopTyping', () => {
    logger.info('no typing')
    socket.broadcast.emit('notifyStopTyping')
  })

  socket.on('chatMessage', (data) => {
    logger.debug('message: ' + JSON.stringify(data))

    //save chat to the database
    messageDAL.createMessage(data)
    console.log(data)

    //broadcast message to everyone in port:5000 except yourself.
    socket.emit('received', data)
  })

  socket.on('disconnect', (userId) => {
    socket.removeAllListeners()
    logger.warn(`${userId} disconnected!`)
  })
})
