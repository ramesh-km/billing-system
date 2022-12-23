import { z } from "zod";
import { numberSchema } from "../lib/zod-schemas";

export const CreateCustomerSchema = z.object({
  name: z.string().trim().min(1).max(50),
  email: z
    .string()
    .trim()
    .email()
    .max(50)
    .transform((v) => v.toLowerCase())
    .optional(),
  phone: z.string().trim().min(9).max(20).optional(),
  address: z.string().trim().min(1).max(100).optional(),
});

export const CustomerIdSchema = z.object({
  customerId: numberSchema,
});

export type CreateCustomerData = z.infer<typeof CreateCustomerSchema>;

export const GetPaginatedCustomersParamsSchema = z.object({
  page: numberSchema.default(0),
  size: numberSchema.default(15),
  sortBy: z
    .enum([
      "name",
      "email",
      "phone",
      "address",
      "createdAt",
      "updatedAt",
      "deletedAt",
    ])
    .optional()
    .default("updatedAt"),
  sortDirection: z.enum(["asc", "desc"]).optional().default("desc"),
  search: z.string().trim().min(1).optional(),
});

export type GetPaginatedCustomersParams = z.infer<
  typeof GetPaginatedCustomersParamsSchema
>;

export const CustomersSearchSchema = z.object({
  query: z.string().trim().min(1),
});

export type CustomersSearchData = z.infer<typeof CustomersSearchSchema>;
