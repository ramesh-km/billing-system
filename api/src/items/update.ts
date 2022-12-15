import { RequestHandler } from "express";
import { z } from "zod";
import db from "../lib/db";
import { numberSchema } from "../lib/zod-schemas";

const schema = z.object({
  name: z.string().min(1),
  description: z.string().min(1).optional(),
  image: z.string().min(1).optional(),
  price: z.number().min(1),
  availableQuantity: z.number(),
  allowedMinQuantity: z.number().min(1).default(1),
  allowedMaxQuantity: z.number().min(1).optional(),
});

const updateItemHandler: RequestHandler = async (req, res) => {
  const result = schema.safeParse(req.body);
  const idResult = numberSchema.safeParse(req.params.id);
  if (!result.success || !idResult.success) {
    return res.json({
      message: "Invalid request body",
      errors: result.success ? [] : result.error.issues,
    });
  }

  // Update item
  const item = await db.item.update({
    where: { id: idResult.data },
    data: result.data,
  });

  return res.json(item);
};

export default updateItemHandler;
