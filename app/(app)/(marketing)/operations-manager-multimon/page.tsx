import * as React from 'react';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';

export default function MultimonPage(): React.JSX.Element {
  return (
    <div className="min-h-screen text-[18px]">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Operations Manager: MULTIMON
            </h1>
            <p className="text-gray-700">
              Seasonal Adjustment for Monthly Data
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
                Seasonal Adjustment
              </h2>
              <p className="mb-4 leading-relaxed text-gray-700">
                Regular seasonal patterns appear in most business data. The
                weather affects the sales of everything from bikinis to
                snowmobiles. Around holiday periods, we see increases in the
                number of retail sales, long-distance telephone calls, and
                gasoline consumption. Business policy can cause seasonal
                patterns in sales. Many companies run annual dealer
                promotions which cause peaks in sales. Other companies
                depress sales temporarily by shutting down plants for annual
                vacation periods.
              </p>
              <p className="leading-relaxed text-gray-700">
                Usually seasonality is obvious but there are times when it
                is not. Two questions should be asked when there is doubt
                about seasonality. First, are the peaks and troughs
                consistent? That is, do the high and low points of the
                pattern occur in about the same periods (week, month, or
                quarter) each year? Second, is there an explanation for the
                seasonal pattern? The most common reasons for seasonality
                are weather and holidays, although company policy such as
                annual sales promotions may be a factor.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Classical Decomposition Method
              </h2>
              <p className="mb-4 leading-relaxed text-gray-700">
                Our approach to forecasting seasonal data is based on the
                classical decomposition method developed by economists in
                the nineteenth century. Decomposition means separation of
                the time series into its component parts. A complete
                decomposition separates the time series into four
                components: seasonality, trend, cycle, and randomness. The
                cycle is a long-range pattern related to the growth and
                decline of industries or the economy as a whole.
              </p>
              <p className="leading-relaxed text-gray-700">
                Two worksheets are available for seasonal adjustment.
                MULTIMON uses the ratio-to-moving average method to adjust
                monthly data. ADDITMON uses a similar method called the
                difference-to-moving average method to adjust monthly data.
                It may be necessary to test both of these worksheets before
                choosing a seasonal pattern.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
