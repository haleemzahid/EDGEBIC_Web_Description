import * as React from 'react';
import Image from 'next/image';
import { CheckIcon, StarIcon } from 'lucide-react';

import { GridSection } from '@/components/marketing/fragments/grid-section';
import { SiteHeading } from '@/components/marketing/fragments/site-heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { getNTClipboardPricing } from '@/lib/billing/get-ntclipboard-pricing';

import { PurchaseForm } from './purchase-form';

const features = [
  'Complete EDGEBIC Production Planning Solution',
  'Advanced Production Scheduling',
  'Real-time Tracking & Monitoring',
  'Custom Data Integration',
  'Lifetime Updates',
  'No Monthly Fees Ever',
  'Works with Any Data Source'
];

export async function NTClipboardPricing(): Promise<React.JSX.Element> {
  const pricing = await getNTClipboardPricing();

  // Fallback pricing if Stripe data is not available
  const displayPrice = pricing?.formattedPrice || '$49';

  return (
    <GridSection hideVerticalGridLines>
      <div
        className="container py-24 md:py-32"
        id="EDGEBICPricing"
      >
        <SiteHeading
          title="Simple, One-Time Pricing"
          description="No subscriptions, no recurring fees. Pay once, use forever."
        />
        <div className="mt-6 flex justify-center">
          <div className="relative w-full max-w-lg">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 opacity-20 blur-xl" />
            <div className="relative rounded-3xl border-2 border-orange-200 bg-white p-8 shadow-2xl">
              <div className="text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-100 to-red-100 px-4 py-2 text-sm font-medium text-orange-800">
                  <StarIcon className="size-4" />
                  Limited Time Offer
                </div>
                <div className="mb-2 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-6xl font-bold text-transparent">
                  {displayPrice}
                </div>
                <p className="mb-6 text-muted-foreground">
                  One-time payment • Lifetime license
                </p>

                <div className="mb-6 space-y-4">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3"
                    >
                      <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-green-100">
                        <CheckIcon className="size-3 text-green-600" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="lg"
                      className="mb-4 w-full bg-gradient-to-r from-orange-500 to-red-500 py-4 text-lg font-bold text-white hover:from-orange-600 hover:to-red-600"
                    >
                      Get EDGEBIC Now - {displayPrice}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Purchase EDGEBIC</DialogTitle>
                    </DialogHeader>
                    <PurchaseForm price={displayPrice} />
                  </DialogContent>
                </Dialog>

                <p className="text-sm text-muted-foreground">
                  💳 Secure payment
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Awards Section */}
        <Card className="mt-6 bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-8 text-center">
            <h3 className="mb-6 text-2xl font-bold text-slate-900">
              CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
            </h3>
            <div className="flex justify-center">
              <Image
                src="/images/Edgebic/2022-07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                alt="Collection of industry and business awards logos"
                width={1024}
                height={128}
                className="h-auto max-w-full rounded-lg shadow-md"
                loading="lazy"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </GridSection>
  );
}
