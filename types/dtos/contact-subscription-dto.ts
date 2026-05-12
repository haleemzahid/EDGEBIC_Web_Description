export type ContactSubscriptionDto = {
  stripeCustomerId: string;
  planName: string;
  status: string;
  billingCycle: 'monthly' | 'annual' | 'unknown';
  currentPeriodEnd?: number; // Unix timestamp
  amount: number; // in smallest currency unit (cents)
  currency: string;
  lifetimeValue: number; // total paid across all invoices (in currency unit)
  customerSince?: number; // Unix timestamp of first payment
};
