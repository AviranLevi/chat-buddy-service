import Question from '../models/Question'
import logger from '../../libs/logger'

export const createQuestion = async (data) => {
  try {
    const question = new Question(data)
    question.save()
    logger.info(`Created new question - ${question._id}`)
    return question
  } catch (error) {
    logger.error(`[dal/question] - createQuestion - ${error}`)
    throw error
  }
}

export const getQuestions = async () => {
  try {
    const question = await Question.find({}).lean().exec()
    return question
  } catch (error) {
    logger.error(`[dal/question] - getQuestions - ${error}`)
    throw error
  }
}

export const getQuestionByString = async (str) => {
  try {
    const question = await Question.find({ question: str }).lean().exec()
    return question
  } catch (error) {
    logger.error(`[dal/question] - getQuestionByString - ${error}`)
    throw error
  }
}
