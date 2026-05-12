import { type ContactPriority } from '@prisma/client';

export type ContactNoteDto = {
  id: string;
  contactId: string;
  text?: string;
  priority: ContactPriority;
  edited: boolean;
  createdAt: Date;
  updatedAt: Date;
  sender: {
    id: string;
    name: string;
    image?: string;
  };
};
