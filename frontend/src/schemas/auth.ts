import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().min(1, 'Email is required').email('Invalid email address').max(255),
  password: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters').max(128),
});

export const signupSchema = z
  .object({
    name: z.string().trim().min(1, 'Name is required').max(100),
    email: z.string().trim().min(1, 'Email is required').email('Invalid email address').max(255),
    password: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters').max(128),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
