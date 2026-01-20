import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Explore User Solutions production planning and scheduling software products for manufacturers of all sizes.'
};

export default function Product2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
