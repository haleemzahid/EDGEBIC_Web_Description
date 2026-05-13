import { z } from 'zod';

export const getContactMeetingFilesSchema = z.object({
  meetingId: z
    .string({
      required_error: 'Meeting id is required.',
      invalid_type_error: 'Meeting id must be a string.'
    })
    .trim()
    .uuid('Meeting id is invalid.')
    .min(1, 'Meeting id is required.')
    .max(36, 'Maximum 36 characters allowed.')
});

export type GetContactMeetingFilesSchema = z.infer<
  typeof getContactMeetingFilesSchema
>;
