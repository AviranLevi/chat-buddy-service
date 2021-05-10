import User from '../models/User'
import moment from 'moment'
import { dbResponses } from '../constant'

const currentDate = moment().format('MMM Do YYYY')

export const createUser = async (data) => {
  try {
    const { email } = data
    const userExists = await User.findOne({ email })
    if (userExists) {
      return dbResponses.alreadyExists
    } else {
      const user = new User(data)
      user.save()
      console.log(`New user created - ${user.userName} `)
      return user
    }
  } catch (error) {
    throw error
  }
}

export const getUser = async (id) => {
  try {
    const user = await User.findById(id).lean().exec()
    return { user }
  } catch (error) {
    throw error
  }
}

export const updateUser = async (userId, data) => {
  try {
    const { email } = data
    const emailAlreadyUsed = await User.findOne({ email })
    const { _id: id } = emailAlreadyUsed

    if (emailAlreadyUsed && id.toString() !== userId) {
      return dbResponses.emailAlreadyInUse
    } else if (emailAlreadyUsed) delete data.email

    const newData = Object.assign(data, { updatedAt: currentDate })
    const user = await User.findOneAndUpdate({ _id: userId }, { $set: newData }, { new: true })
      .lean()
      .exec()
    return user
  } catch (error) {
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
    throw error
  }
}
