import {
  type ContactPriority,
  type ContactTicketActivityType,
  type ContactTicketStatus,
  type TicketMessageSender
} from '@prisma/client';

export type ContactTicketMessageDto = {
  id: string;
  ticketId: string;
  senderType: TicketMessageSender;
  senderUserId?: string;
  senderName: string;
  senderImage?: string;
  body: string;
  isInternalNote: boolean;
  createdAt: Date;
};

export type ContactTicketActivityDto = {
  id: string;
  ticketId: string;
  type: ContactTicketActivityType;
  description: string;
  userId?: string;
  userName?: string;
  createdAt: Date;
};

export type ContactTicketDto = {
  id: string;
  number: number;
  contactId: string;
  title: string;
  description?: string;
  status: ContactTicketStatus;
  priority: ContactPriority;
  assigneeUserId?: string;
  assigneeName?: string;
  assigneeImage?: string;
  meetingId?: string;
  meetingTitle?: string;
  meetingStartsAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type ContactTicketWithDetailsDto = ContactTicketDto & {
  messages: ContactTicketMessageDto[];
  activities: ContactTicketActivityDto[];
};
