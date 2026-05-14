import { z } from 'zod';

const optionalString = (max: number) =>
  z.string().trim().max(max).optional().or(z.literal(''));

export const updateContactActivitySchema = z.object({
  id: z
    .string({
      required_error: 'Id is required.',
      invalid_type_error: 'Id must be a string.'
    })
    .trim()
    .uuid('Id is invalid.')
    .min(1, 'Id is required.')
    .max(36, 'Maximum 36 characters allowed.'),
  lastContactedAt: z.coerce.date().optional().nullable(),
  lastContactedNote: optionalString(255),
  lastMeetingAt: z.coerce.date().optional().nullable(),
  lastMeetingNote: optionalString(255)
});

export type UpdateContactActivitySchema = z.infer<
  typeof updateContactActivitySchema
>;
