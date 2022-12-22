import { z } from "zod";

export const SignUpDataSchema = z.object({
  email: z
    .string()
    .trim()
    .email()
    .transform((v) => v.toLowerCase()),
  password: z.string().min(8),
  name: z.string().trim().min(1),
});

export type SignUpData = z.infer<typeof SignUpDataSchema>;

export const SignInDataSchema = z.object({
  email: z
    .string()
    .trim()
    .email()
    .transform((v) => v.toLowerCase()),
  password: z.string().min(8),
});

export type SignInData = z.infer<typeof SignInDataSchema>;
