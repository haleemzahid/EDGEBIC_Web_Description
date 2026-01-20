import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'For Students',
  description:
    'Educational resources and information about User Solutions manufacturing software for students and universities.'
};

export default function StudentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
