import * as React from 'react';
import Link from 'next/link';
import { type Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { ContactMeetingStatus, Role } from '@prisma/client';
import { format, formatDistanceToNow } from 'date-fns';
import {
  ChevronLeftIcon,
  ClockIcon,
  DownloadIcon,
  ExternalLinkIcon,
  FileIcon,
  MapPinIcon,
  VideoIcon
} from 'lucide-react';
import { validate as uuidValidate } from 'uuid';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Page,
  PageBody,
  PageHeader,
  PagePrimaryBar,
  PageTitle
} from '@/components/ui/page';
import { Routes } from '@/constants/routes';
import { dedupedAuth } from '@/lib/auth';
import { getClientContactLink } from '@/lib/auth/get-client-contact';
import { getLoginRedirect } from '@/lib/auth/redirect';
import { checkSession } from '@/lib/auth/session';
import { prisma } from '@/lib/db/prisma';
import { cn, createTitle } from '@/lib/utils';

type Params = { meetingId: string };

export async function generateMetadata({
  params
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { meetingId } = await params;
  if (!uuidValidate(meetingId)) {
    return { title: createTitle('Meeting') };
  }
  const meeting = await prisma.contactMeeting.findUnique({
    where: { id: meetingId },
    select: { title: true }
  });
  return { title: createTitle(meeting?.title ?? 'Meeting') };
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

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default async function ClientMeetingDetailPage({
  params
}: {
  params: Promise<Params>;
}): Promise<React.JSX.Element> {
  const { meetingId } = await params;
  if (!uuidValidate(meetingId)) {
    notFound();
  }

  const session = await dedupedAuth();
  if (!checkSession(session)) {
    return redirect(getLoginRedirect());
  }

  const userFromDb = await prisma.user.findFirst({
    where: { id: session.user.id },
    select: { role: true }
  });
  if (!userFromDb || userFromDb.role !== Role.CLIENT) {
    return redirect(Routes.Home);
  }

  const link = await getClientContactLink(session.user.id);
  if (!link) {
    return redirect(Routes.ClientMeetings);
  }

  const meeting = await prisma.contactMeeting.findFirst({
    where: {
      id: meetingId,
      contactId: link.contactId
    },
    select: {
      id: true,
      title: true,
      description: true,
      startsAt: true,
      endsAt: true,
      location: true,
      status: true,
      createdAt: true,
      files: {
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          contentType: true,
          size: true,
          createdAt: true
        }
      }
    }
  });
  if (!meeting) {
    notFound();
  }

  const now = new Date();
  const status = displayStatus(meeting.status, meeting.endsAt, now);
  const locationIsUrl = !!meeting.location && isUrl(meeting.location);
  const isUpcoming = meeting.endsAt.getTime() >= now.getTime();
  const durationMin = Math.max(
    1,
    Math.round(
      (meeting.endsAt.getTime() - meeting.startsAt.getTime()) / 60000
    )
  );

  return (
    <Page>
      <PageHeader>
        <PagePrimaryBar>
          <div className="flex min-w-0 items-center gap-2">
            <Link
              href={Routes.ClientMeetings}
              className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
              title="Back to My Meetings"
            >
              <ChevronLeftIcon className="size-4" />
            </Link>
            <PageTitle className="truncate">{meeting.title}</PageTitle>
          </div>
          <Badge
            variant="secondary"
            className={statusClasses(status)}
          >
            {statusLabel(status)}
          </Badge>
        </PagePrimaryBar>
      </PageHeader>
      <PageBody>
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
          {/* Hero card */}
          <section className="flex flex-col gap-4 rounded-xl border bg-card p-5 sm:flex-row sm:items-start">
            <div className="flex size-16 shrink-0 flex-col items-center justify-center rounded-lg border bg-background shadow-sm">
              <div className="text-[10px] font-semibold uppercase text-muted-foreground">
                {format(meeting.startsAt, 'MMM')}
              </div>
              <div className="text-2xl font-bold leading-none">
                {format(meeting.startsAt, 'dd')}
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {isUpcoming ? 'Upcoming' : 'Past'}
              </p>
              <p className="mt-0.5 text-base font-semibold">
                {format(meeting.startsAt, 'EEEE, MMM d, yyyy')}
              </p>
              <p className="mt-1 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
                <ClockIcon className="size-3.5" />
                {format(meeting.startsAt, 'h:mm a')} –{' '}
                {format(meeting.endsAt, 'h:mm a')}
                <span className="text-[11px] text-muted-foreground/70">
                  ({durationMin} min)
                </span>
              </p>
              {meeting.location && !locationIsUrl && (
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPinIcon className="size-3.5" />
                  {meeting.location}
                </p>
              )}
            </div>
            {locationIsUrl && meeting.location && isUpcoming && (
              <Button
                asChild
                variant="default"
                size="default"
                className="gap-1.5"
              >
                <a
                  href={meeting.location}
                  target="_blank"
                  rel="noreferrer"
                >
                  <VideoIcon className="size-4" />
                  {joinLabelFor(meeting.location)}
                  <ExternalLinkIcon className="size-3 opacity-70" />
                </a>
              </Button>
            )}
          </section>

          {/* Description */}
          {meeting.description && (
            <section className="rounded-lg border bg-card">
              <h2 className="border-b bg-muted/40 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Details
              </h2>
              <p className="whitespace-pre-wrap px-4 py-3 text-sm leading-relaxed">
                {meeting.description}
              </p>
            </section>
          )}

          {/* Files */}
          <section className="overflow-hidden rounded-lg border bg-card">
            <h2 className="border-b bg-muted/40 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Files · {meeting.files.length}
            </h2>
            {meeting.files.length === 0 ? (
              <p className="px-4 py-6 text-sm text-muted-foreground">
                No files attached to this meeting.
              </p>
            ) : (
              <ul className="divide-y">
                {meeting.files.map((f) => (
                  <li
                    key={f.id}
                    className="flex items-center gap-3 px-4 py-3"
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-md border bg-background">
                      <FileIcon className="size-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{f.name}</p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">
                        {formatFileSize(f.size)} · uploaded{' '}
                        {formatDistanceToNow(f.createdAt, { addSuffix: true })}
                      </p>
                    </div>
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="gap-1.5"
                    >
                      <a href={`/api/meeting-files/${f.id}?download=1`}>
                        <DownloadIcon className="size-3.5" />
                        Download
                      </a>
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </PageBody>
    </Page>
  );
}
