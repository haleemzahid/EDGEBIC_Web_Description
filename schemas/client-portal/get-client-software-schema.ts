import { SoftwareStatus } from '@prisma/client';
import { z } from 'zod';

export const ClientSoftwareStatusAll = 'all';

export const getClientSoftwareSchema = z.object({
  pageIndex: z.number().int().min(0).default(0),
  pageSize: z.number().int().min(1).max(200).default(50),
  status: z
    .union([
      z.literal(ClientSoftwareStatusAll),
      z.nativeEnum(SoftwareStatus)
    ])
    .default(ClientSoftwareStatusAll),
  searchQuery: z.string().trim().default('')
});

export type GetClientSoftwareSchema = z.infer<typeof getClientSoftwareSchema>;
