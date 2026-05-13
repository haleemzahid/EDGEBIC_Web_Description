import * as React from 'react';
import Link from 'next/link';
import { type Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Role } from '@prisma/client';
import { format, formatDistanceToNow } from 'date-fns';
import { DownloadIcon, KeyRoundIcon } from 'lucide-react';

import { CopyLicenseKeyButton } from '@/components/dashboard/client-portal/copy-license-key-button';
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

export const metadata: Metadata = {
  title: createTitle('Billing')
};

type PurchaseRow = {
  id: string;
  amount: number;
  currency: string;
  status: string;
  licenseStatus: string;
  licenseKey: string | null;
  downloadToken: string;
  downloadCount: number;
  maxDownloads: number;
  expiresAt: Date | null;
  createdAt: Date;
};

const formatAmount = (amountInCents: number, currency: string): string => {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase()
    }).format(amountInCents / 100);
  } catch {
    return `${(amountInCents / 100).toFixed(2)} ${currency.toUpperCase()}`;
  }
};

// Group completed-purchase totals by currency so multi-currency math is correct.
function totalsByCurrency(rows: PurchaseRow[]): Map<string, number> {
  const totals = new Map<string, number>();
  for (const r of rows) {
    if (r.status !== 'completed') continue;
    totals.set(r.currency, (totals.get(r.currency) ?? 0) + r.amount);
  }
  return totals;
}

function downloadState(r: PurchaseRow): {
  status: 'available' | 'expired' | 'exhausted' | 'pending';
  remaining: number;
} {
  if (r.status !== 'completed')
    return { status: 'pending', remaining: r.maxDownloads };
  const remaining = Math.max(0, r.maxDownloads - r.downloadCount);
  if (r.expiresAt && r.expiresAt < new Date())
    return { status: 'expired', remaining };
  if (remaining <= 0) return { status: 'exhausted', remaining };
  return { status: 'available', remaining };
}

