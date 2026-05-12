import { type ContactMeetingStatus } from '@prisma/client';

export type ContactMeetingDto = {
  id: string;
  contactId: string;
  title: string;
  description?: string;
  startsAt: Date;
  endsAt: Date;
  location?: string;
  status: ContactMeetingStatus;
  createdAt: Date;
  updatedAt: Date;
};
