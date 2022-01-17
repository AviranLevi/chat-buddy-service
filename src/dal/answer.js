import Answer from '../models/Answer'
import moment from 'moment'
import logger from '../../libs/logger'

const currentDate = moment().format('MMM Do YYYY')

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
    const answers = await Answer.find({}).lean().exec()
    return answers
  } catch (error) {
    logger.error(`[dal/answer] - getAnswers - ${error}`)
    throw error
  }
}

export const getAnswer = async (id) => {
  try {
    const answer = await Answer.findById(id).lean().exec()
    return answer
  } catch (error) {
    logger.error(`[dal/answer] - getAnswer - ${error}`)
    throw error
  }
}
