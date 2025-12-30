import * as React from 'react';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';

export default function EoqprodPage(): React.JSX.Element {
  return (
    <div className="min-h-screen text-[18px]">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Operations Manager: EOQPROD
            </h1>
            <p className="text-gray-700">
              EOQ for Production Lot Sizes - Optimizing Manufacturing Batch
              Quantities
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
                EOQ for Production Lot Sizes (EOQPROD)
              </h2>
              <p className="leading-relaxed text-gray-700">
                Alvin Air Systems in Alvin, Texas, produces repair and
                maintenance items for commercial air conditioning systems.
                Alvin cannot use the standard EOQ for determining production
                lot sizes. One problem is that the standard EOQ assumes that
                an order quantity or lot of material is received all at once.
                At Alvin, most production lots take some time to complete and
                parts are placed in stock on a daily basis until the run is
                over. A related problem is that substantial sales usually
                occur before the run is over. To solve these problems, Alvin
                uses the modified EOQ model for production lot sizes. Why? The
                EOQ must be larger than maximum investment to account for
                sales made during the production run.
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
