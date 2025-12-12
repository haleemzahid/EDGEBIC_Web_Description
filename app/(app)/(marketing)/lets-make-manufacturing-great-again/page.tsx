import type { Metadata } from 'next';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: "Let's Make Manufacturing Great Again | User Solutions",
  description:
    'Celebrating National Manufacturing Day 2017 - Learn how User Solutions helps manufacturers achieve operational excellence through partnerships with MEP and educational institutions.',
  openGraph: {
    title:
      "Let's Make Manufacturing Great Again - National Manufacturing Day 2017",
    description: '25 years of award-winning manufacturing software solutions',
    url: 'https://www.usersolutions.com/lets-make-manufacturing-great-again'
  }
};

export default function LetsMakeManufacturingGreatAgainPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <Badge
              variant="outline"
              className="mb-6 h-8 rounded-full border-blue-600/30 px-4 text-sm font-medium text-blue-700 shadow-sm"
            >
              National Manufacturing Day 2017
            </Badge>
            <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl">
              Let&apos;s Make Manufacturing Great Again©
            </h1>
            <p className="mb-4 text-xl text-gray-700">
              This National Manufacturing Day 2017
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-6">
        <div className="mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            {/* Introduction */}
            <div className="mb-6">
              <Card>
                <CardContent className="p-6">
                  <p className="mb-6 text-lg leading-relaxed text-gray-700">
                    This year&apos;s National Manufacturing Day arrives at a
                    most dynamic time with much attention focused on:
                  </p>
                  <ul className="mb-6 space-y-3 text-lg text-gray-700">
                    <li className="flex items-start">
                      <span className="mr-3 mt-1 text-blue-600">•</span>
                      <span>
                        Initiatives for manufacturers to achieve and sustain
                        both local and global competitiveness through
                        operational efficiencies
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 mt-1 text-blue-600">•</span>
                      <span>
                        A lack of new students entering manufacturing careers
                        contributing to expanding &apos;skills-gap&apos;
                        challenge
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 mt-1 text-blue-600">•</span>
                      <span>
                        Looming wave of mass exodus in manufacturing, due to
                        retiring expertise, further widening the
                        &apos;skills-gap&apos; to a crisis level
                      </span>
                    </li>
                  </ul>

                  <h2 className="mb-6 text-3xl font-bold text-gray-900">
                    So what can we do to help Make Manufacturing Great Again©
                  </h2>

                  <p className="mb-6 text-lg leading-relaxed text-gray-700">
                    User Solutions, Inc., celebrating their 25th year in serving
                    the manufacturing market, continues to do its part by:
                  </p>

                  <ul className="mb-6 space-y-3 text-lg text-gray-700">
                    <li className="flex items-start">
                      <span className="mr-3 mt-1 text-green-600">✓</span>
                      <span>
                        Working with the Manufacturing Extension Partnership to
                        help manufacturers become more efficient, competitive,
                        and profitable.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 mt-1 text-green-600">✓</span>
                      <span>
                        Investing in the next generation of manufacturing
                        professionals by partnering with leading educational
                        resources in the operations management areas.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-3 mt-1 text-green-600">✓</span>
                      <span>
                        Creating solutions that quickly and easily capture local
                        manufacturing operational expertise that most anyone
                        else can apply readily and repeatedly.
                      </span>
                    </li>
                  </ul>

                  <p className="text-lg leading-relaxed text-gray-700">
                    We don&apos;t need to wait for new leadership, new laws, new
                    products, or new markets. A major part of any manufacturing
                    organization&apos;s bottom line success lies in its ability
                    to produce efficiently, effectively and as fully optimized
                    as possible. All manufacturers would do well to focus on
                    operations management as the &apos;secret sauce&apos; that
                    can determine a manufacturer&apos;s ability to compete. The
                    time is ripe for us to all pull together to work towards
                    this noble goal, and to Make Manufacturing Great Again©.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Testimonials - NIST/MEP Consortium */}
            <div className="mb-6">
              <h2 className="mb-6 text-3xl font-bold text-gray-900">
                Testimonials - NIST/MEP Consortium
              </h2>

              <Card className="mb-6 border-l-4 border-blue-600">
                <CardContent className="pt-6">
                  <blockquote className="text-lg italic leading-relaxed text-gray-700">
                    &quot;The Resource Manager is a great solution for
                    manufacturers who are not ready for a full-blown MRPII, ERP,
                    or Shop Management System but who realize the value of
                    effective scheduling and planning. Resource Manager is
                    unique in that it easily adapts to the way people are
                    running their business today.&quot;
                  </blockquote>
                  <p className="mt-4 font-semibold text-gray-900">
                    – Mike Parks, as Director of Georgia Tech&apos;s CMIT, an
                    affiliate of the NIST Manufacturing Extension Partnership
                    (MEP)
                  </p>
                </CardContent>
              </Card>

              <p className="text-lg leading-relaxed text-gray-700">
                Since 1988, the Hollings Manufacturing Extension Partnership
                (MEP) works directly with manufacturers to develop new products
                and customers, expand and diversify markets, adopt new
                technology, and enhance value within supply chains. MEP provides
                information, decision support, and implementation assistance to
                smaller manufacturing firms in adopting new, more advanced
                manufacturing technologies, techniques, and business best
                practices.
              </p>
            </div>

            {/* Testimonials - Education Commitment */}
            <div className="mb-6">
              <h2 className="mb-6 text-3xl font-bold text-gray-900">
                Testimonials - Education Commitment
              </h2>

              <div className="mb-6 grid gap-8 md:grid-cols-2">
                <div>
                  <Card className="h-full border-l-4 border-green-600">
                    <CardContent className="pt-6">
                      <blockquote className="mb-4 text-base italic leading-relaxed text-gray-700">
                        &quot;I have been involved in the production of store
                        fixtures for over ten years and every day was a struggle
                        until Resource Manager from User Solutions enabled me to
                        print in one minute what it would take hours a day to
                        communicate. Suddenly I was able to quickly forecast our
                        workload and schedule our shipments for our facilities
                        in a fraction of the time it took before I starting
                        using Resource Manager. As a result of using Resource
                        Manager, we forecast a 20% increase in gross profits
                        next year.&quot;
                      </blockquote>
                      <p className="font-semibold text-gray-900">
                        – Greg Katz, VP of Manhattan Store Interiors
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex items-center justify-center">
                  <div className="relative h-64 w-full overflow-hidden rounded-lg">
                    <Image
                      src="https://www.usersolutions.com/wp-content/uploads/2022/07/Construction-Guy-Crop-228x300.jpg"
                      alt="Construction worker using tablet on site"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                <div className="flex items-center justify-center">
                  <div className="relative h-64 w-full overflow-hidden rounded-lg">
                    <Image
                      src="https://www.usersolutions.com/wp-content/uploads/2022/07/PowerTower-119x300.jpg"
                      alt="Tall roller coaster against clear sky"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <div>
                  <Card className="h-full border-l-4 border-purple-600">
                    <CardContent className="pt-6">
                      <p className="mb-4 text-base leading-relaxed text-gray-700">
                        ACE Controls, Inc., had a requirement to improve their
                        current system and to immediately implement a solution
                        for the day-to-day scheduling challenges of the machine
                        shop. ACE Controls specializes in pneumatic linear
                        decelerators such as those used at Cedar Point and the
                        Power Tower amusement ride. Supported by the
                        NIST/Michigan Manufacturing Technology Center, Resource
                        Manager was selected both for its benefit/cost ratio and
                        for the company&apos;s existing Excel platform, already
                        used to communicate manufacturing reports.
                      </p>
                      <blockquote className="mb-4 text-base italic leading-relaxed text-gray-700">
                        &quot;The product is so flexible and adaptable; it is
                        quite easy to model different scenarios to determine if
                        a certain method or schedule can actually benefit our
                        bottom line.&quot;
                      </blockquote>
                      <p className="font-semibold text-gray-900">
                        – Dave Teumer, Buyer and Scheduling Manager, ACE
                        Controls
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Awards Banner */}
            <div>
              <Card className="mt-6 rounded-xl border bg-gradient-to-br from-blue-50 to-blue-100 text-card-foreground shadow">
                <CardContent className="p-8 text-center">
                  <h2 className="mb-6 text-2xl font-bold text-slate-900">
                    CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
                  </h2>
                  <img
                    src="https://www.usersolutions.com/wp-content/uploads/2022/07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                    alt="Collection of industry and business awards logos"
                    className="mx-auto h-auto max-w-full"
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
