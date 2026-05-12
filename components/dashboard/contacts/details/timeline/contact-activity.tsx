'use client';

import * as React from 'react';
import { ActionType } from '@prisma/client';
import { format } from 'date-fns';
import {
  FilePlus2Icon,
  MessageSquareIcon,
  PenLineIcon,
  XIcon
} from 'lucide-react';

import { ContactTimelineAddComment } from '@/components/dashboard/contacts/details/timeline/contact-timeline-add-comment';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ResponsiveScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { contactRecordLabel, contactStageLabel } from '@/constants/labels';
import { MediaQueries } from '@/constants/media-queries';
import { capitalize, getInitials } from '@/lib/utils';
import type { ContactDto } from '@/types/dtos/contact-dto';
import type { ProfileDto } from '@/types/dtos/profile-dto';
import type {
  ActivityTimelineEventDto,
  TimelineEventDto
} from '@/types/dtos/timeline-event-dto';

/* ─── field meta ─────────────────────────────────────────── */
const fieldDisplay: Record<string, { label: string; description: string }> = {
  name: { label: 'Name', description: 'Full name of the contact' },
  email: { label: 'Email', description: 'Email address' },
  phone: { label: 'Phone', description: 'Phone number' },
  address: { label: 'Address', description: 'Mailing or office address' },
  message: { label: 'Message', description: 'Message left in the form' },
  description: {
    label: 'Description',
    description: 'Notes about this contact'
  },
  productInterest: {
    label: 'Product interest',
    description: 'Product the contact is interested in'
  },
  hearAboutUs: {
    label: 'Heard about us via',
    description: 'How the contact discovered us'
  },
  record: { label: 'Record type', description: 'Person or company' },
  stage: { label: 'Stage', description: 'Pipeline stage' },
  tags: { label: 'Tags', description: 'Tags attached to this contact' },
  image: { label: 'Avatar', description: 'Contact avatar image' },
  jobTitle: { label: 'Job title', description: 'Contact job title' },
  company: { label: 'Company', description: 'Company or organisation' },
  website: { label: 'Website', description: 'Website URL' },
  linkedIn: { label: 'LinkedIn', description: 'LinkedIn profile URL' },
  country: { label: 'Country', description: 'Country of the contact' },
  timezone: { label: 'Timezone', description: 'Contact timezone' },
  leadSource: {
    label: 'Lead source',
    description: 'How this lead was acquired'
  },
  leadSourceDate: {
    label: 'Lead source date',
    description: 'Date of lead acquisition'
  },
  lastContactedAt: {
    label: 'Last contacted',
    description: 'Date last contacted'
  },
  lastContactedNote: {
    label: 'Last contact note',
    description: 'Note from last contact'
  },
  lastMeetingAt: { label: 'Last meeting', description: 'Date of last meeting' },
  lastMeetingNote: {
    label: 'Last meeting note',
    description: 'Note from last meeting'
  },
  stripeCustomerId: {
    label: 'Stripe ID',
    description: 'Stripe customer identifier'
  }
};

const propertyLabelMap: Record<string, Record<string, string>> = {
  record: contactRecordLabel,
  stage: contactStageLabel
};

function describeField(key: string): { label: string; description: string } {
  return fieldDisplay[key] ?? { label: capitalize(key), description: '' };
}

function displayValue(property: string, value: string): string {
  if (!value) return '';
  return propertyLabelMap[property]?.[value] ?? value;
}

/* ─── action meta ────────────────────────────────────────── */
const actionLabel: Record<ActionType, string> = {
  [ActionType.CREATE]: 'Form submission',
  [ActionType.UPDATE]: 'Properties updated',
  [ActionType.DELETE]: 'Contact deleted'
};

const actionVariant: Record<
  ActionType,
  'default' | 'secondary' | 'destructive' | 'outline'
> = {
  [ActionType.CREATE]: 'default',
  [ActionType.UPDATE]: 'secondary',
  [ActionType.DELETE]: 'destructive'
};

const actionIcon: Record<
  ActionType,
  React.ComponentType<{ className?: string }>