export default async function ClientBillingPage(): Promise<React.JSX.Element> {
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

  const purchases: PurchaseRow[] = await prisma.purchase.findMany({
    where: { email: link.email },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      amount: true,
      currency: true,
      status: true,
      licenseStatus: true,
      licenseKey: true,
      downloadToken: true,
      downloadCount: true,
      maxDownloads: true,
      expiresAt: true,
      createdAt: true
    }
  });

  const completed = purchases.filter((p) => p.status === 'completed');
  const pending = purchases.filter((p) => p.status === 'pending');
  const failed = purchases.filter(
    (p) => p.status !== 'completed' && p.status !== 'pending'
  );
  const totals = totalsByCurrency(completed);
  const activeLicenses = completed.filter(
    (p) => p.licenseStatus === 'active'
  ).length;

  return (
    <Page>
      <PageHeader>
        <PagePrimaryBar>
          <PageTitle>Billing</PageTitle>
        </PagePrimaryBar>
      </PageHeader>
      <PageBody>
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-6">
          <p className="text-sm text-muted-foreground">
            Your purchase history, downloads, and license keys.
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard
              label="Total spent"
              value={
                totals.size === 0
                  ? '—'
                  : Array.from(totals.entries())
                      .map(([cur, amt]) => formatAmount(amt, cur))
                      .join(' + ')
              }
            />
            <StatCard
              label="Purchases"
              value={completed.length}
            />
            <StatCard
              label="Active licenses"
              value={activeLicenses}
            />
          </div>

          {pending.length > 0 && (
            <Section
              title={`Pending · ${pending.length}`}
              accent="ring-1 ring-amber-300"
            >
              <ul className="divide-y">
                {pending.map((p) => (
                  <PendingRow
                    key={p.id}
                    purchase={p}
                  />
                ))}
              </ul>
              <div className="border-t bg-amber-50/60 px-4 py-3 text-xs text-amber-900">
                Pending payments are usually confirmed within a few minutes.
                If yours stays pending, please contact your project owner.
              </div>
            </Section>
          )}

          <Section
            title={
              completed.length === 0
                ? 'No purchases yet'
                : `Paid · ${completed.length}`
            }
          >
            {completed.length === 0 ? (
              <p className="px-4 py-6 text-sm text-muted-foreground">
                When you purchase a product, the order will appear here along
                with your license key and download link.
              </p>
            ) : (
              <ul className="divide-y">
                {completed.map((p) => (
                  <PurchaseRowItem
                    key={p.id}
                    purchase={p}
                  />
                ))}
              </ul>
            )}
          </Section>

          {failed.length > 0 && (
            <Section title={`Failed · ${failed.length}`}>
              <ul className="divide-y opacity-80">
                {failed.map((p) => (
                  <li
                    key={p.id}
                    className="flex items-center gap-4 px-4 py-3"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {formatAmount(p.amount, p.currency)}
                      </p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">
                        Attempted{' '}
                        {formatDistanceToNow(p.createdAt, { addSuffix: true })}
                      </p>
                    </div>
                    <Badge
                      variant="secondary"
                      className="border-transparent bg-rose-100 text-rose-800"
                    >
                      Failed
                    </Badge>
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>
      </PageBody>
    </Page>
  );
}

function PurchaseRowItem({
  purchase
}: {
  purchase: PurchaseRow;
}): React.JSX.Element {
  const dl = downloadState(purchase);

  return (
    <li className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-start">
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-base font-semibold tracking-tight">
            {formatAmount(purchase.amount, purchase.currency)}
          </span>
          <Badge
            variant="secondary"
            className="border-transparent bg-emerald-100 text-emerald-800"
          >
            Paid
          </Badge>
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {format(purchase.createdAt, 'MMM d, yyyy')} ·{' '}
          {formatDistanceToNow(purchase.createdAt, { addSuffix: true })}
        </p>

        {purchase.licenseKey && (
          <div className="mt-3 flex flex-col gap-2 rounded-md border bg-muted/30 p-3 sm:flex-row sm:items-center">
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <KeyRoundIcon className="size-4 shrink-0 text-muted-foreground" />
              <code className="block min-w-0 truncate font-mono text-xs">
                {purchase.licenseKey}
              </code>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {purchase.licenseStatus !== 'inactive' && (
                <Badge
                  variant="outline"
                  className={cn(
                    'text-[10px]',
                    purchase.licenseStatus === 'active'
                      ? 'border-emerald-300 text-emerald-700'
                      : 'border-rose-300 text-rose-700'
                  )}
                >
                  {purchase.licenseStatus}
                </Badge>
              )}
              <CopyLicenseKeyButton value={purchase.licenseKey} />
            </div>
          </div>
        )}
      </div>

      <div className="flex shrink-0 flex-col items-stretch gap-1.5 sm:items-end">
        {dl.status === 'available' && (
          <>
            <Button
              asChild
              variant="default"
              size="sm"
              className="gap-1.5"
            >
              <a
                href={`/api/download?token=${purchase.downloadToken}`}
                download
              >
                <DownloadIcon className="size-3.5" />
                Download
              </a>
            </Button>
            <span className="text-right text-[11px] text-muted-foreground">
              {dl.remaining} of {purchase.maxDownloads} downloads left
            </span>
          </>
        )}
        {dl.status === 'exhausted' && (
          <span className="text-right text-[11px] text-muted-foreground">
            All {purchase.maxDownloads} downloads used
          </span>
        )}
        {dl.status === 'expired' && (
          <span className="text-right text-[11px] text-muted-foreground">
            Download link expired
          </span>
        )}
      </div>
    </li>
  );
}

function PendingRow({
  purchase
}: {
  purchase: PurchaseRow;
}): React.JSX.Element {
  return (
    <li className="flex items-center gap-4 px-4 py-3">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">
          {formatAmount(purchase.amount, purchase.currency)}
        </p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">
          Started {formatDistanceToNow(purchase.createdAt, { addSuffix: true })}
        </p>
      </div>
      <Badge
        variant="secondary"
        className="border-transparent bg-amber-100 text-amber-800"
      >
        Pending
      </Badge>
    </li>
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

function StatCard({
  label,
  value
}: {
  label: string;
  value: string | number;
}): React.JSX.Element {
  return (
    <div className="rounded-lg border bg-card p-4">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>
    </div>
  );
}

function UnlinkedNotice(): React.JSX.Element {
  return (
    <Page>
      <PageHeader>
        <PagePrimaryBar>
          <PageTitle>Billing</PageTitle>
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
