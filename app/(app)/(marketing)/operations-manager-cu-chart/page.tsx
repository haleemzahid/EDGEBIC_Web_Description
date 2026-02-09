import * as React from 'react';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'CU-Chart for Number of Defects',
  description:
    'CU-CHART monitors the number of defects per inspection unit. Ideal when products have multiple defects but are not entirely unacceptable.',
  path: '/operations-manager-cu-chart',
  keywords: 'CU-chart, defects per unit, attributes chart, quality control, inspection unit, SPC'
});

export default function OperationsManagerCuChartPage(): React.JSX.Element {
  return (
    <div className="min-h-screen text-[18px]">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Operations Manager: CU Chart
            </h1>
            <p className="text-gray-700">
              Control Chart For Number of Defects
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
                Control Chart For Number of Defective (CU-CHART)
              </h2>
              <p className="mb-4 leading-relaxed text-gray-700">
                Occasionally, product classification as merely good or bad is
                not enough and variable measurements do not apply. For
                example, in evaluating the quality of a new automobile, there
                could be many defects but it would be misleading to classify
                the entire automobile as unacceptable. The solution in
                situations like this is another attributes chart, the
                CU-CHART, which monitors the number of defects per inspection
                unit.
              </p>
              <p className="mb-4 leading-relaxed text-gray-700">
                In general, the inspection unit is usually expected to
                have some defects and we wish to know whether the number of
                defects is excessive. CU-CHART is also valuable when
                dimensions or units of measure complicate quality assessments.
              </p>
              <p className="leading-relaxed text-gray-700">
                Three conditions must be satisfied to use CU-CHART. First, the
                definition of an inspection unit must be constant from one
                time period to the next. Second, there must be a very large
                number of opportunities for defects to occur in each unit
                produced. Third, the probability that a defect will occur at
                any particular location in each unit must be very small.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