> = {
  [ActionType.CREATE]: FilePlus2Icon,
  [ActionType.UPDATE]: PenLineIcon,
  [ActionType.DELETE]: PenLineIcon
};

/* ─── helpers ────────────────────────────────────────────── */
type FieldChange = {
  key: string;
  label: string;
  description: string;
  oldValue: string;
  newValue: string;
};

function parseFields(event: ActivityTimelineEventDto): FieldChange[] {
  if (!event.metadata || typeof event.metadata !== 'object') return [];
  return Object.entries(
    event.metadata as Record<string, { old?: string; new?: string }>
  )
    .filter(([key]) => key !== 'submission')
    .map(([key, value]) => {
      const { label, description } = describeField(key);
      return {
        key,
        label,
        description,
        oldValue: value?.old ?? '',
        newValue: value?.new ?? ''
      };
    });
}

function getActivitySummary(event: ActivityTimelineEventDto): string {
  if (!event.metadata || typeof event.metadata !== 'object') return '—';
  const keys = Object.keys(event.metadata as Record<string, unknown>).filter(
    (k) => k !== 'submission'
  );
  if (keys.length === 0) return '—';
  if (keys.length === 1)
    return fieldDisplay[keys[0] ?? '']?.label ?? keys[0] ?? '—';
  const first = fieldDisplay[keys[0] ?? '']?.label ?? keys[0] ?? '';
  const second = fieldDisplay[keys[1] ?? '']?.label ?? keys[1] ?? '';
  return `${first}, ${second}${keys.length > 2 ? ` +${keys.length - 2} more` : ''}`;
}

/* ─── details sheet ──────────────────────────────────────── */
type DetailsSheetProps = {
  event: ActivityTimelineEventDto | null;
  onClose: () => void;
};

