import { z } from 'zod';

export const formSchema = z.object({
  firstname: z.string().min(1, 'First Name is required'),
  secondname: z.string().min(2, 'Second Name is required'),
  email: z.string().email('Invalid email address'),
});

export type FormValues = z.infer<typeof formSchema>;