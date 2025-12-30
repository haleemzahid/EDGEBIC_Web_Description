import * as React from 'react';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';

export default function IChartPage(): React.JSX.Element {
  return (
    <div className="min-h-screen text-[18px]">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Operations Manager: I-CHART
            </h1>
            <p className="text-gray-700">
              Individual Observations Control Chart
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
                Individual Observations (I-CHART)
              </h2>
              <p className="leading-relaxed text-gray-700">
                The I-CHART is another variables control chart used to monitor
                individual observations (samples of one each) rather than
                larger samples. The I-CHART is most used in cases where a
                considerable period of time elapses between opportunities to
                collect quality observations. For example, there may only be one
                quality observation per shift in operations with long lead
                times. Although the I-CHART is usually identified with
                manufacturing applications, it is widely used in casinos to
                monitor card, dice, and roulette games. The individual
                observations entered in the chart are typically the net cash
                profits recorded when a dealer settles his or her account with
                the house at the end of a work period.
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
