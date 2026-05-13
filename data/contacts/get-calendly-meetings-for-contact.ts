import 'server-only';

import {
  calendlyStatusToMeeting,
  extractCalendlyUuid,
  formatCalendlyLocation,
  getCalendlyClient,
  getCalendlyUserUri,
  type CalendlyEvent
} from '@/lib/calendly';
import type { ContactMeetingDto } from '@/types/dtos/contact-meeting-dto';

export type GetCalendlyMeetingsForContactInput = {
  contactId: string;
  contactEmail?: string;
};

export async function getCalendlyMeetingsForContact({
  contactId,
  contactEmail
}: GetCalendlyMeetingsForContactInput): Promise<ContactMeetingDto[]> {
  if (!contactEmail) return [];
  const client = getCalendlyClient();
  if (!client) return [];

  try {
    const userUri = await getCalendlyUserUri();
    if (!userUri) return [];

    const minStartTime = new Date();
    minStartTime.setMonth(minStartTime.getMonth() - 12);

    const events: CalendlyEvent[] = [];
    let pageToken: string | undefined;
    do {
      const page = await client.listScheduledEvents({
        userUri,
        inviteeEmail: contactEmail,
        minStartTime: minStartTime.toISOString(),
        count: 100,
        sort: 'start_time:desc',
        pageToken
      });
      events.push(...page.collection);
      const next = page.pagination.next_page;
      pageToken = next
        ? (new URL(next).searchParams.get('page_token') ?? undefined)
        : undefined;
    } while (pageToken && events.length < 500);

    return events.map<ContactMeetingDto>((event) => ({
      id: `calendly:${extractCalendlyUuid(event.uri)}`,
      contactId,
      title: event.name,
      description: undefined,
      startsAt: new Date(event.start_time),
      endsAt: new Date(event.end_time),
      location: formatCalendlyLocation(event.location),
      status: calendlyStatusToMeeting(event),
      createdAt: new Date(event.created_at),
      updatedAt: new Date(event.updated_at),
      source: 'calendly'
    }));
  } catch (error) {
    console.error(
      '[Calendly] Failed to fetch contact meetings:',
      error instanceof Error ? error.message : error
    );
    return [];
  }
}
