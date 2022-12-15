
import { Router } from "express";
import createCustomerHandler from "./create";

export const customersRouter = Router();

customersRouter.post('/', createCustomerHandler);

export default customersRouter;