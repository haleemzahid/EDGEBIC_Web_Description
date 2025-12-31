import type { Metadata } from 'next';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Modern Production Planning and Scheduling | User Solutions',
  description:
    'Explore articles about modern production planning and scheduling solutions.',
  openGraph: {
    title: 'Modern Production Planning and Scheduling | User Solutions',
    description:
      'Explore articles about modern production planning and scheduling solutions.',
    url: 'https://www.usersolutions.com/tag/modern-production-planning-and-scheduling'
  }
};

export default function ModernProductionPlanningTagPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl">
              Modern Production Planning and Scheduling
            </h1>
            <p className="mb-4 text-xl text-gray-700">
              Articles about modern production planning and scheduling
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-6">
        <div className="mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            {/* Article */}
            <Card className="mb-6 overflow-hidden transition-shadow hover:shadow-lg">
              <div className="relative h-96 w-full overflow-hidden">
                <Image
                  src="/images/Edgebic/2022-07/AirCraftMaint.jpg"
                  alt="Submarine crew in control room"
                  width={800}
                  height={600}
                  className="size-full object-cover transition-transform hover:scale-105"
                  loading="lazy"
                />
              </div>
              <CardContent className="p-8">
                <h2 className="mb-4 text-3xl font-bold text-gray-900 hover:text-blue-600">
                  <a href="/erp-solutions-for-production-planning">
                    The Role of Technology in Modern Production Planning and
                    Scheduling
                  </a>
                </h2>
                <p className="mb-6 text-lg leading-relaxed text-gray-700">
                  Have you ever wondered how technology can transform the
                  traditional landscape of production planning and scheduling?
                  In an era where efficiency dictates market leaders, the
                  adoption of advanced technological tools has become
                  indispensable. User Solutions, Inc. specializes in providing
                  cutting-edge ERP solutions for manufacturers, which are
                  pivotal in revolutionizing how production planning and
                  scheduling tasks […]
                </p>
                <a
                  href="/erp-solutions-for-production-planning"
                  className="font-semibold text-blue-600 hover:text-blue-800"
                >
                  Read More →
                </a>
              </CardContent>
            </Card>

            {/* Awards Banner */}
            <div>
              <Card className="mt-6 rounded-xl border bg-gradient-to-br from-blue-50 to-blue-100 text-card-foreground shadow">
                <CardContent className="p-8 text-center">
                  <h2 className="mb-6 text-2xl font-bold text-slate-900">
                    CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
                  </h2>
                  <Image
                    src="/images/Edgebic/2022-07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                    alt="Collection of industry and business awards logos"
                    width={1024}
                    height={128}
                    className="mx-auto h-auto max-w-full"
                    loading="lazy"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
