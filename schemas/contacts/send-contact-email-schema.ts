import { z } from 'zod';

import { ticketAttachmentInputSchema } from '@/schemas/client-portal/reply-client-ticket-schema';

export const sendContactEmailSchema = z.object({
  contactId: z
    .string({
      required_error: 'Contact id is required.',
      invalid_type_error: 'Contact id must be a string.'
    })
    .trim()
    .uuid('Contact id is invalid.')
    .min(1, 'Contact id is required.')
    .max(36, 'Maximum 36 characters allowed.'),
  to: z
    .string({
      required_error: 'Recipient is required.',
      invalid_type_error: 'Recipient must be a string.'
    })
    .trim()
    .email('Recipient must be a valid email.')
    .max(255, 'Maximum 255 characters allowed.'),
  subject: z
    .string({
      required_error: 'Subject is required.',
      invalid_type_error: 'Subject must be a string.'
    })
    .trim()
    .min(1, 'Subject is required.')
    .max(500, 'Maximum 500 characters allowed.'),
  body: z
    .string({
      required_error: 'Message is required.',
      invalid_type_error: 'Message must be a string.'
    })
    .trim()
    .min(1, 'Message is required.')
    .max(20000, 'Maximum 20000 characters allowed.'),
  attachments: z.array(ticketAttachmentInputSchema).max(5).default([])
});

export type SendContactEmailSchema = z.infer<typeof sendContactEmailSchema>;
