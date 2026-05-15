import { ContactPriority, ContactTicketStatus } from '@prisma/client';
import {
  createSearchParamsCache,
  createSerializer,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral
} from 'nuqs/server';

import {
  AssigneeAll,
  GetTicketsSortBy,
  PriorityAll,
  StatusAll
} from '@/schemas/tickets/get-tickets-schema';
import { SortDirection } from '@/types/sort-direction';

const statusValues = [
  StatusAll,
  ...Object.values(ContactTicketStatus)
] as const;
const priorityValues = [
  PriorityAll,
  ...Object.values(ContactPriority)
] as const;

export const searchParams = {
  pageIndex: parseAsInteger.withDefault(0),
  pageSize: parseAsInteger.withDefault(50),
  status: parseAsStringLiteral(statusValues).withDefault(StatusAll),
  priority: parseAsStringLiteral(priorityValues).withDefault(PriorityAll),
  // 'all' | 'me' | 'unassigned' | <userId>. Free-form string because userIds vary.
  assignee: parseAsString.withDefault(AssigneeAll),
  sortBy: parseAsStringLiteral(Object.values(GetTicketsSortBy)).withDefault(
    GetTicketsSortBy.CreatedAt
  ),
  sortDirection: parseAsStringLiteral(Object.values(SortDirection)).withDefault(
    SortDirection.Desc
  ),
  searchQuery: parseAsString.withDefault('')
};

export const searchParamsCache = createSearchParamsCache(searchParams);
export const serializer = createSerializer(searchParams);
