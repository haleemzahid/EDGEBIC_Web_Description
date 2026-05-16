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
    .array(z.string().trim().email('Each recipient must be a valid email.'))
    .min(1, 'At least one recipient is required.')
    .max(50, 'Maximum 50 recipients allowed.'),
  cc: z
    .array(z.string().trim().email('Each Cc must be a valid email.'))
    .max(50, 'Maximum 50 Cc recipients allowed.')
    .default([]),
  bcc: z
    .array(z.string().trim().email('Each Bcc must be a valid email.'))
    .max(50, 'Maximum 50 Bcc recipients allowed.')
    .default([]),
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
