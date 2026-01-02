import * as React from 'react';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';

export default function EoqPage(): React.JSX.Element {
  return (
    <div className="min-h-screen text-[18px]">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Operations Manager: EOQ
            </h1>
            <p className="text-gray-700">
              Economic Order Quantity for Optimal Inventory Management
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl space-y-8">
            {/* Text Left, Image Right */}
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-900">
                  Economic Order Quantity (EOQ)
                </h2>
                <p className="mb-4 leading-relaxed text-gray-700">
                  The purpose of the EOQ model is simple, to find that
                  particular quantity to order which minimizes the total
                  variable costs of inventory. Total variable costs are usually
                  computed on an annual basis and include two components, the
                  costs of ordering and holding inventory.
                </p>
                <p className="leading-relaxed text-gray-700">
                  Annual ordering cost is the number of orders placed times the
                  marginal or incremental cost incurred per order. This
                  incremental cost includes several components: the costs of
                  preparing the purchase order, paying the vendor's invoice, and
                  inspecting and handling the material when it arrives.
                </p>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/images/Edgebic/2022-11/eoq.png"
                  alt="Spreadsheet showing economic order quantity calculations"
                  width={600}
                  height={400}
                  className="h-auto max-w-full rounded-lg shadow-lg"
                />
              </div>
            </div>

            <div>
              <p className="leading-relaxed text-gray-700">
                Why don't we include the purchase cost of the inventory in
                this calculation? It is not a variable cost. We have to
                purchase the inventory in any event. The goal is to minimize
                those costs that vary with the quantity purchased at one time.
                The EOQ is not especially sensitive to errors in inputs, so a
                ball-park figure is good enough.
              </p>
            </div>
    </div>
  );
}
