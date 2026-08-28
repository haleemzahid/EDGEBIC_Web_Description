import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Production Scheduling Software Comparison 2026 | RMDB vs Alternatives',
  description:
    'Compare EDGEBIC editions and alternatives: finite capacity scheduling, MRP, ERP integration, pricing and implementation time for discrete manufacturing.',
  path: '/compare-products',
  modifiedTime: '2026-08-28',
  keywords:
    'production scheduling software comparison 2026, manufacturing software comparison, RMDB vs alternatives 2026, compare scheduling software, production planning comparison, advanced planning and scheduling software comparison for discrete manufacturing, APS software comparison, manufacturing what-if scenario planning tools compared, EDGEBIC vs PlanetTogether, EDGEBIC vs Siemens Opcenter, EDGEBIC vs Epicor, production scheduling software comparison UK, APS software comparison Europe'
});

export default function CompareProductsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
