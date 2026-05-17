import * as React from 'react';
import Link from 'next/link';
import { type Metadata } from 'next';
import { revalidateTag } from 'next/cache';
import { after } from 'next/server';
import { ContactMeetingStatus } from '@prisma/client';
import { format } from 'date-fns';
import { ExternalLinkIcon, VideoIcon } from 'lucide-react';

import { ClientBookMeetingButton } from '@/components/dashboard/client-portal/client-book-meeting-button';
import { ClientUnlinkedNotice } from '@/components/dashboard/client-portal/client-unlinked-notice';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Page,
  PageActions,
  PageBody,
  PageHeader,
  PagePrimaryBar,
  PageTitle
} from '@/components/ui/page';
import { Routes } from '@/constants/routes';
import { Caching, OrganizationCacheKey } from '@/data/caching';
import { getClientMeetings } from '@/data/client-portal/get-client-meetings';
import { getCalendlyMeetingsForContact } from '@/data/contacts/get-calendly-meetings-for-contact';
import { requireClientRole } from '@/lib/auth/require-client-role';
import { prisma } from '@/lib/db/prisma';
import { cn, createTitle } from '@/lib/utils';
import type { ContactMeetingDto } from '@/types/dtos/contact-meeting-dto';

export const metadata: Metadata = {
  title: createTitle('My meetings')
};

type SearchParams = { showAllPast?: string };

export default async function ClientMeetingsPage({
  searchParams
}: {
  searchParams: Promise<SearchParams>;
}): Promise<React.JSX.Element> {
  const { showAllPast: showAllPastParam } = await searchParams;
  const showAllPast = showAllPastParam === '1';
  const { link } = await requireClientRole();
  if (!link) {
    return <ClientUnlinkedNotice title="My meetings" />;
  }

  // Visiting the list counts as "seen" — clear every unseen meeting for this
  // client so the sidebar badge drops. Deferred via `after()` because
  // `revalidateTag` can't run during render in Next 15.
  const cleared = await prisma.contactMeeting.updateMany({
    where: { contactId: link.contactId, clientUnread: true },
    data: { clientUnread: false }
  });
  if (cleared.count > 0) {
    after(() => {
      revalidateTag(
        Caching.createOrganizationTag(
          OrganizationCacheKey.ContactMeetings,
          link.organizationId,
          link.contactId
        )
      );
    });
  }

  const [dbMeetings, calendlyMeetings] = await Promise.all([
    getClientMeetings(link),
    getCalendlyMeetingsForContact({
      contactId: link.contactId,
      contactEmail: link.email
    })
  ]);

  const meetings: ContactMeetingDto[] = [
    ...calendlyMeetings,
    ...dbMeetings.map<ContactMeetingDto>((m) => ({
      id: m.id,
      contactId: link.contactId,
      title: m.title,
      description: m.description ?? undefined,
      startsAt: m.startsAt,
      endsAt: m.endsAt,
      location: m.location ?? undefined,
      status: m.status,
      createdAt: m.createdAt,
      updatedAt: m.updatedAt,
      source: 'crm'
    }))
  ];

  const now = new Date();
  const nowMs = now.getTime();
  // Fix #1: hide cancelled meetings from Upcoming + Happening Now (they go to Past).
  // Fix #2: bucket by endsAt so a meeting in progress shows in "Happening now",
  //         not "Past".
  const happeningNow = meetings
    .filter(
      (m) =>
        m.status !== ContactMeetingStatus.CANCELLED &&
        m.startsAt.getTime() <= nowMs &&
        m.endsAt.getTime() >= nowMs
    )
    .sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime());
  const upcoming = meetings
    .filter(
      (m) =>
        m.status !== ContactMeetingStatus.CANCELLED &&
        m.startsAt.getTime() > nowMs
    )
    .sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime());
  const past = meetings
    .filter(
      (m) =>
        m.status === ContactMeetingStatus.CANCELLED ||
        m.endsAt.getTime() < nowMs
    )
    .sort((a, b) => b.startsAt.getTime() - a.startsAt.getTime());

  return (
    <Page>
      <PageHeader>
        <PagePrimaryBar>
          <PageTitle>My meetings</PageTitle>
          <PageActions>
            <ClientBookMeetingButton />
          </PageActions>
        </PagePrimaryBar>
      </PageHeader>
      <PageBody>
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-6">
          <p className="text-sm text-muted-foreground">
            Calls and on-site visits scheduled with your project team.
          </p>

          {happeningNow.length > 0 && (
            <Section
              title={`Happening now · ${happeningNow.length}`}
              accent="ring-1 ring-emerald-300"
            >
              <MeetingList
                meetings={happeningNow}
                now={now}
                highlight
              />
            </Section>
          )}

          <Section title={`Upcoming · ${upcoming.length}`}>
            {upcoming.length === 0 ? (
              <EmptyUpcoming />
            ) : (
              <MeetingList
                meetings={upcoming}
                now={now}
              />
            )}
          </Section>

          <PastSection
            past={past}
            now={now}
            showAll={showAllPast}
          />
        </div>
      </PageBody>
    </Page>
  );
}

