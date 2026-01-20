import type { Metadata } from 'next';

import { NTClipboardVideo } from '@/components/marketing/sections/ntclipboard-video';
import { Page } from '@/components/ui/page';

export const metadata: Metadata = {
  title: 'Product Videos',
  description:
    'Watch comprehensive video demonstrations of our award-winning manufacturing software solutions including Resource Manager DB, Workcenter Scheduler, and Excel-based planning tools.'
};

export default function ProductVideosPage(): React.JSX.Element {
  return (
    <Page>
      <NTClipboardVideo />
    </Page>
  );
}
