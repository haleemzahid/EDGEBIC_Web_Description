import { z } from 'zod';

export const MAX_MEETING_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export const uploadContactMeetingFileSchema = z.object({
  meetingId: z
    .string({
      required_error: 'Meeting id is required.',
      invalid_type_error: 'Meeting id must be a string.'
    })
    .trim()
    .uuid('Meeting id is invalid.')
    .min(1, 'Meeting id is required.')
    .max(36, 'Maximum 36 characters allowed.'),
  name: z
    .string({
      required_error: 'File name is required.',
      invalid_type_error: 'File name must be a string.'
    })
    .trim()
    .min(1, 'File name is required.')
    .max(500, 'Maximum 500 characters allowed.'),
  contentType: z
    .string({
      required_error: 'Content type is required.',
      invalid_type_error: 'Content type must be a string.'
    })
    .trim()
    .min(1, 'Content type is required.')
    .max(255, 'Maximum 255 characters allowed.'),
  size: z
    .number({
      required_error: 'Size is required.',
      invalid_type_error: 'Size must be a number.'
    })
    .int()
    .positive()
    .max(MAX_MEETING_FILE_SIZE, 'File is too large (max 10 MB).'),
  dataBase64: z
    .string({
      required_error: 'File data is required.',
      invalid_type_error: 'File data must be a string.'
    })
    .min(1, 'File data is required.')
});

export type UploadContactMeetingFileSchema = z.infer<
  typeof uploadContactMeetingFileSchema
>;
