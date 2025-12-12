import * as React from 'react';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TrendsmoothPage(): React.JSX.Element {
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
              Operations Manager: TRENDSMOOTH
            </h1>
            <p className="mb-6 text-xl md:text-2xl">
              Smoothing linear, exponential, and damped trends for accurate
              forecasting
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
            <h2 className="mb-6 text-center text-3xl font-bold text-foreground">
              Smoothing linear, exponential, and damped trends (TRENDSMOOTH)
            </h2>

            <Card className="mb-6">
              <CardContent className="pt-6">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Exponential smoothing with a trend works much like simple
                  smoothing except that two components must be updated each
                  period: level and trend. The level is a smoothed estimate of
                  the value of the data at the end of each period. The trend is
                  a smoothed estimate of average growth at the end of each
                  period.
                </p>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-2xl">
                  Case Study: Alief Precision Arms
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  To explain this type of forecasting, let's review an
                  application at Alief Precision Arms, a company that
                  manufactures high-quality replicas of the Colt Single-Action
                  Army revolver and other revolvers from the nineteenth century.
                </p>
                <p className="text-muted-foreground">
                  Alief was founded in 1987 and experienced rapid growth through
                  about 1994. Since 1994, growth has slowed and Alief is
                  uncertain about the growth that should be projected in the
                  future.
                </p>
              </CardContent>
            </Card>

            <h3 className="mb-4 text-2xl font-semibold text-foreground">
              Forecasting Capabilities
            </h3>
            <Card>
              <CardContent className="pt-6">
                <p className="mb-6 text-muted-foreground">
                  The worksheet was developed to help Alief compare several
                  different types of trend forecasts. This worksheet can
                  produce:
                </p>

                <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
                  <li>
                    <strong>Linear or straight-line trend</strong>
                  </li>
                  <li>
                    <strong>Damped trend</strong> - where the amount of growth
                    declines each period in the future
                  </li>
                  <li>
                    <strong>Exponential trend</strong> - where the amount of
                    growth increases each period in the future
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card className="mt-6 bg-primary/10">
              <CardContent className="pt-6">
                <h3 className="mb-3 text-xl font-semibold text-primary">
                  Key Benefits
                </h3>
                <p className="text-muted-foreground">
                  TRENDSMOOTH is a robust model, relatively insensitive to
                  smoothing parameters provided that they are approximately
                  correct.
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
