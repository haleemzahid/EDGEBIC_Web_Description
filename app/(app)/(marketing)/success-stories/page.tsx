import { NTClipboardSuccessStories } from '@/components/marketing/sections/ntclipboard-success-stories';
import { Page } from '@/components/ui/page';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Customer Success Stories - RMDB Production Planning Software',
  description:
    'Discover how manufacturers worldwide use RMDB to solve production planning challenges. Real case studies: tripled on-time shipping, ERP integration, finite capacity scheduling success.',
  path: '/success-stories',
  keywords:
    'RMDB success stories, production planning case studies, manufacturing software testimonials, scheduling software reviews, User Solutions customers'
});

export default function SuccessStoriesPage(): React.JSX.Element {
  return (
    <Page>
      <NTClipboardSuccessStories />
    </Page>
  );
}
