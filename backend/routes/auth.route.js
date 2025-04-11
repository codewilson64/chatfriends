import express from 'express'
import protectedRoute from '../middleware/protectedRoute.js'
import { checkAuth, login, logout, signup, updateUser } from '../controllers/auth.controller.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.put('/update', protectedRoute, updateUser)

router.get('/check', protectedRoute, checkAuth)

export default router