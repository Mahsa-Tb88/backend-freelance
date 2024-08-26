import express from "express";
import { getReviewsOfProduct,createReviewsOfProduct } from "../controllers/reviewControllers.js";

const router = express.Router();

router.get("/:productId", getReviewsOfProduct);
router.post("/:productId" , createReviewsOfProduct)

export default router;
