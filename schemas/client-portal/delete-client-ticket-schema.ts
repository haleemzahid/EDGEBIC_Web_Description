import { z } from 'zod';

export const deleteClientTicketSchema = z.object({
  ticketId: z.string().uuid()
});

export type DeleteClientTicketSchema = z.infer<
  typeof deleteClientTicketSchema
>;
