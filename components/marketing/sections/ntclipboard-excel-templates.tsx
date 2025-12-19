'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FileSpreadsheetIcon, InfoIcon } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

const excelApplications = [
  {
    id: 2,
    title: 'Spreadsheet QC',
    description:
      'Quality control management system for tracking inspections, defects, and compliance metrics.',
    features: [
      'Quality inspection tracking',
      'Defect analysis reporting',
      'Compliance monitoring',
      'Statistical process control'
    ],
    singleUserPrice: 'FREE',
    fiveUserPrice: 'FREE',
    href: '/products/spreadsheet-qc',
    icon: <FileSpreadsheetIcon className="size-8" />
  },
  {
    id: 3,
    title: 'Workcell Planner',
    description:
      'Optimize workcell layouts and workflow planning for maximum efficiency and productivity.',
    features: [
      'Workcell layout optimization',
      'Workflow analysis',
      'Capacity planning',
      'Efficiency metrics'
    ],
    singleUserPrice: 'FREE',
    fiveUserPrice: 'FREE',
    href: '/products/workcell-planner',
    icon: <FileSpreadsheetIcon className="size-8" />
  },
  {
    id: 4,
    title: 'Operations Manager',
    description:
      'Comprehensive operations management suite for manufacturing planning and execution.',
    features: [
      'Production planning',
      'Resource management',
      'Performance tracking',
      'Operational analytics'
    ],
    singleUserPrice: 'FREE',
    fiveUserPrice: 'FREE',
    href: '/operations-manager',
    icon: <FileSpreadsheetIcon className="size-8" />
  },
  {
    id: 5,
    title: 'Workcenter for Excel',
    description:
      'Excel-based workcenter scheduling and management solution for shop floor operations.',
    features: [
      'Workcenter scheduling',
      'Shop floor management',
      'Real-time updates',
      'Excel integration'
    ],
    singleUserPrice: 'FREE',
    fiveUserPrice: 'FREE',
    href: '/products/workcenter-excel',
    icon: <FileSpreadsheetIcon className="size-8" />
  },
  {
    id: 6,
    title: 'Resource Manager for Excel',
    description:
      'Advanced resource planning and scheduling with finite capacity and constraint management.',
    features: [
      'Finite capacity scheduling',
      'Resource optimization',
      'Constraint management',
      'MRP integration'
    ],
    singleUserPrice: 'FREE',
    fiveUserPrice: 'FREE',
    href: '/products/resource-manager-excel',
    icon: <FileSpreadsheetIcon className="size-8" />
  }
];

export function NTClipboardExcelTemplates(): React.JSX.Element {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Excel Applications
            </h1>
            <p className="mx-auto mt-6 max-w-4xl text-xl text-muted-foreground">
              Powerful Excel-based manufacturing solutions for scheduling,
              quality control, and operations management. Choose the product
              that best suits your company's needs.
            </p>
          </div>
        </div>
      </section>

      {/* Applications Grid */}
      <section className="pt-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Manufacturing Excel Applications
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-md text-muted-foreground">
              Streamline your manufacturing operations with our comprehensive
              suite of Excel-based applications
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
            {excelApplications.map((app) => (
              <div
                key={app.id}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Header */}
                <div className="mb-6 flex items-start gap-4">
                  <div className="shrink-0 rounded-lg bg-green-100 p-3 text-green-600">
                    {app.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {app.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      {app.description}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="mb-3 text-sm font-medium text-gray-900">
                    Key Features:
                  </h4>
                  <ul className="space-y-2">
                    {app.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <div className="mr-3 size-1.5 rounded-full bg-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Pricing */}
                <div className="mb-6 rounded-lg bg-gray-50 p-4">
                  <div className="flex items-center justify-center">
                    <span className="text-2xl font-bold text-green-600">
                      FREE
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <Link
                  href="/contact-us"
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700"
                >
                  <InfoIcon className="size-4" />
                  Request Free Product
                </Link>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards Banner */}
      <section>
        <div className="container mt-6 mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-8 text-center">
                <h2 className="mb-6 text-2xl font-bold text-slate-900">
                  CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
                </h2>
                <Image
                  src="https://www.usersolutions.com/wp-content/uploads/2022/07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                  alt="Collection of industry and business awards logos"
                  width={1024}
                  height={128}
                  className="mx-auto h-auto max-w-full"
                  unoptimized
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
