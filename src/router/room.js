import express from 'express'
import * as routes from './routes/room'

const router = express.Router()

router.post('/', routes.createRoom)
router.get('/user/:userId', routes.getRooms)
router.get('/:id', routes.getRoom)
router.get('/unique/:name', routes.getRoomByUniqueName)
router.put('/:id', routes.updateRoom)
router.delete('/:id', routes.deleteRoom)

export default router
