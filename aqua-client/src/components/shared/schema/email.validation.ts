import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const emailSchema = z.object({
  email: z
    .string()
    .min(4)
    .max(50)
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/),
});

export const emailSchemaResolver = zodResolver(emailSchema);
export type TEmailSchema = z.infer<typeof emailSchema>;
