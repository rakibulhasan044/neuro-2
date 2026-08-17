import { prisma } from "../../lib/prisma";
export const CategoryService = {
    create: async (payload) => {
        if (!payload.slug && payload.name) {
            payload.slug = payload.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        }
        return await prisma.category.create({ data: payload });
    },
    getAll: async () => {
        return await prisma.category.findMany({
            include: {
                children: true,
                _count: { select: { products: true } }
            }
        });
    },
    getBySlug: async (slug) => {
        const record = await prisma.category.findUnique({
            where: { slug },
            include: { children: true, products: true }
        });
        if (!record)
            throw new Error("Category not found");
        return record;
    },
    update: async (id, payload) => {
        return await prisma.category.update({
            where: { id },
            data: payload
        });
    },
    delete: async (id) => {
        return await prisma.category.delete({ where: { id } });
    }
};
