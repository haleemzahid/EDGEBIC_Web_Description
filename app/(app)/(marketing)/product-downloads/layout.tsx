import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Downloads',
  description:
    'Download free trials of User Solutions manufacturing software including Resource Manager, EDGEBI, and Job Scheduler Lite.'
};

export default function ProductDownloadsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
