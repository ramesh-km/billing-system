import { RequestHandler } from "express";
import { z } from "zod";
import db from "../lib/db";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

const createCustomerHandler: RequestHandler = (req, res) => {
  // Validate the request body
  const data = schema.parse(req.body);

  // Create the customer
  const customer = db.customer.create({
    data,
  });

  // Return the customer
  res.status(201).json(customer);
};

export default createCustomerHandler;
