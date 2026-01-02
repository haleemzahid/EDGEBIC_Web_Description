import type { Metadata } from 'next';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title:
    'Scheduling System Narrows Skills Gap for Fire Rated Glass | User Solutions',
  description:
    'User Solutions Resource Manager-DB enables Technical Glass Products to strategically cross-train their way to optimization and narrow the skills gap.',
  openGraph: {
    title: 'Scheduling System Narrows Skills Gap - Fire Rated Glass',
    description:
      'Resource Manager-DB enables strategic cross-training and optimization',
    url: 'https://www.usersolutions.com/scheduling-system-narrows-skills-gap-for-fire-rated-glass'
  }
};

export default function SchedulingSystemSkillsGapPage() {
  return (
    <div className="min-h-screen text-[18px]">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Scheduling System Narrows Skills Gap for Fire-Rated Glass
            </h1>
            <p className="text-gray-700">
              User Solutions&apos; Resource Manager-DB enables Technical Glass
              Products to strategically cross-train their way to optimization
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl space-y-8">
            {/* Date and Location */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                South Lyon, MI - August 31, 2016
              </h3>
            </div>

            {/* Introduction */}
            <div>
              <p className="leading-relaxed text-gray-700">
                User Solutions, a provider of production scheduling software
                solutions for manufacturers and job shops, today announces
                that Technical Glass Products, the recognized leader in the
                fire-rated glass and framing field, expanded their use of
                Resource Manager-DB (RMDB) to optimize their in-house,
                cross-trained, skilled resources.
              </p>
            </div>

            {/* Scott McNeill Quote 1 */}
            <Card className="border-l-4 border-orange-600">
              <CardContent className="pt-6">
                <blockquote className="mb-4 italic leading-relaxed text-gray-700">
                  &quot;RMDB, along with our cross-trained workforce gives us a
                  competitive advantage to quickly respond to new market
                  conditions and business fluctuations without incurring
                  additional expense.&quot;
                </blockquote>
                <p className="font-semibold text-gray-900">
                  – Scott McNeill, Technical Glass Products
                </p>
              </CardContent>
            </Card>

            {/* Background Section */}
            <div>
              <p className="mb-4 leading-relaxed text-gray-700">
                Technical Glass Products (TGP) has been using RMDB for years
                for finite capacity production scheduling. They selected
                RMDB because of how it could quickly adapt to their
                operational flow as well as its ability to integrate with
                their in-house systems. This facilitated a rapid
                implementation time along with all users quickly embracing
                the system. Recently, TGP noticed that their standards for
                task durations and resulting workcenter skill balancing had
                changed over time. They reached out to User Solutions to see
                how RMDB could be configured to include blending in new time
                studies, new product profiles, along with fluctuating
                workcenter capacities from a point in time moving forward,
                all the while preserving the actual tracking of schedule to
                date for historical analysis.
              </p>

              <p className="leading-relaxed text-gray-700">
                Leveraging RMDB&apos;s flexible configuration toolset,
                within only a few days of remote support, User Solutions was
                able to guide TGP through blending in new time studies with
                cross-trained skill demands, add that to their current
                production schedule and then run a variety of
                &apos;what-if&apos; scenarios. This produced a realistic
                master production plan 6 months out, from which TGP
                confirmed their cross-training initiatives and rapidly
                redeployed current resources. By shaving off two weeks in
                lead time for deliverables, TGP was able to accommodate a 4%
                increase in business with the current workforce, while
                maintaining their customer service standard.
              </p>
            </div>

            {/* Scott McNeill Quote 2 */}
            <Card className="border-l-4 border-red-600">
              <CardContent className="pt-6">
                <blockquote className="mb-4 italic leading-relaxed text-gray-700">
                  &quot;The Resource Manager-DB solution has once again exceeded
                  our expectations regarding its adaptability. With only a
                  couple of days of remote guidance from User Solutions, we
                  greatly expanded RMDB&apos;s functionality to include defining
                  cross-training initiatives and incorporate those results in a
                  new production scheduling model that increased efficiencies.
                  The result was our substantially increasing production
                  capacity with existing resources. RMDB, along with our
                  cross-trained workforce gives us a competitive advantage to
                  quickly respond to new market conditions and business
                  fluctuations without incurring additional expense.&quot;
                </blockquote>
                <p className="font-semibold text-gray-900">
                  – Scott McNeill, Production Scheduler, Technical Glass
                  Products
                </p>
              </CardContent>
            </Card>

            {/* Jim Convis Quote */}
            <Card className="border-l-4 border-blue-600">
              <CardContent className="pt-6">
                <blockquote className="italic leading-relaxed text-gray-700">
                  &quot;After running their &apos;what-if&apos; scenarios, we
                  had TGP batch load all the new cycle times, then run a
                  workcenter loading report that quickly displayed the total
                  hours for each workcenter/skill required, to support new
                  duration times. That report, combined with the capacity
                  utilization report, confirmed their cross-training initiatives
                  and enables them to rapidly redeploy current resources to
                  accommodate the increase in business. Since they incorporated
                  the details of each workcenters&apos; requirements directly
                  into the schedule, it is easy for these cross-trained workers
                  to move from one operation to the next without missing a
                  beat.&quot;
                </blockquote>
                <p className="mt-4 font-semibold text-gray-900">
                  – Jim Convis, VP of User Solutions
                </p>
              </CardContent>
            </Card>

            {/* About User Solutions */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                About User Solutions, Inc.
              </h2>
              <p className="leading-relaxed text-gray-700">
                User Solutions, Inc. was founded in 1991 in response to the
                demand for lower cost, easy to learn and use software
                solutions for the manufacturing and operations management
                markets. As either an add-on solution to existing ERP
                solutions, or running stand alone, their affordable
                planning, scheduling, and tracking solutions are known for
                great flexibility and rapid implementation.
              </p>
            </div>

            {/* About TGP */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                About Technical Glass Products (TGP)
              </h2>
              <p className="leading-relaxed text-gray-700">
                Since 1980, Technical Glass Products (TGP) has been
                supplying the architectural and commercial building industry
                with innovative solutions for specialized glazing needs. TGP
                is the recognized leader in the fire-rated glass and framing
                field, working closely with design professionals, building
                code officials and manufacturers to identify glass and
                framing solutions for the wide-ranging requirements of
                today&apos;s commercial buildings.
              </p>
            </div>
    </div>
  );
}
