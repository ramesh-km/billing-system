import { Prisma } from "@prisma/client";
import { RequestHandler } from "express";
import db from "../../lib/db";
import { ItemsSearchData } from "../schemas";

export const searchItemsHandler: RequestHandler<
  unknown,
  unknown,
  unknown,
  ItemsSearchData
> = async (req, res, next) => {
  const { query } = req.query;

  const searchIn = ["name", "description"];
  const where: Prisma.ItemWhereInput = {
    OR: searchIn.map((field) => ({
      [field]: {
        contains: query,
        mode: "insensitive",
      },
    })),
  };

  try {
    const items = await db.item.findMany({
      where,
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        allowedMaxQuantity: true,
        allowedMinQuantity: true,
        availableQuantity: true,
      },
    });

    res.json(items);
  } catch (error) {
    next(error);
  }
};
