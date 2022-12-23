import { Prisma } from "@prisma/client";
import { ErrorRequestHandler } from "express";
import { ErrorResponse } from "../../types/util";
import createError from "http-errors";
import { UnauthorizedError } from "express-jwt";

// Error middleware
const errorMiddleware: ErrorRequestHandler<unknown, ErrorResponse> = (
  error,
  _req,
  res,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next
) => {
  // Log error
  console.error(error);

  if (error instanceof UnauthorizedError) {
    return res.status(401).json({
      message: "Unauthorized request",
    });
  }

  // Prisma error
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Unique constraint error
    if (error.code === "P2002") {
      return res.status(400).json({
        message: Array.isArray(error.meta?.target)
          ? `Duplicate ${error.meta?.target[0]} exists`
          : "Duplicate record exists",
        errors: error.meta,
      });
    }

    // Not found error
    if (error.code === "P2025") {
      return res.status(404).json({
        message: "Record not found",
        errors: error.meta,
      });
    }

    // Foreign key constraint error
    if (error.code === "P2003") {
      return res.status(400).json({
        message: "Invalid foreign key",
        errors: error.meta,
      });
    }

    // Default error
    return res.status(400).json({
      message: "Bad request",
      errors: error.meta,
    });
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({
      message: "Validation error",
      errors: [error.name],
    });
  }

  // Http error
  if (error instanceof createError.HttpError) {
    return res.status(error.status).json({
      message: error.message,
      errors: error.expose ? error : undefined,
    });
  }

  // Send error
  res.status(500).send({
    message: "Internal server error",
  });
};

export default errorMiddleware;
