import * as db from '../dal/room'
import * as userDB from '../dal/user'
import * as messageDB from '../dal/message'
import * as utils from '../utils'
import logger from '../../libs/logger'
import { CLIENT_INVITE_URL } from '../config'
import { sendMail } from '../../libs/mailer'
import { generateMail } from '../utils'
import { roomTypes } from '../consts'

//CREATE
export const createRoom = async (data = {}) => {
  try {
    const { name, emails, type, admin, admninUserName } = data
    //check if user exists, if not, send an invite
    const uniqueName = `${name}-${utils.generateNumber()}`

    if (type === roomTypes.public) {
      const dataToDB = { name, type, admin, uniqueName }
      const room = await db.createRoom(dataToDB)
      return room
    } else {
      const users = await handleInvitedUsers(emails, admninUserName)
      //generate unique name to room
      //send to db
      if (users.length > 0) {
        const dataToDB = { name, users, type, admin, uniqueName }
        const room = await db.createRoom(dataToDB)
        return room
      }
    }
  } catch (error) {
    logger.error(`[services/room] - createRoom - ${error}`)
    throw error
  }
}

//READ
export const getRoomsByUser = async (userId) => {
  try {
    const publicRooms = await db.getPublicRooms()
    const userRooms = await db.getRoomsByUser(userId)
    const response = [...publicRooms, ...userRooms]
    return response
  } catch (error) {
    logger.error(`[services/room] - getRoomsByUser - ${error}`)
    throw error
  }
}

export const getRoom = async (id) => {
  try {
    const response = await db.getRoom(id)
    return response
  } catch (error) {
    logger.error(`[services/room] - getRoom - ${error}`)
    throw error
  }
}

export const getRoomByUniqueName = async (uniqueName) => {
  try {
    const room = await db.getRoomByUniqueName(uniqueName)
    const roomMessages = await messageDB.getMessagesByRoomId(room._id)
    const results = { ...room, messages: roomMessages }
    return results
  } catch (error) {
    logger.error(`[services/room] - getRoomByUniqueName - ${error}`)
    throw error
  }
}

//UPDATE
export const updateRoom = async (id, data) => {
  try {
    const response = await db.updateRoom(id, data)
    return response
  } catch (error) {
    logger.error(`[services/room] - updateRoom - ${error}`)
    throw error
  }
}

//DELETE
export const deleteRoom = async (id) => {
  try {
    const roomDeleted = await db.deleteRoom(id)
    if (roomDeleted) {
      return { success: roomDeleted, message: 'User has been deleted' }
    }
    return { success: roomDeleted, message: 'Try again later' }
  } catch (error) {
    logger.error(`[services/room] - deleteRoom - ${error}`)
    throw error
  }
}

//HANDLERS
const handleInvitedUsers = async (emails = [], admninUserName) => {
  try {
    let users = []

    await Promise.all(
      emails.map(async (email) => {
        const userExists = await userDB.getUserByEmail(email)

        if (userExists?._id) {
          users.push(userExists._id)
        } else {
          const extractUserName = email.split('@')
          const userName = extractUserName[0] + Math.floor(Math.random() * 1000000000).toString()
          const { _id: newUserId } = await userDB.createUser({ userName, email })
          users.push(newUserId)
          const url = `${CLIENT_INVITE_URL}/${newUserId}`
          //send mail to user
          const mailContent = await generateMail(admninUserName, url)
          if (mailContent) {
            const { subject, text } = mailContent
            await sendMail(subject, text, email)
          }
        }
      })
    )

    return users
  } catch (error) {
    logger.error(`[services/room] - handleInvitedUsers - ${error}`)
    throw error
  }
}
