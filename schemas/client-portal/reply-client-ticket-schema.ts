import { z } from 'zod';

export const replyClientTicketSchema = z.object({
  ticketId: z
    .string({ required_error: 'Ticket id is required.' })
    .uuid('Ticket id is invalid.'),
  body: z
    .string({ required_error: 'Message is required.' })
    .trim()
    .min(1, 'Message is required.')
    .max(20000, 'Maximum 20000 characters allowed.')
});

export type ReplyClientTicketSchema = z.infer<typeof replyClientTicketSchema>;
