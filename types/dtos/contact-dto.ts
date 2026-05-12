import { type ContactRecord, type ContactStage } from '@prisma/client';

import type { TagDto } from '@/types/dtos/tag-dto';

export type ContactDto = {
  id: string;
  record: ContactRecord;
  image?: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  // Extended properties
  jobTitle?: string;
  company?: string;
  website?: string;
  linkedIn?: string;
  country?: string;
  timezone?: string;
  leadSource?: string;
  leadSourceDate?: Date;
  // Activity
  lastContactedAt?: Date;
  lastContactedNote?: string;
  lastMeetingAt?: Date;
  lastMeetingNote?: string;
  // Stripe
  stripeCustomerId?: string;
  stage: ContactStage;
  isRead: boolean;
  description?: string;
  productInterest?: string;
  hearAboutUs?: string;
  createdAt: Date;
  tags: TagDto[];
};
