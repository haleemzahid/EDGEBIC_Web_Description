import * as React from 'react';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MultimonPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-6 text-white dark:from-blue-800 dark:to-blue-900">
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
              Operations Manager: MULTIMON
            </h1>
            <p className="mb-6 text-xl md:text-2xl">
              Seasonal Adjustment for Monthly Data
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

      {/* Main Content */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-6 text-center text-3xl font-bold">
              Seasonal Adjustment
            </h2>

            <Card>
              <CardContent className="p-8">
                <div className="space-y-4">
                  <p className="text-lg leading-relaxed">
                    Regular seasonal patterns appear in most business data. The
                    weather affects the sales of everything from bikinis to
                    snowmobiles. Around holiday periods, we see increases in the
                    number of retail sales, long-distance telephone calls, and
                    gasoline consumption. Business policy can cause seasonal
                    patterns in sales. Many companies run annual dealer
                    promotions which cause peaks in sales. Other companies
                    depress sales temporarily by shutting down plants for annual
                    vacation periods.
                  </p>

                  <p className="text-lg leading-relaxed">
                    Usually seasonality is obvious but there are times when it
                    is not. Two questions should be asked when there is doubt
                    about seasonality. First, are the peaks and troughs
                    consistent? That is, do the high and low points of the
                    pattern occur in about the same periods (week, month, or
                    quarter) each year? Second, is there an explanation for the
                    seasonal pattern? The most common reasons for seasonality
                    are weather and holidays, although company policy such as
                    annual sales promotions may be a factor. If the answer to
                    either of these questions is no, seasonality should not be
                    used in the forecasts.
                  </p>

                  <p className="text-lg leading-relaxed">
                    Our approach to forecasting seasonal data is based on the
                    classical decomposition method developed by economists in
                    the nineteenth century. Decomposition means separation of
                    the time series into its component parts. A complete
                    decomposition separates the time series into four
                    components: seasonality, trend, cycle, and randomness. The
                    cycle is a long-range pattern related to the growth and
                    decline of industries or the economy as a whole.
                  </p>

                  <p className="text-lg leading-relaxed">
                    Two worksheets are available for seasonal adjustment.
                    MULTIMON uses the ratio-to-moving average method to adjust
                    monthly data. ADDITMON uses a similar method called the
                    difference-to-moving average method to adjust monthly data.
                    It may be necessary to test both of these worksheets before
                    choosing a seasonal pattern.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
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
