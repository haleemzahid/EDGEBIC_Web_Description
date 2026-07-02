import { z } from 'zod';

export const requestPasswordResetCodeSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required.',
      invalid_type_error: 'Email must be a string.'
    })
    .trim()
    .min(1, 'Email is required.')
    .max(255, 'Maximum 255 characters allowed.')
    .email('Enter a valid email address.'),
  // The reset is scoped to a license: a code is only issued when this email is
  // registered under the license with this key (owner / roster / seat).
  licenseKey: z
    .string({
      required_error: 'License key is required.',
      invalid_type_error: 'License key must be a string.'
    })
    .trim()
    .min(1, 'License key is required.')
    .max(128, 'Maximum 128 characters allowed.')
});

export type RequestPasswordResetCodeSchema = z.infer<
  typeof requestPasswordResetCodeSchema
>;
