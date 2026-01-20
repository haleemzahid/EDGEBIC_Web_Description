import * as React from 'react';
import type { Metadata } from 'next';

import { NTClipboardCompanyHistory } from '@/components/marketing/sections/ntclipboard-company-history';

export const metadata: Metadata = {
  title: 'Company History',
  description:
    'Over three decades of innovation in manufacturing resource planning and production scheduling since 1991.'
};

export default function HistoryPage(): React.JSX.Element {
  return (
    <>
      <NTClipboardCompanyHistory />
    </>
  );
}
