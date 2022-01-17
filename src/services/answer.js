import * as db from '../dal/answer'
import logger from '../../libs/logger'

//CREATE
export const createAnswer = async (data) => {
  try {
    const answer = await db.createAnswer(data)
    return answer
  } catch (error) {
    logger.error(`[services/answer] - createAnswer - ${error}`)
    throw error
  }
}

//READ
export const getAnswer = async (id) => {
  try {
    const response = await db.getAnswer(id)
    return response
  } catch (error) {
    logger.error(`[services/answer] - getAnswer - ${error}`)
    throw error
  }
}
