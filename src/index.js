import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './router'
import { DEV } from './config'

const app = express()
const { env } = process
const port = env.PORT || 5000
const url = env.CONNECTION_STRING || 'mongodb://localhost:27017/join-us'
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}

mongoose.connect(url, options).then(() => console.log('DB Connected'))
app.use(express.json())
app.use(cookieParser())

if (DEV) {
  app.use(cors())
}

app.use(sslRedirect())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type,Authorization, Access-Control-Request-Method, Access-Control-Request-Headers'
  )
  next()
})

app.use('/api', router)

app.listen(port, () => {
  console.log(`app is listening to port ${port}`)
})
