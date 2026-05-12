import { z } from 'zod';

export const getContactTicketsSchema = z.object({
  contactId: z
    .string({
      invalid_type_error: 'Contact id must be a string.'
    })
    .trim()
    .uuid('Contact id is invalid.')
    .max(36, 'Maximum 36 characters allowed.')
});

export type GetContactTicketsSchema = z.infer<typeof getContactTicketsSchema>;
