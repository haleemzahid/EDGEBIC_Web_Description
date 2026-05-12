import { z } from 'zod';

export const deleteContactEmailsSchema = z.object({
  ids: z
    .array(
      z
        .string({
          required_error: 'Id is required.',
          invalid_type_error: 'Id must be a string.'
        })
        .trim()
        .uuid('Id is invalid.')
        .max(36, 'Maximum 36 characters allowed.')
    )
    .min(1, 'At least one id is required.')
    .max(200, 'Maximum 200 emails per delete request.')
});

export type DeleteContactEmailsSchema = z.infer<
  typeof deleteContactEmailsSchema
>;
