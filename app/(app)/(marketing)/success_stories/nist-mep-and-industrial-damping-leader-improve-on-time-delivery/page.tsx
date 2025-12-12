import type { Metadata } from 'next';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title:
    'NIST MEP and Industrial Damping Leader Improve On-Time Delivery | User Solutions',
  description:
    'Discover how NIST MEP collaboration helped an industrial damping manufacturer achieve better on-time delivery performance.',
  openGraph: {
    title:
      'NIST MEP and Industrial Damping Leader Improve On-Time Delivery | User Solutions',
    description:
      'Discover how NIST MEP collaboration helped an industrial damping manufacturer achieve better on-time delivery performance.',
    url: 'https://www.usersolutions.com/success-stories/nist-mep-and-industrial-damping-leader-improve-on-time-delivery'
  }
};

export default function NistMepIndustrialDampingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-pink-50 py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <Badge
              variant="outline"
              className="mb-6 h-8 rounded-full px-4 text-sm font-medium shadow-sm"
            >
              Success Story
            </Badge>
            <h1 className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl">
              NIST MEP and Industrial Damping Leader Improve On-Time Delivery
            </h1>
            <p className="mx-auto mb-4 max-w-3xl text-xl text-gray-700">
              A success story of partnership between NIST MEP and industry
              leading to improved delivery performance.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            {/* Featured Image */}
            <div className="mb-6 flex justify-center">
              <Image
                src="https://www.usersolutions.com/wp-content/uploads/2022/07/PowerTower-119x300-1.jpg"
                alt="ACE Controls Inc. company logo"
                width={119}
                height={300}
                className="h-auto"
                unoptimized
              />
            </div>

            <div className="prose prose-lg mx-auto">
              <p className="lead text-gray-700">
                ACE Controls, Inc., located in Farmington MI, had a requirement
                to improve their current system, to immediately implement a
                solution for the day-to-day scheduling challenges of the machine
                shop. Supported by the NIST/Michigan Manufacturing Technology
                Center, Resource Manager was selected both for its benefit/cost
                ratio and for compatibility on the company's existing Excel
                platform, already used to communicate manufacturing reports.
              </p>

              <p className="text-gray-700">
                According to Dave Teumer, Buyer and Scheduling Manager, "What I
                especially like about the Resource Manager is that is was simple
                to get installed and up and running. We have improved our
                on-time delivery by being able to view the impact of different
                production schedules and workcenter loading. The product is so
                flexible and adaptable, it is quite easy to model different
                scenarios to determine if a certain method or schedule can
                actually benefit our bottom line."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Banner */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card className="rounded-xl border bg-gradient-to-br from-blue-50 to-blue-100 text-card-foreground shadow">
              <CardContent className="p-8 text-center">
                <h2 className="mb-6 text-2xl font-bold text-slate-900">
                  CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
                </h2>
                <div className="relative mx-auto h-auto w-full max-w-4xl">
                  <Image
                    src="https://www.usersolutions.com/wp-content/uploads/2022/07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                    alt="Collection of industry and business awards logos"
                    width={1024}
                    height={128}
                    className="mx-auto h-auto max-w-full"
                    unoptimized
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
