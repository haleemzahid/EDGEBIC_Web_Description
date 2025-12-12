import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Mrp1Page(): React.JSX.Element {
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
              Operations Manager: MRP1
            </h1>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/contact-us">
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

      {/* EOQ Content */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-3xl">
                  MRP Inventory Plan (MRP1)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  MRP1 computes weekly net requirements for an inventory item
                  for up to 20 weeks in the future. The model then schedules
                  planned order releases and receipts to satisfy those
                  requirements. Leadtimes can range from 0 to 6 weeks. MRP1 can
                  handle a variety of practical complications in inventory
                  planning, such as units previously allocated to specific
                  future production runs, previously scheduled order receipts,
                  lot sizing, safety stocks, and yields which are less than 100%
                  of production quantities.
                </p>

                <p className="text-lg leading-relaxed text-muted-foreground">
                  MRP1 makes it easy to do a great deal of what-if analysis. A
                  common problem in lot-sizing is that it frequently leads to
                  carrying excess stock during periods of low demand. You can
                  attempt to minimize excess stock by trying different lot
                  sizes. If leadtimes are uncertain, you can add "safety
                  leadtime" by trying larger leadtime values. If yields are
                  uncertain, you can decrease the yield percentage. Another
                  option is the POQ model in the next section.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section>
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
