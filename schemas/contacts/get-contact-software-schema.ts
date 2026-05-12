import { z } from 'zod';

export const getContactSoftwareSchema = z.object({
  contactId: z
    .string({ required_error: 'Contact id is required.' })
    .trim()
    .uuid('Contact id is invalid.')
});

export type GetContactSoftwareSchema = z.infer<typeof getContactSoftwareSchema>;
