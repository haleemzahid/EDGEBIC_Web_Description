import * as React from 'react';
import Link from 'next/link';
import { type Metadata } from 'next';
import { redirect } from 'next/navigation';
import {
  ContactMeetingStatus,
  EmailFolder,
  Role,
  type ContactTicketStatus
} from '@prisma/client';
import { format, formatDistanceToNow } from 'date-fns';
import {
  CalendarIcon,
  CreditCardIcon,
  LifeBuoyIcon,
  MailIcon
} from 'lucide-react';

import { OpenTicketAction } from '@/components/dashboard/client-portal/open-ticket-action';
import { Badge } from '@/components/ui/badge';
import {
  Page,
  PageBody,
  PageHeader,
  PagePrimaryBar,
  PageTitle
} from '@/components/ui/page';
import { Routes } from '@/constants/routes';
import { getCalendlyMeetingsForContact } from '@/data/contacts/get-calendly-meetings-for-contact';
import { dedupedAuth } from '@/lib/auth';
import { getClientContactLink } from '@/lib/auth/get-client-contact';
import { getLoginRedirect } from '@/lib/auth/redirect';
import { checkSession } from '@/lib/auth/session';
import { prisma } from '@/lib/db/prisma';
import { cn, createTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: createTitle('Welcome')
};

type ActivityItem = {
  kind: 'meeting' | 'ticket' | 'message' | 'purchase';
  title: string;
  subtitle?: string;
  at: Date;
  href: string;
};

