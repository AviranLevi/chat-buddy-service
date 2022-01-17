import Message from '../models/Message'
import logger from '../../libs/logger'
import { messageSelect } from '../consts'

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

export const getMessagesByRoomId = async (roomId) => {
  try {
    const messages = await Message.find({ room: roomId }).select(messageSelect).populate('user').lean().exec()
    return messages
  } catch (error) {
    logger.error(`[dal/message] - getMessagesByRoomId - ${error}`)
    throw error
  }
}
