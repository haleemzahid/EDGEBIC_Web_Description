import * as React from 'react';
import type { Metadata } from 'next';

import { NTClipboardFAQ } from '@/components/marketing/sections/ntclipboard-faq';
import { NTClipboardPricing } from '@/components/marketing/sections/ntclipboard-pricing';

export const metadata: Metadata = {
  title: 'Pricing'
};

export default function PricingPage(): React.JSX.Element {
  return (
    <>
      <NTClipboardPricing />
      <NTClipboardFAQ />
    </>
  );
}
