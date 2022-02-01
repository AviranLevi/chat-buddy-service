import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './router'
import logger from '../libs/logger'
import http from 'http'

import { PORT, CONNECTION_STRING, DEV, CLIENT_URL_ORIGIN, CLIENT_URL_ORIGIN_SOCKET } from './config'

const app = express()
export const server = http.createServer(app)
const port = PORT || 3030
const url = CONNECTION_STRING || 'mongodb://localhost:27017/chat-buddies'

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}

mongoose.connect(url, options).then(() => logger.info('DB Connected'))
app.use(express.json())

const corsOption = {
  origin: [CLIENT_URL_ORIGIN, CLIENT_URL_ORIGIN_SOCKET],
}

app.use(cors())
app.use('/api', router)

server.listen(port, () => {
  logger.info(`app is listening to port ${port}`)
})
