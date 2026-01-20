import * as React from 'react';

import { BlurFade } from '@/components/marketing/fragments/blur-fade';
import { GridSection } from '@/components/marketing/fragments/grid-section';
import { TextGenerateEffect } from '@/components/marketing/fragments/text-generate-effect';
import { Button } from '@/components/ui/button';
import { getNTClipboardPricing } from '@/lib/billing/get-ntclipboard-pricing';

export async function NTClipboardCTA(): Promise<React.JSX.Element> {
  const pricing = await getNTClipboardPricing();
  const displayPrice = pricing?.formattedPrice || '$49';
  return (
    <GridSection className="bg-diagonal-lines">
      <div className="container flex flex-col items-center justify-between gap-6 bg-background py-6 text-center">
        <h3 className="m-0 max-w-fit text-3xl font-semibold md:text-4xl">
          <TextGenerateEffect words="Ready to transform your production planning?" />
        </h3>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Join thousands of professionals who have revolutionized their
          production scheduling process with EDGEBIC. One-time purchase,
          lifetime value.
        </p>
        <BlurFade inView>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-500 px-8 py-3 text-lg font-bold text-white hover:from-orange-600 hover:to-red-600"
              asChild
            >
              <a href="#EDGEBICPricing">Get EDGEBI - {displayPrice}</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 px-8 py-3 text-lg"
              asChild
            >
              <a href="#demo">See Demo</a>
            </Button>
          </div>
        </BlurFade>
        <p className="text-sm text-muted-foreground">
          {/* 30-day money-back guarantee •  */}
          Instant download • Windows only
        </p>
      </div>
    </GridSection>
  );
}
