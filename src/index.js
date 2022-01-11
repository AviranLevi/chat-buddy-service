import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './router'
import { PORT, CONNECTION_STRING, DEV } from './config'
import logger from './logger'

const app = express()
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

if (DEV) {
  app.use(cors())
  logger.info('Cors is running')
}

app.use('/api', router)

app.listen(port, () => {
  logger.info(`app is listening to port ${port}`)
})
