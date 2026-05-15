import { z } from 'zod';

export enum MessageFolderOption {
  All = 'all',
  Inbox = 'inbox',
  Sent = 'sent'
}

export const MessageReadAll = 'all';
export const MessageReadUnread = 'unread';

export const getClientMessageThreadsSchema = z.object({
  pageIndex: z.number().int().min(0).default(0),
  pageSize: z.number().int().min(1).max(200).default(50),
  folder: z
    .nativeEnum(MessageFolderOption)
    .default(MessageFolderOption.Inbox),
  readFilter: z
    .union([z.literal(MessageReadAll), z.literal(MessageReadUnread)])
    .default(MessageReadAll),
  searchQuery: z.string().trim().default('')
});

export type GetClientMessageThreadsSchema = z.infer<
  typeof getClientMessageThreadsSchema
>;
