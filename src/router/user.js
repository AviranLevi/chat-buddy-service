import express from 'express'
import * as routes from './routes/userRoutes'
import passport from 'passport'

const router = express.Router()
const passportConfig = require('../config/passport')

router.post('/', routes.createUser)
router.post('/login', passport.authenticate('local', { session: false }), routes.userLogin)
router.get('/logout', passport.authenticate('jwt', { session: false }), routes.userLogout)
router.get('/:id', passport.authenticate('jwt', { session: false }), routes.getUser)
router.put('/:id', passport.authenticate('jwt', { session: false }), routes.updateUser)
router.delete('/:id', passport.authenticate('jwt', { session: false }), routes.deleteUser)

export default router
