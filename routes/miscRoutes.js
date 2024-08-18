import express from "express";
import uploadMiddleWare from "../middlewares/uploadMiddleWare.js";
import { initialize, uploadFile } from "../controllers/miscControllers.js";
import multer from "multer";

const router = express.Router();
router.get("/misc/initialize", initialize);
router.post("/uploads", uploadMiddleWare, uploadFile);
const app = express();


router.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    res.fail("Max Size of Image is 1MB");
  } else if (err.code === "INVALID_EXTENSION") {
    res.fail("Invalid Extension");
  }
});

export default router;
