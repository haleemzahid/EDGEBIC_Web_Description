import { createProductMetadata } from '@/lib/seo/metadata';
import { SoftwareApplicationJsonLd } from '@/components/seo';

export const metadata = createProductMetadata({
  name: 'Workcenter Scheduler XL (WCXL)',
  description:
    'Workcenter Scheduler XL is an Excel-based production scheduling tool with finite capacity scheduling, forward scheduling, Gantt chart visualization, and on-demand rescheduling for manufacturers.',
  path: '/workcenter-schedulerxl',
  keywords:
    'Workcenter Scheduler XL, WCXL, workcenter scheduling, workcenter planning, capacity management, finite capacity scheduling workcenter, Gantt chart workcenter scheduling, workcenter Excel tool'
});

export default function WorkcenterSchedulerXLLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SoftwareApplicationJsonLd
        name="Workcenter Scheduler XL"
        description="Excel-based production scheduling software with finite capacity scheduling, forward scheduling, KPI reporting, and Gantt chart visualization for workcenter planning."
        url="/workcenter-schedulerxl"
        price="495"
      />
      {children}
    </>
  );
}
