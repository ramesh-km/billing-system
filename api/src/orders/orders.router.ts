import { Router } from "express";
import zodValidatorMiddleware from "../lib/middleware/zodValidator.middleware";
import { createOrderHandler } from "./create";
import { deleteOrderHandler } from "./delete";
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

ordersRouter.use(
  "/:orderId",
  zodValidatorMiddleware(OrderIdParamSchema, "params")
);

ordersRouter.put<"/:orderId">(
  "/:orderId",
  zodValidatorMiddleware(CreateOrderSchema),
  updateOrderHandler
);

ordersRouter.delete("/:orderId", deleteOrderHandler);

export default ordersRouter;
