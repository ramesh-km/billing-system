import { Customer } from "@prisma/client";
import { RequestHandler } from "express";
import db from "../lib/db";
import { numberSchema } from "../lib/zod-schemas";
import { CustomerIdParam } from "../types/customers";
import { ResBody } from "../types/util";
import { CreateCustomerData } from "./schemas";

const updateCustomerHandler: RequestHandler<
  CustomerIdParam,
  ResBody<Customer>,
  CreateCustomerData
> = async (req, res, next) => {
  const { name, email, phone, address } = req.body;
  const customerId = req.params.customerId;

  try {
    const customer = await db.customer.update({
      where: {
        id: numberSchema.parse(customerId),
      },
      data: {
        name,
        email,
        phone,
        address,
      },
    });

    res.status(200).json(customer);
  } catch (error) {
    next(error);
  }
};

export default updateCustomerHandler;
