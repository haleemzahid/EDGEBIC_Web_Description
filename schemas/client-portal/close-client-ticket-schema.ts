import { z } from 'zod';

export const closeClientTicketSchema = z.object({
  ticketId: z
    .string({ required_error: 'Ticket id is required.' })
    .uuid('Ticket id is invalid.')
});

export type CloseClientTicketSchema = z.infer<typeof closeClientTicketSchema>;
