import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Free Trial Downloads — Manufacturing Scheduling Software',
  description:
    'Download free 60-day trials of User Solutions manufacturing scheduling software: Resource Manager for Excel (RMX), EDGEBI graphical Gantt scheduler, Job Scheduler Lite (JSL), and more. No credit card required.',
  path: '/product-downloads',
  keywords:
    'free trial download, manufacturing software free trial, production scheduling software download, Resource Manager for Excel trial, EDGEBI trial, JSL download, free scheduling software'
});

export default function ProductDownloadsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
