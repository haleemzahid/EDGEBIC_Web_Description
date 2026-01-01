'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, ClockIcon, MapPinIcon, RefreshCwIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { ContactDto } from '@/types/dtos/contact-dto';

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  location?: string;
  type?: 'meeting' | 'demo' | 'call' | 'event';
}

const GOOGLE_CALENDAR_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY;
const GOOGLE_CALENDAR_ID = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID;

async function fetchGoogleCalendarEvents(): Promise<CalendarEvent[]> {
  if (!GOOGLE_CALENDAR_API_KEY || !GOOGLE_CALENDAR_ID) {
    console.error('Google Calendar API key or Calendar ID not configured');
    return [];
  }

  const timeMin = new Date();
  timeMin.setMonth(timeMin.getMonth() - 1);
  const timeMax = new Date();
  timeMax.setMonth(timeMax.getMonth() + 3);

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
    GOOGLE_CALENDAR_ID
  )}/events?key=${GOOGLE_CALENDAR_API_KEY}&timeMin=${timeMin.toISOString()}&timeMax=${timeMax.toISOString()}&singleEvents=true&orderBy=startTime`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || `HTTP error! status: ${response.status}`);
    }

    return (data.items || []).map(
      (event: {
        id: string;
        summary?: string;
        description?: string;
        location?: string;
        start: { dateTime?: string; date?: string };
        end: { dateTime?: string; date?: string };
      }) => {
        let type: 'meeting' | 'demo' | 'call' | 'event' = 'event';
        const title = (event.summary || 'Untitled Event').toLowerCase();
        if (title.includes('demo')) type = 'demo';
        else if (title.includes('call') || title.includes('phone')) type = 'call';
        else if (title.includes('meeting') || title.includes('meet')) type = 'meeting';

        return {
          id: event.id,
          title: event.summary || 'Untitled Event',
          start: new Date(event.start.dateTime || event.start.date || ''),
          end: new Date(event.end.dateTime || event.end.date || ''),
          description: event.description,
          location: event.location,
          type
        };
      }
    );
  } catch (error) {
    console.error('Error fetching Google Calendar events:', error);
    return [];
  }
}

function getEventTypeColor(type?: string): string {
  switch (type) {
    case 'demo':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'call':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'meeting':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    default:
      return 'bg-blue-100 text-blue-800 border-blue-200';
  }
}

export type ContactMeetingsTabProps = {
  contact: ContactDto;
};

export function ContactMeetingsTab({ contact }: ContactMeetingsTabProps): React.JSX.Element {
  const [meetings, setMeetings] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMeetings = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const events = await fetchGoogleCalendarEvents();
      // Filter meetings that might be related to this contact (by name or email in title/description)
      const contactMeetings = events.filter((event) => {
        const searchText = `${event.title} ${event.description || ''}`.toLowerCase();
        const contactName = contact.name.toLowerCase();
        const contactEmail = contact.email?.toLowerCase() || '';
        return searchText.includes(contactName) || (contactEmail && searchText.includes(contactEmail));
      });
      setMeetings(contactMeetings.length > 0 ? contactMeetings : events);
    } catch (err) {
      setError('Failed to load meetings');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMeetings();
  }, [contact]);

  const upcomingMeetings = meetings.filter((m) => m.start > new Date());
  const pastMeetings = meetings.filter((m) => m.start <= new Date());

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex shrink-0 items-center justify-between border-b px-4 py-3">
        <h3 className="text-sm font-medium">Meetings</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={loadMeetings}
          disabled={isLoading}
        >
          <RefreshCwIcon className={`size-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      <ScrollArea className="h-0 min-h-0 flex-1">
        <div className="space-y-4 p-4">
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCwIcon className="size-6 animate-spin text-muted-foreground" />
            </div>
          ) : meetings.length === 0 ? (
            <div className="py-8 text-center text-sm text-muted-foreground">
              No meetings found
            </div>
          ) : (
            <>
              {upcomingMeetings.length > 0 && (
                <div>
                  <h4 className="mb-3 text-xs font-semibold uppercase text-muted-foreground">
                    Upcoming ({upcomingMeetings.length})
                  </h4>
                  <div className="space-y-2">
                    {upcomingMeetings.map((meeting) => (
                      <Card key={meeting.id} className="overflow-hidden">
                        <CardContent className="p-3">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <span className={`rounded px-2 py-0.5 text-xs font-medium ${getEventTypeColor(meeting.type)}`}>
                                  {meeting.type || 'event'}
                                </span>
                              </div>
                              <h5 className="mt-1 truncate font-medium">{meeting.title}</h5>
                              <div className="mt-2 flex flex-col gap-1 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <CalendarIcon className="size-3" />
                                  {format(meeting.start, 'MMM d, yyyy')}
                                </div>
                                <div className="flex items-center gap-1">
                                  <ClockIcon className="size-3" />
                                  {format(meeting.start, 'h:mm a')} - {format(meeting.end, 'h:mm a')}
                                </div>
                                {meeting.location && (
                                  <div className="flex items-center gap-1">
                                    <MapPinIcon className="size-3" />
                                    <span className="truncate">{meeting.location}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {pastMeetings.length > 0 && (
                <div>
                  <h4 className="mb-3 text-xs font-semibold uppercase text-muted-foreground">
                    Past ({pastMeetings.length})
                  </h4>
                  <div className="space-y-2">
                    {pastMeetings.slice(0, 10).map((meeting) => (
                      <Card key={meeting.id} className="overflow-hidden opacity-75">
                        <CardContent className="p-3">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <span className={`rounded px-2 py-0.5 text-xs font-medium ${getEventTypeColor(meeting.type)}`}>
                                  {meeting.type || 'event'}
                                </span>
                              </div>
                              <h5 className="mt-1 truncate font-medium">{meeting.title}</h5>
                              <div className="mt-2 flex flex-col gap-1 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <CalendarIcon className="size-3" />
                                  {format(meeting.start, 'MMM d, yyyy')}
                                </div>
                                <div className="flex items-center gap-1">
                                  <ClockIcon className="size-3" />
                                  {format(meeting.start, 'h:mm a')} - {format(meeting.end, 'h:mm a')}
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
