import * as React from 'react';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';

export default function Mrp1Page(): React.JSX.Element {
  return (
    <div className="min-h-screen text-[18px]">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Operations Manager: MRP1
            </h1>
            <p className="text-gray-700">
              MRP Inventory Planning for Weekly Net Requirements
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
                MRP Inventory Plan (MRP1)
              </h2>
              <p className="mb-4 leading-relaxed text-gray-700">
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
              <p className="leading-relaxed text-gray-700">
                MRP1 makes it easy to do a great deal of what-if analysis. A
                common problem in lot-sizing is that it frequently leads to
                carrying excess stock during periods of low demand. You can
                attempt to minimize excess stock by trying different lot
                sizes. If leadtimes are uncertain, you can add "safety
                leadtime" by trying larger leadtime values. If yields are
                uncertain, you can decrease the yield percentage.
              </p>
            </div>
    </div>
  );
}
