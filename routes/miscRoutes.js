import express from "express";
import uploadMiddleWare from "../middlewares/uploadMiddleWare.js";
import { uploadFile } from "../controllers/miscControllers.js";

const router = express.Router();
console.log("000");
router.post("/uploads", uploadMiddleWare, uploadFile);

router.use((err, req, res, next) => {
  if (err.code === "LIMIT_FILE_SIZE") {
    res.fail("Max Size");
  } else if (err.code === "INVALID_EXTENSION") {
    res.fail("Invalid Extension");
  }
});

export default router;
