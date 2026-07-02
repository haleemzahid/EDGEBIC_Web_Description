import { z } from 'zod';

import { PASSWORD_RESET_CODE_LENGTH } from '@/constants/limits';

export const verifyPasswordResetCodeSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required.',
      invalid_type_error: 'Email must be a string.'
    })
    .trim()
    .min(1, 'Email is required.')
    .max(255, 'Maximum 255 characters allowed.')
    .email('Enter a valid email address.'),
  code: z
    .string({
      required_error: 'Code is required.',
      invalid_type_error: 'Code must be a string.'
    })
    .trim()
    .regex(
      new RegExp(`^\\d{${PASSWORD_RESET_CODE_LENGTH}}$`),
      `Code must be ${PASSWORD_RESET_CODE_LENGTH} digits.`
    ),
  // Re-checked at verify so the license key is required for the whole flow, not
  // just to request the code.
  licenseKey: z
    .string({
      required_error: 'License key is required.',
      invalid_type_error: 'License key must be a string.'
    })
    .trim()
    .min(1, 'License key is required.')
    .max(128, 'Maximum 128 characters allowed.')
});

export type VerifyPasswordResetCodeSchema = z.infer<
  typeof verifyPasswordResetCodeSchema
>;
