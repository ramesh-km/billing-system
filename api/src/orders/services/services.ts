import { OrderItem, Prisma } from "@prisma/client";
import db from "../../lib/db";


export async function updateOrder(
  id: number,
  data: Prisma.OrderUpdateInput,
  dbClient?: Prisma.TransactionClient
) {
  const client = dbClient || db;

  const updateOrder = await client.order.update({
    where: {
      id,
    },
    data,
  });

  return updateOrder;
}
