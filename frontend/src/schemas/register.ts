import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .max(30, { message: "Password is to long" })
  .regex(/[a-z]/, { message: "Password must include a lowercase letter" })
  .regex(/[A-Z]/, { message: "Password must include an uppercase letter" })
  .regex(/[0-9]/, { message: "Password must include a number" })
  .regex(/[^A-Za-z0-9]/, {
    message: "Password must include a special character",
  })
  .refine((v) => !/\s/.test(v), {
    message: "Password must not contain spaces",
  });
export const registerSchema = z
  .object({
    name: z.string().min(3, { message: "Write at list 3 symbol" }),
    email: z
      .email({ message: "Write your mail correctly" })
      .trim()
      .toLowerCase()
      .max(100, { message: "Email is to long" }),
    password: passwordSchema,
    confirmPassword: z.string().min(8, { message: "Confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;