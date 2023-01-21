import { Prisma } from "@prisma/client";
import db from "../../lib/db";

export async function checkForItemAvailability(
  itemId: number,
  neededQuantity: number,
  checkForAllowedQuantityLimits = true,
  dbClient?: Prisma.TransactionClient
) {
  const client = dbClient || db;
  const item = await client.item.findUniqueOrThrow({
    where: {
      id: itemId,
    },
  });
  const isAvailable =
    item.availableQuantity <= neededQuantity &&
    (checkForAllowedQuantityLimits
      ? neededQuantity <= (item.allowedMaxQuantity || Infinity) &&
        neededQuantity >= item.allowedMinQuantity
      : true);

  if (!isAvailable) {
    throw new Error("Item's quantity not available", {
      cause: item,
    });
  }

  return true;
}