
import { Router } from "express";
import createCustomerHandler from "./create";

export const customersRouter = Router({
mergeParams: true,
});

customersRouter.post('/', createCustomerHandler);

export default customersRouter;