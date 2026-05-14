import { z } from 'zod';

import { ticketAttachmentInputSchema } from '@/schemas/client-portal/reply-client-ticket-schema';

export const replyContactEmailSchema = z
  .object({
    threadId: z
      .string({
        required_error: 'Thread id is required.',
        invalid_type_error: 'Thread id must be a string.'
      })
      .trim()
      .uuid('Thread id is invalid.')
      .min(1, 'Thread id is required.')
      .max(36, 'Maximum 36 characters allowed.'),
    body: z
      .string({ invalid_type_error: 'Message must be a string.' })
      .trim()
      .max(20000, 'Maximum 20000 characters allowed.')
      .default(''),
    attachments: z.array(ticketAttachmentInputSchema).max(5).default([])
  })
  .refine((data) => data.body.length > 0 || data.attachments.length > 0, {
    message: 'Message or attachment is required.',
    path: ['body']
  });

export type ReplyContactEmailSchema = z.infer<typeof replyContactEmailSchema>;
