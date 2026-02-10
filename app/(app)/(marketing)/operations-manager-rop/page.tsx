import * as React from 'react';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Reorder Points and Safety Stocks',
  description:
    'Calculate optimal reorder points and safety stocks when demand is uncertain. Excel worksheet for inventory management.',
  path: '/operations-manager-rop',
  keywords: 'reorder point, safety stock, uncertain demand, inventory investment, ROP calculator'
});

export default function OperationsManagerRopPage(): React.JSX.Element {
  return (
    <div className="min-h-screen text-[18px]">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Operations Manager: ROP
            </h1>
            <p className="text-gray-700">
              Reorder Points and Safety Stocks
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
                Reorder Points and Safety Stocks (ROP)
              </h2>
              <p className="leading-relaxed text-gray-700">
                When demand is uncertain, inventory investment from the EOQ
                model should be supplemented with safety stock. ROP.xls is a
                worksheet used to compute safety stocks and reorder points.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
