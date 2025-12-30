import * as React from 'react';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';

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

            {/* Awards Banner */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-8 text-center">
                <h2 className="mb-6 text-2xl font-bold text-slate-900">
                  CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
                </h2>
                <Image
                  src="/images/Edgebic/2022-07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                  alt="Collection of industry and business awards logos"
                  width={1024}
                  height={128}
                  className="mx-auto h-auto max-w-full"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
