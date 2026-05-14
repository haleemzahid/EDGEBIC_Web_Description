import { z } from 'zod';

import { ticketAttachmentInputSchema } from '@/schemas/client-portal/reply-client-ticket-schema';

export const addContactTicketMessageSchema = z
  .object({
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
        invalid_type_error: 'Body must be a string.'
      })
      .trim()
      .max(20000, 'Maximum 20000 characters allowed.')
      .default(''),
    isInternalNote: z
      .boolean({
        invalid_type_error: 'isInternalNote must be a boolean.'
      })
      .default(false),
    attachments: z.array(ticketAttachmentInputSchema).max(5).default([])
  })
  .refine((data) => data.body.length > 0 || data.attachments.length > 0, {
    message: 'Body or attachment is required.',
    path: ['body']
  });

export type AddContactTicketMessageSchema = z.infer<
  typeof addContactTicketMessageSchema
>;
