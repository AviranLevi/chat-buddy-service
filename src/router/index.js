import express from 'express'
import userRouter from './user'
import messageRouter from './message'
import roomRouter from './room'

const router = express.Router()

router.use('/user', userRouter)
router.use('/room', roomRouter)
router.use('/message', messageRouter)

export default router
