import { Customer } from "@prisma/client";
import { RequestHandler } from "express";
import db from "../lib/db";
import { ResBody } from "../types/util";
import { GetPaginatedCustomersParamsSchema } from "./schemas";

export const getPaginatedCustomersHandler: RequestHandler<
  unknown,
  ResBody<Customer[]>
> = async (req, res, next) => {
  const { page, size, sortBy, sortDirection, search } =
    GetPaginatedCustomersParamsSchema.parse(req.query);

  try {
    const customers = await db.customer.findMany({
      skip: page * size,
      take: size,
      orderBy: {
        [sortBy]: sortDirection,
      },
      where: search
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
        : undefined,
    });
    res.status(200).json(customers);
  } catch (error) {
    next(error);
  }
};
