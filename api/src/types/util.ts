import { ZodIssue } from "zod";

export type ErrorResponse = {
  message: string;
  errors?: string[] | ZodIssue[] | Record<string, unknown>;
};

export type ResBody<T> = T | ErrorResponse;
