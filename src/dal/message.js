import Message from '../models/Message'
import moment from 'moment'
import logger from '../logger'

const currentDate = moment().format('MMM Do YYYY')

export const createMessage = async (data) => {
  try {
    const message = new Message(data)
    await message.save()
    logger.info(`Created new message - ${message._id}`)
    return message
  } catch (error) {
    logger.error(`[dal/message] - createMessage - ${error}`)
    throw error
  }
}

export const getMessages = async () => {
  try {
    const messages = await Message.find({}).populate('user').lean().exec()
    return messages
  } catch (error) {
    logger.error(`[dal/message] - getMessage - ${error}`)
    throw error
  }
}

export const updateMessage = async (messageId, data) => {
  try {
    const newData = Object.assign(data, { updatedAt: currentDate })
    const user = await User.findOneAndUpdate({ _id: messageId }, { $set: newData }, { new: true }).lean().exec()
    return user
  } catch (error) {
    logger.error(`[dal/message] - updateMessage - ${error}`)
    throw error
  }
}
