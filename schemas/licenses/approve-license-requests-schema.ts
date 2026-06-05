import { z } from 'zod';

export const approveLicenseRequestsSchema = z.object({
  requestIds: z
    .array(z.string().min(1))
    .min(1, 'Select at least one request to approve.'),
  // Defaults to the number of approved devices when omitted.
  seats: z.coerce.number().int().min(1).max(10000).optional(),
  product: z.string().max(255).optional()
});

export type ApproveLicenseRequestsSchema = z.infer<
  typeof approveLicenseRequestsSchema
>;
