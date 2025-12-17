'use client';

import React, { useState, useCallback } from 'react';
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, addHours } from 'date-fns';
import { enUS } from 'date-fns/locale';

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
  id: number;
  title: string;
  start: Date;
  end: Date;
  description?: string;
  type?: 'meeting' | 'demo' | 'call';
}

// Sample events - you can replace these with real data from your backend
const initialEvents: CalendarEvent[] = [
  {
    id: 1,
    title: 'Product Demo - ABC Corp',
    start: new Date(2025, 11, 17, 10, 0),
    end: new Date(2025, 11, 17, 11, 0),
    description: 'Demo of production planning features',
    type: 'demo'
  },
  {
    id: 2,
    title: 'Discovery Call - XYZ Ltd',
    start: new Date(2025, 11, 18, 14, 0),
    end: new Date(2025, 11, 18, 14, 30),
    description: 'Initial discussion about requirements',
    type: 'call'
  },
  {
    id: 3,
    title: 'Team Meeting',
    start: new Date(2025, 11, 19, 9, 0),
    end: new Date(2025, 11, 19, 10, 0),
    description: 'Weekly team sync',
    type: 'meeting'
  },
  {
    id: 4,
    title: 'Client Follow-up',
    start: new Date(2025, 11, 20, 15, 0),
    end: new Date(2025, 11, 20, 15, 30),
    type: 'call'
  }
];

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
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [currentView, setCurrentView] =
    useState<(typeof Views)[keyof typeof Views]>(Views.MONTH);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Handle selecting a time slot to create new event
  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      const title = window.prompt('Enter event title:');
      if (title) {
        const newEvent: CalendarEvent = {
          id: events.length + 1,
          title,
          start,
          end: end || addHours(start, 1),
          type: 'meeting'
        };
        setEvents((prev) => [...prev, newEvent]);
      }
    },
    [events]
  );

  // Handle clicking on an event
  const handleSelectEvent = useCallback((event: CalendarEvent) => {
    alert(`Event: ${event.title}\n${event.description || 'No description'}`);
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Calendar</h1>
        <p className="mt-2 text-muted-foreground">
          View and manage your scheduled meetings and demos
        </p>
      </div>

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
      </div>

      {/* Calendar */}
      <div className="rounded-lg border bg-card p-4 shadow-sm">
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
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          eventPropGetter={eventStyleGetter}
          views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
          popup
          step={30}
          timeslots={2}
        />
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
            Upcoming Demos
          </h3>
          <p className="mt-1 text-2xl font-bold text-foreground">
            {
              events.filter((e) => e.type === 'demo' && e.start > new Date())
                .length
            }
          </p>
        </div>
      </div>
    </div>
  );
}
