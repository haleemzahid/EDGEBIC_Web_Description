import { z } from 'zod';

export const getContactTicketSchema = z.object({
  id: z
    .string({
      invalid_type_error: 'Id must be a string.'
    })
    .trim()
    .uuid('Id is invalid.')
    .max(36, 'Maximum 36 characters allowed.'),
  contactId: z
    .string({
      invalid_type_error: 'Contact id must be a string.'
    })
    .trim()
    .uuid('Contact id is invalid.')
    .max(36, 'Maximum 36 characters allowed.')
});

export type GetContactTicketSchema = z.infer<typeof getContactTicketSchema>;
