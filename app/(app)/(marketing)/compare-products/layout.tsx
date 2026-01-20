import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compare Products',
  description:
    'Compare User Solutions production planning and scheduling software products to find the best fit for your manufacturing needs.'
};

export default function CompareProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
