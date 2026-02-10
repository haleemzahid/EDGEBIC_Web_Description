import Link from 'next/link';

import { NTClipboardToolBox } from '@/components/marketing/sections/ntclipboard-toolbox';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Routes } from '@/constants/routes';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Production Scheduling Products',
  description:
    'Explore our comprehensive range of production planning and scheduling solutions. Find the perfect fit for your manufacturing application and budget.',
  path: '/production-scheduling-products',
  keywords:
    'production scheduling software, manufacturing planning tools, scheduling solutions, production planning products'
});

export default function ProductionSchedulingProductsPage() {
  return (
    <div className="min-h-screen text-[18px]">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-slate-900 md:text-5xl">
              Production Planning and Scheduling Solutions
            </h1>
            <p className="text-[18px] text-gray-700">
              Contact <strong><em>US</em></strong> to discuss which product is the best fit for your
              application and budget.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <p className="mb-4 text-center text-[18px] leading-relaxed text-gray-700">
              From a simple Excel based job shop scheduling application to
              Advanced Planning and Scheduling software (APS) that works
              either standalone or integrates with your ERP, we look forward
              to resolving your manufacturing scheduling challenges.
            </p>
          </div>
        </div>
      </section>

      {/* Product Cards with Videos */}
      <NTClipboardToolBox />

      {/* Testimonials */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 md:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <p className="mb-4 text-[18px] font-semibold text-gray-800">
                    "Best choice for MRP and project management software"
                  </p>
                  <p className="mb-4 text-gray-600">– Sleepmaster Ltd</p>
                  <Link href="/sleepmaster-ltd">
                    <Button variant="outline">Read More</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <p className="mb-4 text-[18px] font-semibold text-gray-800">
                    "Manufacturing scheduling software with fantastic support"
                  </p>
                  <p className="mb-4 text-gray-600">– Cook Compression</p>
                  <Link href="/cook-compression">
                    <Button variant="outline">Read More</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <p className="mb-4 text-[18px] font-semibold text-gray-800">
                    "Easy ERP add-on for manufacturing resource planning"
                  </p>
                  <p className="mb-4 text-gray-600">– Incon Incorporated</p>
                  <Link href="/incon-incorporated">
                    <Button variant="outline">Read More</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
