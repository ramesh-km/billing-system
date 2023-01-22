import { Item } from "@prisma/client";
import { RequestHandler } from "express";
import db from "../../lib/db";
import { numberSchema } from "../../lib/zod-schemas";
import { ItemIdParam } from "../../types/items";
import { ResBody } from "../../types/util";

const deleteItemHandler: RequestHandler<ItemIdParam, ResBody<Item>> = async (
  req,
  res,
  next
) => {
  const { itemId } = req.params;
  try {
    const item = await db.item.delete({
      where: {
        id: numberSchema.parse(itemId),
      },
    });
    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};

export default deleteItemHandler;
