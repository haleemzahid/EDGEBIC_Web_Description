import * as React from 'react';

import { NTClipboardCompanyHistory } from '@/components/marketing/sections/ntclipboard-company-history';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Company History',
  description:
    'Over three decades of innovation in manufacturing resource planning and production scheduling, from Lotus 1-2-3 templates in 1991 to Resource Manager-DB and the 2025 release of EDGEBIC.',
  path: '/company-history',
  keywords:
    'company history, EDGEBIC history, EDGEBI history, Resource Manager DB history, manufacturing software history, User Solutions history'
});

export default function HistoryPage(): React.JSX.Element {
  return (
    <>
      <NTClipboardCompanyHistory />
    </>
  );
}
