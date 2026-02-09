import * as React from 'react';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Period-Order-Quantity for MRP',
  description:
    'Period-Order-Quantity model for lumpy demand in MRP systems. Avoid remnants and achieve lower costs than standard EOQ.',
  path: '/operations-manager-poq',
  keywords: 'period order quantity, POQ, MRP lot sizing, lumpy demand, inventory remnants'
});

export default function OperationsManagerPoqPage(): React.JSX.Element {
  return (
    <div className="min-h-screen text-[18px]">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Operations Manager: POQ
            </h1>
            <p className="text-gray-700">
              Period-Order-Quantity for Lumpy Demand
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
                Period-Order-Quantity (POQ)
              </h2>
              <p className="leading-relaxed text-gray-700">
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
