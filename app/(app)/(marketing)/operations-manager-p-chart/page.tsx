import * as React from 'react';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'P-Chart for Percent Defective',
  description:
    'P-CHART is the most versatile control chart for monitoring percent defective. Classify items as good or bad for quality control.',
  path: '/operations-manager-p-chart',
  keywords: 'P-chart, percent defective, attributes chart, quality control, defect monitoring, SPC'
});

export default function PChartPage(): React.JSX.Element {
  return (
    <div className="min-h-screen text-[18px]">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Operations Manager: P-CHART
            </h1>
            <p className="text-gray-700">
              Control Chart For Percent Defective
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
                Control Chart For Percent Defective (P-CHART)
              </h2>
              <p className="leading-relaxed text-gray-700">
                P-CHART is the most versatile and popular control chart. To
                use P-CHART, quality inspectors classify sample items into two
                groups: good or bad. This can mean defective or non-defective,
                conforming or non-conforming to specifications, acceptable or
                unacceptable, or other definitions in which there are only two
                categories of results. Brookshire Cookware Corporation, a
                producer of pots and pans located in Brookshire, Texas, uses
                P-CHART worksheets to monitor the quality of component parts
                received from its Mexican suppliers. At the end of each
                business day, Brookshire faxes a copy of each P-CHART to its
                suppliers. This feedback helps maintain a good working
                relationship with suppliers and alerts them to potential
                problems.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
