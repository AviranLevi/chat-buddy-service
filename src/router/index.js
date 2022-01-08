import express from 'express'
import userRouter from './user'
import messageRouter from './message'

const router = express.Router()

router.use('/message', messageRouter)
router.use('/user', userRouter)

export default router
