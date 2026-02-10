import * as React from 'react';

import { FAQJsonLd } from '@/components/seo';
import { NTClipboardFAQ } from '@/components/marketing/sections/ntclipboard-faq';
import { NTClipboardPricing } from '@/components/marketing/sections/ntclipboard-pricing';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Pricing',
  description:
    'View pricing plans for EDGEBI production planning and scheduling software. Affordable solutions for manufacturers of all sizes with no subscription fees.',
  path: '/pricing',
  keywords:
    'production planning pricing, scheduling software cost, manufacturing software pricing, EDGEBI pricing'
});

const faqData = [
  {
    question: 'What types of PDFs does EDGEBI work with?',
    answer:
      'EDGEBI works with any PDF containing structured data like parts lists, inventory documents, job sheets, and technical specifications. It uses intelligent pattern recognition to identify part numbers, descriptions, quantities, weights, and job numbers.'
  },
  {
    question: 'How secure is my data?',
    answer:
      'Your data never leaves your computer. EDGEBI processes everything locally on your Windows machine, ensuring complete privacy and security. No internet connection is required for the core functionality.'
  },
  {
    question: 'What keyboard shortcuts are available?',
    answer:
      'EDGEBI includes several time-saving shortcuts: ESC to clear, TAB to send selected items to clipboard, and ` (backtick) to view current clipboard contents. The app also minimizes to system tray for quick access.'
  },
  {
    question: 'Do I get updates with the one-time purchase?',
    answer:
      'Absolutely! Your one-time purchase includes all future updates and improvements. No subscription fees, no additional costs.'
  },
  {
    question: 'How does the intelligent parsing work?',
    answer:
      'EDGEBI uses advanced pattern recognition to identify structured data in PDFs. It looks for common patterns like part numbers, quantities, weights, descriptions, and job numbers, then organizes them into a clean, selectable format.'
  },
  {
    question: 'Can I use EDGEBI on multiple computers?',
    answer:
      "Yes! Each individual user will need to download and install EDGEBI on their own system. The software works offline and doesn't require online activation after initial setup."
  }
];

export default function PricingPage(): React.JSX.Element {
  return (
    <>
      <FAQJsonLd questions={faqData} />
      <NTClipboardPricing />
      <NTClipboardFAQ />
    </>
  );
}
