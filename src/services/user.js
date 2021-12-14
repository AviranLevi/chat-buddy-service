import * as db from '../db/user'
import logger from '../logger'
import { removeEmptyValuesFromObj } from '../utils/general.js'

//CREATE
export const createUser = async (data) => {
  try {
    const { email } = data
    const extractUserName = email.split('@')
    const userName = extractUserName[0] + Math.floor(Math.random() * 1000000000).toString()
    const userToDB = Object.assign({ userName }, data)
    const user = await db.createUser(userToDB)
    return user
  } catch (error) {
    logger.error(`[services/user] - createUser - ${error}`)
    throw error
  }
}

export const userLogin = async (data) => {
  try {
  } catch (error) {
    logger.error(`[services/user] - userLogin - ${error}`)
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
    const updatedInfoToDB = removeEmptyValuesFromObj(data)
    const response = await db.updateUser(id, updatedInfoToDB)
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
