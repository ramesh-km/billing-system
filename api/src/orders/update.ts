import { Order } from "@prisma/client";
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import { ItemIdSchema } from "../items/schemas";
import { getDuplicates } from "../lib/arrays";
import db from "../lib/db";
import { OrderIdParam } from "../types/orders";
import { ResBody } from "../types/util";
import { CreateOrder } from "./schema";
import { orderService } from "./services";

export const updateOrderHandler: RequestHandler<
  OrderIdParam,
  ResBody<{
    orderId: Order["id"];
  }>,
  CreateOrder
> = async (req, res, next) => {
  const updateData = req.body;

  // order items should not have duplicates
  const duplicateOrderItems = getDuplicates(updateData.orderItems, "itemId");
  if (duplicateOrderItems.length > 0) {
    throw createHttpError(400, "Duplicate items exist", duplicateOrderItems);
  }

  const existingOrder = await db.order.findUnique({
    where: {
      id: ItemIdSchema.parse(req.params).itemId,
    },
    include: {
      items: true,
    },
  });
  if (!existingOrder) {
    throw createHttpError(404, "No order found with given id", req.params);
  }

  // update order
  try {
    await db.$transaction(async (tx) => {
      await orderService.claimOrderItemsQuantity(
        existingOrder.id,
        existingOrder.items,
        tx
      );

      await Promise.all(
        updateData.orderItems.map((orderItem) =>
          orderService.checkForItemAvailability(
            orderItem.itemId,
            orderItem.quantity,
            true,
            tx
          )
        )
      );

      const updatedOrder = await orderService.updateOrder(existingOrder.id, {
        customer: {
          connect: {
            id: updateData.customerId,
          },
        },
        items: {
          create: updateData.orderItems,
        },
      });
      return updatedOrder;
    });
  } catch (error) {
    next(error);
  }

  res
    .json({
      orderId: existingOrder.id,
    })
    .end();
};
