import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';


import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdditmonPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-6 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <div className="mb-6">
            </div>
            <h1 className="mb-6 text-4xl font-bold md:text-6xl">
              Operations Manager: ADDITMON
            </h1>
            <p className="mb-6 text-xl md:text-2xl">
              Difference-to-Moving Average Method for Monthly Seasonal
              Adjustment
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/buy-now-operations-manager">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Request Free Product
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Seasonal Adjustment Overview */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-center text-3xl">
                  Seasonal Adjustment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Regular seasonal patterns appear in most business data. The
                  weather affects the sales of everything from bikinis to
                  snowmobiles. Around holiday periods, we see increases in the
                  number of retail sales, long-distance telephone calls, and
                  gasoline consumption. Business policy can cause seasonal
                  patterns in sales. Many companies run annual dealer promotions
                  which cause peaks in sales. Other companies depress sales
                  temporarily by shutting down plants for annual vacation
                  periods.
                </p>

                <p className="text-lg leading-relaxed text-muted-foreground">
                  Usually seasonality is obvious but there are times when it is
                  not. Two questions should be asked when there is doubt about
                  seasonality. First, are the peaks and troughs consistent? That
                  is, do the high and low points of the pattern occur in about
                  the same periods (week, month, or quarter) each year? Second,
                  is there an explanation for the seasonal pattern? The most
                  common reasons for seasonality are weather and holidays,
                  although company policy such as annual sales promotions may be
                  a factor. If the answer to either of these questions is no,
                  seasonality should not be used in the forecasts.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Classical Decomposition Method */}
      <section className="bg-muted/50 py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  Classical Decomposition Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Our approach to forecasting seasonal data is based on the
                  classical decomposition method developed by economists in the
                  nineteenth century. Decomposition means separation of the time
                  series into its component parts. A complete decomposition
                  separates the time series into four components: seasonality,
                  trend, cycle, and randomness. The cycle is a long-range
                  pattern related to the growth and decline of industries or the
                  economy as a whole.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ADDITMON Method */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-center text-3xl">
                  ADDITMON: Difference-to-Moving Average Method
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Two worksheets are available for seasonal adjustment. MULTIMON
                  uses the ratio-to-moving average method to adjust monthly
                  data. ADDITMON uses a similar method called the
                  difference-to-moving average method to adjust monthly data. It
                  may be necessary to test both of these worksheets before
                  choosing a seasonal pattern.
                </p>

                <div className="rounded-lg bg-blue-50 p-6">
                  <h3 className="mb-4 text-xl font-semibold text-blue-600">
                    Key Features of ADDITMON
                  </h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="mr-3 text-blue-600">•</span>
                      <span>
                        Difference-to-moving average method for monthly data
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 text-blue-600">•</span>
                      <span>
                        Separates time series into seasonality, trend, cycle,
                        and randomness
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 text-blue-600">•</span>
                      <span>
                        Handles seasonal patterns affected by weather and
                        holidays
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 text-blue-600">•</span>
                      <span>
                        Accounts for business policy impacts like annual
                        promotions
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 text-blue-600">•</span>
                      <span>
                        Alternative to MULTIMON's ratio-to-moving average method
                      </span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* When to Use ADDITMON */}
      <section className="bg-muted/50 py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  Identifying Seasonality in Your Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Two critical questions should be asked when there is doubt
                  about seasonality:
                </p>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="border-2 border-green-200 bg-green-50/50">
                    <CardHeader>
                      <CardTitle className="text-xl text-green-600">
                        Question 1: Consistency
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Are the peaks and troughs consistent? Do the high and
                        low points of the pattern occur in about the same
                        periods (week, month, or quarter) each year?
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-blue-200 bg-blue-50/50">
                    <CardHeader>
                      <CardTitle className="text-xl text-blue-600">
                        Question 2: Explanation
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        Is there an explanation for the seasonal pattern? Common
                        reasons include weather, holidays, or company policy
                        such as annual sales promotions.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="rounded-lg bg-yellow-50 p-6">
                  <p className="text-lg font-semibold text-yellow-800">
                    ⚠️ Important Note
                  </p>
                  <p className="mt-2 text-muted-foreground">
                    If the answer to either of these questions is no,
                    seasonality should not be used in the forecasts.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Common Seasonal Patterns */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-6 text-center text-3xl font-bold text-foreground">
              Common Seasonal Patterns
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">
                    Weather-Related Patterns
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Bikini sales increase in summer months</li>
                    <li>• Snowmobile sales peak in winter</li>
                    <li>• Air conditioning demand in hot seasons</li>
                    <li>• Heating fuel consumption in cold months</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-green-600">
                    Holiday-Related Patterns
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Retail sales surges during holidays</li>
                    <li>• Long-distance telephone calls on holidays</li>
                    <li>• Gasoline consumption during travel seasons</li>
                    <li>• Gift and decoration purchases</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-purple-600">
                    Business Policy Patterns
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Annual dealer promotions causing peaks</li>
                    <li>• Plant shutdowns for vacations</li>
                    <li>• End-of-quarter sales pushes</li>
                    <li>• Fiscal year-end activities</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">
                    Time Series Components
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Seasonality - recurring patterns</li>
                    <li>• Trend - long-term direction</li>
                    <li>• Cycle - industry growth/decline</li>
                    <li>• Randomness - unpredictable variation</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Guide */}
      <section className="bg-muted/50 py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  Choosing Between MULTIMON and ADDITMON
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-6">
                  <h3 className="mb-4 text-xl font-semibold">
                    Testing Approach
                  </h3>
                  <p className="mb-4 text-muted-foreground">
                    It may be necessary to test both MULTIMON (ratio-to-moving
                    average) and ADDITMON (difference-to-moving average)
                    worksheets before choosing a seasonal pattern for your
                    forecasts.
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg bg-white p-4">
                      <h4 className="mb-2 font-semibold text-blue-600">
                        MULTIMON
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Ratio-to-moving average method - best for multiplicative
                        seasonal patterns
                      </p>
                    </div>
                    <div className="rounded-lg bg-white p-4">
                      <h4 className="mb-2 font-semibold text-purple-600">
                        ADDITMON
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Difference-to-moving average method - best for additive
                        seasonal patterns
                      </p>
                    </div>
                  </div>
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
