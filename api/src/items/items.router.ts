import { Router } from "express";
import zodValidatorMiddleware from "../lib/middleware/zodValidator.middleware";
import createItemHandler from "./handlers/create";
import deleteItemHandler from "./handlers/delete";
import getItemHandler from "./handlers/get";
import getPaginatedItemsHandler from "./handlers/get-paginated";
import {
  CreateItemSchema,
  type GetPaginatedItemsQuery,
  GetPaginatedItemsQuerySchema,
  ItemIdSchema,
  ItemsSearchSchema,
} from "./schemas";
import { searchItemsHandler } from "./handlers/search";
import updateItemHandler from "./handlers/update";

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
