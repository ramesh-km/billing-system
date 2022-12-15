import { z } from "zod";

export const numberSchema = z.preprocess(
  (value) => parseInt(String(value)),
  z.number().min(1)
);
