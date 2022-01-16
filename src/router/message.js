import express from 'express'
import * as routes from './routes/message'

const router = express.Router()

router.post('/', routes.createMessage)
router.get('/room/:id', routes.getMessagesByRoomId)
router.put('/:id', routes.updateMessage)

export default router
