import { checkForItemAvailability } from "./check-items-availability";
import { claimOrderItemsQuantity } from "./claim-order-items-quanity";
import { deleteOrder } from "./delete-order";
import { updateOrder } from "./update-order";

export const orderService = {
  updateOrder,
  deleteOrder,
  checkForItemAvailability,
  claimOrderItemsQuantity,
};
