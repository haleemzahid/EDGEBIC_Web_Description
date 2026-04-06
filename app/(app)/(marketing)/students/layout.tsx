import type { Metadata } from 'next';
import { getBaseUrl } from '@/lib/urls/get-base-url';

export const metadata: Metadata = {
  title: 'For Students',
  description:
    'Educational resources and information about User Solutions manufacturing software for students and universities.',
  alternates: {
    canonical: `${getBaseUrl()}/students`
  }
};

export default function StudentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
