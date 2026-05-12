import { type ContactPriority } from '@prisma/client';

export type ContactNoteDto = {
  id: string;
  contactId: string;
  text?: string;
  priority: ContactPriority;
  pinned: boolean;
  meetingId?: string;
  meetingTitle?: string;
  meetingStartsAt?: Date;
  edited: boolean;
  createdAt: Date;
  updatedAt: Date;
  sender: {
    id: string;
    name: string;
    image?: string;
  };
};
