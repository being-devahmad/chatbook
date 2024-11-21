import express from 'express'; // type -> module
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(express.json({ limit: '10mb' })); // Increase payload limit
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Handle URL-encoded data
app.use(cookieParser()); // Allows parsing of cookies like JWT tokens
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
