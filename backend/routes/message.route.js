import express from 'express'
import protectedRoute from '../middleware/protectedRoute.js'
import { getMessages, getSidebarUsers, sendMessage } from '../controllers/message.controller.js'

const router = express.Router()

router.get('/users', protectedRoute, getSidebarUsers)
router.get('/:id', protectedRoute, getMessages)
router.post('/send/:id', protectedRoute, sendMessage)

export default router