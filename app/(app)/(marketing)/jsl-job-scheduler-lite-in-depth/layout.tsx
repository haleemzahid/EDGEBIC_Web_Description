import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Job Scheduler Lite',
  description:
    'Job Scheduler Lite (JSL) - Simple and affordable job shop scheduling solution for small manufacturers.'
};

export default function JSLInDepthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
