import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  age: z.number().min(18, 'You must be at least 18'),
});

export type FormValues = z.infer<typeof formSchema>;
