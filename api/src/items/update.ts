import { Item } from "@prisma/client";
import { RequestHandler } from "express";
import db from "../lib/db";
import { numberSchema } from "../lib/zod-schemas";
import { ItemIdParam } from "../types/items";
import { ResBody } from "../types/util";
import { CreateItemData } from "./schemas";

const updateItemHandler: RequestHandler<
  ItemIdParam,
  ResBody<Item>,
  CreateItemData
> = async (req, res, next) => {
  const { itemId } = req.params;
  const data = req.body;
  try {
    const item = await db.item.update({
      where: {
        id: numberSchema.parse(itemId),
      },
      data,
    });
    res.status(200).json(item);
  } catch (error) {
    next(error);
  }
};

export default updateItemHandler;
