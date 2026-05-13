import * as React from 'react';
import Link from 'next/link';
import { type Metadata } from 'next';
import { redirect } from 'next/navigation';
import { EmailFolder, Role } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';

import { NewMessageButton } from '@/components/dashboard/client-portal/new-message-button';
import {
  Page,
  PageActions,
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

export const metadata: Metadata = {
  title: createTitle('Messages')
};

export default async function ClientMessagesPage(): Promise<React.JSX.Element> {
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
    return <UnlinkedNotice />;
  }

  const threads = await prisma.contactEmailThread.findMany({
    where: { contactId: link.contactId },
    orderBy: { updatedAt: 'desc' },
    select: {
      id: true,
      folder: true,
      subject: true,
      preview: true,
      unread: true,
      updatedAt: true
    }
  });

  return (
    <Page>
      <PageHeader>
        <PagePrimaryBar>
          <PageTitle>Messages</PageTitle>
          <PageActions>
            <NewMessageButton />
          </PageActions>
        </PagePrimaryBar>
      </PageHeader>
      <PageBody>
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-6">
          <p className="text-sm text-muted-foreground">
            Email conversations between you and your project team.
          </p>

          <section className="overflow-hidden rounded-lg border bg-card">
            <h2 className="border-b bg-muted/40 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {threads.length === 0
                ? 'No messages yet'
                : `${threads.length} thread${threads.length === 1 ? '' : 's'}`}
            </h2>
            {threads.length === 0 ? (
              <p className="px-4 py-6 text-sm text-muted-foreground">
                When your project team emails you, the conversation will
                appear here.
              </p>
            ) : (
              <ul className="divide-y">
                {threads.map((t) => (
                  <li key={t.id}>
                    <Link
                      href={`${Routes.ClientMessages}/${t.id}`}
                      className={cn(
                        'flex items-start gap-4 px-4 py-3 transition-colors hover:bg-accent/40',
                        t.unread && 'bg-sky-50/60 hover:bg-sky-50'
                      )}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-2">
                          <span
                            className={cn(
                              'truncate text-sm',
                              t.unread ? 'font-semibold' : 'font-medium'
                            )}
                          >
                            {t.subject}
                          </span>
                          <span className="ml-auto shrink-0 text-[11px] uppercase tracking-wide text-muted-foreground">
                            {t.folder === EmailFolder.SENT
                              ? 'Sent'
                              : 'Received'}
                          </span>
                        </div>
                        {t.preview && (
                          <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                            {t.preview}
                          </p>
                        )}
                        <p className="mt-1 text-[11px] text-muted-foreground">
                          {formatDistanceToNow(t.updatedAt, {
                            addSuffix: true
                          })}
                        </p>
                      </div>
                      {t.unread && (
                        <span className="mt-1 inline-block size-2 shrink-0 rounded-full bg-sky-500" />
                      )}
                    </Link>
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

function UnlinkedNotice(): React.JSX.Element {
  return (
    <Page>
      <PageHeader>
        <PagePrimaryBar>
          <PageTitle>Messages</PageTitle>
        </PagePrimaryBar>
      </PageHeader>
      <PageBody>
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 p-6">
          <p className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
            Your client profile isn&apos;t linked to a contact in the CRM yet.
            Please contact your project owner to complete the link.
          </p>
          <Link
            href={Routes.Welcome}
            className="text-sm text-primary underline"
          >
            Back to Home
          </Link>
        </div>
      </PageBody>
    </Page>
  );
}
