import { Prisma } from "@prisma/client";
import { RequestHandler } from "express";
import { z } from "zod";
import db from "../lib/db";
import { numberSchema } from "../lib/zod-schemas";

const schema = z.object({
  page: numberSchema.default(0),
  size: numberSchema.default(15),
  sortBy: z
    .enum([
      "price",
      "createdAt",
      "updatedAt",
      "deletedAt",
      "description",
      "availableQuantity",
      "allowedMinQuantity",
      "allowedMaxQuantity",
    ])
    .optional()
    .default("updatedAt"),
  sortDirection: z.enum(["asc", "desc"]).optional().default("desc"),
  nameOrDescriptionMatch: z.string().min(1).optional(),
});

// Offset (skip, limit/take) pagination
// https://www.prisma.io/docs/concepts/components/prisma-client/pagination#offset-pagination
const readAllPaginatedHandler: RequestHandler = async (req, res) => {
  const result = schema.safeParse(req.params);
  if (!result.success) {
    return res.json({
      message: "Invalid request params",
      errors: result.error.issues,
    });
  }

  const { page, size, sortBy, sortDirection, nameOrDescriptionMatch } =
    result.data;

  const where: Prisma.ItemWhereInput = nameOrDescriptionMatch
    ? {
        OR: [
          {
            name: {
              contains: nameOrDescriptionMatch,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: nameOrDescriptionMatch,
              mode: "insensitive",
            },
          },
        ],
      }
    : {};

  const data = await db.item.findMany({
    where,
    skip: page * size,
    take: size,
    orderBy: {
      [sortBy]: sortDirection,
    },
  });

  return res.json(data);
};

export default readAllPaginatedHandler;
