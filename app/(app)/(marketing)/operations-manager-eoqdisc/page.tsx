import * as React from 'react';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';

export default function OperationsManagerEoqdiscPage(): React.JSX.Element {
  return (
    <div className="min-h-screen text-[18px]">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Operations Manager: EOQDISC
            </h1>
            <p className="text-gray-700">
              EOQ with Quantity Discounts for Better Purchasing Decisions
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
                EOQ with Quantity Discounts (EOQDISC)
              </h2>
              <p className="mb-4 leading-relaxed text-gray-700">
                Many companies blindly purchase in large quantities to get
                discount prices without considering all the tradeoffs
                involved. The costs may well outweigh any savings in purchase
                price. The EOQDISC model helps you analyze quantity discount
                offers and make better purchasing decisions.
              </p>
              <p className="mb-4 leading-relaxed text-gray-700">
                If you are in a position to bargain with the vendor on prices,
                use EOQDISC to find the breakeven price. This is the price at
                which you are indifferent about taking the discount because
                the annual costs for the standard price and the discount price
                are the same. You can use the breakeven price as the starting
                point for negotiating a better discount plan, one that
                benefits both vendor and customer.
              </p>
              <p className="leading-relaxed text-gray-700">
                Vendors sometimes offer several different price/quantity
                plans, so EOQDISC is set up to evaluate four discount plans at
                once.
              </p>
            </div>

            {/* Awards Banner */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-8 text-center">
                <h2 className="mb-6 text-2xl font-bold text-slate-900">
                  CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
                </h2>
                <Image
                  src="https://www.usersolutions.com/wp-content/uploads/2022/07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
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
