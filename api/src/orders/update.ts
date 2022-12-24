import { Order } from "@prisma/client";
import { RequestHandler } from "express";
import db from "../lib/db";
import { ResBody } from "../types/util";
import { CreateOrder } from "./schema";

export const updateOrderHandler: RequestHandler<
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

  // Items quantity must be greater than 0 and less than or equal to available quantity in stock
  try {
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
  } catch (error) {
    next(error);
    return;
  }
};
