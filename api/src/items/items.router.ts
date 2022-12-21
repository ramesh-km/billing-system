import { Router } from "express";
import zodValidatorMiddleware from "../lib/middleware/zodValidator.middleware";
import createItemHandler from "./create";
import deleteItemHandler from "./delete";
import getItemHandler from "./get";
import getPaginatedItemsHandler from "./get-paginated";
import {
  CreateItemSchema,
  GetPaginatedItemsParamsSchema,
  ItemIdSchema,
} from "./schemas";
import updateItemHandler from "./update";

export const itemsRouter = Router({
  mergeParams: true,
});

itemsRouter.get(
  "/paginated",
  zodValidatorMiddleware(GetPaginatedItemsParamsSchema),
  getPaginatedItemsHandler
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
