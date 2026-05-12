import { z } from 'zod';

export const deleteContactSoftwareSchema = z.object({
  id: z
    .string({ required_error: 'Software id is required.' })
    .trim()
    .uuid('Software id is invalid.')
});

export type DeleteContactSoftwareSchema = z.infer<
  typeof deleteContactSoftwareSchema
>;
