import { Router } from "express";
import zodValidatorMiddleware from "../lib/middleware/zodValidator.middleware";
import { createOrderHandler } from "./create";
import { CreateOrderSchema } from "./schema";

const ordersRouter = Router({
  mergeParams: true,
});

ordersRouter.post(
  "/",
  zodValidatorMiddleware(CreateOrderSchema),
  createOrderHandler
);

export default ordersRouter;
