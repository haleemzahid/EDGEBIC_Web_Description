import {
  type ContactPriority,
  type ContactTaskCategory,
  type ContactTaskStatus
} from '@prisma/client';

export type ContactTaskDto = {
  id: string;
  contactId?: string;
  title: string;
  description?: string;
  status: ContactTaskStatus;
  priority: ContactPriority;
  category?: ContactTaskCategory;
  assigneeUserId?: string;
  assigneeName?: string;
  assigneeImage?: string;
  meetingId?: string;
  meetingTitle?: string;
  meetingStartsAt?: Date;
  dueDate?: Date;
  createdAt: Date;
};
