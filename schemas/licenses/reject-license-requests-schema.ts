import { z } from 'zod';

export const rejectLicenseRequestsSchema = z.object({
  requestIds: z
    .array(z.string().min(1))
    .min(1, 'Select at least one request to reject.'),
  note: z.string().max(1000).optional()
});

export type RejectLicenseRequestsSchema = z.infer<
  typeof rejectLicenseRequestsSchema
>;
