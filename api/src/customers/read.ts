import { RequestHandler } from "express";

const readCustomerHandler: RequestHandler = async (req, res) => {
  return res.json({
    message: "Not implemented",
  });
};

export default readCustomerHandler;
