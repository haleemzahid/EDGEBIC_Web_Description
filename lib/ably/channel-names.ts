// Channel naming shared by server (publish) and client (subscribe).
// Keep names compact — Ably bills against unique channel count.

export function ticketChannelName(ticketId: string): string {
  return `ticket:${ticketId}`;
}

export const TICKET_UPDATE_EVENT = 'update';
