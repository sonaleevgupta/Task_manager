import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(200),
  description: z.string().trim().max(2000).optional().or(z.literal('')),
  status: z.enum(['todo', 'in-progress', 'done'], { required_error: 'Status is required' }),
  priority: z.enum(['low', 'medium', 'high'], { required_error: 'Priority is required' }),
  dueDate: z.string().optional().or(z.literal('')),
});

export type TaskFormData = z.infer<typeof taskSchema>;
