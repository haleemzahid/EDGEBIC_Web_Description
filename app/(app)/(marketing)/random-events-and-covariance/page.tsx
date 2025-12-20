import type { Metadata } from 'next';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Blame Random Events and Covariance | User Solutions',
  description:
    'Understanding how random events and covariance affect production scheduling, traffic flow, and manufacturing operations.',
  openGraph: {
    title: 'Blame Random Events and Covariance',
    description:
      'Mathematical principles impacting manufacturing and scheduling',
    url: 'https://www.usersolutions.com/random-events-and-covariance'
  }
};

export default function RandomEventsCovariancePage() {
  return (
    <div className="min-h-screen text-[18px]">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Blame Random Events and Covariance
            </h1>
            <p className="text-gray-700">
              Understanding the mathematical principles affecting your
              production scheduling
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl space-y-8">
            {/* Introduction */}
            <div>
              <p className="leading-relaxed text-gray-700">
                Ever wonder why, after picking what you thought was the
                shortest line, you&apos;re the last to get through? Or, why
                traffic can come to an absolute stand-still on the freeway
                with no apparent reason? There are two mathematical
                principles at work here (and sad to say, influencing your
                Plant, Shop, Factory, Project Management and Production
                Scheduling Plans) that are to blame, random events and
                covariance.
              </p>
            </div>

            {/* Random Events Section - Image on Right */}
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-900">
                  Random Events
                </h2>
                <p className="mb-4 leading-relaxed text-gray-700">
                  Random events aren&apos;t predictable but also occur in
                  clusters. Think about it. By definition, you can&apos;t
                  predict a random event. &quot;They&quot; always say aircraft
                  crashes happen in threes, or bad things happen together, but
                  there is no other way. If we could predict an airplane crash
                  we wouldn&apos;t fly on that day. The more familiar
                  reference to random events is known as &apos;Murphys
                  Law&apos; — anything that can go wrong, will go wrong.
                </p>
                <p className="leading-relaxed text-gray-700">
                  If the event is not deterministic, or predictable, then it
                  will not fall within a known interval of time. Therefore,
                  some intervals between events will be longer, some shorter.
                  The shorter intervals are referred to as
                  &apos;clusters&apos;.
                </p>
              </div>
              <div className="flex justify-center">
                <div className="relative h-64 w-full max-w-md overflow-hidden rounded-lg">
                  <Image
                    src="https://www.usersolutions.com/wp-content/uploads/2022/07/cluster.png"
                    alt="Scatter plot with ellipses highlighting data clusters"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Covariance Section - Image on Left */}
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div className="order-2 flex justify-center md:order-1">
                <div className="relative h-32 w-full max-w-md overflow-hidden rounded-lg">
                  <Image
                    src="https://www.usersolutions.com/wp-content/uploads/2022/07/Covariance-300x66-1.png"
                    alt="Covariance formula in mathematical notation"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h2 className="mb-4 text-2xl font-bold text-slate-900">
                  Covariance
                </h2>
                <p className="mb-4 leading-relaxed text-gray-700">
                  The second, less familiar mathematical principal is a
                  phenomenon called covariance. Typically considered a vary
                  sophisticated mathematical concept with corresponding
                  complex solutions, just having an awareness of it is enough
                  to help you manage the impact.
                </p>
                <p className="leading-relaxed text-gray-700">
                  If there is a possible delay, in a series of events, things
                  tend towards the maximum delay. Now you know why your
                  &apos;short&apos; line is the longest. Teller changes, price
                  checks, paper out, customer has no ID for check, ARGGH!
                </p>
              </div>
            </div>

            {/* Awards Banner */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
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
      </section>
    </div>
  );
}
