import express from "express";
import { DashboardController } from "./dashboard.controller.js";

const router = express.Router();

router.get("/metrics", DashboardController.getMetrics);
router.get("/charts", DashboardController.getCharts);

export const DashboardRoutes = router;
