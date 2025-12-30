import Image from 'next/image';
import Link from 'next/link';


import { Card, CardContent } from '@/components/ui/card';

export default function SkillsGapPressReleasePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-6 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Scheduling System Narrows Skills Gap for Fire-Rated Glass
            </h1>
            <p className="mb-2 text-xl text-white/90">
              User Solutions' Resource Manager-DB enables Technical Glass
              Products to strategically cross-train their way to optimization
            </p>
            <p className="text-xl text-white/90">August 31, 2016</p>
          </div>
        </div>
      </div>

      {/* Press Release Content */}
      <div className="container mx-auto px-4 pt-6">
        <div className="mx-auto max-w-4xl">
          <article className="prose prose-lg max-w-none">
            <header className="mb-6">
              <p className="text-lg font-semibold text-gray-700">
                South Lyon, MI - August 31, 2016
              </p>
            </header>

            <div className="space-y-6 leading-relaxed text-gray-700">
              <p className="text-xl font-medium text-gray-900">
                User Solutions, a provider of production scheduling software
                solutions for manufacturers and job shops, today announces that
                Technical Glass Products, the recognized leader in the
                fire-rated glass and framing field, expanded their use of
                Resource Manager-DB (RMDB) to optimize their in-house,
                cross-trained, skilled resources.
              </p>

              <blockquote className="mt-6 border-l-4 border-blue-600 pl-6">
                <p className="mb-4 text-lg italic text-gray-800">
                  "RMDB, along with our cross-trained workforce gives us a
                  competitive advantage to quickly respond to new market
                  conditions and business fluctuations without incurring
                  additional expense."
                </p>
                <cite className="font-semibold text-gray-600">
                  - Scott McNeill, Technical Glass Products
                </cite>
              </blockquote>

              <p>
                Technical Glass Products (TGP) has been using RMDB for years for
                finite capacity production scheduling. They selected RMDB
                because of how it could quickly adapt to their operational flow
                as well as its ability to integrate with their in-house systems.
                This facilitated a rapid implementation time along with all
                users quickly embracing the system. Recently, TGP noticed that
                their standards for task durations and resulting workcenter
                skill balancing had changed over time. They reached out to User
                Solutions to see how RMDB could be configured to include
                blending in new time studies, new product profiles, along with
                fluctuating workcenter capacities from a point in time moving
                forward, all the while preserving the actual tracking of
                schedule to date for historical analysis.
              </p>

              <p>
                Leveraging RMDB's flexible configuration toolset, within only a
                few days of remote support, User Solutions was able to guide TGP
                through blending in new time studies with cross-trained skill
                demands, add that to their current production schedule and then
                run a variety of 'what-if' scenarios. This produced a realistic
                master production plan 6 months out, from which TGP confirmed
                their cross-training initiatives and rapidly redeployed current
                resources. By shaving off two weeks in lead time for
                deliverables, TGP was able to accommodate a 4% increase in
                business with the current workforce, while maintaining their
                customer service standard.
              </p>

              <blockquote className="mt-6 border-l-4 border-blue-600 pl-6">
                <p className="mb-4 text-lg italic text-gray-800">
                  "The Resource Manager-DB solution has once again exceeded our
                  expectations regarding its adaptability. With only a couple of
                  days of remote guidance from User Solutions, we greatly
                  expanded RMDB's functionality to include defining
                  cross-training initiatives and incorporate those results in a
                  new production scheduling model that increased efficiencies.
                  The result was our substantially increasing production
                  capacity with existing resources. RMDB, along with our
                  cross-trained workforce gives us a competitive advantage to
                  quickly respond to new market conditions and business
                  fluctuations without incurring additional expense."
                </p>
                <cite className="font-semibold text-gray-600">
                  - Scott McNeill, Production Scheduler, Technical Glass
                  Products
                </cite>
              </blockquote>

              <blockquote className="mt-6 border-l-4 border-blue-600 pl-6">
                <p className="mb-4 text-lg italic text-gray-800">
                  "After running their 'what-if' scenarios, we had TGP batch
                  load all the new cycle times, then run a workcenter loading
                  report that quickly displayed the total hours for each
                  workcenter/skill required, to support new duration times. That
                  report, combined with the capacity utilization report,
                  confirmed their cross-training initiatives and enables them to
                  rapidly redeploy current resources to accommodate the increase
                  in business. Since they incorporated the details of each
                  workcenters' requirements directly into the schedule, it is
                  easy for these cross-trained workers to move from one
                  operation to the next without missing a beat."
                </p>
                <cite className="font-semibold text-gray-600">
                  - Jim Convis, VP, User Solutions
                </cite>
              </blockquote>

              <h3 className="mb-4 mt-8 text-2xl font-bold text-gray-900">
                About User Solutions, Inc.
              </h3>
              <p>
                User Solutions, Inc. was founded in 1991 in response to the
                demand for lower cost, easy to learn and use software solutions
                for the manufacturing and operations management markets. As
                either an add-on solution to existing ERP solutions, or running
                stand alone, their affordable planning, scheduling, and tracking
                solutions are known for great flexibility and rapid
                implementation.
              </p>

              <h3 className="mb-4 mt-8 text-2xl font-bold text-gray-900">
                About Technical Glass Products (TGP)
              </h3>
              <p>
                Since 1980, Technical Glass Products (TGP) has been supplying
                the architectural and commercial building industry with
                innovative solutions for specialized glazing needs. TGP is the
                recognized leader in the fire-rated glass and framing field,
                working closely with design professionals, building code
                officials and manufacturers to identify glass and framing
                solutions for the wide-ranging requirements of today's
                commercial buildings.
              </p>

              <div className="mt-8 space-y-2 border-t border-gray-200 pt-6">
                <p className="font-semibold text-gray-900">
                  For More Information:
                </p>
                <p className="text-gray-700">
                  User Solutions, Inc.
                  <br />
                  Email:{' '}
                  <a
                    href="mailto:us@usersolutions.com"
                    className="text-blue-600 hover:underline"
                  >
                    us@usersolutions.com
                  </a>
                  <br />
                  Phone:{' '}
                  <a
                    href="tel:248.486.6365"
                    className="text-blue-600 hover:underline"
                  >
                    248.486.6365
                  </a>
                  <br />
                  Website:{' '}
                  <Link
                    href="/resource-manager-db-2"
                    className="text-blue-600 hover:underline"
                  >
                    Learn more about Resource Manager DB
                  </Link>
                </p>
              </div>
            </div>
          </article>

          {/* Related Links */}
          <div className="mt-6 rounded-lg border bg-slate-50 p-6">
            <h3 className="mb-4 text-lg font-bold">
              Related Resources
            </h3>
            <div className="space-y-2">
              <Link
                href="/resource-manager-db-2"
                className="block text-blue-600 hover:underline"
              >
                → Learn more about Resource Manager DB
              </Link>
              <Link
                href="/training"
                className="block text-blue-600 hover:underline"
              >
                → Training and Support Services
              </Link>
              <Link
                href="/product-downloads"
                className="block text-blue-600 hover:underline"
              >
                → Download Free Trial
              </Link>
              <Link
                href="/press_release"
                className="block text-blue-600 hover:underline"
              >
                ← Back to Press Releases
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Awards Section */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
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
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
