import express from "express";
import { getChatById, sendChat } from "../controllers/chatControllers.js";

const router = express.Router();

router.get("/:id", getChatById);
router.post("/", sendChat);

export default router;
