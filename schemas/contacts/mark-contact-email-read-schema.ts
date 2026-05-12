import { z } from 'zod';

export const markContactEmailReadSchema = z.object({
  threadId: z
    .string({
      required_error: 'Thread id is required.',
      invalid_type_error: 'Thread id must be a string.'
    })
    .trim()
    .uuid('Thread id is invalid.')
    .min(1, 'Thread id is required.')
    .max(36, 'Maximum 36 characters allowed.')
});

export type MarkContactEmailReadSchema = z.infer<
  typeof markContactEmailReadSchema
>;
