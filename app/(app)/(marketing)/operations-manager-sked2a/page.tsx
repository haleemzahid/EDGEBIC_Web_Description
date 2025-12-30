import * as React from 'react';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';

export default function OperationsManagerSked2aPage(): React.JSX.Element {
  return (
    <div className="min-h-screen text-[18px]">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Operations Manager: SKED2A
            </h1>
            <p className="text-gray-700">
              Job Sequencing For 2 Work Stations in Series
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
                Job Sequencing For 2 Work Stations in Series (SKED2A)
              </h2>
              <p className="leading-relaxed text-gray-700">
                SKED2A is designed for flow shops of 2 work stations
                arranged in series. Each job receives exactly the same
                processing at each station. In such flow shops, there is no
                attempt to minimize lateness; instead, the objective is to
                minimize the total time needed to complete a batch of jobs.
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
