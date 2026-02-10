import * as React from 'react';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Control Chart for Mean and Range',
  description:
    'MR-CHART for statistical process control. Monitor production quality with control limits for sample means and ranges.',
  path: '/operations-manager-mr-chart',
  keywords: 'control chart, mean range, SPC, quality control, control limits, process control'
});

export default function MrChartPage(): React.JSX.Element {
  return (
    <div className="min-h-screen text-[18px]">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Operations Manager: MR Chart
            </h1>
            <p className="text-gray-700">
              Control Chart For Mean and Range
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
                Control Chart For Mean and Range (MR-CHART)
              </h2>
              <p className="mb-4 leading-relaxed text-gray-700">
                The basic idea in all quality control charts is to select a
                sample from a production process at equal intervals of time
                and record some quality characteristic. The most common
                quality characteristic is the mean of each sample. If the
                process is under control, the series of sample means should
                vary about the population mean in a random manner.
              </p>
              <p className="mb-4 leading-relaxed text-gray-700">
                We should expect some natural variation in any process and
                there should be no real assignable cause to this variation. If
                the process is in control, almost all sample mean values
                should fall within control limits, almost always defined as
                the mean plus or minus 3 standard deviations.
              </p>
              <p className="leading-relaxed text-gray-700">
                The control charts do not measure the standard deviation
                directly. Instead, the range (high value minus low value) of
                each sample is used as a simpler measure of variation. To
                establish control limits, the range is automatically converted
                to a standard deviation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
