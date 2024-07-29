import path from "path";

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import responseMiddleWares from "./middlewares/responseMiddlewares.js";
import miscRoutes from "./routes/miscRoutes.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import corsMiddleware from "./middlewares/corsMiddleware.js";
import { checkToken } from "./middlewares/authMiddleWare.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
const __dirname = import.meta.dirname;

app.use(responseMiddleWares);
app.use(corsMiddleware);
app.use(cookieParser());
app.use(checkToken);
app.use(miscRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);

try {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("connected to database");

  app.listen(3000, () => {
    console.log("Server is running on http://localhost3000");
  });
} catch (e) {
  console.log(e.message);
}
