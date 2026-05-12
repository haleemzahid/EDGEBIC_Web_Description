import { ContactPriority, ContactTaskStatus } from '@prisma/client';

export type ContactTaskDto = {
  id: string;
  contactId?: string;
  title: string;
  description?: string;
  status: ContactTaskStatus;
  priority: ContactPriority;
  dueDate?: Date;
  createdAt: Date;
};
