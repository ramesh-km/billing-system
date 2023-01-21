import { checkForItemAvailability } from "./check-items-availability";
import { claimOrderItemsQuantity } from "./claim-order-items-quanity";
import { updateOrder } from "./services";

export const orderService = {
  updateOrder,
  checkForItemAvailability,
  claimOrderItemsQuantity,
};
