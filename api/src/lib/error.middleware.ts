import { ErrorRequestHandler } from "express";

// Error middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorMiddleware: ErrorRequestHandler = (err, _req, res, next) => {
  // Log error
  console.error(err);

  // Send error
  res.status(500).send("Something went wrong");
};

export default errorMiddleware;
