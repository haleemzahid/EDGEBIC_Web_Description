'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { RefreshCw } from 'lucide-react';

import 'react-big-calendar/lib/css/react-big-calendar.css';

// Setup the localizer for react-big-calendar
const locales = {
  'en-US': enUS
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
});

// Define event type
interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  location?: string;
  type?: 'meeting' | 'demo' | 'call' | 'event';
}

// Google Calendar API configuration
const GOOGLE_CALENDAR_API_KEY =
  process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY;
const GOOGLE_CALENDAR_ID = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID;

// Function to fetch events from Google Calendar
async function fetchGoogleCalendarEvents(): Promise<CalendarEvent[]> {
  if (!GOOGLE_CALENDAR_API_KEY || !GOOGLE_CALENDAR_ID) {
    console.error('Google Calendar API key or Calendar ID not configured');
    return [];
  }

  const timeMin = new Date();
  timeMin.setFullYear(timeMin.getFullYear() - 1); // Get events from 1 year ago
  const timeMax = new Date();
  timeMax.setFullYear(timeMax.getFullYear() + 1); // Get events up to 1 year ahead

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
    GOOGLE_CALENDAR_ID
  )}/events?key=${GOOGLE_CALENDAR_API_KEY}&timeMin=${timeMin.toISOString()}&timeMax=${timeMax.toISOString()}&singleEvents=true&orderBy=startTime`;

  try {
    console.log('Fetching from URL:', url);
    const response = await fetch(url);
    const data = await response.json();
    console.log('Google Calendar API response:', data);

    if (!response.ok) {
      console.error('API Error:', JSON.stringify(data, null, 2));
      throw new Error(data.error?.message || `HTTP error! status: ${response.status}`);
    }

    console.log('Events found:', data.items?.length || 0);

    return (data.items || []).map(
      (event: {
        id: string;
        summary?: string;
        description?: string;
        location?: string;
        start: { dateTime?: string; date?: string };
        end: { dateTime?: string; date?: string };
      }) => {
        // Determine event type based on title keywords
        let type: 'meeting' | 'demo' | 'call' | 'event' = 'event';
        const title = (event.summary || 'Untitled Event').toLowerCase();
        if (title.includes('demo')) type = 'demo';
        else if (title.includes('call') || title.includes('phone'))
          type = 'call';
        else if (title.includes('meeting') || title.includes('meet'))
          type = 'meeting';

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

// Event style getter for different event types
const eventStyleGetter = (event: CalendarEvent) => {
  let backgroundColor = '#3b82f6'; // default blue

  switch (event.type) {
    case 'demo':
      backgroundColor = '#10b981'; // green
      break;
    case 'call':
      backgroundColor = '#f59e0b'; // orange
      break;
    case 'meeting':
      backgroundColor = '#8b5cf6'; // purple
      break;
    case 'event':
      backgroundColor = '#3b82f6'; // blue
      break;
  }

  return {
    style: {
      backgroundColor,
      borderRadius: '4px',
      opacity: 0.9,
      color: 'white',
      border: 'none',
      display: 'block'
    }
  };
};

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentView, setCurrentView] =
    useState<(typeof Views)[keyof typeof Views]>(Views.MONTH);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Fetch events from Google Calendar
  const loadEvents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const googleEvents = await fetchGoogleCalendarEvents();
      setEvents(googleEvents);
    } catch (err) {
      setError('Failed to load calendar events');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  // Handle clicking on an event
  const handleSelectEvent = useCallback((event: CalendarEvent) => {
    let message = `Event: ${event.title}`;
    if (event.description) message += `\n\nDescription: ${event.description}`;
    if (event.location) message += `\n\nLocation: ${event.location}`;
    alert(message);
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Calendar</h1>
          <p className="mt-2 text-muted-foreground">
            View your scheduled meetings and events from Google Calendar
          </p>
        </div>
        <button
          type="button"
          onClick={loadEvents}
          disabled={isLoading}
          className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {error}. Make sure your Google Calendar is set to public.
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-[#8b5cf6]" />
          <span className="text-sm text-muted-foreground">Meetings</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-[#10b981]" />
          <span className="text-sm text-muted-foreground">Demos</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-[#f59e0b]" />
          <span className="text-sm text-muted-foreground">Calls</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-[#3b82f6]" />
          <span className="text-sm text-muted-foreground">Other Events</span>
        </div>
      </div>

      {/* Calendar */}
      <div className="rounded-lg border bg-card p-4 shadow-sm">
        {isLoading ? (
          <div className="flex h-[600px] items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
              <p className="text-muted-foreground">Loading calendar...</p>
            </div>
          </div>
        ) : (
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            view={currentView}
            onView={setCurrentView}
            date={currentDate}
            onNavigate={setCurrentDate}
            onSelectEvent={handleSelectEvent}
            eventPropGetter={eventStyleGetter}
            views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
            popup
            step={30}
            timeslots={2}
          />
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">
            Total Events
          </h3>
          <p className="mt-1 text-2xl font-bold text-foreground">
            {events.length}
          </p>
        </div>
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">
            This Month
          </h3>
          <p className="mt-1 text-2xl font-bold text-foreground">
            {
              events.filter(
                (e) => e.start.getMonth() === new Date().getMonth()
              ).length
            }
          </p>
        </div>
        <div className="rounded-lg border bg-card p-4 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">
            Upcoming
          </h3>
          <p className="mt-1 text-2xl font-bold text-foreground">
            {events.filter((e) => e.start > new Date()).length}
          </p>
        </div>
      </div>
    </div>
  );
}
