import { z } from 'zod';

export const addLicenseSchema = z.object({
  customerName: z
    .string({ required_error: 'Select a contact.' })
    .trim()
    .min(1, 'Select a contact from CRM.')
    .max(255, 'Maximum 255 characters allowed.'),
  email: z
    .string({ required_error: 'Select a contact.' })
    .trim()
    .min(1, 'Select a contact from CRM.')
    .email('The selected contact has an invalid email.')
    .max(255, 'Maximum 255 characters allowed.'),
  licenseKey: z
    .string({ required_error: 'License key is required.' })
    .trim()
    .min(1, 'License key is required.')
    .max(255, 'Maximum 255 characters allowed.')
});

export type AddLicenseSchema = z.infer<typeof addLicenseSchema>;
