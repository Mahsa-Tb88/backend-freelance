import express from "express";
import {
  createProduct,
  getAllProductOfSeller,
  getProductById,
} from "../controllers/productController.js";
import { isSeller } from "../middlewares/authMiddleWare.js";

const router = express.Router();

router.post("/", isSeller, createProduct);
router.get("/:id", isSeller, getProductById);
router.get("/seller/:id", isSeller, getAllProductOfSeller);

export default router;
