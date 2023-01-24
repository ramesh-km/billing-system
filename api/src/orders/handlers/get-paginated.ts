import { RequestHandler } from "express";
import db from "../../lib/db";
import { toJSONWithBigInts } from "../../lib/util";
import { GetPaginatedOrdersQuerySchema } from "../schema";

interface PaginationOrder {
  id: number;
  customerId: number;
  name: string;
  updatedAt: Date;
  total: bigint;
  no_of_items: bigint;
}

const getPaginatedOrdersHandler: RequestHandler = async (req, res, next) => {
  const { cursor, size, sortBy, sortDirection, search } =
    GetPaginatedOrdersQuerySchema.parse(req.query);

  const searchMatchString = `%${search || ""}%`;

  const havingClause = cursor
    ? `HAVING
  o.id > ${cursor}`
    : "";

  const query = `
SELECT
  o.id ,
  o."customerId" ,
  c."name" ,
  o."updatedAt" as updatedAt,
  SUM(oi.quantity * i.price )as total ,
  COUNT(oi."itemId") as no_of_Items
FROM
  "Order" o
INNER JOIN "OrderItem" oi ON
  oi."orderId" = o.id
INNER JOIN "Item" i ON
  oi."itemId" = i.id
INNER JOIN "Customer" c ON
  c.id = o."customerId"
WHERE
  LOWER(c."name") LIKE LOWER('${searchMatchString}')
GROUP BY
  o.id,
  c."name"
${havingClause}
ORDER BY
  ${sortBy} ${sortDirection}, o.id DESC
LIMIT ${size};
  `;

  try {
    const orders = await db.$queryRawUnsafe<PaginationOrder[]>(query);
    const nextCursor = orders[orders.length - 1].id;
    res.json(toJSONWithBigInts({ data: orders, cursor: nextCursor }));
  } catch (error) {
    next(error);
  }
};

export default getPaginatedOrdersHandler;
