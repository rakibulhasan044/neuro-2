import { prisma } from "../../lib/prisma";
import { paginationHelper } from "../../shared/paginationHelper";
import bcrypt from "bcrypt";
export const UserService = {
    getProfile: async (userId) => {
        return prisma.user.findUnique({
            where: { id: userId },
            include: {
                profile: true,
                addresses: true,
            },
        });
    },
    updateProfile: async (userId, payload) => {
        const { name, phone } = payload;
        // Update user name if provided
        if (name) {
            await prisma.user.update({
                where: { id: userId },
                data: { name },
            });
        }
        // Update customer profile phone if provided
        if (phone !== undefined) {
            await prisma.customerProfile.upsert({
                where: { userId },
                create: { userId, phone },
                update: { phone },
            });
        }
        return prisma.user.findUnique({
            where: { id: userId },
            include: { profile: true },
        });
    },
    getAddresses: async (userId) => {
        return prisma.address.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });
    },
    addAddress: async (userId, payload) => {
        if (payload.isDefault) {
            // Unset other default addresses
            await prisma.address.updateMany({
                where: { userId, isDefault: true },
                data: { isDefault: false },
            });
        }
        return prisma.address.create({
            data: {
                ...payload,
                userId,
            },
        });
    },
    updateAddress: async (userId, addressId, payload) => {
        const address = await prisma.address.findFirst({
            where: { id: addressId, userId },
        });
        if (!address) {
            throw new Error("Address not found");
        }
        if (payload.isDefault) {
            // Unset other default addresses
            await prisma.address.updateMany({
                where: { userId, isDefault: true },
                data: { isDefault: false },
            });
        }
        return prisma.address.update({
            where: { id: addressId },
            data: payload,
        });
    },
    deleteAddress: async (userId, addressId) => {
        const address = await prisma.address.findFirst({
            where: { id: addressId, userId },
        });
        if (!address) {
            throw new Error("Address not found");
        }
        return prisma.address.delete({
            where: { id: addressId },
        });
    },
    // Admin Methods
    createUser: async (payload, adminRole) => {
        const adminAllowedRoles = [
            "CATALOG_MANAGER",
            "INVENTORY_MANAGER",
            "ORDER_MANAGER",
            "CUSTOMER_SUPPORT",
            "MARKETING_MANAGER",
            "FINANCE_MANAGER"
        ];
        if (adminRole === "ADMIN" && !adminAllowedRoles.includes(payload.role)) {
            throw new Error(`Admins can only create: ${adminAllowedRoles.join(", ")}`);
        }
        if (adminRole === "SUPER_ADMIN" && payload.role === "SUPER_ADMIN") {
            throw new Error("SUPER_ADMIN can only be seeded, not manually created.");
        }
        const hashedPassword = await bcrypt.hash(payload.password, 12);
        return prisma.user.create({
            data: {
                email: payload.email,
                password: hashedPassword,
                name: payload.name,
                phone: payload.phone,
                role: payload.role,
                forcePasswordChange: true, // Manually created users must change password
                profile: {
                    create: { phone: payload.phone }
                }
            },
        });
    },
    deleteUser: async (userIdToDelete, adminRole) => {
        const user = await prisma.user.findUnique({ where: { id: userIdToDelete } });
        if (!user) {
            throw new Error("User not found");
        }
        // ADMIN cannot delete SUPER_ADMIN or ADMIN
        if (adminRole === "ADMIN" && (user.role === "SUPER_ADMIN" || user.role === "ADMIN")) {
            throw new Error("Admins cannot delete users with SUPER_ADMIN or ADMIN roles.");
        }
        return prisma.user.delete({
            where: { id: userIdToDelete },
        });
    },
    updateUserRole: async (userIdToUpdate, newRole, adminRole) => {
        const user = await prisma.user.findUnique({ where: { id: userIdToUpdate } });
        if (!user) {
            throw new Error("User not found");
        }
        const adminAllowedRoles = [
            "CATALOG_MANAGER",
            "INVENTORY_MANAGER",
            "ORDER_MANAGER",
            "CUSTOMER_SUPPORT",
            "MARKETING_MANAGER",
            "FINANCE_MANAGER",
            "CUSTOMER"
        ];
        if (adminRole === "ADMIN") {
            if (user.role === "SUPER_ADMIN" || user.role === "ADMIN") {
                throw new Error("Admins cannot change the role of SUPER_ADMIN or ADMIN.");
            }
            if (!adminAllowedRoles.includes(newRole)) {
                throw new Error(`Admins can only assign: ${adminAllowedRoles.join(", ")}`);
            }
        }
        if (adminRole === "SUPER_ADMIN" && newRole === "SUPER_ADMIN") {
            throw new Error("Cannot assign SUPER_ADMIN role dynamically.");
        }
        return prisma.user.update({
            where: { id: userIdToUpdate },
            data: { role: newRole },
        });
    },
    getCustomers: async (filters) => {
        const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(filters);
        const { search } = filters;
        const where = { role: "CUSTOMER" };
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
            ];
        }
        const [users, total] = await Promise.all([
            prisma.user.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
                include: {
                    profile: true,
                    _count: { select: { orders: true } }
                }
            }),
            prisma.user.count({ where })
        ]);
        return {
            users,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        };
    },
    getStaff: async (filters) => {
        const { page, limit, skip, sortBy, sortOrder } = paginationHelper.calculatePagination(filters);
        const { search } = filters;
        const where = { role: { not: "CUSTOMER" } };
        if (search) {
            where.OR = [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
            ];
        }
        const [users, total] = await Promise.all([
            prisma.user.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
                include: { profile: true }
            }),
            prisma.user.count({ where })
        ]);
        return {
            users,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        };
    }
};
