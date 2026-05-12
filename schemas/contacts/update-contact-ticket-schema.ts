import {
  ContactPriority,
  ContactTicketStatus
} from '@prisma/client';
import { z } from 'zod';

export const updateContactTicketSchema = z.object({
  id: z
    .string({
      required_error: 'Id is required.',
      invalid_type_error: 'Id must be a string.'
    })
    .trim()
    .uuid('Id is invalid.')
    .min(1, 'Id is required.')
    .max(36, 'Maximum 36 characters allowed.'),
  title: z
    .string({
      required_error: 'Title is required.',
      invalid_type_error: 'Title must be a string.'
    })
    .trim()
    .min(1, 'Title is required.')
    .max(255, 'Maximum 255 characters allowed.'),
  description: z
    .string({
      invalid_type_error: 'Description must be a string.'
    })
    .trim()
    .max(8000, 'Maximum 8000 characters allowed.')
    .optional()
    .or(z.literal('')),
  status: z.nativeEnum(ContactTicketStatus, {
    invalid_type_error: 'Status must be a valid value'
  }),
  priority: z.nativeEnum(ContactPriority, {
    invalid_type_error: 'Priority must be a valid value'
  }),
  assigneeUserId: z
    .string({
      invalid_type_error: 'Assignee id must be a string.'
    })
    .trim()
    .uuid('Assignee id is invalid.')
    .max(36, 'Maximum 36 characters allowed.')
    .optional()
    .or(z.literal(''))
    .nullable()
});

export type UpdateContactTicketSchema = z.infer<
  typeof updateContactTicketSchema
>;
