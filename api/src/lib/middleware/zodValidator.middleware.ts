import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const zodValidatorMiddleware = (
  schema: z.ZodSchema,
  reqPart: "query" | "params" | "body" = "body"
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const zodResult = schema.safeParse(req[reqPart]);

    if (!zodResult.success) {
      return res.status(400).json({
        message: "Invalid request body",
        errors: zodResult.error.issues,
      });
    }

    next();
  };
};

export default zodValidatorMiddleware;
