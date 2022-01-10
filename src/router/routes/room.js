import * as service from '../../services/room'
import { httpResponseStatus } from '../../consts'
const { OK, ERR } = httpResponseStatus
import logger from '../../logger'

export const createRoom = async (req, res, next) => {
  try {
    const result = await service.createRoom(req.body)
    res.status(OK).json(result)
  } catch (error) {
    res.status(ERR).json(error)
    logger.error(`[router/routes/room] - createRoom - ${error}`)
  }
}

export const getRooms = async (req, res, next) => {
  try {
    const { userId } = req.params
    const result = await service.getRooms(userId)
    res.status(OK).json(result)
  } catch (error) {
    res.status(ERR).json(error)
    logger.error(`[router/routes/room] - getRooms - ${error}`)
  }
}

export const getRoom = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await service.getRoom(id)
    res.status(OK).json(result)
  } catch (error) {
    res.status(ERR).json(error)
    logger.error(`[router/routes/room] - getRoom - ${error}`)
  }
}

export const updateRoom = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await service.updateRoom(id, req.body)
    res.status(OK).json(result)
  } catch (error) {
    res.status(ERR).json(error)
    logger.error(`[router/routes/room] - updateRoom - ${error}`)
  }
}

export const deleteRoom = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await service.deleteRoom(id)
    res.status(OK).json(result)
  } catch (error) {
    res.status(ERR).json(error)
    logger.error(`[router/routes/room] - deleteRoom - ${error}`)
  }
}
