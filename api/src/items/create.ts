import { RequestHandler } from "express";
import { z } from "zod";
import db from "../lib/db";

const schema = z.object({
  name: z.string().trim().min(1).max(50),
  description: z.string().trim().min(1).optional(),
  image: z.string().min(1).optional(),
  price: z.number().min(1),
  availableQuantity: z.number().default(1),
  allowedMinQuantity: z.number().min(1).default(1),
  allowedMaxQuantity: z.number().min(1).default(10).optional(),
});

const createItemHandler: RequestHandler = async (req, res) => {
  // Validate the request body
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      message: "Invalid request body",
      errors: result.error.issues,
    });
  }

  // Create the item
  const item = await db.item.create({
    data: result.data,
  });

  // Return the item
  res.status(201).json(item);
};

export default createItemHandler;
