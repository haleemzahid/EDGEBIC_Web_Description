import {
  createSearchParamsCache,
  createSerializer,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral
} from 'nuqs/server';

import {
  MessageFolderOption,
  MessageReadAll,
  MessageReadUnread
} from '@/schemas/client-portal/get-client-message-threads-schema';

const readValues = [MessageReadAll, MessageReadUnread] as const;

export const searchParams = {
  pageIndex: parseAsInteger.withDefault(0),
  pageSize: parseAsInteger.withDefault(50),
  folder: parseAsStringLiteral(Object.values(MessageFolderOption)).withDefault(
    MessageFolderOption.Inbox
  ),
  readFilter: parseAsStringLiteral(readValues).withDefault(MessageReadAll),
  searchQuery: parseAsString.withDefault('')
};

export const searchParamsCache = createSearchParamsCache(searchParams);
export const serializer = createSerializer(searchParams);
