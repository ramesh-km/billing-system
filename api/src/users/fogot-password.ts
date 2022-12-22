import { RequestHandler } from "express";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const forgotPasswordHandler: RequestHandler = async (req, res, next) => {
  res.json({
    message: "Forgot password not implemented yet",
  });
};
