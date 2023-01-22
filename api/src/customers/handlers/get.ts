import { Customer } from "@prisma/client";
import { RequestHandler } from "express";
import db from "../../lib/db";
import { numberSchema } from "../../lib/zod-schemas";
import { CustomerIdParam } from "../../types/customers";
import { ResBody } from "../../types/util";
import createError from "http-errors";

const getCustomerHandler: RequestHandler<
  CustomerIdParam,
  ResBody<Customer>
> = async (req, res, next) => {
  // Find the customer
  let customer = null;
  try {
    customer = await db.customer.findUnique({
      where: {
        id: numberSchema.parse(req.params.customerId),
      },
    });
  } catch (error) {
    next(error);
  }

  if (!customer) {
    next(createError(404, "Customer not found"));
    return;
  }

  res.status(200).json(customer);
};

export default getCustomerHandler;
