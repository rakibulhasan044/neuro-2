import { z } from "zod";

export const UserValidation = {
  updateProfileSchema: z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
  }),

  addAddressSchema: z.object({
    street: z.string({ message: "Street is required" }),
    city: z.string({ message: "City is required" }),
    state: z.string({ message: "State is required" }),
    postalCode: z.string({ message: "Postal Code is required" }),
    country: z.string({ message: "Country is required" }),
    isDefault: z.boolean().optional().default(false),
  }),

  updateAddressSchema: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional(),
    isDefault: z.boolean().optional(),
  }),
};
