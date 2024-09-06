import express from "express";
import { getMsgList,getUnreadMsg } from "../controllers/msgController.js";

const router = express.Router();

router.get("/:id", getMsgList);
router.get("/", getUnreadMsg);

export default router;
