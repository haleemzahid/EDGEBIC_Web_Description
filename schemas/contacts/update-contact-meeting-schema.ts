import { ContactMeetingStatus } from '@prisma/client';
import { z } from 'zod';

export const updateContactMeetingSchema = z
  .object({
    id: z
      .string({
        required_error: 'Id is required.',
        invalid_type_error: 'Id must be a string.'
      })
      .trim()
      .uuid('Id is invalid.')
      .min(1, 'Id is required.')
      .max(36, 'Maximum 36 characters allowed.'),
    title: z
      .string({
        required_error: 'Title is required.',
        invalid_type_error: 'Title must be a string.'
      })
      .trim()
      .min(1, 'Title is required.')
      .max(255, 'Maximum 255 characters allowed.'),
    description: z
      .string({
        invalid_type_error: 'Description must be a string.'
      })
      .trim()
      .max(2000, 'Maximum 2000 characters allowed.')
      .optional()
      .or(z.literal('')),
    startsAt: z.coerce.date({
      required_error: 'Start date is required.',
      invalid_type_error: 'Start date must be a valid date.'
    }),
    endsAt: z.coerce.date({
      required_error: 'End date is required.',
      invalid_type_error: 'End date must be a valid date.'
    }),
    location: z
      .string({
        invalid_type_error: 'Location must be a string.'
      })
      .trim()
      .max(255, 'Maximum 255 characters allowed.')
      .optional()
      .or(z.literal('')),
    status: z.nativeEnum(ContactMeetingStatus, {
      invalid_type_error: 'Status must be a valid value'
    })
  })
  .refine((data) => data.endsAt.getTime() > data.startsAt.getTime(), {
    message: 'End time must be after start time.',
    path: ['endsAt']
  });

export type UpdateContactMeetingSchema = z.infer<
  typeof updateContactMeetingSchema
>;
