import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Workcenter Scheduler XL',
  description:
    'Workcenter Scheduler XL - Excel-based production scheduling software for workcenter planning and capacity management.'
};

export default function WorkcenterSchedulerXLLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
