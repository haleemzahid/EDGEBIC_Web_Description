import * as React from 'react';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function OperationsManagerCuChartPage(): React.JSX.Element {
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
              Operations Manager: CU Chart
            </h1>
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

      {/* CU Chart Content */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-3xl">
                  Control Chart For Number of Defective (CU-CHART)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Occasionally, product classification as merely good or bad is
                  not enough and variable measurements do not apply. For
                  example, in evaluating the quality of a new automobile, there
                  could be many defects but it would be misleading to classify
                  the entire automobile as unacceptable. The solution in
                  situations like this is another attributes chart, the
                  CU-CHART, which monitors the number of defects per inspection
                  unit. In general, the inspection unit is usually expected to
                  have some defects and we wish to know whether the number of
                  defects is excessive. CU-CHART is also valuable when
                  dimensions or units of measure complicate quality assessments.
                </p>

                <p className="text-lg leading-relaxed text-muted-foreground">
                  For example, suppose that a coil of steel is 100 meters long
                  and contains 7 lamination defects. What is the defect rate? It
                  could be 7/100 = 7%. But the defects are small, each perhaps a
                  centimeter in length. There are 10,000 centimeters in the coil
                  so the defect rate becomes 0.07%. We could also compute the
                  square centimeters in the area of the coil and compute yet
                  another defect rate. The only sensible way around this problem
                  with dimensions is to state quality in terms of total number
                  of defects per inspection unit.
                </p>

                <p className="text-lg leading-relaxed text-muted-foreground">
                  Three conditions must be satisfied to use CU-CHART. First, the
                  definition of an inspection unit must be constant from one
                  time period to the next. Second, there must be a very large
                  number of opportunities for defects to occur in each unit
                  produced. Third, the probability that a defect will occur at
                  any particular location in each unit must be very small.
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
