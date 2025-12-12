import * as React from 'react';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function IChartPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-6 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <div className="mb-6">
              <Badge
                variant="outline"
                className="h-8 rounded-full border-white/20 bg-white/10 px-3 text-sm font-medium text-white shadow-sm"
              >
                OPERATIONS MANAGER
              </Badge>
            </div>
            <h1 className="mb-6 text-4xl font-bold md:text-6xl">
              Operations Manager: I-CHART
            </h1>
            <p className="mb-6 text-xl md:text-2xl">
              Individual Observations Control Chart
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Request Free Product
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* I-CHART Overview */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-3xl">
                  Individual Observations (I-CHART)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  The I-CHART is another variables control chart used to monitor
                  individual observations (samples of one each) rather than
                  larger samples. The I-CHART is most used in cases where a
                  considerable period of time elapses between opportunities to
                  collect quality observations. For example, there only be one
                  quality observation per shift in operations with long lead
                  times. Although the I-CHART is usually identified with
                  manufacturing applications, it is widely used in casinos to
                  monitor card, dice, and roulette games. The individual
                  observations entered in the chart are typically the net cash
                  profits recorded when a dealer settles his or her account with
                  the house at the end of a work period.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-8 text-center">
                <h2 className="mb-6 text-2xl font-bold text-foreground">
                  CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
                </h2>
                <div className="flex justify-center">
                  <Image
                    src="https://www.usersolutions.com/wp-content/uploads/2022/07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                    alt="Collection of industry and business awards logos"
                    width={1024}
                    height={128}
                    className="h-auto max-w-full rounded-lg shadow-md"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
