import * as React from 'react';
import { ExternalLinkIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getContactSubscription } from '@/data/contacts/get-contact-subscription';
import { cn } from '@/lib/utils';

const statusVariant: Record<
  string,
  {
    label: string;
    variant: 'default' | 'secondary' | 'destructive' | 'outline';
  }
> = {
  active: { label: 'Active', variant: 'default' },
  trialing: { label: 'Trial', variant: 'secondary' },
  past_due: { label: 'Past due', variant: 'destructive' },
  canceled: { label: 'Canceled', variant: 'outline' },
  incomplete: { label: 'Incomplete', variant: 'outline' },
  paused: { label: 'Paused', variant: 'secondary' }
};

type RowProps = { label: string; children: React.ReactNode };
function Row({ label, children }: RowProps): React.JSX.Element {
  return (
    <div className="flex min-h-7 flex-row items-start py-0.5">
      <span className="w-32 shrink-0 text-xs text-muted-foreground">
        {label}
      </span>
      <span className="text-xs">{children}</span>
    </div>
  );
}

export type ContactSubscriptionSectionProps = {
  stripeCustomerId?: string;
};

export async function ContactSubscriptionSection({
  stripeCustomerId
}: ContactSubscriptionSectionProps): Promise<React.JSX.Element> {
  if (!stripeCustomerId) {
    return (
      <section className="px-6 py-4">
        <h3 className="mb-3 text-sm font-semibold tracking-tight">
          Subscription
        </h3>
        <p className="text-xs text-muted-foreground">
          No Stripe customer ID linked to this contact.
        </p>
      </section>
    );
  }

  const sub = await getContactSubscription(stripeCustomerId);

  if (!sub) {
    return (
      <section className="px-6 py-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold tracking-tight">Subscription</h3>
          <a
            href={`https://dashboard.stripe.com/customers/${stripeCustomerId}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open in Stripe dashboard"
          >
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-6 gap-1 px-2 text-xs"
            >
              Stripe
              <ExternalLinkIcon className="size-3" />
            </Button>
          </a>
        </div>
        <p className="text-xs text-muted-foreground">
          No active subscription found.
        </p>
      </section>
    );
  }

  const { label, variant } = statusVariant[sub.status] ?? {
    label: sub.status,
    variant: 'outline' as const
  };

  const fmt = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: sub.currency.toUpperCase(),
    maximumFractionDigits: 0
  });

  const renewsOn = sub.currentPeriodEnd
    ? new Date(sub.currentPeriodEnd * 1000).toLocaleDateString()
    : null;

  const customerSinceDate = sub.customerSince
    ? new Date(sub.customerSince * 1000).toLocaleDateString()
    : null;

  const amountDisplay = fmt.format(sub.amount / 100);
  const ltv = fmt.format(sub.lifetimeValue);

  return (
    <section className="px-6 py-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-tight">Subscription</h3>
        <a
          href={`https://dashboard.stripe.com/customers/${stripeCustomerId}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open in Stripe dashboard"
        >
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-6 gap-1 px-2 text-xs"
          >
            Stripe
            <ExternalLinkIcon className="size-3" />
          </Button>
        </a>
      </div>
      <div className="space-y-0.5">
        <Row label="Plan">{sub.planName}</Row>
        <Row label="Status">
          <Badge
            variant={variant}
            className={cn('h-5 text-[11px]')}
          >
            {label}
          </Badge>
        </Row>
        <Row label="Billing">
          {sub.billingCycle === 'annual'
            ? 'Annual'
            : sub.billingCycle === 'monthly'
              ? 'Monthly'
              : '—'}
        </Row>
        {renewsOn && <Row label="Renews on">{renewsOn}</Row>}
        <Row label="Amount">
          {amountDisplay} / {sub.billingCycle === 'annual' ? 'year' : 'mo'}
        </Row>
        <Row label="Lifetime value">
          {ltv}
          {customerSinceDate && (
            <span className="ml-1 text-muted-foreground">
              · since {customerSinceDate}
            </span>
          )}
        </Row>
      </div>
    </section>
  );
}
