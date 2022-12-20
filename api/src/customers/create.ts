import { RequestHandler } from "express";
import signale from "signale";
import { z } from "zod";
import db from "../lib/db";

const schema = z.object({
  name: z.string().min(1).max(50),
  email: z.string().email().max(50).optional(),
  phone: z.string().min(9).max(20).optional(),
  address: z.string().min(1).max(100).optional(),
});

const createCustomerHandler: RequestHandler = async (req, res) => {
  // Validate the request body
  const zodResult = schema.safeParse(req.body);

  if (!zodResult.success) {
    return res.status(400).json({
      message: "Invalid request body",
      errors: zodResult.error.issues,
    });
  }

  // Check if the customer already exists
  const customerExists = await db.customer.findFirst({
    where: {
      OR: [
        {
          email: zodResult.data.email,
        },
        {
          phone: zodResult.data.phone,
        },
      ],
    },
  });
  if (customerExists) {
    return res.status(400).json({ error: "Customer already exists" });
  }

  // Create the customer
  let customer = null;
  try {
    customer = await db.customer.create({
      data: zodResult.data,
    });
  } catch (error) {
    signale.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }

  // Return the customer
  res.status(201).json(customer);
};

export default createCustomerHandler;
