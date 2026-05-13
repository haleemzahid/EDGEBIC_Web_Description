import { z } from 'zod';

export const confirmClientTicketSchema = z.object({
  ticketId: z
    .string({ required_error: 'Ticket id is required.' })
    .uuid('Ticket id is invalid.')
});

export type ConfirmClientTicketSchema = z.infer<
  typeof confirmClientTicketSchema
>;
