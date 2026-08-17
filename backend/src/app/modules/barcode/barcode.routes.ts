import express from "express";
import { BarcodeController } from "./barcode.controller.js";
import auth from "../../middlewares/auth.js";

const router = express.Router();

router.post("/generate", auth("SUPER_ADMIN", "ADMIN", "CATALOG_MANAGER"), BarcodeController.generate);

export const BarcodeRoutes = router;
