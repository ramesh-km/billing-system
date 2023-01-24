import { z } from "zod";
import { numberSchema } from "../lib/zod-schemas";

const CreateOrderItemSchema = z.object({
  itemId: numberSchema,
  quantity: z.number().min(1),
});

export const CreateOrderSchema = z.object({
  customerId: numberSchema,
  orderItems: z.array(CreateOrderItemSchema).min(1),
});

export const OrderIdParamSchema = z.object({
  orderId: numberSchema,
});

export const GetPaginatedOrdersQuerySchema = z.object({
  cursor: numberSchema.default(0),
  size: numberSchema.default(15),
  sortBy: z
    .enum(["name", "updatedAt", "total", "no_of_items"])
    .optional()
    .default("updatedAt"),
  sortDirection: z.enum(["asc", "desc"]).optional().default("desc"),
  search: z.string().min(1).optional(),
});

export type GetPaginatedOrdersQuery = z.infer<
  typeof GetPaginatedOrdersQuerySchema
>;

export const OrdersSearchSchema = z.object({
  query: z.string().trim().min(1),
});

export type CreateOrder = z.infer<typeof CreateOrderSchema>;

export type CreateOrderItem = z.infer<typeof CreateOrderItemSchema>;
