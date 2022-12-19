import { Router } from "express";
import createItemHandler from "./create";
import deleteItemHandler from "./delete";
import readItemHandler from "./read";
import readAllPaginatedHandler from "./read-all-paginated";
import updateItemHandler from "./update";

export const itemsRouter = Router({
  mergeParams: true
});

itemsRouter.get("/paginated", readAllPaginatedHandler);
itemsRouter.route("/").post(createItemHandler);
itemsRouter
  .route("/:itemId")
  .delete(deleteItemHandler)
  .put(updateItemHandler)
  .get(readItemHandler);

export default itemsRouter;
