import { Order } from "@prisma/client";
import { RequestHandler } from "express";
import signale from "signale";
import db from "../lib/db";
import { numberSchema } from "../lib/zod-schemas";
import { OrderIdParam } from "../types/orders";
import { ResBody } from "../types/util";
import { CreateOrder } from "./schema";

export const updateOrderHandler: RequestHandler<
  OrderIdParam,
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
    const originalOrder = await db.order.findUnique({
      where: {
        id: numberSchema.parse(req.params.orderId),
      },
      include: {
        items: true,
      },
    });

    if (!originalOrder) {
      res.status(404).json({
        message: "Order not found",
      });
      return;
    }

    // Validate the order item's quantity

    const itemsPicked = await db.item.findMany({
      where: {
        id: {
          in: req.body.orderItems.map((orderItem) => orderItem.itemId),
        },
      },
    });

    const invalidOrderItems = req.body.orderItems.filter(async (orderItem) => {
      // Find the original order item
      const originalOrderItem = originalOrder.items.find(
        (originalOrderItem) => originalOrderItem.itemId === orderItem.itemId
      );

      // If the original order item is found, check if the quantity is valid
      const item = itemsPicked.find((item) => item.id === orderItem.itemId);

      // If the item is not found, it means that the item is invalid
      if (!item) {
        return true;
      }

      const previousQuantity = originalOrderItem?.quantity ?? 0;

      if (
        orderItem.quantity <=
        item.availableQuantity + previousQuantity // Add the original order item's quantity to the available quantity
      ) {
        return true;
      }

      return false;
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

    // Delete order items that are not in the request body and update these items's quantity
    await db.orderItem.deleteMany({
      where: {
        orderId: originalOrder.id,
        itemId: {
          in: originalOrder.items
            .map((orderItem) => orderItem.itemId)
            .filter(
              (itemId) =>
                !req.body.orderItems.find(
                  (orderItem) => orderItem.itemId === itemId
                )
            ),
        },
      },
    });
    await Promise.all(
      originalOrder.items
        .filter(
          (orderItem) =>
            !req.body.orderItems.find(
              (orderItem2) => orderItem2.itemId === orderItem.itemId
            )
        )
        .map(async (orderItem) => {
          const item = itemsPicked.find((item) => item.id === orderItem.itemId);

          if (!item) {
            return;
          }

          await db.item.update({
            where: {
              id: item.id,
            },
            data: {
              availableQuantity: item.availableQuantity + orderItem.quantity,
            },
          });
        })
    );

    // Update order items that are in the request body and create new order items
    await Promise.all(
      req.body.orderItems.map(async (orderItem) => {
        const originalOrderItem = originalOrder.items.find(
          (originalOrderItem) => originalOrderItem.itemId === orderItem.itemId
        );

        // If the original order item is not found, it means that the item is new
        if (!originalOrderItem) {
          await db.orderItem.create({
            data: {
              orderId: originalOrder.id,
              itemId: orderItem.itemId,
              quantity: orderItem.quantity,
            },
          });
          return;
        }

        // If the original order item is found, update the quantity
        await db.orderItem.update({
          where: {
            orderId_itemId: {
              orderId: originalOrder.id,
              itemId: orderItem.itemId,
            },
          },
          data: {
            quantity: orderItem.quantity,
          },
        });
      })
    );
    await Promise.all(
      req.body.orderItems.map(async (orderItem) => {
        const originalOrderItem = originalOrder.items.find(
          (originalOrderItem) => originalOrderItem.itemId === orderItem.itemId
        );

        // If the original order item is not found, it means that the item is new
        if (!originalOrderItem) {
          const item = itemsPicked.find((item) => item.id === orderItem.itemId);

          if (!item) {
            // If the item is not found, it means that the item is not available in database
            return;
          }

          await db.item.update({
            where: {
              id: item.id,
            },
            data: {
              availableQuantity: item.availableQuantity - orderItem.quantity,
            },
          });
        }
        // If the original order item is found, update the quantity
        else {
          const item = itemsPicked.find((item) => item.id === orderItem.itemId);

          if (!item) {
            return;
          }

          await db.item.update({
            where: {
              id: item.id,
            },
            data: {
              availableQuantity:
                item.availableQuantity +
                originalOrderItem.quantity -
                orderItem.quantity,
            },
          });
        }
      })
    );

    // * Update the order
  } catch (error) {
    next(error);
    signale.warn("Failed to update order", error);
    return;
  }
};
