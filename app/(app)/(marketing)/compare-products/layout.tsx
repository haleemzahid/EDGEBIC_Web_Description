import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Production Scheduling Software Comparison 2026 | RMDB vs Alternatives',
  description:
    'Compare production scheduling software in 2026. Side-by-side feature matrix of RMDB vs alternatives — finite capacity, MRP, ERP integration, pricing, and implementation time.',
  path: '/compare-products',
  keywords:
    'production scheduling software comparison 2026, manufacturing software comparison, RMDB vs alternatives 2026, compare scheduling software, production planning comparison'
});

export default function CompareProductsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
