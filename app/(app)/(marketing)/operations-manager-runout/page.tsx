import * as React from 'react';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Run-Out Time Production Planning',
  description:
    'Run-out time production planning model to balance inventory levels. Calculate equal run-out times for inventory management.',
  path: '/operations-manager-runout',
  keywords: 'run-out time, production planning, inventory management, stock production, what-if analysis'
});

export default function RunoutPage(): React.JSX.Element {
  return (
    <div className="min-h-screen text-[18px]">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Operations Manager: RUNOUT
            </h1>
            <p className="text-gray-700">
              Run-out Time Production Planning
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl space-y-8">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Run-out Time Production Planning (RUNOUT)
              </h2>
              <p className="leading-relaxed text-gray-700">
                The aim is to give each inventory item the same run-out time,
                defined as the number of weeks the inventory will last at
                current demand rates. Of course, the demand forecasts change
                weekly, so run-out time is updated weekly. Management controls
                the model by specifying the number of hours to be worked next
                week on stock production. Other inputs include the item
                description, the production hours required to produce 1 unit,
                the inventory on-hand in units, and the demand forecast for
                the next week in units. It is easy to do what-if analysis with
                the RUNOUT model.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
