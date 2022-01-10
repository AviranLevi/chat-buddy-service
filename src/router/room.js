import express from 'express'
import * as routes from './routes/room'

const router = express.Router()

router.post('/', routes.createRoom)
router.get('/:userId', routes.getRooms)
router.get('/:id', routes.getRoom)
router.put('/:id', routes.updateRoom)
router.delete('/:id', routes.deleteRoom)

export default router
