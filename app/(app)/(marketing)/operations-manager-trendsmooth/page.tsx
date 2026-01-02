import * as React from 'react';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';

export default function TrendsmoothPage(): React.JSX.Element {
  return (
    <div className="min-h-screen text-[18px]">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Operations Manager: TRENDSMOOTH
            </h1>
            <p className="text-gray-700">
              Smoothing linear, exponential, and damped trends for accurate
              forecasting
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
                Trend Smoothing Overview
              </h2>
              <p className="leading-relaxed text-gray-700">
                Exponential smoothing with a trend works much like simple
                smoothing except that two components must be updated each
                period: level and trend. The level is a smoothed estimate of
                the value of the data at the end of each period. The trend is
                a smoothed estimate of average growth at the end of each
                period.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Case Study: Alief Precision Arms
              </h2>
              <p className="mb-4 leading-relaxed text-gray-700">
                To explain this type of forecasting, let's review an
                application at Alief Precision Arms, a company that
                manufactures high-quality replicas of the Colt Single-Action
                Army revolver and other revolvers from the nineteenth century.
              </p>
              <p className="leading-relaxed text-gray-700">
                Alief was founded in 1987 and experienced rapid growth through
                about 1994. Since 1994, growth has slowed and Alief is
                uncertain about the growth that should be projected in the
                future.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Forecasting Capabilities
              </h2>
              <p className="mb-4 leading-relaxed text-gray-700">
                The worksheet was developed to help Alief compare several
                different types of trend forecasts. This worksheet can
                produce:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li>
                  <strong className="text-slate-900">Linear or straight-line trend:</strong>{' '}
                  Standard linear growth projection
                </li>
                <li>
                  <strong className="text-slate-900">Damped trend:</strong>{' '}
                  Where the amount of growth declines each period in the future
                </li>
                <li>
                  <strong className="text-slate-900">Exponential trend:</strong>{' '}
                  Where the amount of growth increases each period in the future
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Key Benefits
              </h2>
              <p className="leading-relaxed text-gray-700">
                TRENDSMOOTH is a robust model, relatively insensitive to
                smoothing parameters provided that they are approximately
                correct.
              </p>
            </div>
    </div>
  );
}
