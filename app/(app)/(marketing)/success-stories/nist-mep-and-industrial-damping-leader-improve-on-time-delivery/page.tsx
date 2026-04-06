import { createArticleMetadata } from '@/lib/seo/metadata';
import Image from 'next/image';


import { Card, CardContent } from '@/components/ui/card';

export const metadata = createArticleMetadata({
  title:
    'NIST MEP Improves On-Time Delivery',
  description:
    'Discover how NIST MEP collaboration helped an industrial damping manufacturer achieve better on-time delivery performance.',
  path: '/success-stories/nist-mep-and-industrial-damping-leader-improve-on-time-delivery',
  keywords: 'NIST MEP, on-time delivery, industrial damping, manufacturing improvement, RMDB',
});

export default function NistMepIndustrialDampingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-pink-50 py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
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
                src="/images/Edgebic/2022-07/PowerTower-119x300-1.jpg"
                alt="ACE Controls Inc. company logo"
                width={119}
                height={300}
                className="h-auto"
                unoptimized
              />
            </div>

            <div className="prose prose-lg mx-auto">
              <h2 className="text-2xl font-bold text-gray-900">The Challenge</h2>
              <p className="text-gray-700">
                ACE Controls, Inc., a leader in industrial damping and motion
                control solutions located in Farmington, Michigan, faced growing
                challenges with production scheduling in their machine shop. The
                company needed to immediately improve their day-to-day scheduling
                capabilities to meet increasing customer demand and maintain their
                reputation for reliable delivery. Without adequate visibility into
                workcenter loading and production capacity, the team struggled to
                provide accurate promise dates and optimize their manufacturing
                throughput.
              </p>

              <h2 className="text-2xl font-bold text-gray-900">The Solution</h2>
              <p className="text-gray-700">
                Supported by the NIST Manufacturing Extension Partnership (MEP)
                through the Michigan Manufacturing Technology Center, ACE Controls
                evaluated scheduling solutions that could deliver immediate results.
                Resource Manager was selected both for its strong benefit-to-cost
                ratio and for its compatibility with the company&apos;s existing Excel
                platform, already used to communicate manufacturing reports across
                the organization. This meant minimal disruption to existing workflows
                while adding powerful scheduling and capacity planning capabilities.
              </p>

              <h2 className="text-2xl font-bold text-gray-900">Key Results</h2>
              <p className="text-gray-700">
                The implementation was fast and straightforward, allowing ACE Controls
                to start seeing benefits almost immediately. The scheduling team gained
                the ability to model different production scenarios, visualize workcenter
                loading, and evaluate the impact of schedule changes before committing
                to them.
              </p>

              <p className="text-gray-700">
                According to Dave Teumer, Buyer and Scheduling Manager, &ldquo;What I
                especially like about the Resource Manager is that it was simple
                to get installed and up and running. We have improved our
                on-time delivery by being able to view the impact of different
                production schedules and workcenter loading. The product is so
                flexible and adaptable, it is quite easy to model different
                scenarios to determine if a certain method or schedule can
                actually benefit our bottom line.&rdquo;
              </p>

              <p className="text-gray-700">
                With Resource Manager in place, ACE Controls transformed their
                scheduling process from reactive to proactive, resulting in measurable
                improvements to on-time delivery and overall production efficiency.
              </p>

              <p className="text-gray-700">
                <strong>&mdash; Dave Teumer, Buyer and Scheduling Manager, ACE Controls, Inc.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
