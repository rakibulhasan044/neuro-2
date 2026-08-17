import express from "express";
import { CategoryController } from "./category.controller.js";
import auth from "../../middlewares/auth.js";

const router = express.Router();

router.post("/", auth("SUPER_ADMIN", "ADMIN", "CATALOG_MANAGER"), CategoryController.create);
router.get("/", CategoryController.getAll);
router.get("/:slug", CategoryController.getBySlug);
router.patch("/:id", auth("SUPER_ADMIN", "ADMIN", "CATALOG_MANAGER"), CategoryController.update);
router.delete("/:id", auth("SUPER_ADMIN", "ADMIN", "CATALOG_MANAGER"), CategoryController.delete);

export const CategoryRoutes = router;
