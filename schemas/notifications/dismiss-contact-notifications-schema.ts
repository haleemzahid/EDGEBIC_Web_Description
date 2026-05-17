import { z } from 'zod';

export const dismissContactNotificationsSchema = z.object({
  contactId: z
    .string({
      required_error: 'Contact id is required.',
      invalid_type_error: 'Contact id must be a string.'
    })
    .trim()
    .uuid('Contact id is invalid.')
    .min(1, 'Contact id is required.')
    .max(36, 'Maximum 36 characters allowed.'),
  // When set, only this activity type's badge is cleared; otherwise all
  // activity for the contact is cleared.
  type: z.string().trim().max(32).optional()
});

export type DismissContactNotificationsSchema = z.infer<
  typeof dismissContactNotificationsSchema
>;
