import express from "express";
import { paymentProduct, orderConfirm,getAllOrdersOfUser } from "../controllers/orderController.js";

const router = express.Router();

router.post("/create-payment-intent/:id", paymentProduct);
router.put("/", orderConfirm);
router.get("/", getAllOrdersOfUser);

export default router;
