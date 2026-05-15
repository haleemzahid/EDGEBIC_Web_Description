import { z } from 'zod';

export const deleteTicketsSchema = z.object({
  ids: z
    .array(
      z
        .string({
          required_error: 'Id is required.',
          invalid_type_error: 'Id must be a string.'
        })
        .trim()
        .uuid('Id is invalid.')
        .max(36, 'Maximum 36 characters allowed.')
    )
    .min(1, 'At least one ticket must be selected.')
    .max(200, 'Cannot delete more than 200 tickets at once.')
});

export type DeleteTicketsSchema = z.infer<typeof deleteTicketsSchema>;
