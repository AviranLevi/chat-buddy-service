import * as db from '../dal/message'
import logger from '../../libs/logger'

//CREATE
export const createMessage = async (data) => {
  try {
    const message = await db.createMessage(data)
    return message
  } catch (error) {
    logger.error(`[services/message] - createMessage - ${error}`)
    throw error
  }
}

//READ
export const getMessagesByRoomId = async (roomId) => {
  try {
    const response = await db.getMessagesByRoomId(roomId)
    return response
  } catch (error) {
    logger.error(`[services/message] - getMessagesByRoomId - ${error}`)
    throw error
  }
}

//UPDATE
export const updateMessage = async (id, data) => {
  try {
    const response = await db.updateMessage(id, data)
    return response
  } catch (error) {
    logger.error(`[services/message] - updateMessage - ${error}`)
    throw error
  }
}
