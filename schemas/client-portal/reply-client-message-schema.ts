import { z } from 'zod';

import { ticketAttachmentInputSchema } from '@/schemas/client-portal/reply-client-ticket-schema';

export const replyClientMessageSchema = z
  .object({
    threadId: z
      .string({ required_error: 'Thread id is required.' })
      .uuid('Thread id is invalid.'),
    body: z
      .string()
      .trim()
      .max(20000, 'Maximum 20000 characters allowed.')
      .default(''),
    attachments: z.array(ticketAttachmentInputSchema).max(5).default([])
  })
  .refine((data) => data.body.length > 0 || data.attachments.length > 0, {
    message: 'Message or attachment is required.',
    path: ['body']
  });

export type ReplyClientMessageSchema = z.infer<typeof replyClientMessageSchema>;
