import { Router } from "express";
import { router as shops } from "./shops";
import { router as products } from "./products";
import { verifyTokenGuard } from "../middlewares/verify-token-guard";

export const router = Router();

router.use("/shops", verifyTokenGuard, shops);
router.use("/products", verifyTokenGuard, products);
