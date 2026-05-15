import { SoftwareStatus } from '@prisma/client';
import {
  createSearchParamsCache,
  createSerializer,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral
} from 'nuqs/server';

import { ClientSoftwareStatusAll } from '@/schemas/client-portal/get-client-software-schema';

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
  searchQuery: parseAsString.withDefault('')
};

export const searchParamsCache = createSearchParamsCache(searchParams);
export const serializer = createSerializer(searchParams);
