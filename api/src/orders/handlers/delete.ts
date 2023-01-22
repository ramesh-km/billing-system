import { Order } from "@prisma/client";
import { RequestHandler } from "express";
import { OrderIdParam } from "../../types/orders";
import { ResBody } from "../../types/util";
import { OrderIdParamSchema } from "../schema";
import { orderService } from "../services";

export const deleteOrderHandler: RequestHandler<
  OrderIdParam,
  ResBody<Order>
> = async (req, res, next) => {
  try {
    const order = await orderService.deleteOrder(
      OrderIdParamSchema.parse(req.params).orderId
    );
    res.json(order);
  } catch (error) {
    next(error);
  }
};
