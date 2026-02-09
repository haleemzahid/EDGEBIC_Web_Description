'use client';

import { usePathname } from 'next/navigation';
import { getBaseUrl } from '@/lib/urls/get-base-url';

function formatBreadcrumbName(segment: string): string {
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function DynamicBreadcrumbJsonLd() {
  const pathname = usePathname();
  const baseUrl = getBaseUrl();

  if (pathname === '/') return null;

  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbItems = [
    { name: 'Home', url: baseUrl }
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
