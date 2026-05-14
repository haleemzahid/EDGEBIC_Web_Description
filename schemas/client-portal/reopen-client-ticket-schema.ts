import { z } from 'zod';

export const reopenClientTicketSchema = z.object({
  ticketId: z
    .string({ required_error: 'Ticket id is required.' })
    .uuid('Ticket id is invalid.')
});

export type ReopenClientTicketSchema = z.infer<
  typeof reopenClientTicketSchema
>;
