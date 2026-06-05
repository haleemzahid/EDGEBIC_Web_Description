import { z } from 'zod';

export const addLicenseSchema = z.object({
  email: z
    .string({ required_error: 'Email is required.' })
    .trim()
    .min(1, 'Email is required.')
    .email('Enter a valid email address.')
    .max(255, 'Maximum 255 characters allowed.'),
  // Optional now — leave blank to auto-generate an NTCB key.
  licenseKey: z
    .string()
    .trim()
    .max(255, 'Maximum 255 characters allowed.')
    .optional(),
  // Device cap for this key (1 = single machine). The Add-license form seeds
  // this to 1 via defaultValues; kept required (no zod .default) so the form's
  // input and output types match and react-hook-form types cleanly.
  seats: z.coerce
    .number({ invalid_type_error: 'Seats must be a number.' })
    .int('Seats must be a whole number.')
    .min(1, 'At least 1 seat is required.')
    .max(10000, 'Maximum 10000 seats.')
});

export type AddLicenseSchema = z.infer<typeof addLicenseSchema>;
