import { RequestHandler } from "express";
import db from "../lib/db";
import { numberSchema } from "../lib/zod-schemas";
import createError from "http-errors";

const getItemHandler: RequestHandler = async (req, res, next) => {
  const { itemId } = req.params;

  // Find the item
  let item = null;
  try {
    item = await db.item.findUnique({
      where: {
        id: numberSchema.parse(itemId),
      },
    });
  } catch (error) {
    next(error);
  }

  if (!item) {
    next(createError(404, "Item not found"));
    return;
  }

  res.status(200).json(item);
};

export default getItemHandler;
