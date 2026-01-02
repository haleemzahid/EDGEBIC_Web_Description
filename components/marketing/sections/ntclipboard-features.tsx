'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  BarChart3Icon,
  CalendarIcon,
  CogIcon,
  DatabaseIcon,
  DollarSignIcon,
  FileTextIcon,
  LayersIcon,
  LinkIcon,
  MousePointerClickIcon,
  NetworkIcon,
  PlaneTakeoffIcon,
  ServerIcon,
  SettingsIcon,
  TrendingUpIcon,
  UsersIcon,
  ZapIcon
} from 'lucide-react';

import { GridSection } from '@/components/marketing/fragments/grid-section';
import { SiteHeading } from '@/components/marketing/fragments/site-heading';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: CalendarIcon,
    title: 'Finite Capacity Planning & Scheduling',
    description:
      'Advanced finite capacity planning that considers real-world constraints including machine capacity, labor availability, and material limitations for accurate scheduling.'
  },
  {
    icon: TrendingUpIcon,
    title: 'Advanced Planning and Scheduling',
    description:
      'Sophisticated algorithms for optimal production sequencing, resource allocation, and timeline optimization to maximize efficiency and minimize bottlenecks.'
  },
  {
    icon: DatabaseIcon,
    title: 'MRP and Inventory Management',
    description:
      'Complete Material Requirements Planning system with real-time inventory tracking, automatic reorder points, and integrated supply chain management.'
  },
  {
    icon: LayersIcon,
    title: 'Routings and Priority Scheduling',
    description:
      'Flexible routing management with dynamic priority scheduling that adapts to changing production needs and customer demands in real-time.'
  },
  {
    icon: SettingsIcon,
    title: 'Easy "What-if" Analysis',
    description:
      'Powerful scenario planning tools that let you test different production strategies, resource allocations, and schedules before implementation.'
  },
  {
    icon: PlaneTakeoffIcon,
    title: 'Purchasing and Receiving',
    description:
      'Integrated purchasing workflow with vendor management, automated PO generation, receiving tracking, and supplier performance analytics.'
  },
  {
    icon: BarChart3Icon,
    title: 'Downtime Analysis and Reporting',
    description:
      'Comprehensive downtime tracking and analysis with detailed reporting to identify patterns, root causes, and optimization opportunities.'
  },
  {
    icon: CogIcon,
    title: 'Simple Maintenance and Updating',
    description:
      'User-friendly maintenance interface with automated updates, configuration management, and simplified system administration tools.'
  },
  {
    icon: DollarSignIcon,
    title: 'Costing and Estimating',
    description:
      'Accurate job costing with real-time cost tracking, automated estimating tools, and profitability analysis for better financial decision-making.'
  },
  {
    icon: LinkIcon,
    title: 'Integrating with All Systems',
    description:
      'Seamless integration capabilities with existing ERP systems, databases, and third-party applications through robust APIs and data connectors.'
  },
  {
    icon: ServerIcon,
    title: 'Running Stand Alone or Networked',
    description:
      'Flexible deployment options supporting both standalone installations and multi-user networked environments with centralized data management.'
  },
  {
    icon: NetworkIcon,
    title: 'Production Planning',
    description:
      'Comprehensive production planning suite with demand forecasting, capacity planning, and resource optimization for efficient manufacturing operations.'
  },
  {
    icon: MousePointerClickIcon,
    title: 'Dragging and Dropping Adjustments',
    description:
      'Intuitive drag-and-drop interface for quick schedule adjustments, job resequencing, and resource reallocation without complex data entry.'
  },
  {
    icon: UsersIcon,
    title: 'Concurrent Resource Scheduling',
    description:
      'Simultaneous scheduling of multiple resources including materials, workcenters, and labor requirements with intelligent conflict resolution.'
  },
  {
    icon: ZapIcon,
    title: 'LP Optimization Integration',
    description:
      'Optional Linear Programming optimization engine for mathematically optimal solutions to complex scheduling and resource allocation challenges.'
  },
  {
    icon: FileTextIcon,
    title: 'Customized Reports',
    description:
      'Fully customizable reporting system with drag-and-drop report builder, scheduled reports, and export capabilities for all stakeholder needs.'
  }
];

export function NTClipboardFeatures(): React.JSX.Element {
  return (
    <GridSection hideVerticalGridLines>
      <div className="container py-6">
        <SiteHeading
          title="Why Choose EDGEBIC?"
          description="Powerful features designed to revolutionize your production planning and scheduling"
        />
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border bg-background p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-red-50/50 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-4 inline-flex size-12 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-500 text-white">
                  <feature.icon className="size-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GridSection>
  );
}
