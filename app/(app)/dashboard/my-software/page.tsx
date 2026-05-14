import * as React from 'react';
import Link from 'next/link';
import { type Metadata } from 'next';
import { SoftwareStatus } from '@prisma/client';
import { format } from 'date-fns';
import { BookOpenIcon, DownloadIcon, ExternalLinkIcon } from 'lucide-react';

import { ClientUnlinkedNotice } from '@/components/dashboard/client-portal/client-unlinked-notice';
import { Badge } from '@/components/ui/badge';
import {
  Page,
  PageBody,
  PageHeader,
  PagePrimaryBar,
  PageTitle
} from '@/components/ui/page';
import { Routes } from '@/constants/routes';
import { getClientSoftware } from '@/data/client-portal/get-client-software';
import { requireClientRole } from '@/lib/auth/require-client-role';
import { cn, createTitle } from '@/lib/utils';

export const metadata: Metadata = {
  title: createTitle('My Software')
};

const statusConfig: Record<
  SoftwareStatus,
  { label: string; className: string }
> = {
  [SoftwareStatus.UP_TO_DATE]: {
    label: 'Up to date',
    className: 'border-transparent bg-emerald-100 text-emerald-800'
  },
  [SoftwareStatus.UPDATE_AVAILABLE]: {
    label: 'Update available',
    className: 'border-amber-300 bg-amber-50 text-amber-800'
  },
  [SoftwareStatus.NEEDS_ATTENTION]: {
    label: 'Needs attention',
    className: 'border-transparent bg-rose-100 text-rose-800'
  },
  [SoftwareStatus.TRIAL]: {
    label: 'Trial',
    className: 'border-transparent bg-blue-100 text-blue-800'
  },
  [SoftwareStatus.NOT_INSTALLED]: {
    label: 'Not installed',
    className: 'border-transparent bg-muted text-muted-foreground'
  }
};

export default async function ClientSoftwarePage(): Promise<React.JSX.Element> {
  const { link } = await requireClientRole();
  if (!link) {
    return <ClientUnlinkedNotice title="My Software" />;
  }

  const software = await getClientSoftware(link);

  return (
    <Page>
      <PageHeader>
        <PagePrimaryBar>
          <PageTitle>My Software</PageTitle>
        </PagePrimaryBar>
      </PageHeader>
      <PageBody>
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-6">
          <p className="text-sm text-muted-foreground">
            Software your team has provisioned for you. Reach out via{' '}
            <Link
              href={Routes.ClientSupport}
              className="text-primary underline"
            >
              Support
            </Link>{' '}
            if anything looks off.
          </p>

          {software.length === 0 ? (
            <EmptyState />
          ) : (
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {software.map((s) => (
                <SoftwareCard
                  key={s.id}
                  software={s}
                />
              ))}
            </ul>
          )}
        </div>
      </PageBody>
    </Page>
  );
}

type SoftwareCardItem = {
  id: string;
  name: string;
  installedVersion: string | null;
  latestVersion: string | null;
  installDate: Date | null;
  status: SoftwareStatus;
  docsUrl: string | null;
  downloadUrl: string | null;
  licenseType: string | null;
  seats: number | null;
  os: string | null;
  database: string | null;
  notes: string | null;
};

function SoftwareCard({
  software
}: {
  software: SoftwareCardItem;
}): React.JSX.Element {
  const status = statusConfig[software.status];
  const hasUpdate =
    software.installedVersion &&
    software.latestVersion &&
    software.installedVersion !== software.latestVersion;

  return (
    <li className="flex flex-col rounded-lg border bg-card shadow-sm">
      <header className="flex items-start justify-between gap-2 border-b p-4">
        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold">{software.name}</h3>
          {software.licenseType && (
            <p className="mt-0.5 text-xs text-muted-foreground">
              {software.licenseType}
              {software.seats ? ` · ${software.seats} seats` : ''}
            </p>
          )}
        </div>
        <Badge
          variant="outline"
          className={cn('shrink-0 text-[10px]', status.className)}
        >
          {status.label}
        </Badge>
      </header>

      <dl className="grid grid-cols-2 gap-3 p-4 text-xs">
        <div>
          <dt className="text-muted-foreground">Installed</dt>
          <dd className="mt-0.5 font-mono text-sm font-semibold text-foreground">
            {software.installedVersion ?? '—'}
          </dd>
          {software.installDate && (
            <dd className="text-[11px] text-muted-foreground">
              since {format(software.installDate, 'MMM d, yyyy')}
            </dd>
          )}
        </div>
        <div>
          <dt className="text-muted-foreground">Latest</dt>
          <dd
            className={cn(
              'mt-0.5 font-mono text-sm font-semibold',
              hasUpdate ? 'text-amber-700' : 'text-foreground'
            )}
          >
            {software.latestVersion ?? '—'}
          </dd>
          {hasUpdate && (
            <dd className="text-[11px] text-amber-700">Update available</dd>
          )}
        </div>
        {software.os && (
          <div>
            <dt className="text-muted-foreground">OS</dt>
            <dd className="mt-0.5 text-foreground">{software.os}</dd>
          </div>
        )}
        {software.database && (
          <div>
            <dt className="text-muted-foreground">Database</dt>
            <dd className="mt-0.5 text-foreground">{software.database}</dd>
          </div>
        )}
      </dl>

      {software.notes && (
        <p className="border-t bg-muted/30 px-4 py-2 text-xs text-muted-foreground">
          {software.notes}
        </p>
      )}

      {(software.downloadUrl || software.docsUrl) && (
        <div className="flex flex-wrap gap-2 border-t p-3">
          {software.downloadUrl && (
            <a
              href={software.downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border bg-card px-2.5 py-1 text-xs font-medium hover:bg-accent"
            >
              <DownloadIcon className="size-3.5" />
              Download
              <ExternalLinkIcon className="size-3 text-muted-foreground" />
            </a>
          )}
          {software.docsUrl && (
            <a
              href={software.docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border bg-card px-2.5 py-1 text-xs font-medium hover:bg-accent"
            >
              <BookOpenIcon className="size-3.5" />
              Docs
              <ExternalLinkIcon className="size-3 text-muted-foreground" />
            </a>
          )}
        </div>
      )}
    </li>
  );
}

function EmptyState(): React.JSX.Element {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed bg-card px-4 py-12 text-center">
      <p className="text-sm font-medium">No software yet</p>
      <p className="max-w-sm text-xs text-muted-foreground">
        Your team hasn&apos;t provisioned any software for your account yet.
        Once they do, you&apos;ll see version, license, and download details
        here.
      </p>
    </div>
  );
}

