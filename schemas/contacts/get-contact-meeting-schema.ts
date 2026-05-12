import { z } from 'zod';

export const getContactMeetingSchema = z.object({
  id: z
    .string({
      invalid_type_error: 'Id must be a string.'
    })
    .trim()
    .uuid('Id is invalid.')
    .max(36, 'Maximum 36 characters allowed.')
});

export type GetContactMeetingSchema = z.infer<typeof getContactMeetingSchema>;
