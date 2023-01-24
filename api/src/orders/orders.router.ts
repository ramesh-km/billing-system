import { Router } from "express";
import zodValidatorMiddleware from "../lib/middleware/zodValidator.middleware";
import { createOrderHandler } from "./handlers/create";
import { deleteOrderHandler } from "./handlers/delete";
import getPaginatedOrdersHandler from "./handlers/get-paginated";
import { updateOrderHandler } from "./handlers/update";
import {
  CreateOrderSchema,
  GetPaginatedOrdersQuerySchema,
  OrderIdParamSchema,
} from "./schema";

const ordersRouter = Router({
  mergeParams: true,
});

ordersRouter.post(
  "/",
  zodValidatorMiddleware(CreateOrderSchema),
  createOrderHandler
);

ordersRouter.get(
  "/paginated",
  zodValidatorMiddleware(GetPaginatedOrdersQuerySchema, "query"),
  getPaginatedOrdersHandler
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
