import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EDGEBI',
  description:
    'EDGEBI - Graphical overlay with business intelligence for intuitive drag-and-drop schedule management. Multi-user production planning and scheduling solution.'
};

export default function EdgebiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
