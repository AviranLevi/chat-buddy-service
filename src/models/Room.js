import mongoose from 'mongoose'
import moment from 'moment'
import { v4 as uuid } from 'uuid'
import { roomTypes } from '../consts'

const Schema = mongoose.Schema
const currentDate = moment().format('MMM Do YYYY')

const RoomSchema = new Schema({
  _id: {
    type: String,
    default: uuid,
  },
  name: {
    type: String,
  },
  uniqueName: {
    type: String,
    unique: true,
    required: [true, 'uniqueName is required'],
  },
  users: [
    {
      type: String,
      ref: 'User',
    },
  ],
  type: {
    type: String,
    default: roomTypes.private,
  },
  admin: {
    type: String,
    ref: 'User',
    required: [true, `User id is required`],
  },
  createdAt: {
    type: String,
    default: currentDate,
  },
  updatedAt: {
    type: String,
  },
})

export default mongoose.model('Room', RoomSchema)
