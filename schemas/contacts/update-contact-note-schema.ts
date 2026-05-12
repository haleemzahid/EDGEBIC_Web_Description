import { ContactPriority } from '@prisma/client';
import { z } from 'zod';

export const updateContactNoteSchema = z.object({
  id: z
    .string({
      required_error: 'Id is required.',
      invalid_type_error: 'Id must be a string.'
    })
    .trim()
    .uuid('Id is invalid.')
    .min(1, 'Id is required.')
    .max(36, 'Maximum 36 characters allowed.'),
  text: z
    .string({
      required_error: 'Text is required.',
      invalid_type_error: 'Text must be a string.'
    })
    .trim()
    .min(1, 'Text is required.')
    .max(8000, 'Maximum 8000 characters allowed.'),
  priority: z.nativeEnum(ContactPriority, {
    invalid_type_error: 'Priority must be a valid value'
  }),
  pinned: z
    .boolean({
      invalid_type_error: 'Pinned must be a boolean.'
    })
    .optional(),
  meetingId: z
    .string({
      invalid_type_error: 'Meeting id must be a string.'
    })
    .trim()
    .uuid('Meeting id is invalid.')
    .max(36, 'Maximum 36 characters allowed.')
    .optional()
    .or(z.literal(''))
    .nullable()
});

export type UpdateContactNoteSchema = z.infer<typeof updateContactNoteSchema>;
