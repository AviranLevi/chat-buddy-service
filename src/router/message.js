import express from 'express'
import * as routes from './routes/message'

const router = express.Router()

router.post('/', routes.createMessage)
router.get('/', routes.getMessages)
router.put('/:id', routes.updateMessage)

export default router
