import cookieParser from "cookie-parser";
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
import cors from 'cors';
import connectdb from './config/db.js';
import authRouter from './routes/authRoutes.js';
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { app, server } from "./socket/socket.js";



app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/message', messageRouter);

const PORT = process.env.PORT || 5000;


server.listen(PORT, () => {
  connectdb();
  console.log(`Server running on port ${PORT}`);

});
