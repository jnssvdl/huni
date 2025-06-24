import z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }),
});

export const registerSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8, { message: "Min 8 chars" }),
  username: z
    .string()
    .min(3, { message: "Min 3 chars" })
    .max(30, { message: "Max 30 chars" })
    .regex(/^[a-zA-Z0-9_]+$/, { message: "Invalid format" }),
});
