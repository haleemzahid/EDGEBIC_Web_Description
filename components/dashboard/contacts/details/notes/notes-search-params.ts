import {
  createSearchParamsCache,
  createSerializer,
  parseAsInteger,
  parseAsStringLiteral
} from 'nuqs/server';

import { SortDirection } from '@/types/sort-direction';

// Co-located search-params for the contact Notes tab, mirroring
// tasks-search-params.ts. The tab receives the full note list, so
// sorting/pagination are applied client-side — these params just keep the
// table state in the URL.
export enum NotesSortBy {
  Note = 'note',
  Author = 'author',
  Priority = 'priority',
  Pinned = 'pinned',
  Meeting = 'meeting',
  CreatedAt = 'createdAt'
}

export const searchParams = {
  pageIndex: parseAsInteger.withDefault(0),
  // Must be one of DataTablePagination's options [10,20,30,40,50] or the
  // "rows per page" selector renders blank.
  pageSize: parseAsInteger.withDefault(10),
  sortBy: parseAsStringLiteral(Object.values(NotesSortBy)).withDefault(
    NotesSortBy.CreatedAt
  ),
  sortDirection: parseAsStringLiteral(Object.values(SortDirection)).withDefault(
    SortDirection.Desc
  )
};

export const searchParamsCache = createSearchParamsCache(searchParams);
export const serializer = createSerializer(searchParams);
