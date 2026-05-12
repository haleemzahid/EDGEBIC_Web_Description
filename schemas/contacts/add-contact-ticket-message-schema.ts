import { z } from 'zod';

export const addContactTicketMessageSchema = z.object({
  ticketId: z
    .string({
      required_error: 'Ticket id is required.',
      invalid_type_error: 'Ticket id must be a string.'
    })
    .trim()
    .uuid('Ticket id is invalid.')
    .min(1, 'Ticket id is required.')
    .max(36, 'Maximum 36 characters allowed.'),
  body: z
    .string({
      required_error: 'Body is required.',
      invalid_type_error: 'Body must be a string.'
    })
    .trim()
    .min(1, 'Body is required.')
    .max(20000, 'Maximum 20000 characters allowed.'),
  isInternalNote: z
    .boolean({
      invalid_type_error: 'isInternalNote must be a boolean.'
    })
    .default(false)
});

export type AddContactTicketMessageSchema = z.infer<
  typeof addContactTicketMessageSchema
>;
