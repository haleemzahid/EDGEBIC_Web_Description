import 'server-only';

import Ably from 'ably';

import {
  TICKET_UPDATE_EVENT,
  ticketChannelName
} from '@/lib/ably/channel-names';

let cachedRest: Ably.Rest | null = null;

function getRest(): Ably.Rest | null {
  const key = process.env.ABLY_API_KEY;
  if (!key) return null;
  if (!cachedRest) {
    cachedRest = new Ably.Rest({ key });
  }
  return cachedRest;
}

export function isAblyConfigured(): boolean {
  return Boolean(process.env.ABLY_API_KEY);
}

export function getAblyRest(): Ably.Rest | null {
  return getRest();
}

/**
 * Best-effort push that tells every viewer of `ticketId` "something changed —
 * refetch." No payload: receivers call `router.refresh()` and Next.js re-reads
 * the DB through the existing server component, so we never trust client-side
 * state for message contents. Failure is swallowed — the 5s polling fallback
 * (or a manual refresh) still picks up the change.
 */
export async function publishTicketUpdate(ticketId: string): Promise<void> {
  const rest = getRest();
  if (!rest) return;
  try {
    await rest.channels
      .get(ticketChannelName(ticketId))
      .publish(TICKET_UPDATE_EVENT, { ticketId });
  } catch (error) {
    console.error('[Ably] publishTicketUpdate failed:', error);
  }
}
