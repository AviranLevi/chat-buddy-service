import mongoose from 'mongoose'
import moment from 'moment'
import { v4 as uuid } from 'uuid'

const Schema = mongoose.Schema
const currentDate = moment().format('MMM Do YYYY')

const UserSchema = new Schema({
  _id: {
    type: String,
    default: uuid,
  },
  userName: {
    type: String,
    required: [true, `User name is required`],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
  },
  createdAt: {
    type: String,
    default: currentDate,
  },
  updatedAt: {
    type: String,
  },
})

export default mongoose.model('User', UserSchema)
