// import express from 'express'; // type -> module
// import dotenv from 'dotenv';
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import { app, server } from './lib/socket.js';

// import { connectDB } from "./lib/db.js";

// import authRoutes from "./routes/auth.route.js";
// import messageRoutes from "./routes/message.route.js";

// dotenv.config();

// const PORT = process.env.PORT;

// app.use(express.json({ limit: '10mb' })); // Increase payload limit
// app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Handle URL-encoded data
// app.use(cookieParser()); // Allows parsing of cookies like JWT tokens
// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true,
// }));

// // API routes
// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);

// // Start the server
// server.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//     connectDB();
// });

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import path from "path";

import { connectDB } from "./lib/db.js";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json({ limit: '10mb' })); // Increase payload limit
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Handle URL-encoded data
app.use(cookieParser()); // Allows parsing of cookies like JWT tokens
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "../frontend/dist")));

//     app.get("*", (req, res) => {
//         res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//     });
// }

server.listen(PORT, () => {
    console.log("server is running on PORT: " + PORT);
    connectDB();
});