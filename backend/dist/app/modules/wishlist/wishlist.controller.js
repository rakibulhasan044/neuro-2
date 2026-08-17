import { WishlistService } from "./wishlist.service";
export const WishlistController = {
    getWishlist: async (req, res, next) => {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                res.status(401).json({ success: false, message: "Unauthorized" });
                return;
            }
            const result = await WishlistService.getWishlist(userId);
            res.status(200).json({ success: true, data: result });
        }
        catch (err) {
            next(err);
        }
    },
    toggleWishlist: async (req, res, next) => {
        try {
            const userId = req.user?.userId;
            if (!userId) {
                res.status(401).json({ success: false, message: "Unauthorized" });
                return;
            }
            const { productId } = req.body;
            const result = await WishlistService.toggleWishlist(userId, productId);
            res.status(200).json({ success: true, ...result });
        }
        catch (err) {
            next(err);
        }
    }
};
