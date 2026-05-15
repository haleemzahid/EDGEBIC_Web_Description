import {
  ContactPriority,
  ContactTicketStatus
} from '@prisma/client';
import { z } from 'zod';

import { SortDirection } from '@/types/sort-direction';

export enum GetTicketsSortBy {
  CreatedAt = 'createdAt',
  UpdatedAt = 'updatedAt'
}

export const AssigneeAll = 'all';
export const AssigneeMe = 'me';
export const AssigneeUnassigned = 'unassigned';

export const StatusAll = 'all';
export const PriorityAll = 'all';

export const getTicketsSchema = z.object({
  pageIndex: z.number().int().min(0).default(0),
  pageSize: z.number().int().min(1).max(200).default(50),
  status: z
    .union([
      z.literal(StatusAll),
      z.nativeEnum(ContactTicketStatus)
    ])
    .default(StatusAll),
  priority: z
    .union([
      z.literal(PriorityAll),
      z.nativeEnum(ContactPriority)
    ])
    .default(PriorityAll),
  // 'all' | 'me' | 'unassigned' | <userId uuid>
  assignee: z.string().trim().default(AssigneeAll),
  sortBy: z
    .nativeEnum(GetTicketsSortBy)
    .default(GetTicketsSortBy.CreatedAt),
  sortDirection: z.nativeEnum(SortDirection).default(SortDirection.Desc),
  searchQuery: z.string().trim().default('')
});

export type GetTicketsSchema = z.infer<typeof getTicketsSchema>;
