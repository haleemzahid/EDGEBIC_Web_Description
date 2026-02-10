import * as React from 'react';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Learning Curves Calculator',
  description:
    'Learning curve model to predict reduction in direct labor hours or costs per unit as cumulative production increases.',
  path: '/operations-manager-learn',
  keywords: 'learning curve, labor hours, production cost, cumulative production, manufacturing efficiency'
});

export default function LearnPage(): React.JSX.Element {
  return (
    <div className="min-h-screen text-[18px]">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Operations Manager: LEARN
            </h1>
            <p className="text-gray-700">
              Learning Curves - Predicting Reduction in Direct Labor Hours
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
                Learning Curves (LEARN)
              </h2>
              <p className="leading-relaxed text-gray-700">
                The learning curve is a widely-used model that predicts a
                reduction in direct labor hours or costs per unit as
                cumulative production increases.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
