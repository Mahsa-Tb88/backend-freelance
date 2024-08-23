import express from "express";
import { paymentProduct, orderConfirm } from "../controllers/paymentProduct.js";

const router = express.Router();

router.post("/create-payment-intent/:id", paymentProduct);
router.put("/", orderConfirm);

export default router;
