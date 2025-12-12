'use client';

import React from 'react';
import Image from 'next/image';
import { Briefcase, Factory, Settings, Wrench } from 'lucide-react';

import { GridSection } from '@/components/marketing/fragments/grid-section';
import { SiteHeading } from '@/components/marketing/fragments/site-heading';
import { Card, CardContent } from '@/components/ui/card';

export function NTClipboardSolutionsPortfolio(): React.JSX.Element {
  return (
    <GridSection hideVerticalGridLines>
      <div className="container pt-6">
        <SiteHeading
          badge="Solutions Portfolio"
          title="User Driven Solutions"
          description="Custom-tailored manufacturing solutions designed around your specific needs"
        />

        <div className="mx-auto mt-8 max-w-7xl">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Production Planning Solutions */}
            <div className="rounded-3xl border bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">
                <Factory className="size-4" />
                Production Planning
              </div>
              <h3 className="mb-4 text-xl font-bold text-slate-900">
                Manufacturing Execution Systems
              </h3>
              <p className="mb-4 text-slate-700">
                Streamline your production workflow with real-time scheduling,
                resource optimization, and bottleneck identification.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Dynamic production scheduling</li>
                <li>• Resource allocation optimization</li>
                <li>• Real-time progress tracking</li>
                <li>• Capacity planning tools</li>
              </ul>
            </div>

            {/* Quality Management Solutions */}
            <div className="rounded-3xl border bg-gradient-to-br from-green-50 to-emerald-50 p-8">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
                <Settings className="size-4" />
                Quality Management
              </div>
              <h3 className="mb-4 text-xl font-bold text-slate-900">
                Quality Control Systems
              </h3>
              <p className="mb-4 text-slate-700">
                Maintain product excellence with comprehensive quality tracking
                and automated inspection workflows.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Quality checkpoint automation</li>
                <li>• Defect tracking and analysis</li>
                <li>• Supplier quality management</li>
                <li>• Compliance reporting</li>
              </ul>
            </div>

            {/* Inventory Management Solutions */}
            <div className=" rounded-3xl border bg-gradient-to-br from-purple-50 to-violet-50 p-8">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-medium text-purple-800">
                <Briefcase className="size-4" />
                Inventory Management
              </div>
              <h3 className="mb-4 text-xl font-bold text-slate-900">
                Smart Inventory Solutions
              </h3>
              <p className="mb-4 text-slate-700">
                Optimize inventory levels with predictive analytics and
                automated reorder systems.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Automated stock level monitoring</li>
                <li>• Predictive demand forecasting</li>
                <li>• Supplier integration</li>
                <li>• Cost optimization algorithms</li>
              </ul>
            </div>

            {/* Custom Integration Solutions */}
            <div className="rounded-3xl border bg-gradient-to-br from-orange-50 to-red-50 p-8">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-800">
                <Wrench className="size-4" />
                Custom Integration
              </div>
              <h3 className="mb-4 text-xl font-bold text-slate-900">
                Tailored Integration Services
              </h3>
              <p className="mb-4 text-slate-700">
                Seamlessly integrate with your existing systems and workflows
                for maximum efficiency.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• ERP system integration</li>
                <li>• Legacy system connectivity</li>
                <li>• Custom API development</li>
                <li>• Data migration services</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-lg font-medium text-slate-700">
              Every solution is customized to fit your unique manufacturing
              environment.
            </p>
            <p className="mt-2 text-orange-600">
              Because one size never fits all in manufacturing.
            </p>
          </div>

          {/* Awards Section */}
          <Card className="mt-8 bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-8 text-center">
              <h3 className="mb-6 text-2xl font-bold text-slate-900">
                CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
              </h3>
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
    </GridSection>
  );
}
