import * as React from 'react';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Multi-Server Queue Analysis',
  description:
    'MULTIQ analyzes waiting line problems with a single queue processed by 2 or more servers. Poisson arrivals, exponential service times.',
  path: '/operations-manager-multiq',
  keywords: 'multi-server queue, queuing theory, waiting lines, multiple servers, Poisson arrivals'
});

export default function MultiqPage(): React.JSX.Element {
  return (
    <div className="min-h-screen text-[18px]">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Operations Manager: MultiQ
            </h1>
            <p className="text-gray-700">
              Multiple-Server Queues Analysis
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
                Multiple-Server Queues (MULTIQ)
              </h2>
              <p className="leading-relaxed text-gray-700">
                In almost every organization, there are examples of processes
                which generate waiting lines called queues. MULTIQ analyzes
                problems in which customers form a single queue processed by 2
                or more servers. MULTIQ assumes that arrivals are Poisson,
                service times are exponential, and there is no restriction on
                queue capacity or the size of the source population.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
