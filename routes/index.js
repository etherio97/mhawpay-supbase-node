import { Router } from "express";
import { router as shops } from "./shops";
import { router as storage } from "./storage";
import { verifyTokenGuard } from "../middlewares/verify-token-guard";

export const router = Router();

router.use("/shops", verifyTokenGuard, shops);

router.use("/storage", verifyTokenGuard, storage);
