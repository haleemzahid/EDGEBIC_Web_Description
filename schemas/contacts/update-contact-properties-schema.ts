import { ContactRecord } from '@prisma/client';
import { z } from 'zod';

const optionalString = (max: number) =>
  z.string().trim().max(max).optional().or(z.literal(''));

const optionalUrl = z
  .string()
  .trim()
  .max(2048)
  .url('Enter a valid URL.')
  .optional()
  .or(z.literal(''));

export const updateContactPropertiesSchema = z.object({
  id: z
    .string({
      required_error: 'Id is required.',
      invalid_type_error: 'Id must be a string.'
    })
    .trim()
    .uuid('Id is invalid.')
    .min(1, 'Id is required.')
    .max(36, 'Maximum 36 characters allowed.'),
  record: z.nativeEnum(ContactRecord, {
    required_error: 'Record is required',
    invalid_type_error: 'Record must be a string'
  }),
  name: z
    .string({
      required_error: 'Name is required.',
      invalid_type_error: 'Name must be a string.'
    })
    .trim()
    .min(1, 'Name is required.')
    .max(64, 'Maximum 64 characters allowed.'),
  email: z
    .string({ invalid_type_error: 'Email must be a string.' })
    .trim()
    .max(255, 'Maximum 255 characters allowed.')
    .email('Enter a valid email address.')
    .optional()
    .or(z.literal('')),
  phone: z
    .string({ invalid_type_error: 'Phone must be a string.' })
    .trim()
    .max(16, 'Maximum 16 characters allowed.')
    .optional()
    .or(z.literal('')),
  address: optionalString(255),
  jobTitle: optionalString(128),
  company: optionalString(255),
  website: optionalUrl,
  linkedIn: optionalUrl,
  country: optionalString(128),
  timezone: optionalString(64),
  leadSource: optionalString(255),
  leadSourceDate: z.coerce.date().optional().nullable(),
  stripeCustomerId: optionalString(255),
  lastContactedAt: z.coerce.date().optional().nullable(),
  lastContactedNote: optionalString(255),
  lastMeetingAt: z.coerce.date().optional().nullable(),
  lastMeetingNote: optionalString(255)
});

export type UpdateContactPropertiesSchema = z.infer<
  typeof updateContactPropertiesSchema
>;
