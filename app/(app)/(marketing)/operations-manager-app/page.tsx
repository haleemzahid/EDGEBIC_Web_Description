import * as React from 'react';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';

export default function OperationsManagerAppPage(): React.JSX.Element {
  return (
    <div className="min-h-screen text-[18px]">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Operations Manager: APP
            </h1>
            <p className="text-gray-700">
              Aggregate Production Planning
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
                Aggregate Production Planning (APP)
              </h2>
              <p className="leading-relaxed text-gray-700">
                Aggregate production planning is the process of determining
                (1) the timing and quantity of production, (2) the level of
                inventories, (3) the number of workers employed, and (4) the
                amount of overtime used for up to 12 months ahead. Production
                and inventories are stated in overall or aggregate quantities,
                such as number of automobiles without regard to model or color
                or number of pairs of shoes without regard to style or size.
                Cost minimization is rarely the only goal in aggregate
                planning. Other considerations, such as stability of the
                workforce and maintenance of adequate inventory levels, are
                usually just as important.
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
