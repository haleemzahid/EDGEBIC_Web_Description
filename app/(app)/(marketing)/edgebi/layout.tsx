import { createProductMetadata } from '@/lib/seo/metadata';
import { SoftwareApplicationJsonLd, VideoObjectJsonLd } from '@/components/seo';

export const metadata = createProductMetadata({
  name: 'EDGEBI - Graphical Extension for RMDB',
  description: 'EDGEBI is the advanced graphical extension for Resource Manager DB (RMDB), adding interactive Gantt charts, visual drag-and-drop scheduling, manufacturing business intelligence, real-time dashboards, and shop floor analytics for production planning.',
  path: '/edgebi',
  keywords: 'EDGEBI, RMDB extension, Gantt chart scheduling, visual production planning, drag-and-drop scheduling, manufacturing dashboard, manufacturing business intelligence, manufacturing BI software, production analytics software, factory dashboard software, shop floor analytics, manufacturing KPI dashboard, real time manufacturing dashboard, manufacturing intelligence platform'
});

export default function EdgebiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SoftwareApplicationJsonLd
        name="EDGEBI"
        description="Advanced graphical extension for RMDB with interactive Gantt charts, visual drag-and-drop scheduling, and browser-based dashboards."
        url="/edgebi"
        price="49"
      />
      <VideoObjectJsonLd
        name="EDGEBI Demo — Interactive Gantt Chart Scheduling"
        description="See how EDGEBI adds interactive Gantt charts, drag-and-drop scheduling, and browser-based dashboards to Resource Manager DB (RMDB) for visual production planning."
        thumbnailUrl="https://img.youtube.com/vi/_0LjI9MY8zo/maxresdefault.jpg"
        uploadDate="2022-12-01"
        embedUrl="https://www.youtube.com/embed/_0LjI9MY8zo"
      />
      {children}
    </>
  );
}
