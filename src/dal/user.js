import User from '../models/User'
import moment from 'moment'
import logger from '../../libs/logger'

const currentDate = moment().format('MMM Do YYYY')

export const createUser = async (data) => {
  try {
    const user = new User(data)
    user.save()
    logger.info(`Created new user - ${user._id}`)
    return user
  } catch (error) {
    logger.error(`[dal/user] - createUser - ${error}`)
    throw error
  }
}

export const getUsers = async () => {
  try {
    const users = await User.find({}).lean().exec()
    return user
  } catch (error) {
    logger.error(`[dal/user] - getUsers - ${error}`)
    throw error
  }
}

export const getUser = async (id) => {
  try {
    const user = await User.findById(id).lean().exec()
    return user
  } catch (error) {
    logger.error(`[dal/user] - getUser - ${error}`)
    throw error
  }
}

export const updateUser = async (userId, data) => {
  try {
    const newData = Object.assign(data, { updatedAt: currentDate })
    const user = await User.findOneAndUpdate({ _id: userId }, { $set: newData }, { new: true }).lean().exec()
    return user
  } catch (error) {
    logger.error(`[dal/user] - updateUser - ${error}`)
    throw error
  }
}

export const deleteUser = async (userId) => {
  try {
    const user = await User.deleteOne({ _id: userId })
    const { deletedCount } = user
    if (deletedCount === 1) {
      return true
    }
    return false
  } catch (error) {
    logger.error(`[dal/user] - deleteUser - ${error}`)
    throw error
  }
}
