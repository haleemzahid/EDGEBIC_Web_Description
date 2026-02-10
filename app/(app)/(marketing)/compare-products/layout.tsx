import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Compare Products',
  description:
    'Compare User Solutions production planning and scheduling software products to find the best fit for your manufacturing needs.',
  path: '/compare-products',
  keywords:
    'compare scheduling software, production planning comparison, manufacturing software comparison'
});

export default function CompareProductsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
