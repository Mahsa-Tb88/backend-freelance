import express from "express";
import {
  getReviewsOfProduct,
  createReviewsOfProduct,
  deleteReview,
} from "../controllers/reviewControllers.js";

const router = express.Router();

router.get("/:productId", getReviewsOfProduct);
router.post("/:productId", createReviewsOfProduct);
router.delete("/:id", deleteReview);

export default router;
