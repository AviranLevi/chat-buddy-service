import mongoose from 'mongoose'
import moment from 'moment'
import { v4 as uuid } from 'uuid'

const Schema = mongoose.Schema
const currentDate = moment().format('MMM Do YYYY')

const MessageSchema = new Schema({
  _id: {
    type: String,
    default: uuid,
  },
  message: {
    type: String,
  },
  type: {
    type: String,
    default: 'message',
  },
  user: {
    type: String,
    ref: 'User',
    required: [true, `User is required`],
  },
  room: {
    type: String,
    ref: 'Room',
    required: [true, 'Room is required'],
  },
  createdAt: {
    type: String,
    default: currentDate,
  },
  updatedAt: {
    type: String,
  },
})

export default mongoose.model('Message', MessageSchema)
