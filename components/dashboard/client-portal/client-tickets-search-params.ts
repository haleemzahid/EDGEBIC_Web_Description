import { ContactPriority, ContactTicketStatus } from '@prisma/client';
import {
  createSearchParamsCache,
  createSerializer,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral
} from 'nuqs/server';

import {
  ClientTicketsPriorityAll,
  ClientTicketsSortBy,
  ClientTicketsStatusAll
} from '@/schemas/client-portal/get-client-tickets-schema';
import { SortDirection } from '@/types/sort-direction';

const statusValues = [
  ClientTicketsStatusAll,
  ...Object.values(ContactTicketStatus)
] as const;
const priorityValues = [
  ClientTicketsPriorityAll,
  ...Object.values(ContactPriority)
] as const;

export const searchParams = {
  pageIndex: parseAsInteger.withDefault(0),
  pageSize: parseAsInteger.withDefault(50),
  status: parseAsStringLiteral(statusValues).withDefault(
    ClientTicketsStatusAll
  ),
  priority: parseAsStringLiteral(priorityValues).withDefault(
    ClientTicketsPriorityAll
  ),
  sortBy: parseAsStringLiteral(Object.values(ClientTicketsSortBy)).withDefault(
    ClientTicketsSortBy.UpdatedAt
  ),
  sortDirection: parseAsStringLiteral(Object.values(SortDirection)).withDefault(
    SortDirection.Desc
  ),
  searchQuery: parseAsString.withDefault('')
};

export const searchParamsCache = createSearchParamsCache(searchParams);
export const serializer = createSerializer(searchParams);
