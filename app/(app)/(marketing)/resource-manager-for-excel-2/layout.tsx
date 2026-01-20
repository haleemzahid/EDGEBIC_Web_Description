import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resource Manager For Excel',
  description:
    'Resource Manager for Excel (RMX) offers basic MRP and Shop Scheduling that is quick to implement and very affordable. Features finite capacity planning, Excel integration, and drag-and-drop scheduling.'
};

export default function ResourceManagerForExcelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
