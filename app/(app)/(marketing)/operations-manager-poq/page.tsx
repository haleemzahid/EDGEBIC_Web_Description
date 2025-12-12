import * as React from 'react';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function OperationsManagerPoqPage(): React.JSX.Element {
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
              Operations Manager: POQ
            </h1>
            <p className="mb-6 text-xl md:text-2xl">Period-Order-Quantity</p>
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

      {/* POQ Overview */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-3xl">
                  Period-Order-Quantity (POQ)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Production economics may dictate the use of lot-sizing in MRP
                  systems but the EOQ rarely works very well. The problem is
                  that the EOQ is based on the assumption that demand is
                  continuous and uniform. In MRP systems, demand for component
                  parts tends to be "lumpy," that is, discontinuous and
                  nonuniform, with frequent periods of zero demand. When the EOQ
                  is applied to lumpy demand, lot sizes usually don't cover
                  whole periods of demand. The result is that unnecessary
                  inventory is often carried during the periods following the
                  receipt of a lot. This unnecessary inventory is called
                  "remnants" because it is left over from previous lots. The
                  period-order-quantity (POQ) model was designed to avoid
                  remnants and give lower costs with lumpy demand.
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
                <h3 className="mb-6 text-2xl font-bold text-slate-900">
                  CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
                </h3>
                <img
                  src="https://www.usersolutions.com/wp-content/uploads/2022/07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                  alt="Collection of industry and business awards logos"
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
