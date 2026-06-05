import { z } from 'zod';

export const releaseSeatSchema = z.object({
  seatId: z.string().min(1)
});
export type ReleaseSeatSchema = z.infer<typeof releaseSeatSchema>;

export const updateLicenseSeatsSchema = z.object({
  purchaseId: z.string().min(1),
  seats: z.coerce.number().int().min(1).max(10000)
});
export type UpdateLicenseSeatsSchema = z.infer<typeof updateLicenseSeatsSchema>;
