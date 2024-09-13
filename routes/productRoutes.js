import express from "express";
import {
  createProduct,
  getAllProductOfSeller,
  getProductById,
  updateProduct,
  getAllProducts,
  deleteProduct,
} from "../controllers/productController.js";
import { isSeller } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", isSeller, createProduct);
router.get("/:id", getProductById);
router.get("/seller/:id", isSeller, getAllProductOfSeller);
router.get("/", getAllProducts);
router.put("/:id", isSeller, updateProduct);
router.delete("/:id", isSeller, deleteProduct);

export default router;
