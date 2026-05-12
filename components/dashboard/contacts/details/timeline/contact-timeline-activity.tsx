'use client';

import * as React from 'react';
import { ActionType } from '@prisma/client';
import { format, formatDistanceToNow } from 'date-fns';
import { ClockIcon, FilePlus2Icon } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { contactRecordLabel, contactStageLabel } from '@/constants/labels';
import { capitalize, getInitials } from '@/lib/utils';
import type { ActivityTimelineEventDto } from '@/types/dtos/timeline-event-dto';

export interface ContactTimelineActivityProps {
  event: ActivityTimelineEventDto;
}

type FieldChange = {
  key: string;
  label: string;
  description: string;
  oldValue: string;
  newValue: string;
};

const propertyLabelMap: Record<string, Record<string, string>> = {
  record: contactRecordLabel,
  stage: contactStageLabel
};

const fieldDisplay: Record<string, { label: string; description: string }> = {
  name: { label: 'Name', description: 'Full name of the contact' },
  email: { label: 'Email', description: 'Email address used to reach out' },
  phone: { label: 'Phone', description: 'Phone number provided' },
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
  website: { label: 'Website', description: 'Company or personal website' },
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

function describeField(key: string): { label: string; description: string } {
  return (
    fieldDisplay[key] ?? {
      label: capitalize(key),
      description: ''
    }
  );
}

function displayValue(property: string, value: string): string {
  if (!value) return '';
  return propertyLabelMap[property]?.[value] || value;
}

export function ContactTimelineActivity({
  event
}: ContactTimelineActivityProps): React.JSX.Element {
  const fields: FieldChange[] = React.useMemo(() => {
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
  }, [event.metadata]);

  const actorName = event.actor.name || 'Contact form';
  const headline = actionTypeToText[event.actionType];

  return (
    <div className="flex w-full items-start space-x-4">
      <Avatar
        title={actorName}
        className="relative ml-0.5 size-6 flex-none rounded-full"
      >
        <AvatarImage
          src={event.actor.image}
          alt="avatar"
        />
        <AvatarFallback className="size-6 text-[10px]">
          {getInitials(actorName) || 'CF'}
        </AvatarFallback>
      </Avatar>
      <div className="mt-1 min-w-0 grow space-y-2">
        <h3 className="text-xs font-medium">
          {actorName}{' '}
          <span className="font-normal text-muted-foreground">{headline}</span>
        </h3>

        {fields.length > 0 && (
          <SubmissionDetailsCard
            actionType={event.actionType}
            fields={fields}
          />
        )}

        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <div className="flex w-fit items-center space-x-1 text-xs text-muted-foreground">
              <ClockIcon className="size-3 shrink-0" />
              <time suppressHydrationWarning>
                {formatDistanceToNow(event.occurredAt, { addSuffix: true })}
              </time>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            {format(event.occurredAt, 'd MMM yyyy HH:mm:ss')}
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}

const actionTypeToText: Record<ActionType, string> = {
  [ActionType.CREATE]: 'submitted the form.',
  [ActionType.UPDATE]: 'updated the contact.',
  [ActionType.DELETE]: 'deleted the contact.'
};

const actionMeta: Record<
  ActionType,
  {
    title: string;
    subtitle: string;
    Icon: React.ComponentType<{ className?: string }>;
    showDiff: boolean;
  }
> = {
  [ActionType.CREATE]: {
    title: 'Form submission',
    subtitle: 'Details captured from the contact form',
    Icon: FilePlus2Icon,
    showDiff: false
  },
  [ActionType.UPDATE]: {
    title: 'Properties updated',
    subtitle: 'Fields changed on this contact',
    Icon: FilePlus2Icon,
    showDiff: true
  },
  [ActionType.DELETE]: {
    title: 'Contact deleted',
    subtitle: 'This contact was removed',
    Icon: FilePlus2Icon,
    showDiff: false
  }
};

type SubmissionDetailsCardProps = {
  actionType: ActionType;
  fields: FieldChange[];
};

function SubmissionDetailsCard({
  actionType,
  fields
}: SubmissionDetailsCardProps): React.JSX.Element {
  const { title, subtitle, Icon, showDiff } = actionMeta[actionType];
  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
      <div className="flex items-center gap-3 border-b bg-muted/30 px-4 py-3">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-4" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold leading-none">{title}</p>
          <p className="mt-1 truncate text-xs text-muted-foreground">
            {subtitle}
          </p>
        </div>
      </div>

      {showDiff ? (
        /* UPDATE — vertical list with old → new diff */
        <div className="divide-y text-sm">
          {fields.map(({ key, label, description, oldValue, newValue }) => (
            <div
              key={key}
              className="grid grid-cols-[140px_1fr] gap-3 px-4 py-3"
            >
              <div className="min-w-0">
                <p className="truncate text-xs font-medium text-foreground">
                  {label}
                </p>
                {description && (
                  <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-muted-foreground">
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
                    <p className="break-words text-sm text-foreground">
                      {displayValue(key, newValue) || (
                        <span className="text-muted-foreground opacity-65">Empty</span>
                      )}
                    </p>
                  </>
                ) : (
                  <p className="break-words text-sm text-foreground">
                    {displayValue(key, newValue) || (
                      <span className="text-muted-foreground opacity-65">Empty</span>
                    )}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* CREATE — horizontal column grid: label on top, value below, right border between */
        <div
          className="grid text-sm"
          style={{
            gridTemplateColumns: `repeat(${Math.min(fields.length, 6)}, minmax(0, 1fr))`
          }}
        >
          {fields.map(({ key, label, newValue }, index) => (
            <div
              key={key}
              className={`flex min-w-0 flex-col gap-2 p-3 ${
                index < fields.length - 1 ? 'border-r' : ''
              }`}
            >
              <p className="truncate text-[11px] font-medium text-muted-foreground">
                {label}
              </p>
              <p
                className="truncate text-xs font-medium text-foreground"
                title={displayValue(key, newValue)}
              >
                {displayValue(key, newValue) || (
                  <span className="text-muted-foreground opacity-50">—</span>
                )}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
