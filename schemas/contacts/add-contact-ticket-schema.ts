import {
  ContactPriority,
  ContactTicketStatus
} from '@prisma/client';
import { z } from 'zod';

export const addContactTicketSchema = z.object({
  contactId: z
    .string({
      required_error: 'Contact id is required.',
      invalid_type_error: 'Contact id must be a string.'
    })
    .trim()
    .uuid('Contact id is invalid.')
    .min(1, 'Contact id is required.')
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

export type AddContactTicketSchema = z.infer<typeof addContactTicketSchema>;
