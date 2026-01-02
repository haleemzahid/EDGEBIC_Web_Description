import * as React from 'react';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';

export default function OperationsManagerSimplePage(): React.JSX.Element {
  return (
    <div className="min-h-screen text-[18px]">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Operations Manager: Simple Analysis
            </h1>
            <p className="text-gray-700">
              Streamlined analysis tools for quick operational insights and
              decision making
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
                Simple Exponential Smoothing
              </h2>
              <p className="mb-4 leading-relaxed text-gray-700">
                More than 25% of U.S. corporations use some form of
                exponential smoothing as a forecasting model. Smoothing models
                are relatively simple, easy to understand, and easy to
                implement, especially in spreadsheet form. Smoothing models
                also compare quite favorably in accuracy to complex
                forecasting models. One of the surprising things scientists
                have learned about forecasting in recent years is that complex
                models are not necessarily more accurate than simple models.
              </p>
              <p className="leading-relaxed text-gray-700">
                The simplest form of exponential smoothing is called,
                appropriately enough, simple smoothing. Simple smoothing is
                used for short-range forecasting, usually just one month into
                the future. The model assumes that the data fluctuate around a
                reasonably stable mean (no trend or consistent pattern of
                growth). If the data contain a trend, use the trend-adjusted
                smoothing model (TRENDSMOOTH).
              </p>
            </div>
    </div>
  );
}
