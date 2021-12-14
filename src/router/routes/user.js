import * as service from '../../services/user'
import { httpResponseStatus } from '../../constant'
const { OK, ERR } = httpResponseStatus
import * as JWT from '../../utils/jwt'
import logger from '../../logger'

export const createUser = async (req, res, next) => {
  try {
    const result = await service.createUser(req.body)
    res.status(OK).json(result)
  } catch (error) {
    res.status(ERR).json(error)
    logger.error(`[router/routes/user] - createUser - ${error}`)
  }
}

export const userLogin = (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      const user = req.user
      const { _id } = user
      const token = JWT.signToken(_id)
      res.status(OK).json({ isAuthenticated: true, user, accessToken: token })
    }
  } catch (error) {
    res.status(ERR).json(error)
    logger.error(`[router/routes/user] - userLogin - ${error}`)
  }
}

export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await service.getUser(id)
    res.status(OK).json(result)
  } catch (error) {
    res.status(ERR).json(error)
    logger.error(`[router/routes/user] - getUser - ${error}`)
  }
}

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await service.updateUser(id, req.body)
    res.status(OK).json(result)
  } catch (error) {
    res.status(ERR).json(error)
    logger.error(`[router/routes/user] - updateUser - ${error}`)
  }
}

export const userLogout = (req, res, next) => {
  try {
    res.status(OK).json({ success: true })
  } catch (error) {
    res.status(ERR).json(error)
    logger.error(`[router/routes/user] - userLogout - ${error}`)
  }
}

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await service.deleteUser(id)
    res.status(OK).json(result)
  } catch (error) {
    res.status(ERR).json(error)
    logger.error(`[router/routes/user] - deleteUser - ${error}`)
  }
}
