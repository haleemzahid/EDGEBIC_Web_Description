import type { Metadata } from 'next';
import Image from 'next/image';


import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title:
    'Affordable, Easy-to-Implement MRP for Smaller Manufacturer | User Solutions',
  description:
    'Discover how SleepMaster implemented an affordable MRP for small manufacturers to simplify operations and improve global scalability.',
  openGraph: {
    title:
      'Affordable, Easy-to-Implement MRP for Smaller Manufacturer | User Solutions',
    description:
      'Discover how SleepMaster implemented an affordable MRP for small manufacturers to simplify operations and improve global scalability.',
    url: 'https://www.usersolutions.com/sleepmaster-ltd/'
  }
};

export default function SleepmasterLtdPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-6 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Affordable, Easy-to-Implement MRP for Smaller Manufacturer
              (&lt;$50M USD)
            </h1>
            <p className="mx-auto mb-4 max-w-3xl text-lg text-muted-foreground">
              A $50M manufacturer successfully implements Resource Manager DB
              for scheduling, costing, and materials planning across multiple
              facilities.
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
                  Our situation is that we are a relatively small organization
                  (AUD$50M of sales) and we have an outdated MRP system. The
                  current system in Australia has no effective scheduling ability
                  and is very cumbersome to use for product costings. We are also
                  in the process of starting up a new facility in China, which has
                  no MRP system at all, and the people there have little modern
                  manufacturing experience.
                </p>

                <p className="text-[18px] leading-relaxed text-gray-700">
                  The problems we wanted to solve were therefore:
                </p>

                <ul className="list-disc space-y-2 pl-6 text-[18px] leading-relaxed text-gray-700">
                  <li>
                    Provide a scheduling system that allows quick changes in a
                    very dynamic demand situation
                  </li>
                  <li>Provide a quick and easy costing system for products</li>
                  <li>
                    Provide a quick and easy system for materials requirements
                    planning
                  </li>
                  <li>
                    Enable BOMs and Routes to be quickly and easily built "on the
                    run"
                  </li>
                </ul>

                <p className="text-[18px] leading-relaxed text-gray-700">
                  Resource Manager was chosen because:
                </p>

                <ul className="list-disc space-y-2 pl-6 text-[18px] leading-relaxed text-gray-700">
                  <li>It is very easy and intuitive to use</li>
                  <li>
                    It can be used in sections within days, without having the
                    whole system implementation required. ie. the materials
                    planning was done first, then the costings, then the
                    scheduling
                  </li>
                  <li>It is low cost</li>
                  <li>It is easily configurable/flexible</li>
                  <li>
                    Good support is offered via Skype, phone and GoToMeeting, with
                    fast turnaround to resolve issues
                  </li>
                </ul>

                <p className="text-[18px] leading-relaxed text-gray-700">
                  The biggest benefit relative to other systems looked at is its
                  simplicity to operate and speed at which it can generate results
                  in whichever area you want to start on.
                </p>

                <p className="text-[18px] leading-relaxed text-gray-700">
                  A whole system can be built up while it is generating value,
                  which is particularly valuable in a start up situation such as
                  our Chinese plant.
                </p>

                <p className="text-[18px] leading-relaxed text-gray-700">
                  We considered a number of other systems both local and global.
                  Most are far more expensive and comprehensive (eg. accounting
                  capability) but all require much higher cost and are much more
                  resource hungry to set up. RMDB required one individual very
                  much part time (me) to set up on the critical areas for China
                  and is now being run by a young Chinese manager who had no
                  manufacturing experience, but has picked up the concepts well.
                  In that sense it is also a very good MRP training tool also.
                </p>

                <p className="text-[18px] leading-relaxed text-gray-700">
                  <strong>Jim Steel</strong>
                  <br />
                  Operations Manager for Sleepmaster, LTD
                </p>
              </div>

              {/* Image Column */}
              <div className="space-y-6 lg:sticky lg:top-6">
                <Image
                  src="/images/Edgebic/2022-10/sleep66-161208-5849e9fe80645.jpg"
                  alt="SleepMaster Ltd Logo"
                  width={400}
                  height={300}
                  className="h-auto w-full rounded-lg shadow-md"
                  unoptimized
                />
                <Image
                  src="/images/Edgebic/2022-10/MRP-XLS-RPT.png"
                  alt="MRP Excel Report - Spreadsheet with product numbers and weekly quantities"
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

      {/* Awards Section */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
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
        </div>
      </section>
    </div>
  );
}
