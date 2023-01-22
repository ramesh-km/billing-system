import { Prisma } from "@prisma/client";
import { RequestHandler } from "express";
import db from "../../lib/db";
import { CustomersSearchData } from "../schemas";

export const searchCustomersHandler: RequestHandler<
  unknown,
  unknown,
  unknown,
  CustomersSearchData
> = async (req, res, next) => {
  const { query } = req.query;

  const searchIn = ["name", "email", "phone", "address"];
  const where: Prisma.CustomerWhereInput = {
    OR: searchIn.map((field) => ({
      [field]: {
        contains: query,
        mode: "insensitive",
      },
    })),
  };

  try {
    const items = await db.customer.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
      },
    });
    res.json(items);
  } catch (error) {
    next(error);
  }
};
