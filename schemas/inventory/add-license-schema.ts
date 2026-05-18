import { z } from 'zod';

export const addLicenseSchema = z.object({
  email: z
    .string({ required_error: 'Email is required.' })
    .trim()
    .min(1, 'Email is required.')
    .email('Enter a valid email address.')
    .max(255, 'Maximum 255 characters allowed.'),
  licenseKey: z
    .string({ required_error: 'License key is required.' })
    .trim()
    .min(1, 'License key is required.')
    .max(255, 'Maximum 255 characters allowed.')
});

export type AddLicenseSchema = z.infer<typeof addLicenseSchema>;
