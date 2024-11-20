import express from 'express'
import { signup, login, logout, updateProfile } from '../controllers/auth.controller.js'
import { protectedRoute } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/signup', signup)

router.post('/login', login)

router.get('/logout', logout)

router.put("/update-profile", protectedRoute, updateProfile)

export default router