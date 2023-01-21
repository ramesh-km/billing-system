import { OrderItem, Prisma } from "@prisma/client";
import db from "../../lib/db";

/**
 * deletes given order items and updates the corresponding items's quantity
 * @param orderId
 * @param orderItems
 * @param dbClient for transactions
 * @returns Item[]
 */
export async function claimOrderItemsQuantity(
  orderId: number,
  orderItems: OrderItem[],
  dbClient?: Prisma.TransactionClient
) {
  const client = dbClient || db;
  try {
    await client.orderItem.deleteMany({
      where: {
        orderId,
        itemId: {
          in: orderItems.map((orderItem) => orderItem.itemId),
        },
      },
    });

    const updatedItems = await Promise.all(
      orderItems.map((orderItem) =>
        client.item.update({
          where: {
            id: orderItem.itemId,
          },
          data: {
            availableQuantity: {
              increment: orderItem.quantity,
            },
          },
        })
      )
    );

    return updatedItems;
  } catch (error) {
    throw new Error("Failed to claim item quantity", {
      cause: error,
    });
  }
}
