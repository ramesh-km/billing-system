import { Customer, Prisma } from "@prisma/client";
import { RequestHandler } from "express";
import db from "../../lib/db";
import { ResBody } from "../../types/util";
import { GetPaginatedCustomersParamsSchema } from "../schemas";

export const getPaginatedCustomersHandler: RequestHandler<
  unknown,
  ResBody<{ data: Customer[]; total: number }>
> = async (req, res, next) => {
  const { page, size, sortBy, sortDirection, search } =
    GetPaginatedCustomersParamsSchema.parse(req.query);

  const where: Prisma.CustomerWhereInput = search
    ? {
        OR: [
          {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            phone: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            address: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      }
    : {};

  try {
    const total = await db.customer.count({ where });
    const data = await db.customer.findMany({
      skip: page * size,
      take: size,
      orderBy: {
        [sortBy]: sortDirection,
      },
      where,
    });
    res.status(200).json({ data, total });
  } catch (error) {
    next(error);
  }
};
