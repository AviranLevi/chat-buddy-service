import * as db from '../dal/room'
import * as userDB from '../dal/user'
import * as messageDB from '../dal/message'
import * as utils from '../utils'
import logger from '../../libs/logger'
import { log } from '../utils'

//CREATE
export const createRoom = async (data = {}) => {
  try {
    const { name, emails } = data
    let users = []
    //TODO - check if all users that invited are exists and if not - send them an email to join and create user automatically
    log({ emails })
    await Promise.all([
      emails.map(async (email) => {
        log(email)
        const { _id: userExistsInDB } = await userDB.getUserByEmail(email)
        if (userExistsInDB) {
          logger.debug('exists')
          users.push(userExistsInDB)
        } else {
          //TODO - send invite email
          logger.debug('note exists')
        }
      }),
    ])

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
export const getRoomsByUser = async (userId) => {
  try {
    const publicRooms = await db.getPublicRooms()
    const userRooms = await db.getRoomsByUser(userId)
    const response = [...publicRooms, ...userRooms]
    return response
  } catch (error) {
    logger.error(`[services/room] - getRoomsByUser - ${error}`)
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
    const room = await db.getRoomByUniqueName(uniqueName)
    const roomMessages = await messageDB.getMessagesByRoomId(room._id)
    const results = { ...room, messages: roomMessages }
    return results
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
