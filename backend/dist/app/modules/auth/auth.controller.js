import { AuthService } from "./auth.service";
export const AuthController = {
    register: async (req, res, next) => {
        try {
            const result = await AuthService.register(req.body);
            res.status(201).json({
                success: true,
                message: "User registered successfully",
                data: result,
            });
        }
        catch (err) {
            next(err);
        }
    },
    login: async (req, res, next) => {
        try {
            const result = await AuthService.login(req.body);
            res.status(200).json({
                success: true,
                message: "User logged in successfully",
                data: result,
            });
        }
        catch (err) {
            next(err);
        }
    },
    changePassword: async (req, res, next) => {
        try {
            const userId = req.user.userId;
            const result = await AuthService.changePassword(userId, req.body);
            res.status(200).json({
                success: true,
                message: "Password changed successfully",
                data: result,
            });
        }
        catch (err) {
            next(err);
        }
    }
};
