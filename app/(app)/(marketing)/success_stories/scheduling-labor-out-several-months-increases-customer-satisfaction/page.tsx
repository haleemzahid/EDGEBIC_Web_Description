import type { Metadata } from 'next';
import Image from 'next/image';


import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title:
    'Scheduling Labor Out Several Months Increases Customer Satisfaction | User Solutions',
  description:
    'Learn how Cummins Engine improved customer satisfaction by scheduling labor and resources several months in advance.',
  openGraph: {
    title:
      'Scheduling Labor Out Several Months Increases Customer Satisfaction | User Solutions',
    description:
      'Learn how Cummins Engine improved customer satisfaction by scheduling labor and resources several months in advance.',
    url: 'https://www.usersolutions.com/success-stories/scheduling-labor-out-several-months-increases-customer-satisfaction'
  }
};

export default function SchedulingLaborPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-6 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Scheduling Labor Out Several Months Increases Customer
              Satisfaction
            </h1>
            <p className="mx-auto mb-4 max-w-3xl text-lg text-muted-foreground">
              See how Cummins Engine uses Resource Manager to schedule labor and
              machines months in advance.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
              {/* Content Column */}
              <div className="space-y-6">
                <p className="text-[18px] leading-relaxed text-gray-700">
                  Joe Van Wagner, Production Manager for Cummins Engine, selected
                  a Resource Manager to assist in scheduling labor and machine
                  resources. "We are in the midst of changing our corporate system
                  and neither (old or new) system will handle job shop management
                  the way we run our shops." We need a flexible tool for planning
                  and scheduling labor over several months. In addition, we need
                  to schedule day-to-day machine operations per the master
                  schedule. Resource Manager for Excel is the perfect fit for a
                  stop-gap solution for these areas."
                </p>

                <p className="text-[18px] leading-relaxed text-gray-700">
                  Cummins Engine has 33 locations around the U.S. and accessorizes
                  engines for custom applications. According to Mr. Van Wagner,
                  "We like the fact that Resource Manager for Excel has a
                  Bill-Of-Resource that can include the tool, labor, and machine
                  requirements for scheduling the shop. With our old legacy system
                  from Xerox, we had only basic parts and engine model information
                  for scheduling; now we have detailed man-hours and routings
                  available. We like the ability, with Resource Manager for Excel,
                  to define load and select a realistic promise date for our
                  customers — we have already seen an increase in customer
                  satisfaction."
                </p>

                <p className="text-[18px] leading-relaxed text-gray-700">
                  Joe continues, "The flexibility of the product is pretty
                  fantastic. We are able to download our Bills-Of-Materials from
                  the AS400 directly into Resource Manager for Excel, add labor
                  and routings, and immediately generate master schedules. In
                  addition to master scheduling, we make parts for engines and
                  distribution and can use Resource Manager to schedule production
                  in this make-to-stock application. The neat graphing capability
                  gives us an excellent visual on what is happening, or needs to
                  happen."
                </p>

                <p className="text-[18px] leading-relaxed text-gray-700">
                  Cummins Engine is a global power leader that designs,
                  manufactures, sells and services diesel engines and related
                  technology around the world. Cummins Engine serves its customers
                  through its network of 600 company-owned and independent
                  distributor facilities and more than 7,200 dealer locations in
                  over 190 countries and territories.
                </p>
              </div>

              {/* Image Column */}
              <div className="space-y-6 lg:sticky lg:top-6">
                <Image
                  src="/images/Edgebic/2022-07/main-banner-300x193-1.jpg"
                  alt="Cummins Engine facility"
                  width={300}
                  height={193}
                  className="h-auto w-full rounded-lg shadow-md"
                  unoptimized
                />
                <Image
                  src="/images/Edgebic/2022-07/SkillsBarWeek-300x169-2.png"
                  alt="Skills Bar Week scheduling chart"
                  width={300}
                  height={169}
                  className="h-auto w-full rounded-lg shadow-md"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
