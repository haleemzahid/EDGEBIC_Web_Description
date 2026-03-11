import { createProductMetadata } from '@/lib/seo/metadata';
import { SoftwareApplicationJsonLd } from '@/components/seo';

export const metadata = createProductMetadata({
  name: 'Resource Manager for Excel (RMX)',
  description: 'Resource Manager for Excel (RMX) is an Excel-based production planning and scheduling solution. Plan and schedule production using familiar Microsoft Excel interface with powerful scheduling algorithms.',
  path: '/resource-manager-for-excel-2',
  keywords: 'Resource Manager Excel, RMX, Excel scheduling, Excel production planning, manufacturing Excel, spreadsheet scheduling software'
});

export default function RMXLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SoftwareApplicationJsonLd
        name="Resource Manager for Excel (RMX)"
        description="Excel-based production planning and scheduling solution with powerful scheduling algorithms."
        url="/resource-manager-for-excel-2"
      />
      {children}
    </>
  );
}
