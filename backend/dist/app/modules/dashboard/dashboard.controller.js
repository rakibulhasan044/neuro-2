import { DashboardService } from "./dashboard.service";
export const DashboardController = {
    getMetrics: async (req, res, next) => {
        try {
            const result = await DashboardService.getMetrics();
            res.status(200).json({
                success: true,
                message: "Metrics retrieved successfully",
                data: result,
            });
        }
        catch (err) {
            next(err);
        }
    },
    getCharts: async (req, res, next) => {
        try {
            const period = req.query.period || "monthly";
            const year = req.query.year || new Date().getFullYear().toString();
            const result = await DashboardService.getCharts(period, year);
            res.status(200).json({
                success: true,
                data: result,
            });
        }
        catch (err) {
            next(err);
        }
    }
};
