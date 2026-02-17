import { REGEX } from "@/constants/generalConsts";
import { z } from "zod";

// Login Schema
export const loginSchema = z.object({
  email: z.string().regex(REGEX.email, "Please enter a valid email address"),
  password: z
    .string()
    .regex(
      REGEX.password,
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),
});

export type LoginSchema = z.infer<typeof loginSchema>;

// Signup Schema
export const signupSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters long")
      .max(20, "Username must be at most 20 characters long")
      .regex(
        REGEX.username,
        "Username can only contain letters, numbers, and underscores",
      )
      .toLowerCase()
      .trim(),
    email: z.string().regex(REGEX.email, "Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .refine((val) => /[A-Z]/.test(val), {
        message: "Must contain at least one uppercase letter",
      })
      .refine((val) => /[a-z]/.test(val), {
        message: "Must contain at least one lowercase letter",
      })
      .refine((val) => /\d/.test(val), {
        message: "Must contain at least one number",
      })
      .refine((val) => /[@$!%*?&]/.test(val), {
        message: "Must contain at least one special character",
      }),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupSchema = z.infer<typeof signupSchema>;
