import mongoose from 'mongoose'
import moment from 'moment'
import { v4 as uuid } from 'uuid'

const Schema = mongoose.Schema
const currentDate = moment().format('MMM Do YYYY')

const QuestionSchema = new Schema({
  _id: {
    type: String,
    default: uuid,
  },
  question: {
    type: String,
  },
  createdAt: {
    type: String,
    default: currentDate,
  },
  updatedAt: {
    type: String,
  },
})

export default mongoose.model('Question', QuestionSchema)
