import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resource Manager DB In-Depth',
  description:
    'Detailed information about Resource Manager DB - advanced production planning and scheduling software with finite capacity planning and MRP.'
};

export default function RMDBInDepthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
