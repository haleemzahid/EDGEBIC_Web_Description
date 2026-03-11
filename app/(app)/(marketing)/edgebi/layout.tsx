import { createProductMetadata } from '@/lib/seo/metadata';
import { SoftwareApplicationJsonLd } from '@/components/seo';

export const metadata = createProductMetadata({
  name: 'EDGEBI - Advanced Graphical Extension for RMDB',
  description: 'EDGEBI is the advanced graphical extension for Resource Manager DB (RMDB), adding interactive Gantt charts, visual drag-and-drop scheduling, and browser-based dashboards for production planning.',
  path: '/edgebi',
  keywords: 'EDGEBI, RMDB extension, Gantt chart scheduling, visual production planning, drag-and-drop scheduling, manufacturing dashboard'
});

export default function EdgebiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SoftwareApplicationJsonLd
        name="EDGEBI"
        description="Advanced graphical extension for RMDB with interactive Gantt charts, visual drag-and-drop scheduling, and browser-based dashboards."
        url="/edgebi"
      />
      {children}
    </>
  );
}
