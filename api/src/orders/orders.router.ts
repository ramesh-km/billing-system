import { Router } from "express";
import zodValidatorMiddleware from "../lib/middleware/zodValidator.middleware";
import { createOrderHandler } from "./create";
import { CreateOrderSchema, OrderIdParamSchema } from "./schema";
import { updateOrderHandler } from "./update";

const ordersRouter = Router({
  mergeParams: true,
});

ordersRouter.post(
  "/",
  zodValidatorMiddleware(CreateOrderSchema),
  createOrderHandler
);

ordersRouter.put(
  "/:orderId",
  zodValidatorMiddleware(OrderIdParamSchema, "params"),
  zodValidatorMiddleware(CreateOrderSchema),
  updateOrderHandler
);

export default ordersRouter;
