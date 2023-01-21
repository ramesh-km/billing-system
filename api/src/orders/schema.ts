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

export type CreateOrder = z.infer<typeof CreateOrderSchema>;

export type CreateOrderItem = z.infer<typeof CreateOrderItemSchema>;
