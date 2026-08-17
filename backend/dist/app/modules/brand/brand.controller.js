import { BrandService } from "./brand.service";
export const BrandController = {
    create: async (req, res, next) => {
        try {
            const data = await BrandService.create(req.body);
            res.status(201).json({ success: true, data });
        }
        catch (error) {
            next(error);
        }
    },
    getAll: async (req, res, next) => {
        try {
            const data = await BrandService.getAll();
            res.status(200).json({ success: true, data });
        }
        catch (error) {
            next(error);
        }
    },
    getBySlug: async (req, res, next) => {
        try {
            const data = await BrandService.getBySlug(req.params.slug);
            res.status(200).json({ success: true, data });
        }
        catch (error) {
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const data = await BrandService.update(req.params.id, req.body);
            res.status(200).json({ success: true, data });
        }
        catch (error) {
            next(error);
        }
    },
    delete: async (req, res, next) => {
        try {
            await BrandService.delete(req.params.id);
            res.status(200).json({ success: true, message: "Deleted successfully" });
        }
        catch (error) {
            next(error);
        }
    }
};
