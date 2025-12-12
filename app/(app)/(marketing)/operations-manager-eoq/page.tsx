import * as React from 'react';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function EoqPage(): React.JSX.Element {
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
              Operations Manager: EOQ
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

      {/* EOQ Content */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-center text-3xl">
                  Economic Order Quantity (EOQ)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  The purpose of the EOQ model is simple, to find that
                  particular quantity to order which minimizes the total
                  variable costs of inventory. Total variable costs are usually
                  computed on an annual basis and include two components, the
                  costs of ordering and holding inventory. Annual ordering cost
                  is the number of orders placed times the marginal or
                  incremental cost incurred per order. This incremental cost
                  includes several components: the costs of preparing the
                  purchase order, paying the vendor's invoice, and inspecting
                  and handling the material when it arrives. It is difficult to
                  estimate these components precisely but a ball-park figure is
                  good enough. The EOQ is not especially sensitive to errors in
                  inputs.
                </p>

                <p className="text-lg leading-relaxed text-muted-foreground">
                  Why don't we include the purchase cost of the inventory in
                  this calculation? It is not a variable cost. We have to
                  purchase the inventory in any event. The goal is to minimize
                  those costs that vary with the quantity purchased at one time.
                </p>

                <div className="my-6 flex justify-center">
                  <Image
                    src="https://www.usersolutions.com/wp-content/uploads/2022/11/eoq.png"
                    alt="Spreadsheet showing economic order quantity calculations"
                    width={600}
                    height={400}
                    className="h-auto max-w-full rounded-lg shadow-md"
                  />
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
