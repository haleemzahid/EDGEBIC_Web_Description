import * as React from 'react';

import { NTClipboardCompanyHistory } from '@/components/marketing/sections/ntclipboard-company-history';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Company History',
  description:
    'Over three decades of innovation in manufacturing resource planning and production scheduling since 1991.',
  path: '/company-history',
  keywords:
    'company history, EDGEBI history, manufacturing software history, User Solutions history'
});

export default function HistoryPage(): React.JSX.Element {
  return (
    <>
      <NTClipboardCompanyHistory />
    </>
  );
}
