import mongoose from 'mongoose'
import moment from 'moment'
import { v4 as uuid } from 'uuid'

const Schema = mongoose.Schema
const currentDate = moment().format('MMM Do YYYY')

const AnswerSchema = new Schema({
  _id: {
    type: String,
    default: uuid,
  },
  answer: {
    type: String,
  },
  message: {
    type: String,
    ref: 'Message',
  },
  createdAt: {
    type: String,
    default: currentDate,
  },
  updatedAt: {
    type: String,
  },
})

export default mongoose.model('Answer', AnswerSchema)
