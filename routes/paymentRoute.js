import express from "express";
import { paymentProduct } from "../controllers/paymentProduct.js";

const router = express.Router();

router.post("/create-payment-intent/:id", paymentProduct);

export default router;
