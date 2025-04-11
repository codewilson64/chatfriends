import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import { app, server } from './utils/socket.js'

dotenv.config()

const __dirname = path.resolve()

// middleware
app.use(express.json({limit: '5mb'}))
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

// routes
app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)

// For deployment
if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")))
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
  })
}

// mongoose
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    server.listen(process.env.PORT, () => {
        console.log(`server running on port ${process.env.PORT}`)
    })
  })
  .catch(error => console.log(error.message))
