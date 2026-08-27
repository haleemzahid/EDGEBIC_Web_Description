'use client';

import { usePathname } from 'next/navigation';
import { getBaseUrl } from '@/lib/urls/get-base-url';

// Title-casing a slug renders brands and acronyms wrong ("Edgebic", "Rmdb To
// Edgebic", "Faq"). Breadcrumbs show in the SERP, so the brand has to be
// spelled correctly there before anywhere else.
const SEGMENT_OVERRIDES: Record<string, string> = {
  edgebic: 'EDGEBIC',
  edgebi: 'EDGEBI',
  rmdb: 'RMDB',
  'rmdb-to-edgebic': 'RMDB to EDGEBIC',
  'resource-manager-db-2': 'Resource Manager DB (RMDB)',
  'resource-manager-for-excel-2': 'Resource Manager for Excel',
  'edgebic-erp-integration': 'EDGEBIC ERP Integration',
  faq: 'FAQ',
  erp: 'ERP',
  mrp: 'MRP',
  bom: 'BOM',
  aps: 'APS',
  oee: 'OEE',
  cnc: 'CNC',
  api: 'API'
};

function formatBreadcrumbName(segment: string): string {
  const override = SEGMENT_OVERRIDES[segment.toLowerCase()];
  if (override) return override;

  return segment
    .split('-')
    .map((word) => SEGMENT_OVERRIDES[word] ?? word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function DynamicBreadcrumbJsonLd() {
  const pathname = usePathname();
  const baseUrl = getBaseUrl();

  if (pathname === '/') return null;

  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbItems = [
    { name: 'Home', url: `${baseUrl}/` }
  ];

  let currentPath = '';
  for (const segment of segments) {
    currentPath += `/${segment}`;
    breadcrumbItems.push({
      name: formatBreadcrumbName(segment),
      url: `${baseUrl}${currentPath}`
    });
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
