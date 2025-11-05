import 'dotenv/config';
import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import messageRouter from './routes/message.routes.js';
import cookieParser from 'cookie-parser';
dotenv.config();
import cors from "cors"

const port = process.env.PORT || 5000

const app = express();
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/message", messageRouter)

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    })
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err?.message || err);
    process.exit(1);
  });
