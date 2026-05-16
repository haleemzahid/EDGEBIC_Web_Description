import {
  createSearchParamsCache,
  createSerializer,
  parseAsInteger,
  parseAsStringLiteral
} from 'nuqs/server';

import { SortDirection } from '@/types/sort-direction';

// Co-located search-params for the contact Tickets tab, mirroring
// contacts-search-params.ts. The tab receives the full ticket list, so
// sorting/pagination are applied client-side — these params just keep the
// table state in the URL.
export enum TicketsSortBy {
  Number = 'number',
  Title = 'title',
  Status = 'status',
  Priority = 'priority',
  CreatedAt = 'createdAt'
}

export const searchParams = {
  pageIndex: parseAsInteger.withDefault(0),
  // Must be one of DataTablePagination's options [10,20,30,40,50] or the
  // "rows per page" selector renders blank.
  pageSize: parseAsInteger.withDefault(10),
  sortBy: parseAsStringLiteral(Object.values(TicketsSortBy)).withDefault(
    TicketsSortBy.CreatedAt
  ),
  sortDirection: parseAsStringLiteral(Object.values(SortDirection)).withDefault(
    SortDirection.Desc
  )
};

export const searchParamsCache = createSearchParamsCache(searchParams);
export const serializer = createSerializer(searchParams);
