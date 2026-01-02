import type { Metadata } from 'next';
import Image from 'next/image';


import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title:
    "Finite Capacity Scheduling of World's Largest Aircraft Carrier Nimitz | User Solutions",
  description:
    "See how finite capacity scheduling was implemented for the USS Nimitz aircraft carrier's complex maintenance operations.",
  openGraph: {
    title:
      "Finite Capacity Scheduling of World's Largest Aircraft Carrier Nimitz | User Solutions",
    description:
      "See how finite capacity scheduling was implemented for the USS Nimitz aircraft carrier's complex maintenance operations.",
    url: 'https://www.usersolutions.com/success-stories/finite-capacity-scheduling-of-worlds-largest-aircraft-carrier-nimitz'
  }
};

export default function AircraftCarrierNimitzPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-6 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Finite Capacity Scheduling of World's Largest Aircraft Carrier
              Nimitz
            </h1>
            <p className="mx-auto mb-4 max-w-3xl text-lg text-muted-foreground">
              Discover how advanced finite capacity scheduling manages the
              complex maintenance operations of a nuclear-powered super carrier.
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
                  The USS Nimitz is one of the Navy's nuclear-powered aircraft
                  carriers, classified as a "super carrier" and the lead ship of
                  its class. With a displacement of 100K+ tons, a length of 1K+
                  feet, a 4 acre deck, a crew of 5K strong and only two locations
                  in the world that can handle its dry dock maintenance needs, it
                  needs to be scheduled two years out.
                </p>

                <h2 className="text-2xl font-bold text-gray-900">
                  The Challenge
                </h2>

                <p className="text-[18px] leading-relaxed text-gray-700">
                  Christopher D. Gates, the Assistant Reactor Maintenance Officer,
                  was tasked with augmenting a maintenance schedule system both in
                  port and at sea for the power train of the aircraft carrier USS
                  NIMITZ. This was to include the two nuclear reactors driving 4
                  propeller shafts driven by the steam propulsion systems, reactor
                  department auxiliaries and steam and nuclear plant liaison
                  inquiries.
                </p>

                <p className="text-[18px] leading-relaxed text-gray-700">
                  According to Chris, "The problem I was trying to solve was level
                  loading the over 26,000 tasks I receive from the Preventive
                  Maintenance Program, due on a periodic-based schedule, along
                  with the immediate 5,000 corrective maintenance jobs that are
                  outstanding. Both sets of tasks rely on common resources and I
                  needed an easy and reliable method to level load and schedule
                  according to priority and finite capacity, the never ending task
                  list."
                </p>

                <p className="text-[18px] leading-relaxed text-gray-700">
                  The maintenance and production for the four plants received data
                  from disparate, proprietary databases which, due to security
                  access restrictions, could not be combined or integrated.
                  Additionally, the schedule extended 2 years out to accommodate
                  dry dock cycles and the maintenance inventory had to accommodate
                  at-sea schedules averaging 4 to 10 months.
                </p>

                <p className="text-[18px] leading-relaxed text-gray-700">
                  The disparate systems provided the preventative maintenance
                  tasks and resource requirements from one, the corrective
                  maintenance tasks and resource requirements from another and
                  materials requirements from yet a third. Chris was trying to
                  schedule using 10 separate master Excel files. Microsoft Project
                  was an excellent tool for his Gantt charting but he was doing
                  far too much importing and exporting with so much disparate
                  information. Attempts with other project management systems
                  still left Chris without capacity considerations.
                </p>

                <p className="text-[18px] leading-relaxed text-gray-700">
                  Implementation was urgent so it would need to be easy and
                  familiar enough for rapid adoption by some 400+ sailors and a
                  non-proprietary software platform to avoid the required military
                  quarantine and testing security process. With budget approvals
                  as a possible impedance to rapid implementation, it was
                  preferred a solution be found at the discretionary fund level,
                  however, the added sophistication that was needed for finite
                  capacity planning and level loading almost guaranteed that an
                  impossibility.
                </p>

                <p className="text-[18px] leading-relaxed text-gray-700">
                  Although a solid and rather impressive scheduling system had
                  been developed by the user out of Excel, it did not possess the
                  sophistication of a finite capacity planning and scheduling or
                  load leveling system.
                </p>

                <h2 className="text-2xl font-bold text-gray-900">
                  The Solution
                </h2>

                <p className="text-[18px] leading-relaxed text-gray-700">
                  "I found User Solutions while browsing the internet for Finite
                  Capacity Scheduling and ERP systems based in Excel," Chris
                  explained. "As soon as I started using their product Resource
                  Manager for Excel™ (RMX), I could tell the flexibility of their
                  product would be beneficial working with an at-sea schedule
                  which changes almost by the hour."
                </p>

                <p className="text-[18px] leading-relaxed text-gray-700">
                  Resource Manager for Excel (RMX) from User Solutions is, out of
                  the box, a resource management planning, scheduling and tracking
                  system that can perform intricate finite capacity scheduling
                  combined with level loading and material requirements planning.
                  Yet, with all that sophistication typically found in costly,
                  cumbersome and rigid systems, RMX has preserved all the
                  integration options, flexibility and analysis that are inherent
                  in Excel, not to mention the famously rapid calculation speeds.
                </p>

                <p className="text-[18px] leading-relaxed text-gray-700">
                  The new expanded version of RMX, v2014, which leverages the
                  expanded version of Excel 2013, supporting 1,000,000 rows of
                  data and 16k columns per sheet, along with unlimited sheets, was
                  perfectly positioned to accommodate the Nimitz's needs.
                </p>

                <p className="text-[18px] leading-relaxed text-gray-700">
                  "RMX is one of the fastest, if not the fastest, finite capacity
                  scheduler combined with materials requirements planning (MRPII)
                  due to its leveraging the speed with which Excel performs
                  mathematical calculations," states Jim Convis, Product Manager
                  for User Solutions. "With the new expansion, in addition to our
                  handling small companies with no other production systems in
                  place, RMX is now an ideal complement for traditional ERP
                  systems at larger companies looking to drill down to fully
                  optimize their production scheduling."
                </p>

                <p className="text-[18px] leading-relaxed text-gray-700">
                  Chris funnels the data from the disparate systems into a
                  Bill-of-Resource (BOR) in RMX. RMX is designed to adapt to
                  whatever data the user has, which means in this case, Chris
                  needs only to input that BOR and the BOR backfills the master
                  operations/workcenter list, master product list, the production
                  calendar, resource calendar, forecast calendar and the vendor
                  list. Typical ERP systems require the user to start from a
                  product list from which a Bill-of-Material (BOM) is built and a
                  workcenter list from which a routing needs to be created. RMX's
                  backfill feature is a major contributor to not only fast
                  implementation, but also minimal on-going system upkeep.
                </p>
              </div>

              {/* Image Column */}
              <div className="space-y-6 lg:sticky lg:top-6">
                <Image
                  src="/images/Edgebic/2022-07/USS-nimitz-main-image.jpg"
                  alt="USS Nimitz aircraft carrier"
                  width={800}
                  height={400}
                  className="h-auto w-full rounded-lg shadow-md"
                  unoptimized
                />
                <Image
                  src="/images/Edgebic/2022-07/AirCraftMaint.jpg"
                  alt="Aircraft carrier maintenance operations"
                  width={600}
                  height={400}
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
