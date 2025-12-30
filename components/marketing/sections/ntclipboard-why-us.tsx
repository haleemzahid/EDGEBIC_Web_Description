import * as React from 'react';
import Image from 'next/image';
import {
  CheckIcon,
  ClockIcon,
  DollarSignIcon,
  TrendingUpIcon
} from 'lucide-react';

import { GridSection } from '@/components/marketing/fragments/grid-section';
import { SiteHeading } from '@/components/marketing/fragments/site-heading';
import { Card, CardContent } from '@/components/ui/card';

const benefits = [
  {
    icon: ClockIcon,
    title: 'Improve Lead Times',
    description:
      'Our secret sauce is to fully understand your production scheduling challenges and goals, then provide a solution approach that works for you. Including direct Master Scheduling support. A quick and affordable way to achieve your goals. Let us prove this solution approach. Using your exact data, for no risk (see our Next Steps Your Way – Schedule a Live Demo).'
  },
  {
    icon: TrendingUpIcon,
    title: 'Increase Throughput',
    description:
      'Since 1991, we have been helping customers do exactly that: increase their throughput using existing resources. Start with our Excel based capacity planning tools then move up to Resource Manager-DB a more robust platform for advanced production planning and scheduling solutions.'
  },
  {
    icon: DollarSignIcon,
    title: 'Minimize Expenses',
    description:
      'We have worked with customers to implement best practices including: Theory-of-Constraints, Just-In-Time, Lean Manufacturing and even optimization. But mostly, we have worked with customers who are just trying to get a basic handle on a production schedule. With the tools and expertise that can fit any application and budget, we look forward to assisting you with your specific requests.'
  }
];

export function NTClipboardWhyUs(): React.JSX.Element {
  return (
    <GridSection hideVerticalGridLines>
      <div className="container py-6">
        <SiteHeading
          title="Proven Results Since 1991"
          description="Three decades of helping manufacturers optimize their production with solutions that actually work"
        />

        <div className="mt-4 space-y-10">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative  overflow-hidden rounded-3xl border bg-gradient-to-br from-slate-50 to-slate-100 p-8 transition-all hover:shadow-lg md:p-8"
              style={{ marginTop: '20px' }}
            >
              <div className="absolute inset-0 !mt-0 bg-gradient-to-br from-orange-50/50 to-red-50/50 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="mb-2 flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 text-white">
                    <benefit.icon className="size-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 md:text-3xl">
                    {benefit.title}
                  </h3>
                </div>
                <p className="leading-relaxed text-slate-700">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Key Differentiators */}
        <div className="mt-4 rounded-3xl border bg-gradient-to-r from-orange-500 to-red-500 p-8 text-white md:p-12">
          <h3 className="mb-6 text-center text-2xl font-bold md:text-3xl">
            What Sets Us Apart
          </h3>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-white/20">
                <CheckIcon className="size-8 text-white" />
              </div>
              <h4 className="mb-2 text-lg font-semibold">
                30+ Years Experience
              </h4>
              <p className="text-sm text-orange-100">
                Helping manufacturers since 1991 with proven methodologies
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-white/20">
                <CheckIcon className="size-8 text-white" />
              </div>
              <h4 className="mb-2 text-lg font-semibold">
                Your Data, Your Way
              </h4>
              <p className="text-sm text-orange-100">
                Risk-free demos using your actual production data
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-white/20">
                <CheckIcon className="size-8 text-white" />
              </div>
              <h4 className="mb-2 text-lg font-semibold">Scalable Solutions</h4>
              <p className="text-sm text-orange-100">
                From Excel tools to advanced RMDB platform
              </p>
            </div>
          </div>
        </div>

        {/* Awards Section */}
        <Card className="mt-8 bg-gradient-to-br from-blue-50 to-blue-100">
          <CardContent className="p-8 text-center">
            <h3 className="mb-6 text-2xl font-bold text-slate-900">
              CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
            </h3>
            <Image
              src="/images/Edgebic/2022-07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
              alt="Collection of industry and business awards logos"
              width={1024}
              height={128}
              className="mx-auto h-auto max-w-full"
              unoptimized
            />
          </CardContent>
        </Card>
      </div>
    </GridSection>
  );
}
