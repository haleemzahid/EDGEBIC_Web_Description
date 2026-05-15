import { SoftwareStatus } from '@prisma/client';
import { z } from 'zod';

import { SortDirection } from '@/types/sort-direction';

export const ClientSoftwareStatusAll = 'all';

export enum GetClientSoftwareSortBy {
  Name = 'name',
  InstalledVersion = 'installedVersion',
  CreatedAt = 'createdAt'
}

export const getClientSoftwareSchema = z.object({
  pageIndex: z.number().int().min(0).default(0),
  pageSize: z.number().int().min(1).max(200).default(50),
  status: z
    .union([
      z.literal(ClientSoftwareStatusAll),
      z.nativeEnum(SoftwareStatus)
    ])
    .default(ClientSoftwareStatusAll),
  sortBy: z
    .nativeEnum(GetClientSoftwareSortBy)
    .default(GetClientSoftwareSortBy.CreatedAt),
  sortDirection: z.nativeEnum(SortDirection).default(SortDirection.Desc),
  searchQuery: z.string().trim().default('')
});

export type GetClientSoftwareSchema = z.infer<typeof getClientSoftwareSchema>;
