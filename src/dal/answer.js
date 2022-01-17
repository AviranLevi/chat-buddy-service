import Answer from '../models/Answer'
import logger from '../../libs/logger'
import { answerSelect } from '../consts'

export const createAnswer = async (data) => {
  try {
    const answer = new Answer(data)
    answer.save()
    logger.info(`Created new answer - ${answer._id}`)
    return answer
  } catch (error) {
    logger.error(`[dal/answer] - createAnswer - ${error}`)
    throw error
  }
}

export const getAnswers = async () => {
  try {
    const answers = await Answer.find({}).select(answerSelect).lean().exec()
    return answers
  } catch (error) {
    logger.error(`[dal/answer] - getAnswers - ${error}`)
    throw error
  }
}

export const getAnswer = async (id) => {
  try {
    const answer = await Answer.findById(id).select(answerSelect).lean().exec()
    return answer
  } catch (error) {
    logger.error(`[dal/answer] - getAnswer - ${error}`)
    throw error
  }
}
