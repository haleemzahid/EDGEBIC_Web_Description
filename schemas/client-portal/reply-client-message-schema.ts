import { z } from 'zod';

export const replyClientMessageSchema = z.object({
  threadId: z
    .string({ required_error: 'Thread id is required.' })
    .uuid('Thread id is invalid.'),
  body: z
    .string({ required_error: 'Message is required.' })
    .trim()
    .min(1, 'Message is required.')
    .max(20000, 'Maximum 20000 characters allowed.')
});

export type ReplyClientMessageSchema = z.infer<typeof replyClientMessageSchema>;
