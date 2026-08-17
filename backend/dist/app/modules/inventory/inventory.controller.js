import { InventoryService } from "./inventory.service";
export const InventoryController = {
    getInventory: async (req, res, next) => {
        try {
            const result = await InventoryService.getInventory(req.query);
            res.status(200).json({
                success: true,
                message: "Inventory fetched successfully",
                meta: result.meta,
                data: result.variants
            });
        }
        catch (err) {
            next(err);
        }
    },
    adjustStock: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { stock } = req.body;
            const result = await InventoryService.adjustStock(id, Number(stock));
            res.status(200).json({ success: true, data: result });
        }
        catch (err) {
            next(err);
        }
    }
};
