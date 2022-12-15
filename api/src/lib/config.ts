import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const configSchema = z.object({
  DATABASE_URL: z
    .string()
    .default("postgresql://postgres:postgres@localhost:5432/postgres"),
  PORT: z.string().default("8080"),
  NODE_ENV: z.string().default("development"),
});

export type Config = z.infer<typeof configSchema>;

export default configSchema.parse(process.env);
