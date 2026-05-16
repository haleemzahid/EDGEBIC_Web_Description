import {
  ContactPriority,
  ContactTicketStatus
} from '@prisma/client';
import { z } from 'zod';

import { SortDirection } from '@/types/sort-direction';

export const ClientTicketsStatusAll = 'all';
export const ClientTicketsPriorityAll = 'all';

export enum ClientTicketsSortBy {
  Number = 'number',
  Title = 'title',
  Status = 'status',
  Priority = 'priority',
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt'
}

export const getClientTicketsSchema = z.object({
  pageIndex: z.number().int().min(0).default(0),
  pageSize: z.number().int().min(1).max(200).default(50),
  sortBy: z.nativeEnum(ClientTicketsSortBy).default(ClientTicketsSortBy.UpdatedAt),
  sortDirection: z.nativeEnum(SortDirection).default(SortDirection.Desc),
  status: z
    .union([
      z.literal(ClientTicketsStatusAll),
      z.nativeEnum(ContactTicketStatus)
    ])
    .default(ClientTicketsStatusAll),
  priority: z
    .union([
      z.literal(ClientTicketsPriorityAll),
      z.nativeEnum(ContactPriority)
    ])
    .default(ClientTicketsPriorityAll),
  searchQuery: z.string().trim().default('')
});

export type GetClientTicketsSchema = z.infer<typeof getClientTicketsSchema>;
