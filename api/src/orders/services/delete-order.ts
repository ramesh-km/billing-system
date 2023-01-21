import { Prisma } from "@prisma/client";
import db from "../../lib/db";
import { claimOrderItemsQuantity } from "./claim-order-items-quanity";

export async function deleteOrder(
  id: number,
  dbClient?: Prisma.TransactionClient
) {
  const client = dbClient || db;
  // Find order
  const order = await client.order.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      items: true,
    },
  });

  // Claim order item's stock and delete order items
  await claimOrderItemsQuantity(id, order.items);

  // Delete order
  const deletedOrder = await client.order.delete({
    where: {
      id,
    },
  });

  return deletedOrder;
}
