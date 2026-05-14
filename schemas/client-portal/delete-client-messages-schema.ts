import { z } from 'zod';

export const deleteClientMessagesSchema = z.object({
  ids: z
    .array(z.string().trim().uuid('Id is invalid.').max(36))
    .min(1, 'At least one id is required.')
    .max(50, 'Maximum 50 messages per delete request.')
});

export type DeleteClientMessagesSchema = z.infer<
  typeof deleteClientMessagesSchema
>;
