import { Router } from "express";
import createItemHandler from "./create";
import deleteItemHandler from "./delete";
import readItemHandler from "./read";
import updateItemHandler from "./update";

export const itemsRouter = Router();

itemsRouter.get("/paginated");
itemsRouter.route("/").post(createItemHandler);
itemsRouter
  .route("/:itemId")
  .delete(deleteItemHandler)
  .put(updateItemHandler)
  .get(readItemHandler);

export default itemsRouter;
