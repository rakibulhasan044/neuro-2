import { ReviewService } from "./review.service";
export const ReviewController = {
    createReview: async (req, res, next) => {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                res.status(401).json({ success: false, message: "Unauthorized" });
                return;
            }
            const result = await ReviewService.createReview(userId, req.body);
            res.status(201).json({
                success: true,
                message: "Review submitted successfully",
                data: result,
            });
        }
        catch (err) {
            next(err);
        }
    },
    getAllReviews: async (req, res, next) => {
        try {
            const limit = Number(req.query.limit) || 4;
            const result = await ReviewService.getAllReviews(limit);
            res.status(200).json({
                success: true,
                message: "Reviews fetched successfully",
                data: result,
            });
        }
        catch (err) {
            next(err);
        }
    },
    getProductReviews: async (req, res, next) => {
        try {
            const { productId } = req.params;
            const result = await ReviewService.getProductReviews(productId, req.query);
            res.status(200).json({ success: true, ...result });
        }
        catch (err) {
            next(err);
        }
    },
};
