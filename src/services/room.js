import * as db from '../dal/room'
import logger from '../logger'
import * as utils from '../utils'
//CREATE
export const createRoom = async (data = {}) => {
  try {
    const { name } = data
    const uniqueName = `${name}-${utils.generateNumber()}`
    const dataToDB = { ...data, uniqueName }
    const room = await db.createRoom(dataToDB)
    return room
  } catch (error) {
    logger.error(`[services/room] - createRoom - ${error}`)
    throw error
  }
}

//READ
export const getRooms = async (userId) => {
  try {
    const response = await db.getRooms(userId)
    return response
  } catch (error) {
    logger.error(`[services/room] - getRooms - ${error}`)
    throw error
  }
}

export const getRoom = async (id) => {
  try {
    const response = await db.getRoom(id)
    return response
  } catch (error) {
    logger.error(`[services/room] - getRoom - ${error}`)
    throw error
  }
}

export const getRoomByUniqueName = async (uniqueName) => {
  try {
    const response = await db.getRoomByUniqueName(uniqueName)
    return response
  } catch (error) {
    logger.error(`[services/room] - getRoomByUniqueName - ${error}`)
    throw error
  }
}

//UPDATE
export const updateRoom = async (id, data) => {
  try {
    const response = await db.updateRoom(id, data)
    return response
  } catch (error) {
    logger.error(`[services/room] - updateRoom - ${error}`)
    throw error
  }
}

//DELETE
export const deleteRoom = async (id) => {
  try {
    const roomDeleted = await db.deleteRoom(id)
    if (roomDeleted) {
      return { success: roomDeleted, message: 'User has been deleted' }
    }
    return { success: roomDeleted, message: 'Try again later' }
  } catch (error) {
    logger.error(`[services/room] - deleteRoom - ${error}`)
    throw error
  }
}
