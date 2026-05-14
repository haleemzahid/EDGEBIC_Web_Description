import { z } from 'zod';

export const ticketAttachmentInputSchema = z.object({
  storedName: z.string().min(1).max(255),
  fileName: z.string().min(1).max(255),
  mimeType: z.string().min(1).max(255),
  sizeBytes: z.number().int().nonnegative().max(50 * 1024 * 1024)
});

export const replyClientTicketSchema = z
  .object({
    ticketId: z
      .string({ required_error: 'Ticket id is required.' })
      .uuid('Ticket id is invalid.'),
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

export type ReplyClientTicketSchema = z.infer<typeof replyClientTicketSchema>;
