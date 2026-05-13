import { z } from 'zod';

export const composeClientMessageSchema = z.object({
  subject: z
    .string({ required_error: 'Subject is required.' })
    .trim()
    .min(1, 'Subject is required.')
    .max(500, 'Maximum 500 characters allowed.'),
  body: z
    .string({ required_error: 'Message is required.' })
    .trim()
    .min(1, 'Message is required.')
    .max(20000, 'Maximum 20000 characters allowed.')
});

export type ComposeClientMessageSchema = z.infer<
  typeof composeClientMessageSchema
>;
