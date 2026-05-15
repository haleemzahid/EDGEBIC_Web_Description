import { SoftwareStatus } from '@prisma/client';
import {
  createSearchParamsCache,
  createSerializer,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral
} from 'nuqs/server';

import {
  ClientSoftwareStatusAll,
  GetClientSoftwareSortBy
} from '@/schemas/client-portal/get-client-software-schema';
import { SortDirection } from '@/types/sort-direction';

const statusValues = [
  ClientSoftwareStatusAll,
  ...Object.values(SoftwareStatus)
] as const;

export const searchParams = {
  pageIndex: parseAsInteger.withDefault(0),
  pageSize: parseAsInteger.withDefault(50),
  status: parseAsStringLiteral(statusValues).withDefault(
    ClientSoftwareStatusAll
  ),
  sortBy: parseAsStringLiteral(
    Object.values(GetClientSoftwareSortBy)
  ).withDefault(GetClientSoftwareSortBy.CreatedAt),
  sortDirection: parseAsStringLiteral(Object.values(SortDirection)).withDefault(
    SortDirection.Desc
  ),
  searchQuery: parseAsString.withDefault('')
};

export const searchParamsCache = createSearchParamsCache(searchParams);
export const serializer = createSerializer(searchParams);
