import express from "express";
import { getMsgList } from "../controllers/msgController.js";

const router = express.Router();

router.get("/:id", getMsgList);

export default router;
