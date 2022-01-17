import * as db from '../dal/user'
import logger from '../../libs/logger'

//CREATE
export const createUser = async (data) => {
  try {
    const user = await db.createUser(data)
    return user
  } catch (error) {
    logger.error(`[services/user] - createUser - ${error}`)
    throw error
  }
}

//READ
export const getUser = async (id) => {
  try {
    const response = await db.getUser(id)
    return response
  } catch (error) {
    logger.error(`[services/user] - getUser - ${error}`)
    throw error
  }
}

//UPDATE
export const updateUser = async (id, data) => {
  try {
    const response = await db.updateUser(id, data)
    return response
  } catch (error) {
    logger.error(`[services/user] - updateUser - ${error}`)
    throw error
  }
}

//DELETE
export const deleteUser = async (id) => {
  try {
    const userDeleted = await db.deleteUser(id)
    if (userDeleted) {
      return { success: userDeleted, message: 'User has been deleted' }
    }
    return { success: userDeleted, message: 'Try again later' }
  } catch (error) {
    logger.error(`[services/user] - deleteUser - ${error}`)
    throw error
  }
}
