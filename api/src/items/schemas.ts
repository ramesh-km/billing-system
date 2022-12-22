import { z } from "zod";
import { numberSchema } from "../lib/zod-schemas";

export const CreateItemSchema = z.object({
  name: z.string().trim().min(1).max(50),
  description: z.string().trim().min(1).optional(),
  image: z.string().min(1).optional(),
  price: z.number().min(1),
  availableQuantity: z.number().default(1),
  allowedMinQuantity: z.number().min(1).default(1),
  allowedMaxQuantity: z.number().min(1).default(10).optional(),
});

export type CreateItemData = z.infer<typeof CreateItemSchema>;

export const ItemIdSchema = z.object({
  itemId: numberSchema,
});

export const GetPaginatedItemsParamsSchema = z.object({
  page: numberSchema.default(0),
  size: numberSchema.default(15),
  sortBy: z
    .enum([
      "price",
      "createdAt",
      "updatedAt",
      "deletedAt",
      "description",
      "availableQuantity",
      "allowedMinQuantity",
      "allowedMaxQuantity",
    ])
    .optional()
    .default("updatedAt"),
  sortDirection: z.enum(["asc", "desc"]).optional().default("desc"),
  search: z.string().min(1).optional(),
});

export type GetPaginatedItemsParams = z.infer<
  typeof GetPaginatedItemsParamsSchema
>;
