import { Router } from "express";
import zodValidatorMiddleware from "../lib/middleware/zodValidator.middleware";
import createCustomerHandler from "./create";
import deleteCustomerHandler from "./delete";
import readCustomerHandler from "./read";
import { CreateCustomerSchema, CustomerIdSchema } from "./schemas";
import updateCustomerHandler from "./update";

export const customersRouter = Router({
  mergeParams: true,
});

customersRouter.post(
  "/",
  zodValidatorMiddleware(CreateCustomerSchema),
  createCustomerHandler
);

customersRouter
  .route("/:customerId")
  .all(zodValidatorMiddleware(CustomerIdSchema, "params"))
  .put(zodValidatorMiddleware(CreateCustomerSchema), updateCustomerHandler)
  .delete(deleteCustomerHandler)
  .get(readCustomerHandler);

export default customersRouter;
