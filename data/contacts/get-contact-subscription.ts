import 'server-only';

import { stripeServer } from '@/lib/billing/stripe-server';
import type { ContactSubscriptionDto } from '@/types/dtos/contact-subscription-dto';

export async function getContactSubscription(
  stripeCustomerId: string
): Promise<ContactSubscriptionDto | null> {
  try {
    const [customer, invoices] = await Promise.all([
      stripeServer.customers.retrieve(stripeCustomerId, {
        expand: ['subscriptions']
      }),
      stripeServer.invoices.list({
        customer: stripeCustomerId,
        limit: 100,
        status: 'paid'
      })
    ]);

    if ('deleted' in customer) {
      return null;
    }

    const subscriptions = customer.subscriptions?.data ?? [];
    const subscription = subscriptions[0];

    if (!subscription) {
      return null;
    }

    const priceItem = subscription.items.data[0];
    const interval = priceItem?.price?.recurring?.interval;
    const billingCycle =
      interval === 'month'
        ? 'monthly'
        : interval === 'year'
          ? 'annual'
          : 'unknown';

    const planName =
      (priceItem?.price?.nickname ?? priceItem?.price?.product)
        ? typeof priceItem.price.product === 'string'
          ? priceItem.price.product
          : ((priceItem.price.product as { name?: string })?.name ??
            'Unknown plan')
        : 'Unknown plan';

    const amount = subscription.items.data.reduce(
      (sum, item) =>
        sum + (item.price?.unit_amount ?? 0) * (item.quantity ?? 1),
      0
    );

    const lifetimeValue =
      invoices.data.reduce((sum, inv) => sum + inv.amount_paid, 0) / 100;

    const oldestInvoice = invoices.data.at(-1);
    const customerSince = oldestInvoice?.created;

    return {
      stripeCustomerId,
      planName,
      status: subscription.status,
      billingCycle,
      currentPeriodEnd: subscription.current_period_end,
      amount,
      currency: priceItem?.price?.currency ?? 'usd',
      lifetimeValue,
      customerSince
    };
  } catch {
    return null;
  }
}
