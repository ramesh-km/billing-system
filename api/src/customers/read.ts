import { Customer } from "@prisma/client";
import { RequestHandler } from "express";
import db from "../lib/db";
import { numberSchema } from "../lib/zod-schemas";
import { CustomerIdParam } from "../types/customers";
import { ResBody } from "../types/util";
import createError from "http-errors";

const readCustomerHandler: RequestHandler<
  CustomerIdParam,
  ResBody<Customer>
> = async (req, res, next) => {
  const customer = await db.customer.findUnique({
    where: {
      id: numberSchema.parse(req.params.customerId),
    },
  });

  if (!customer) {
    next(createError(404, "Customer not found"));
    return;
  }

  res.status(200).json(customer);
};

export default readCustomerHandler;
