import express from "express";
import { UserRoutes } from "../modules/user/user.routes.js";
import { AuthRoutes } from "../modules/auth/auth.routes.js";
import { ProductRoutes } from "../modules/product/product.routes.js";
import { OrderRoutes } from "../modules/order/order.routes.js";
import { StoreSettingsRoutes } from "../modules/store-settings/store-settings.routes.js";
import { UploadRoutes } from "../modules/upload/upload.routes.js";
import { CategoryRoutes } from "../modules/category/category.routes.js";
import { BrandRoutes } from "../modules/brand/brand.routes.js";
import { CollectionRoutes } from "../modules/collection/collection.routes.js";
import { BarcodeRoutes } from "../modules/barcode/barcode.routes.js";
import { DashboardRoutes } from "../modules/dashboard/dashboard.routes.js";
import { InventoryRoutes } from "../modules/inventory/inventory.routes.js";
import { ReviewRoutes } from "../modules/review/review.routes.js";
import { WishlistRoutes } from "../modules/wishlist/wishlist.routes.js";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/barcodes",
    route: BarcodeRoutes,
  },
  {
    path: "/categories",
    route: CategoryRoutes,
  },
  {
    path: "/brands",
    route: BrandRoutes,
  },
  {
    path: "/collections",
    route: CollectionRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/products",
    route: ProductRoutes,
  },
  {
    path: "/orders",
    route: OrderRoutes,
  },
  {
    path: "/store-settings",
    route: StoreSettingsRoutes,
  },
  {
    path: "/upload",
    route: UploadRoutes,
  },
  {
    path: "/dashboard",
    route: DashboardRoutes,
  },
  {
    path: "/inventory",
    route: InventoryRoutes,
  },
  {
    path: "/reviews",
    route: ReviewRoutes,
  },
  {
    path: "/wishlist",
    route: WishlistRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
