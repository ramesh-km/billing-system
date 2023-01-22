import { Router } from "express";
import zodValidatorMiddleware from "../lib/middleware/zodValidator.middleware";
import { createOrderHandler } from "./handlers/create";
import { deleteOrderHandler } from "./handlers/delete";
import { updateOrderHandler } from "./handlers/update";
import { CreateOrderSchema, OrderIdParamSchema } from "./schema";

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
