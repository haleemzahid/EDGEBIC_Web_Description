import { type EmailFolder, type EmailSenderType } from '@prisma/client';

export type ContactEmailMessageDto = {
  id: string;
  threadId: string;
  senderType: EmailSenderType;
  senderUserId?: string;
  senderName: string;
  senderEmail?: string;
  senderImage?: string;
  recipientName?: string;
  recipientEmail?: string;
  body: string;
  createdAt: Date;
};

export type ContactEmailThreadDto = {
  id: string;
  contactId: string;
  folder: EmailFolder;
  subject: string;
  preview: string;
  unread: boolean;
  createdAt: Date;
  updatedAt: Date;
  messages: ContactEmailMessageDto[];
};
