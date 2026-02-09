import { createPageMetadata } from '@/lib/seo/metadata';
import { SoftwareApplicationJsonLd } from '@/components/seo';

export const metadata = createPageMetadata({
  title: 'Workcell Planner',
  description:
    'Capacity planning tool for determining machine and manpower requirements. Identify bottlenecks and optimize resource utilization.',
  path: '/workcell-planner',
  keywords: 'workcell planner, capacity planning, resource optimization, bottleneck analysis, manufacturing capacity'
});

export default function WorkcellPlannerLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SoftwareApplicationJsonLd
        name="Workcell Planner"
        description="Capacity planning tool for determining machine and manpower requirements. Identify bottlenecks and optimize resource utilization."
        url="/workcell-planner"
        price="Contact for pricing"
      />
      {children}
    </>
  );
}
