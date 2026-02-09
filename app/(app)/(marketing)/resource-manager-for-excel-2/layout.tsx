import { createPageMetadata } from '@/lib/seo/metadata';
import { SoftwareApplicationJsonLd } from '@/components/seo';

export const metadata = createPageMetadata({
  title: 'Resource Manager for Excel',
  description:
    'Resource Manager for Excel (RMX) offers basic MRP and Shop Scheduling that is quick to implement and very affordable. Excel add-on for production planning.',
  path: '/resource-manager-for-excel-2',
  keywords: 'Resource Manager Excel, RMX, MRP, shop scheduling, finite capacity, production planning, Excel add-on'
});

export default function ResourceManagerForExcelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SoftwareApplicationJsonLd
        name="Resource Manager for Excel (RMX)"
        description="Resource Manager for Excel (RMX) offers basic MRP and Shop Scheduling that is quick to implement and very affordable. Excel add-on for production planning."
        url="/resource-manager-for-excel-2"
        price="Contact for pricing"
      />
      {children}
    </>
  );
}
