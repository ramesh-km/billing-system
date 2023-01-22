import { Customer } from "@prisma/client";
import { RequestHandler } from "express";
import db from "../../lib/db";
import { ResBody } from "../../types/util";
import { CreateCustomerData } from "../schemas";

const createCustomerHandler: RequestHandler<
  unknown,
  ResBody<Customer>,
  CreateCustomerData
> = async (req, res, next) => {
  // Create the customer
  try {
    const customer = await db.customer.create({
      data: req.body,
    });
    return res.status(201).json(customer);
  } catch (error) {
    next(error);
  }
};

export default createCustomerHandler;
