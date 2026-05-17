import { z } from 'zod';

export const updateClientTicketSchema = z.object({
  ticketId: z.string().uuid(),
  title: z
    .string({
      required_error: 'Title is required.',
      invalid_type_error: 'Title must be a string.'
    })
    .trim()
    .min(1, 'Title is required.')
    .max(255, 'Maximum 255 characters allowed.'),
  description: z
    .string({ invalid_type_error: 'Description must be a string.' })
    .trim()
    .max(8000, 'Maximum 8000 characters allowed.')
    .optional()
    .or(z.literal(''))
});

export type UpdateClientTicketSchema = z.infer<
  typeof updateClientTicketSchema
>;
