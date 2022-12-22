import { Item, Prisma } from "@prisma/client";
import { RequestHandler } from "express";
import db from "../lib/db";
import { ResBody } from "../types/util";
import { GetPaginatedItemsParams } from "./schemas";

// Offset (skip, limit/take) pagination
// https://www.prisma.io/docs/concepts/components/prisma-client/pagination#offset-pagination
const getPaginatedItemsHandler: RequestHandler<
  unknown,
  ResBody<{ data: Item[]; total: number }>,
  GetPaginatedItemsParams
> = async (req, res, next) => {
  const { page, size, sortBy, sortDirection, search } = req.body;

  const where: Prisma.ItemWhereInput = search
    ? {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      }
    : {};

  try {
    const total = await db.item.count({ where });

    const data = await db.item.findMany({
      where,
      skip: page * size,
      take: size,
      orderBy: {
        [sortBy]: sortDirection,
      },
    });

    return res.json({ data, total });
  } catch (error) {
    next(error);
  }
};

export default getPaginatedItemsHandler;
