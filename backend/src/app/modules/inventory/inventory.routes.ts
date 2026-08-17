import express from "express";
import { InventoryController } from "./inventory.controller.js";

import auth from "../../middlewares/auth.js";

const router = express.Router();

router.get("/", auth("SUPER_ADMIN", "ADMIN"), InventoryController.getInventory);
router.patch("/:id/adjust", auth("SUPER_ADMIN", "ADMIN"), InventoryController.adjustStock);

export const InventoryRoutes = router;
