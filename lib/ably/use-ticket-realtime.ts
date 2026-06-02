'use client';

import * as React from 'react';
import Ably from 'ably';

import {
  TICKET_UPDATE_EVENT,
  ticketChannelName
} from '@/lib/ably/channel-names';

// Feature flag — when this is unset / false, the hook is a no-op and the
// caller's existing polling fallback keeps running. Lets us ship the wiring
// before the Ably account is hooked up, and reverse instantly if needed.
function isEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ABLY_ENABLED === 'true';
}

type Options = {
  /** Disable the subscription (e.g. CLOSED tickets don't need updates). */
  enabled?: boolean;
};

/**
 * Subscribes to a ticket's realtime channel and invokes `onUpdate` whenever
 * the server publishes a `ticket-update` event. Returns `true` ONLY while the
 * Ably connection is actually live — callers use that to skip their 5s
 * polling fallback. If Ably isn't configured, the token endpoint fails, or
 * the connection drops, the hook returns `false` so the polling fallback
 * resumes seamlessly.
 */
export function useTicketRealtime(
  ticketId: string,
  onUpdate: () => void,
  options: Options = {}
): boolean {
  const { enabled = true } = options;
  const wantActive = isEnabled() && enabled;
  const [connected, setConnected] = React.useState(false);

  // Latest callback ref so re-renders don't tear down the channel.
  const onUpdateRef = React.useRef(onUpdate);
  React.useEffect(() => {
    onUpdateRef.current = onUpdate;
  }, [onUpdate]);

  React.useEffect(() => {
    if (!wantActive) {
      setConnected(false);
      return;
    }

    const realtime = new Ably.Realtime({
      authCallback: async (_data, callback) => {
        try {
          const res = await fetch('/api/ably/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ticketId })
          });
          if (!res.ok) {
            callback(`Token request failed: ${res.status}`, null);
            return;
          }
          const tokenRequest = await res.json();
          callback(null, tokenRequest);
        } catch (error) {
          callback(
            error instanceof Error ? error.message : 'Token request error',
            null
          );
        }
      }
    });

    // Track connection state — only treat as "active" while connected, so
    // failed-token / network-down cases hand control back to the polling
    // fallback. 'suspended' / 'failed' are terminal-ish, 'disconnected' is
    // transient (Ably auto-reconnects).
    realtime.connection.on((stateChange) => {
      setConnected(stateChange.current === 'connected');
    });

    const channel = realtime.channels.get(ticketChannelName(ticketId));
    const listener = (): void => {
      onUpdateRef.current();
    };
    channel.subscribe(TICKET_UPDATE_EVENT, listener);

    return () => {
      channel.unsubscribe(TICKET_UPDATE_EVENT, listener);
      realtime.close();
      setConnected(false);
    };
  }, [wantActive, ticketId]);

  return connected;
}
