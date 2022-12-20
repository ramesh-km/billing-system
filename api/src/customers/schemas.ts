import { z } from "zod";
import { numberSchema } from "../lib/zod-schemas";

export const CreateCustomerSchema = z.object({
  name: z.string().min(1).max(50),
  email: z.string().email().max(50).optional(),
  phone: z.string().min(9).max(20).optional(),
  address: z.string().min(1).max(100).optional(),
});

export const CustomerIdSchema = z.object({
  customerId: numberSchema,
});

export type CreateCustomerData = z.infer<typeof CreateCustomerSchema>;
