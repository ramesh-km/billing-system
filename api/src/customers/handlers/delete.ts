import { Customer } from "@prisma/client";
import { RequestHandler } from "express";
import db from "../../lib/db";
import { numberSchema } from "../../lib/zod-schemas";
import { CustomerIdParam } from "../../types/customers";
import { ResBody } from "../../types/util";

const deleteCustomerHandler: RequestHandler<
  CustomerIdParam,
  ResBody<Customer>
> = async (req, res, next) => {
  try {
    const customer = await db.customer.delete({
      where: {
        id: numberSchema.parse(req.params.customerId),
      },
    });

    res.status(200).json(customer);
  } catch (error) {
    next(error);
  }
};

export default deleteCustomerHandler;
