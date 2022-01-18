import * as service from '../../services/message'
import { httpResponseStatus } from '../../consts'
const { OK, ERR } = httpResponseStatus
import logger from '../../../libs/logger'

export const createMessage = async (req, res, next) => {
  try {
    const result = await service.createMessage(req.body)
    res.status(OK).json(result)
  } catch (error) {
    res.status(ERR).json({ success: false, error })
    logger.error(`[router/routes/message] - createMessage - ${error}`)
  }
}

export const getMessagesByRoomId = async (req, res, next) => {
  try {
    const { id: roomId } = req.params
    const result = await service.getMessagesByRoomId(roomId)
    res.status(OK).json(result)
  } catch (error) {
    res.status(ERR).json({ success: false, error })
    logger.error(`[router/routes/message] - getMessagesByRoomId - ${error}`)
  }
}
