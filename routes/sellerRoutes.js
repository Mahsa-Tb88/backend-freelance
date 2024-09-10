import express from "express";
import { getSellers ,getSeller} from "../controllers/sellerControllers.js";

const router = express.Router();

router.get("/", getSellers);
router.get("/:id", getSeller);

export default router;
