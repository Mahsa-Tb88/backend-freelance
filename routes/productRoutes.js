import express from "express";
import {
  createProduct,
  getAllProductOfSeller,
  getProductById,
  updateProduct
} from "../controllers/productController.js";
import { isSeller } from "../middlewares/authMiddleWare.js";

const router = express.Router();

router.post("/", isSeller, createProduct);
router.get("/:id", isSeller, getProductById);
router.get("/seller/:id", isSeller, getAllProductOfSeller);
router.put("/:id", updateProduct);

export default router;
