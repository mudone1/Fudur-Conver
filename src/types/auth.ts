import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Use at least 8 characters"),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(8, "Use at least 8 characters"),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
