import { Router } from "express";
import zodValidatorMiddleware from "../lib/middleware/zodValidator.middleware";
import createItemHandler from "./create";
import deleteItemHandler from "./delete";
import getItemHandler from "./get";
import getPaginatedItemsHandler from "./get-paginated";
import {
  CreateItemSchema,
  type GetPaginatedItemsQuery,
  GetPaginatedItemsQuerySchema,
  ItemIdSchema,
  ItemsSearchSchema,
} from "./schemas";
import { searchItemsHandler } from "./search";
import updateItemHandler from "./update";

export const itemsRouter = Router({
  mergeParams: true,
});

itemsRouter.get<
  "/paginated",
  unknown,
  unknown,
  unknown,
  GetPaginatedItemsQuery
>(
  "/paginated",
  zodValidatorMiddleware(GetPaginatedItemsQuerySchema, "query"),
  getPaginatedItemsHandler
);

itemsRouter.get(
  "/search",
  zodValidatorMiddleware(ItemsSearchSchema, "query"),
  searchItemsHandler
);

itemsRouter
  .route("/")
  .post(zodValidatorMiddleware(CreateItemSchema), createItemHandler);

itemsRouter
  .route("/:itemId")
  .all(zodValidatorMiddleware(ItemIdSchema, "params"))
  .delete(deleteItemHandler)
  .put(zodValidatorMiddleware(CreateItemSchema), updateItemHandler)
  .get(getItemHandler);

export default itemsRouter;
