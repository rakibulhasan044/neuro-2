import { UserService } from "./user.service";
import { UserValidation } from "./user.validation";
export const UserController = {
    getProfile: async (req, res, next) => {
        try {
            const userId = req.user.userId;
            const profile = await UserService.getProfile(userId);
            res.status(200).json({ success: true, data: profile });
        }
        catch (error) {
            next(error);
        }
    },
    updateProfile: async (req, res, next) => {
        try {
            const userId = req.user.userId;
            const validatedData = UserValidation.updateProfileSchema.parse(req.body);
            const updatedProfile = await UserService.updateProfile(userId, validatedData);
            res.status(200).json({ success: true, data: updatedProfile });
        }
        catch (error) {
            next(error);
        }
    },
    getAddresses: async (req, res, next) => {
        try {
            const userId = req.user.userId;
            const addresses = await UserService.getAddresses(userId);
            res.status(200).json({ success: true, data: addresses });
        }
        catch (error) {
            next(error);
        }
    },
    addAddress: async (req, res, next) => {
        try {
            const userId = req.user.userId;
            const validatedData = UserValidation.addAddressSchema.parse(req.body);
            const address = await UserService.addAddress(userId, validatedData);
            res.status(201).json({ success: true, data: address });
        }
        catch (error) {
            next(error);
        }
    },
    updateAddress: async (req, res, next) => {
        try {
            const userId = req.user.userId;
            const { id } = req.params;
            const validatedData = UserValidation.updateAddressSchema.parse(req.body);
            const address = await UserService.updateAddress(userId, id, validatedData);
            res.status(200).json({ success: true, data: address });
        }
        catch (error) {
            next(error);
        }
    },
    deleteAddress: async (req, res, next) => {
        try {
            const userId = req.user.userId;
            const { id } = req.params;
            await UserService.deleteAddress(userId, id);
            res.status(200).json({ success: true, message: "Address deleted successfully" });
        }
        catch (error) {
            next(error);
        }
    },
    // Admin Endpoints
    createUser: async (req, res, next) => {
        try {
            const adminRole = req.user.role;
            // Optionally validate payload with Zod here
            const user = await UserService.createUser(req.body, adminRole);
            res.status(201).json({ success: true, data: user });
        }
        catch (error) {
            next(error);
        }
    },
    deleteUser: async (req, res, next) => {
        try {
            const adminRole = req.user.role;
            const { id } = req.params;
            await UserService.deleteUser(id, adminRole);
            res.status(200).json({ success: true, message: "User deleted successfully" });
        }
        catch (error) {
            next(error);
        }
    },
    updateUserRole: async (req, res, next) => {
        try {
            const adminRole = req.user.role;
            const { id } = req.params;
            const { role } = req.body;
            const user = await UserService.updateUserRole(id, role, adminRole);
            res.status(200).json({ success: true, message: "Role updated successfully", data: user });
        }
        catch (error) {
            next(error);
        }
    },
    createAdmin: async (req, res, next) => {
        try {
            const result = await UserService.createAdmin(req.body);
            res.status(201).json({
                success: true,
                message: "Admin created successfully",
                data: result,
            });
        }
        catch (err) {
            next(err);
        }
    },
    getCustomers: async (req, res, next) => {
        try {
            const result = await UserService.getCustomers(req.query);
            res.status(200).json({
                success: true,
                message: "Customers fetched successfully",
                meta: result.meta,
                data: result.users
            });
        }
        catch (err) {
            next(err);
        }
    },
    getStaff: async (req, res, next) => {
        try {
            const result = await UserService.getStaff(req.query);
            res.status(200).json({
                success: true,
                message: "Staff fetched successfully",
                meta: result.meta,
                data: result.users
            });
        }
        catch (err) {
            next(err);
        }
    }
};
