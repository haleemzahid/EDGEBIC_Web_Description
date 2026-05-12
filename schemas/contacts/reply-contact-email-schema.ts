import { z } from 'zod';

export const replyContactEmailSchema = z.object({
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
    .string({
      required_error: 'Message is required.',
      invalid_type_error: 'Message must be a string.'
    })
    .trim()
    .min(1, 'Message is required.')
    .max(20000, 'Maximum 20000 characters allowed.')
});

export type ReplyContactEmailSchema = z.infer<typeof replyContactEmailSchema>;
