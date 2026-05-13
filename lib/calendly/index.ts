import 'server-only';

import { ContactMeetingStatus } from '@prisma/client';

const CALENDLY_API_BASE = 'https://api.calendly.com';

export type CalendlyLocation = {
  type: string;
  location?: string;
  join_url?: string;
};

export type CalendlyEvent = {
  uri: string;
  name: string;
  status: 'active' | 'canceled';
  start_time: string;
  end_time: string;
  event_type: string;
  location?: CalendlyLocation;
  created_at: string;
  updated_at: string;
};

export type CalendlyInvitee = {
  uri: string;
  email: string;
  name: string;
  status: 'active' | 'canceled';
  cancel_url?: string;
  reschedule_url?: string;
};

export type CalendlyUser = {
  uri: string;
  name: string;
  email: string;
  scheduling_url: string;
  current_organization: string;
};

type CalendlyPage<T> = {
  collection: T[];
  pagination: { count: number; next_page: string | null };
};

export class CalendlyClient {
  private readonly token: string;

  constructor(token: string) {
    if (!token) throw new Error('Calendly API token is required');
    this.token = token;
  }

  private async request<T>(path: string): Promise<T> {
    const response = await fetch(`${CALENDLY_API_BASE}${path}`, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Calendly API ${response.status}: ${body}`);
    }
    return response.json() as Promise<T>;
  }

  async getCurrentUser(): Promise<CalendlyUser> {
    const data = await this.request<{ resource: CalendlyUser }>('/users/me');
    return data.resource;
  }

  async listScheduledEvents(params: {
    userUri?: string;
    organizationUri?: string;
    inviteeEmail?: string;
    minStartTime?: string;
    maxStartTime?: string;
    status?: 'active' | 'canceled';
    sort?: string;
    count?: number;
    pageToken?: string;
  }): Promise<CalendlyPage<CalendlyEvent>> {
    const search = new URLSearchParams();
    if (params.userUri) search.set('user', params.userUri);
    if (params.organizationUri)
      search.set('organization', params.organizationUri);
    if (params.inviteeEmail) search.set('invitee_email', params.inviteeEmail);
    if (params.minStartTime) search.set('min_start_time', params.minStartTime);
    if (params.maxStartTime) search.set('max_start_time', params.maxStartTime);
    if (params.status) search.set('status', params.status);
    if (params.sort) search.set('sort', params.sort);
    if (params.count) search.set('count', String(params.count));
    if (params.pageToken) search.set('page_token', params.pageToken);
    return this.request<CalendlyPage<CalendlyEvent>>(
      `/scheduled_events?${search.toString()}`
    );
  }

  async listInvitees(eventUuid: string): Promise<CalendlyInvitee[]> {
    const data = await this.request<{ collection: CalendlyInvitee[] }>(
      `/scheduled_events/${eventUuid}/invitees`
    );
    return data.collection;
  }
}

let cachedClient: CalendlyClient | null = null;

export function getCalendlyClient(): CalendlyClient | null {
  if (cachedClient) return cachedClient;
  const token = process.env.CALENDLY_API_TOKEN;
  if (!token) return null;
  cachedClient = new CalendlyClient(token);
  return cachedClient;
}

let cachedUserUri: string | null = null;

export async function getCalendlyUserUri(): Promise<string | null> {
  if (cachedUserUri) return cachedUserUri;
  const client = getCalendlyClient();
  if (!client) return null;
  try {
    const user = await client.getCurrentUser();
    cachedUserUri = user.uri;
    return cachedUserUri;
  } catch (error) {
    console.error('[Calendly] Failed to fetch current user:', error);
    return null;
  }
}

export function extractCalendlyUuid(uri: string): string {
  return uri.split('/').filter(Boolean).pop() ?? uri;
}

export function formatCalendlyLocation(
  location?: CalendlyLocation
): string | undefined {
  if (!location) return undefined;
  if (location.location) return location.location;
  if (location.join_url) return location.join_url;
  switch (location.type) {
    case 'google_conference':
      return 'Google Meet';
    case 'zoom':
      return 'Zoom';
    case 'microsoft_teams_conference':
      return 'Microsoft Teams';
    case 'gotomeeting':
      return 'GoToMeeting';
    case 'inbound_call':
    case 'outbound_call':
      return 'Phone call';
    case 'physical':
      return 'In person';
    default:
      return undefined;
  }
}

export function calendlyStatusToMeeting(
  event: CalendlyEvent
): ContactMeetingStatus {
  if (event.status === 'canceled') return ContactMeetingStatus.CANCELLED;
  const ended = new Date(event.end_time) < new Date();
  return ended ? ContactMeetingStatus.COMPLETED : ContactMeetingStatus.CONFIRMED;
}