function DetailsSheet({
  event,
  onClose
}: DetailsSheetProps): React.JSX.Element {
  const fields = event ? parseFields(event) : [];
  const isUpdate = event?.actionType === ActionType.UPDATE;

  return (
    <Sheet
      open={event !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 p-0 sm:max-w-lg"
      >
        <SheetHeader className="flex flex-row items-center justify-between border-b px-5 py-4">
          <SheetTitle className="text-sm font-semibold">
            {event ? actionLabel[event.actionType] : ''}
          </SheetTitle>
          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-7 shrink-0"
            >
              <XIcon className="size-4" />
            </Button>
          </SheetClose>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          {fields.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-muted-foreground">
              No details available.
            </p>
          ) : isUpdate ? (
            /* UPDATE: vertical rows with old → new */
            <div className="divide-y">
              {fields.map(({ key, label, description, oldValue, newValue }) => (
                <div
                  key={key}
                  className="grid grid-cols-[160px_1fr] gap-4 px-5 py-3.5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium text-foreground">
                      {label}
                    </p>
                    {description && (
                      <p className="mt-0.5 text-[11px] text-muted-foreground">
                        {description}
                      </p>
                    )}
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    {oldValue ? (
                      <>
                        <p className="break-words text-xs text-muted-foreground line-through">
                          {displayValue(key, oldValue)}
                        </p>
                        <p className="break-words text-sm font-medium text-foreground">
                          {displayValue(key, newValue) || (
                            <span className="font-normal text-muted-foreground opacity-60">
                              Empty
                            </span>
                          )}
                        </p>
                      </>
                    ) : (
                      <p className="break-words text-sm font-medium text-foreground">
                        {displayValue(key, newValue) || (
                          <span className="font-normal text-muted-foreground opacity-60">
                            Empty
                          </span>
                        )}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* CREATE: label on top, value below, full-width rows */
            <div className="divide-y">
              {fields.map(({ key, label, newValue }) => (
                <div
                  key={key}
                  className="px-5 py-3.5"
                >
                  <p className="mb-1 text-[11px] font-medium text-muted-foreground">
                    {label}
                  </p>
                  <p className="break-words text-sm font-medium text-foreground">
                    {displayValue(key, newValue) || (
                      <span className="font-normal text-muted-foreground opacity-50">
                        —
                      </span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {event && (
          <div className="border-t px-5 py-3 text-[11px] text-muted-foreground">
            {format(event.occurredAt, 'd MMM yyyy · HH:mm:ss')}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

/* ─── main component ─────────────────────────────────────── */
export type ContactActivityProps = {
  profile: ProfileDto;
  contact: ContactDto;
  events: TimelineEventDto[];
};

export function ContactActivity({
  profile,
  contact,
  events
}: ContactActivityProps): React.JSX.Element {
  const [showComments, setShowComments] = React.useState<boolean>(true);
  const [selectedEvent, setSelectedEvent] =
    React.useState<ActivityTimelineEventDto | null>(null);

  const visibleEvents = showComments
    ? events
    : events.filter((e) => e.type !== 'comment');

  return (
    <ResponsiveScrollArea
      breakpoint={MediaQueries.MdUp}
      mediaQueryOptions={{ ssr: true }}
      className="h-full"
    >
      <div className="flex size-full flex-col">
        {/* Comment box */}
        <div className="border-b p-6">
          <ContactTimelineAddComment
            profile={profile}
            contact={contact}
            showComments={showComments}
            onShowCommentsChange={setShowComments}
          />
        </div>

        {/* Activity table */}
        {visibleEvents.length === 0 ? (
          <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
            No activity yet.
          </div>
        ) : (
          <Table>
            <TableHeader className="sticky top-0 z-20 shadow-sm">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-32 pl-4">Date</TableHead>
                <TableHead className="w-20">Time</TableHead>
                <TableHead className="w-40">User</TableHead>
                <TableHead className="w-44">Action</TableHead>
                <TableHead>Details</TableHead>
                <TableHead className="w-24" />
              </TableRow>
            </TableHeader>
            <TableBody showLastRowBorder>
              {visibleEvents.map((event) => {
                const occurredAt =
                  event.type === 'activity'
                    ? event.occurredAt
                    : event.createdAt;
                const actor =
                  event.type === 'activity' ? event.actor : event.sender;
                const actorName = actor.name || 'Contact form';

                if (event.type === 'comment') {
                  return (
                    <TableRow key={event.id}>
                      <TableCell className="pl-4 text-xs tabular-nums text-muted-foreground">
                        {format(occurredAt, 'dd MMM yyyy')}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {format(occurredAt, 'HH:mm')}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="size-6 shrink-0 rounded-full">
                            <AvatarImage
                              src={actor.image}
                              alt="avatar"
                            />
                            <AvatarFallback className="text-[10px]">
                              {getInitials(actorName)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="truncate text-xs font-medium">
                            {actorName}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1.5">
                          <MessageSquareIcon className="size-3.5 shrink-0 text-muted-foreground" />
                          <Badge
                            variant="outline"
                            className="text-[11px]"
                          >
                            Comment
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate text-xs text-muted-foreground">
                        {event.text}
                      </TableCell>
                      <TableCell />
                    </TableRow>
                  );
                }

                const Icon = actionIcon[event.actionType];
                const fields = parseFields(event);
                return (
                  <TableRow key={event.id}>
                    <TableCell className="pl-4 text-xs tabular-nums text-muted-foreground">
                      {format(occurredAt, 'dd MMM yyyy')}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {format(occurredAt, 'HH:mm')}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="size-6 shrink-0 rounded-full">
                          <AvatarImage
                            src={actor.image}
                            alt="avatar"
                          />
                          <AvatarFallback className="text-[10px]">
                            {getInitials(actorName) || 'CF'}
                          </AvatarFallback>
                        </Avatar>
                        <span className="truncate text-xs font-medium">
                          {actorName}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <Icon className="size-3.5 shrink-0 text-muted-foreground" />
                        <Badge
                          variant={actionVariant[event.actionType]}
                          className="text-[11px]"
                        >
                          {actionLabel[event.actionType]}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {getActivitySummary(event)}
                    </TableCell>
                    <TableCell>
                      {fields.length > 0 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-7 px-2.5 text-[11px]"
                          onClick={() => setSelectedEvent(event)}
                        >
                          Details
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>

      <DetailsSheet
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </ResponsiveScrollArea>
  );
}
