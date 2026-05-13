import { NextResponse, type NextRequest } from 'next/server';

import { dedupedAuth } from '@/lib/auth';
import { checkSession } from '@/lib/auth/session';
import {
  calendlyStatusToMeeting,
  extractCalendlyUuid,
  formatCalendlyLocation,
  getCalendlyClient,
  getCalendlyUserUri,
  type CalendlyEvent
} from '@/lib/calendly';

export async function GET(req: NextRequest): Promise<Response> {
  const session = await dedupedAuth();
  if (!checkSession(session)) {
    return new NextResponse(undefined, { status: 401 });
  }

  const client = getCalendlyClient();
  if (!client) {
    return NextResponse.json({ events: [], configured: false });
  }

  const userUri = await getCalendlyUserUri();
  if (!userUri) {
    return NextResponse.json({ events: [], configured: false });
  }

  const url = new URL(req.url);
  const minStartTime =
    url.searchParams.get('minStartTime') ??
    new Date(Date.now() - 1000 * 60 * 60 * 24 * 365).toISOString();
  const maxStartTime =
    url.searchParams.get('maxStartTime') ??
    new Date(Date.now() + 1000 * 60 * 60 * 24 * 365).toISOString();

  try {
    const events: CalendlyEvent[] = [];
    let pageToken: string | undefined;
    do {
      const page = await client.listScheduledEvents({
        userUri,
        minStartTime,
        maxStartTime,
        count: 100,
        sort: 'start_time:asc',
        pageToken
      });
      events.push(...page.collection);
      const next = page.pagination.next_page;
      pageToken = next
        ? (new URL(next).searchParams.get('page_token') ?? undefined)
        : undefined;
    } while (pageToken && events.length < 500);

    return NextResponse.json({
      configured: true,
      events: events.map((event) => ({
        id: `calendly:${extractCalendlyUuid(event.uri)}`,
        title: event.name,
        start: event.start_time,
        end: event.end_time,
        location: formatCalendlyLocation(event.location),
        status: calendlyStatusToMeeting(event)
      }))
    });
  } catch (error) {
    console.error(
      '[Calendly] /api/calendly/events failed:',
      error instanceof Error ? error.message : error
    );
    return NextResponse.json(
      { events: [], configured: true, error: 'fetch_failed' },
      { status: 502 }
    );
  }
}
