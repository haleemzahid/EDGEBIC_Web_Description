import * as React from 'react';

import { createPageMetadata } from '@/lib/seo/metadata';
import { ProductionPlanningSolutions } from '@/components/marketing/sections/production-planning-solutions';

export const metadata = createPageMetadata({
  title: 'Production Planning & Scheduling Solutions',
  description:
    'Explore User Solutions production planning and scheduling software solutions. From RMDB to Resource Manager for Excel, find the right manufacturing planning tool for your operations.',
  path: '/production-planning-scheduling-solutions',
  keywords:
    'production planning solutions, scheduling software, manufacturing planning, RMDB, Resource Manager, production scheduling tools'
});

export default function ProductionPlanningSchedulingSolutionsPage(): React.JSX.Element {
  return (
    <>
      <ProductionPlanningSolutions />
    </>
  );
}
