import { Order } from "@prisma/client";
import { RequestHandler } from "express";
import db from "../lib/db";
import { ResBody } from "../types/util";
import { CreateOrder } from "./schema";

export const createOrderHandler: RequestHandler<
  unknown,
  ResBody<{
    orderId: Order["id"];
  }>,
  CreateOrder
> = async (req, res, next) => {
  // * Validate the request body

  // Duplicate items are not allowed
  const duplicateItems = req.body.orderItems.filter(
    (orderItem, index, orderItems) =>
      orderItems.findIndex(
        (orderItem2) => orderItem2.itemId === orderItem.itemId
      ) !== index
  );
  if (duplicateItems.length > 0) {
    res.status(400).json({
      message: "Duplicate items",
      errors: duplicateItems.map(
        (duplicateItem) => `${duplicateItem.itemId}: Duplicate item`
      ),
    });
    return;
  }

  // * Create the order
  let order: Order;
  try {
    // Items quantity must be greater than 0 and less than or equal to available quantity in stock
    const items = await db.item.findMany({
      where: {
        id: {
          in: req.body.orderItems.map((orderItem) => orderItem.itemId),
        },
      },
    });

    const itemsMap = new Map(items.map((item) => [item.id, item]));
    const invalidOrderItems = req.body.orderItems.filter((orderItem) => {
      const item = itemsMap.get(orderItem.itemId);
      if (!item) return true;
      return (
        item.availableQuantity < orderItem.quantity ||
        orderItem.quantity <= 0 ||
        item.availableQuantity <= 0
      );
    });

    if (invalidOrderItems.length > 0) {
      res.status(400).json({
        message: "Invalid items",
        errors: invalidOrderItems.map(
          (invalidOrderItem) =>
            `${invalidOrderItem.itemId}: Invalid quantity ${invalidOrderItem.quantity}`
        ),
      });
      return;
    }

    // Create the order
    order = await db.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          customerId: req.body.customerId,
          items: {
            createMany: {
              data: req.body.orderItems.map((orderItem) => ({
                itemId: orderItem.itemId,
                quantity: orderItem.quantity,
              })),
              skipDuplicates: true,
            },
          },
        },
      });

      // Update the item's available quantity
      await Promise.all(
        req.body.orderItems.map(async (orderItem) => {
          await tx.item.update({
            where: {
              id: orderItem.itemId,
            },
            data: {
              availableQuantity: {
                decrement: orderItem.quantity,
              },
            },
          });
        })
      );

      return order;
    });
  } catch (error) {
    next(error);
    return;
  }

  res.json({
    orderId: order.id,
  });
};
