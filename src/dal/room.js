import Room from '../models/Room'
import moment from 'moment'
import logger from '../../libs/logger'

const currentDate = moment().format('MMM Do YYYY')

export const createRoom = async (data) => {
  try {
    const room = await new Room(data)
    await room.save()
    logger.info(`Created new room - ${room._id}`)
    return room
  } catch (error) {
    logger.error(`[dal/room] - createRoom - ${error}`)
    throw error
  }
}

export const getRoomsByUser = async (userEmail) => {
  try {
    const rooms = await Room.find({ users: userEmail }).lean().exec()
    return rooms
  } catch (error) {
    logger.error(`[dal/room] - getRooms - ${error}`)
    throw error
  }
}

export const getRoom = async (id) => {
  try {
    const room = await Room.findById(id).lean().exec()
    return room
  } catch (error) {
    logger.error(`[dal/room] - getRoom - ${error}`)
    throw error
  }
}

export const getRoomByUniqueName = async (uniqueName) => {
  try {
    const room = await Room.findOne({ uniqueName }).lean().exec()
    return room
  } catch (error) {
    logger.error(`[dal/room] - getRoomByUniqueName - ${error}`)
    throw error
  }
}

export const updateRoom = async (roomId, data) => {
  try {
    const newData = Object.assign(data, { updatedAt: currentDate })
    const room = await Room.findOneAndUpdate({ _id: roomId }, { $set: newData }, { new: true }).lean().exec()
    return room
  } catch (error) {
    logger.error(`[dal/room] - updateRoom - ${error}`)
    throw error
  }
}

export const deleteRoom = async (roomId) => {
  try {
    const room = await User.deleteOne({ _id: roomId })
    const { deletedCount } = room
    if (deletedCount === 1) {
      return true
    }
    return false
  } catch (error) {
    logger.error(`[dal/room] - deleteRoom - ${error}`)
    throw error
  }
}
