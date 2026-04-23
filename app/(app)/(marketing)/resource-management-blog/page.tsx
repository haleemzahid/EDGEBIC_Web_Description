import { createPageMetadata } from '@/lib/seo/metadata';

import { ResourceManagementBlog } from '@/components/marketing/sections/resource-management-blog';
import { Page } from '@/components/ui/page';

export const metadata = createPageMetadata({
  title: 'Resource Management Blog',
  description:
    'Insights, tips, and best practices for resource management in manufacturing and production planning.',
  path: '/resource-management-blog',
  keywords: 'resource management blog, manufacturing insights, production planning tips, scheduling best practices'
});

export default function ResourceManagementBlogPage() {
  return (
    <Page>
      <ResourceManagementBlog />
    </Page>
  );
}
