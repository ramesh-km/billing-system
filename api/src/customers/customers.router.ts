import { Router } from "express";
import zodValidatorMiddleware from "../lib/middleware/zodValidator.middleware";
import createCustomerHandler from "./handlers/create";
import deleteCustomerHandler from "./handlers/delete";
import getCustomerHandler from "./handlers/get";
import { getPaginatedCustomersHandler } from "./handlers/get-paginated";
import {
  CreateCustomerSchema,
  CustomerIdSchema,
  CustomersSearchSchema,
  GetPaginatedCustomersParamsSchema,
} from "./schemas";
import { searchCustomersHandler } from "./handlers/search";
import updateCustomerHandler from "./handlers/update";

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
