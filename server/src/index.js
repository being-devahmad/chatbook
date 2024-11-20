import express from 'express' // type -> module
import dotenv from 'dotenv'
import cookieParser from "cookie-parser"
import cors from "cors"

import { connectDB } from "./lib/db.js"

import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"

dotenv.config()
const app = express()

const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser()) //  allows you to parse the cookies just like jwt token
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.use('/api/auth', authRoutes)
app.use('/api/message', messageRoutes)

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
    connectDB()
})