import { SoftwareStatus } from '@prisma/client';
import { z } from 'zod';

export const updateContactSoftwareSchema = z.object({
  id: z
    .string({ required_error: 'Software id is required.' })
    .trim()
    .uuid('Software id is invalid.'),
  name: z
    .string({ required_error: 'Product name is required.' })
    .trim()
    .min(1, 'Product name is required.')
    .max(255, 'Maximum 255 characters allowed.'),
  installedVersion: z
    .string()
    .trim()
    .max(32)
    .optional()
    .or(z.literal('')),
  latestVersion: z
    .string()
    .trim()
    .max(32)
    .optional()
    .or(z.literal('')),
  installDate: z.coerce.date().optional().nullable(),
  status: z.nativeEnum(SoftwareStatus).default(SoftwareStatus.UP_TO_DATE),
  githubUrl: z
    .string()
    .trim()
    .url('Must be a valid URL.')
    .max(2048)
    .optional()
    .or(z.literal('')),
  docsUrl: z
    .string()
    .trim()
    .url('Must be a valid URL.')
    .max(2048)
    .optional()
    .or(z.literal('')),
  downloadUrl: z
    .string()
    .trim()
    .url('Must be a valid URL.')
    .max(2048)
    .optional()
    .or(z.literal('')),
  licenseKey: z.string().trim().max(255).optional().or(z.literal('')),
  licenseType: z.string().trim().max(128).optional().or(z.literal('')),
  seats: z.coerce.number().int().positive().optional().nullable(),
  os: z.string().trim().max(128).optional().or(z.literal('')),
  database: z.string().trim().max(128).optional().or(z.literal('')),
  installPath: z.string().trim().max(512).optional().or(z.literal('')),
  notes: z.string().trim().max(8000).optional().or(z.literal(''))
});

export type UpdateContactSoftwareSchema = z.infer<
  typeof updateContactSoftwareSchema
>;
