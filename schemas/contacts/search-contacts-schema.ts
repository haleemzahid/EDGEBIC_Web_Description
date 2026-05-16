import { z } from 'zod';

export const searchContactsSchema = z.object({
  query: z
    .string({
      required_error: 'Query is required.',
      invalid_type_error: 'Query must be a string.'
    })
    .trim()
    .min(1, 'Query is required.')
    .max(100, 'Maximum 100 characters allowed.')
});

export type SearchContactsSchema = z.infer<typeof searchContactsSchema>;