function timeOfDayGreeting(date: Date): string {
  const h = date.getHours();
  if (h < 5) return 'Hello';
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

function ticketStatusLabel(status: ContactTicketStatus): string {
  switch (status) {
    case 'OPEN':
      return 'Open';
    case 'PENDING':
      return 'In progress';
    case 'RESOLVED':
      return 'Resolved';
    case 'CLOSED':
      return 'Closed';
  }
}

export default async function WelcomePage(): Promise<React.JSX.Element> {
  const session = await dedupedAuth();
  if (!checkSession(session)) {
    return redirect(getLoginRedirect());
  }

  const userFromDb = await prisma.user.findFirst({
    where: { id: session.user.id },
    select: {
      name: true,
      role: true,
      organization: { select: { name: true } }
    }
  });

  if (!userFromDb) {
    return redirect(getLoginRedirect());
  }

  if (userFromDb.role !== Role.CLIENT) {
    return redirect(Routes.Home);
  }

  const link = await getClientContactLink(session.user.id);

  const now = new Date();
  const greeting = timeOfDayGreeting(now);
  const firstName = userFromDb.name.split(' ')[0];

  if (!link) {
    return (
      <Page>
        <PageHeader>
          <PagePrimaryBar>
            <PageTitle>Welcome</PageTitle>
          </PagePrimaryBar>
        </PageHeader>
        <PageBody>
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-6">
            <header className="flex flex-col gap-2">
              <h1 className="text-2xl font-semibold tracking-tight">
                {greeting}, {firstName}
              </h1>
              {userFromDb.organization?.name && (
                <p className="text-sm text-muted-foreground">
                  You&apos;re signed in to {userFromDb.organization.name} as a
                  client.
                </p>
              )}
            </header>
            <p className="rounded-md border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
              Your client profile isn&apos;t linked to a contact in the CRM
              yet. Please ask your project owner to complete the link.
            </p>
          </div>
        </PageBody>
      </Page>
    );
  }

  // -- Data in parallel ---------------------------------------------------
  const [
    dbUpcomingMeetingsCount,
    nextDbMeeting,
    openTicketsCount,
    unreadMessagesCount,
    purchasesCount,
    calendlyMeetings,
    recentMeetings,
    recentTickets,
    recentMessages,
    recentPurchases
  ] = await Promise.all([
    prisma.contactMeeting.count({
      where: {
        contactId: link.contactId,
        startsAt: { gte: now },
        status: { not: ContactMeetingStatus.CANCELLED }
      }
    }),
    prisma.contactMeeting.findFirst({
      where: {
        contactId: link.contactId,
        startsAt: { gte: now },
        status: { not: ContactMeetingStatus.CANCELLED }
      },
      orderBy: { startsAt: 'asc' },
      select: {
        id: true,
        title: true,
        startsAt: true,
        endsAt: true,
        location: true
      }
    }),
    prisma.contactTicket.count({
      where: {
        contactId: link.contactId,
        status: { in: ['OPEN', 'PENDING'] }
      }
    }),
    prisma.contactEmailThread.count({
      where: { contactId: link.contactId, unread: true }
    }),
    prisma.purchase.count({ where: { email: link.email } }),
    getCalendlyMeetingsForContact({
      contactId: link.contactId,
      contactEmail: link.email
    }),
    prisma.contactMeeting.findMany({
      where: { contactId: link.contactId },
      orderBy: { updatedAt: 'desc' },
      take: 5,
      select: {
        id: true,
        title: true,
        startsAt: true,
        updatedAt: true
      }
    }),
    prisma.contactTicket.findMany({
      where: { contactId: link.contactId },
      orderBy: { updatedAt: 'desc' },
      take: 5,
      select: {
        id: true,
        number: true,
        title: true,
        status: true,
        updatedAt: true
      }
    }),
    prisma.contactEmailThread.findMany({
      where: { contactId: link.contactId },
      orderBy: { updatedAt: 'desc' },
      take: 5,
      select: {
        id: true,
        subject: true,
        folder: true,
        updatedAt: true
      }
    }),
    prisma.purchase.findMany({
      where: { email: link.email },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        amount: true,
        currency: true,
        status: true,
        createdAt: true
      }
    })
  ]);

  // -- Merge Calendly meetings into counts + next-meeting picker ----------
  const calendlyUpcoming = calendlyMeetings.filter(
    (m) =>
      m.startsAt.getTime() >= now.getTime() &&
      m.status !== ContactMeetingStatus.CANCELLED
  );
  const upcomingMeetings = dbUpcomingMeetingsCount + calendlyUpcoming.length;

  type CombinedMeeting = {
    id: string;
    title: string;
    startsAt: Date;
    endsAt: Date;
    location?: string | null;
    source: 'crm' | 'calendly';
  };
  const candidateNextMeetings: CombinedMeeting[] = [
    ...(nextDbMeeting
      ? [
          {
            id: nextDbMeeting.id,
            title: nextDbMeeting.title,
            startsAt: nextDbMeeting.startsAt,
            endsAt: nextDbMeeting.endsAt,
            location: nextDbMeeting.location,
            source: 'crm' as const
          }
        ]
      : []),
    ...calendlyUpcoming.map<CombinedMeeting>((m) => ({
      id: m.id,
      title: m.title,
      startsAt: m.startsAt,
      endsAt: m.endsAt,
      location: m.location ?? null,
      source: 'calendly'
    }))
  ];
  const nextMeeting = candidateNextMeetings.sort(
    (a, b) => a.startsAt.getTime() - b.startsAt.getTime()
  )[0];

  // -- Build the Recent Activity feed ------------------------------------
  const activity: ActivityItem[] = [
    ...recentMeetings.map<ActivityItem>((m) => ({
      kind: 'meeting',
      title: m.title,
      subtitle: `Meeting · ${format(m.startsAt, 'MMM d, h:mm a')}`,
      at: m.updatedAt,
      href: Routes.ClientMeetings
    })),
    ...recentTickets.map<ActivityItem>((t) => ({
      kind: 'ticket',
      title: t.title,
      subtitle: `Ticket #${t.number} · ${ticketStatusLabel(t.status)}`,
      at: t.updatedAt,
      href: `${Routes.ClientSupport}/${t.id}`
    })),
    ...recentMessages.map<ActivityItem>((thread) => ({
      kind: 'message',
      title: thread.subject,
      subtitle:
        thread.folder === EmailFolder.SENT ? 'Sent message' : 'Received message',
      at: thread.updatedAt,
      href: Routes.ClientMessages
    })),
    ...recentPurchases.map<ActivityItem>((p) => ({
      kind: 'purchase',
      title: `${(p.amount / 100).toFixed(2)} ${p.currency.toUpperCase()}`,
      subtitle: `Purchase · ${p.status}`,
      at: p.createdAt,
      href: Routes.ClientBilling
    }))
  ]
    .sort((a, b) => b.at.getTime() - a.at.getTime())
    .slice(0, 6);

  return (
    <Page>
      <PageHeader>
        <PagePrimaryBar>
          <PageTitle>Welcome</PageTitle>
        </PagePrimaryBar>
      </PageHeader>
      <PageBody>
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 p-6">
          <header className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              {greeting}, {firstName}
            </h1>
            {userFromDb.organization?.name && (
              <p className="text-sm text-muted-foreground">
                You&apos;re signed in to {userFromDb.organization.name} as a
                client.
              </p>
            )}
          </header>

          {nextMeeting && (
            <Link
              href={Routes.ClientMeetings}
              className="group flex items-start gap-4 rounded-xl border bg-gradient-to-br from-violet-50 to-sky-50 p-5 transition-colors hover:from-violet-100 hover:to-sky-100"
            >
              <div className="flex size-14 shrink-0 flex-col items-center justify-center rounded-lg border bg-background shadow-sm">
                <div className="text-[10px] font-semibold uppercase text-muted-foreground">
                  {format(nextMeeting.startsAt, 'MMM')}
                </div>
                <div className="text-xl font-bold leading-none">
                  {format(nextMeeting.startsAt, 'dd')}
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-violet-700">
                  Next meeting
                </p>
                <p className="mt-0.5 truncate text-base font-semibold">
                  {nextMeeting.title}
                </p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {format(nextMeeting.startsAt, 'EEE, MMM d')} ·{' '}
                  {format(nextMeeting.startsAt, 'h:mm a')} –{' '}
                  {format(nextMeeting.endsAt, 'h:mm a')}
                  {nextMeeting.location ? ` · ${nextMeeting.location}` : ''}
                </p>
              </div>
              {nextMeeting.source === 'calendly' && (
                <span className="rounded-sm border border-sky-200 bg-white px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-sky-700">
                  Calendly
                </span>
              )}
            </Link>
          )}

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SummaryCard
              icon={CalendarIcon}
              label="Upcoming meetings"
              value={upcomingMeetings}
              href={Routes.ClientMeetings}
              accent="text-violet-600"
            />
            <SummaryCard
              icon={LifeBuoyIcon}
              label="Open tickets"
              value={openTicketsCount}
              href={Routes.ClientSupport}
              accent="text-amber-600"
            />
            <SummaryCard
              icon={MailIcon}
              label="Unread messages"
              value={unreadMessagesCount}
              href={Routes.ClientMessages}
              accent="text-sky-600"
            />
            <SummaryCard
              icon={CreditCardIcon}
              label="Purchases"
              value={purchasesCount}
              href={Routes.ClientBilling}
              accent="text-emerald-600"
            />
          </section>

          <section>
            <h2 className="mb-2 text-sm font-semibold text-muted-foreground">
              Quick actions
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <ActionLink
                title="Schedule a meeting"
                description="Book time with your project contact."
                href={Routes.ClientMeetings}
              />
              <OpenTicketAction className="text-left">
                <ActionCardSurface
                  title="Open a support ticket"
                  description="Need help? Create a new ticket in seconds."
                />
              </OpenTicketAction>
            </div>
          </section>

          <section>
            <h2 className="mb-2 text-sm font-semibold text-muted-foreground">
              Recent activity
            </h2>
            <div className="overflow-hidden rounded-lg border bg-card">
              {activity.length === 0 ? (
                <p className="px-4 py-6 text-sm text-muted-foreground">
                  No recent activity yet.
                </p>
              ) : (
                <ul className="divide-y">
                  {activity.map((item, i) => (
                    <li key={i}>
                      <Link
                        href={item.href}
                        className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-accent/40"
                      >
                        <Badge
                          variant="outline"
                          className={cn('shrink-0 text-[10px]', activityClasses(item.kind))}
                        >
                          {activityLabel(item.kind)}
                        </Badge>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">
                            {item.title}
                          </p>
                          {item.subtitle && (
                            <p className="mt-0.5 truncate text-xs text-muted-foreground">
                              {item.subtitle}
                            </p>
                          )}
                        </div>
                        <span className="shrink-0 text-[11px] text-muted-foreground">
                          {formatDistanceToNow(item.at, { addSuffix: true })}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </div>
      </PageBody>
    </Page>
  );
}

type SummaryCardProps = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number | string;
  href: string;
  accent: string;
};

function SummaryCard({
  icon: Icon,
  label,
  value,
  href,
  accent
}: SummaryCardProps): React.JSX.Element {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-2 rounded-xl border bg-card p-4 shadow-sm transition-colors hover:bg-accent/50"
    >
      <div className="flex items-center gap-2">
        <Icon className={cn('size-4', accent)} />
        <span className="text-xs font-medium text-muted-foreground">
          {label}
        </span>
      </div>
      <div className="text-2xl font-semibold tracking-tight">{value}</div>
    </Link>
  );
}

type ActionLinkProps = {
  title: string;
  description: string;
  href: string;
};

function ActionLink({
  title,
  description,
  href
}: ActionLinkProps): React.JSX.Element {
  return (
    <Link
      href={href}
      className="block w-full text-left"
    >
      <ActionCardSurface
        title={title}
        description={description}
      />
    </Link>
  );
}

function ActionCardSurface({
  title,
  description
}: {
  title: string;
  description: string;
}): React.JSX.Element {
  return (
    <div className="flex flex-col gap-1 rounded-lg border bg-card p-4 transition-colors hover:bg-accent/40">
      <span className="text-sm font-semibold">{title}</span>
      <span className="text-xs text-muted-foreground">{description}</span>
    </div>
  );
}

function activityLabel(kind: ActivityItem['kind']): string {
  switch (kind) {
    case 'meeting':
      return 'Meeting';
    case 'ticket':
      return 'Ticket';
    case 'message':
      return 'Message';
    case 'purchase':
      return 'Purchase';
  }
}

function activityClasses(kind: ActivityItem['kind']): string {
  switch (kind) {
    case 'meeting':
      return 'border-violet-300 text-violet-700';
    case 'ticket':
      return 'border-amber-300 text-amber-700';
    case 'message':
      return 'border-sky-300 text-sky-700';
    case 'purchase':
      return 'border-emerald-300 text-emerald-700';
  }
}
