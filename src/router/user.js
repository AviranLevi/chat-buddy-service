import express from 'express'
import * as routes from './routes/user'

const router = express.Router()

router.post('/', routes.createUser)
router.get('/:id', routes.getUser)
router.put('/:id', routes.updateUser)
router.delete('/:id', routes.deleteUser)

export default router