function Section({
  title,
  accent,
  children
}: React.PropsWithChildren<{
  title: string;
  accent?: string;
}>): React.JSX.Element {
  return (
    <section className={cn('overflow-hidden rounded-lg border bg-card', accent)}>
      <h2 className="border-b bg-muted/40 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
}

function isUrl(value: string): boolean {
  return /^https?:\/\//i.test(value);
}

function joinLabelFor(url: string): string {
  const u = url.toLowerCase();
  if (u.includes('meet.google.com')) return 'Join Google Meet';
  if (u.includes('zoom.us')) return 'Join Zoom';
  if (u.includes('teams.microsoft.com') || u.includes('teams.live.com'))
    return 'Join Teams';
  if (u.includes('gotomeeting.com') || u.includes('gotomeet.me'))
    return 'Join GoToMeeting';
  if (u.includes('webex.com')) return 'Join Webex';
  return 'Join meeting';
}

// Fix #4: a past CONFIRMED/PENDING meeting is shown as Completed.
function displayStatus(
  status: ContactMeetingStatus,
  endsAt: Date,
  now: Date
): ContactMeetingStatus {
  if (endsAt.getTime() < now.getTime()) {
    if (
      status === ContactMeetingStatus.CONFIRMED ||
      status === ContactMeetingStatus.PENDING
    ) {
      return ContactMeetingStatus.COMPLETED;
    }
  }
  return status;
}

function Empty({ message }: { message: string }): React.JSX.Element {
  return <p className="px-4 py-6 text-sm text-muted-foreground">{message}</p>;
}

const PAST_PAGE_SIZE = 20;

function PastSection({
  past,
  now,
  showAll
}: {
  past: ContactMeetingDto[];
  now: Date;
  showAll: boolean;
}): React.JSX.Element {
  const shown = showAll ? past : past.slice(0, PAST_PAGE_SIZE);
  const hasMore = !showAll && past.length > PAST_PAGE_SIZE;
  return (
    <Section title={`Past · ${past.length}`}>
      {past.length === 0 ? (
        <Empty message="No past meetings." />
      ) : (
        <>
          <MeetingList
            meetings={shown}
            now={now}
            muted
          />
          {hasMore && (
            <div className="border-t bg-muted/20 px-4 py-2 text-center">
              <Link
                href={`${Routes.ClientMeetings}?showAllPast=1`}
                className="text-xs font-medium text-primary underline"
              >
                Show all {past.length}
              </Link>
            </div>
          )}
        </>
      )}
    </Section>
  );
}

function EmptyUpcoming(): React.JSX.Element {
  return (
    <div className="flex flex-col items-center gap-3 px-4 py-8 text-center">
      <p className="text-sm text-muted-foreground">No upcoming meetings.</p>
      <ClientBookMeetingButton />
    </div>
  );
}

function MeetingList({
  meetings,
  now,
  muted,
  highlight
}: {
  meetings: ContactMeetingDto[];
  now: Date;
  muted?: boolean;
  highlight?: boolean;
}): React.JSX.Element {
  return (
    <ul className="divide-y">
      {meetings.map((m) => {
        const locationIsUrl = !!m.location && isUrl(m.location);
        const status = displayStatus(m.status, m.endsAt, now);
        const isCalendly = m.source === 'calendly';
        const detailHref = !isCalendly
          ? `${Routes.ClientMeetings}/${m.id}`
          : null;
        const RowBody = (
          <>
            <div className="flex size-12 shrink-0 flex-col items-center justify-center rounded-md border bg-background">
              <div className="text-[10px] font-semibold uppercase text-muted-foreground">
                {format(m.startsAt, 'MMM')}
              </div>
              <div className="text-base font-bold leading-none">
                {format(m.startsAt, 'dd')}
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">{m.title}</div>
              <div className="mt-0.5 truncate text-xs text-muted-foreground">
                {format(m.startsAt, 'EEE')} · {format(m.startsAt, 'h:mm a')} –{' '}
                {format(m.endsAt, 'h:mm a')}
                {m.location && !locationIsUrl ? ` · ${m.location}` : ''}
              </div>
              {m.description && (
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground/80">
                  {m.description}
                </p>
              )}
            </div>
          </>
        );
        return (
          <li
            key={m.id}
            className={cn(
              'flex flex-row items-center gap-4 px-4 py-3',
              muted && 'opacity-80',
              highlight && 'bg-emerald-50/60'
            )}
          >
            {detailHref ? (
              <Link
                href={detailHref}
                className="flex min-w-0 flex-1 items-center gap-4 rounded-md transition-colors hover:bg-accent/40 -mx-1 px-1 py-1"
              >
                {RowBody}
              </Link>
            ) : (
              <div className="flex min-w-0 flex-1 items-center gap-4">
                {RowBody}
              </div>
            )}
            {locationIsUrl && m.location && (
              <Button
                asChild
                variant="default"
                size="sm"
                className="shrink-0 gap-1.5"
              >
                <a
                  href={m.location}
                  target="_blank"
                  rel="noreferrer"
                >
                  <VideoIcon className="size-3.5" />
                  <span className="hidden sm:inline">
                    {joinLabelFor(m.location)}
                  </span>
                  <ExternalLinkIcon className="size-3 opacity-70 sm:hidden" />
                </a>
              </Button>
            )}
            <Badge
              variant="secondary"
              className={statusClasses(status)}
            >
              {statusLabel(status)}
            </Badge>
          </li>
        );
      })}
    </ul>
  );
}

function statusLabel(status: ContactMeetingStatus): string {
  switch (status) {
    case ContactMeetingStatus.CONFIRMED:
      return 'Confirmed';
    case ContactMeetingStatus.PENDING:
      return 'Pending';
    case ContactMeetingStatus.COMPLETED:
      return 'Completed';
    case ContactMeetingStatus.CANCELLED:
      return 'Cancelled';
  }
}

function statusClasses(status: ContactMeetingStatus): string {
  switch (status) {
    case ContactMeetingStatus.CONFIRMED:
      return 'border-transparent bg-blue-100 text-blue-800';
    case ContactMeetingStatus.PENDING:
      return 'border-transparent bg-amber-100 text-amber-800';
    case ContactMeetingStatus.COMPLETED:
      return 'border-transparent bg-emerald-100 text-emerald-800';
    case ContactMeetingStatus.CANCELLED:
      return 'border-transparent bg-muted text-muted-foreground';
  }
}

