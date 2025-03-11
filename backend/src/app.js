import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
console.log("CORS from app.js:", process.env.CORS_ORIGIN)
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }))
// app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(express.json({ limit: "15kb" }))
app.use(express.urlencoded({ extended: true, limit: "15kb" }))
app.use(express.static("public"))
app.use(cookieParser())

import authRouter from './routes/auth.routes.js'
import userRouter from './routes/user.routes.js'
import eventRouter from './routes/event.routes.js'

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/event', eventRouter)

export { app }