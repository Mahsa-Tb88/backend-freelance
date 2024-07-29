import express from "express";
import {
  loginUser,
  registerUser,
  signOut,
} from "../controllers/authControllers.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/signOut", signOut);

export default router;
