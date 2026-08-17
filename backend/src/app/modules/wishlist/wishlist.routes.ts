import express from "express";
import { WishlistController } from "./wishlist.controller.js";
import auth from "../../middlewares/auth.js";

const router = express.Router();

router.get("/", auth(), WishlistController.getWishlist);
router.post("/toggle", auth(), WishlistController.toggleWishlist);

export const WishlistRoutes = router;
