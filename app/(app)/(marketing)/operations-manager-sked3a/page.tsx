import * as React from 'react';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';

export default function Sked3aPage(): React.JSX.Element {
  return (
    <div className="min-h-screen text-[18px]">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Operations Manager: SKED3A
            </h1>
            <p className="text-gray-700">
              Job Sequencing For 3 Work Stations in Series
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
                Job Sequencing For 3 Work Stations in Series (SKED3A)
              </h2>
              <p className="leading-relaxed text-gray-700">
                SKED3A is designed for flow shops of 3 work stations arranged
                in series. Each job receives exactly the same processing at
                each station. In such flow shops, there is no attempt to
                minimize lateness; instead, the objective is to minimize the
                total time needed to complete a batch of jobs. In both SKED2A
                and SKED3A, there may be several alternative optimal
                solutions. Depending on how the jobs are sequenced before
                running the Ctrl – Shift – J macro, the worksheet may generate
                different sequences with the same makespan.
              </p>
            </div>

            {/* Awards Banner */}
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
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
