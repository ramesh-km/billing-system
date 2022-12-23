import { Router } from "express";
import zodValidatorMiddleware from "../lib/middleware/zodValidator.middleware";
import createCustomerHandler from "./create";
import deleteCustomerHandler from "./delete";
import getCustomerHandler from "./get";
import { getPaginatedCustomersHandler } from "./get-paginated";
import {
  CreateCustomerSchema,
  CustomerIdSchema,
  CustomersSearchSchema,
  GetPaginatedCustomersParamsSchema,
} from "./schemas";
import { searchCustomersHandler } from "./search";
import updateCustomerHandler from "./update";

export const customersRouter = Router({
  mergeParams: true,
});

customersRouter.get(
  "/paginated",
  zodValidatorMiddleware(GetPaginatedCustomersParamsSchema, "query"),
  getPaginatedCustomersHandler
);

customersRouter.get(
  "/search",
  zodValidatorMiddleware(CustomersSearchSchema, "query"),
  searchCustomersHandler
);

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
  .get(getCustomerHandler);

export default customersRouter;
