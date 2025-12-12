import type { Metadata } from 'next';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title:
    'Simplifying Complexities Increased On-Time Deliveries User Adoption for Large Sawmills | User Solutions',
  description:
    'Learn how large sawmill operations simplified complex processes to improve on-time deliveries and user adoption.',
  openGraph: {
    title:
      'Simplifying Complexities Increased On-Time Deliveries User Adoption for Large Sawmills | User Solutions',
    description:
      'Learn how large sawmill operations simplified complex processes to improve on-time deliveries and user adoption.',
    url: 'https://www.usersolutions.com/success-stories/simplifying-complexities-increased-on-time-deliveries-user-adoption-for-large-sawmills'
  }
};

export default function SimplifyingComplexitiesSawmillsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <Badge
              variant="outline"
              className="mb-6 h-8 rounded-full px-4 text-sm font-medium shadow-sm"
            >
              Success Story
            </Badge>
            <h1 className="mb-6 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl">
              Simplifying Complexities Increased On-Time Deliveries User
              Adoption for Large Sawmills
            </h1>
            <p className="mx-auto mb-4 max-w-3xl text-xl text-gray-700">
              Discover how simplifying complex processes led to improved
              delivery performance in sawmill operations.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <div className="prose prose-lg mx-auto">
              <p className="text-gray-700">
                We have been using the RMDB scheduling software, increasingly,
                for the last year. I say increasingly because there was a lot of
                reluctance to using it first. The reluctance came because there
                was the idea that even though plywood production is "Old
                Technology" manufacturing, the intricacies of the different
                species and manners to deconstruct a log into various sizes of
                veneer and the reassemble it into plywood was too difficult to
                schedule. This has been proven incorrect by your software and a
                lot of hard work in implementing it both by you and our staff.
                It has allowed us to:
              </p>

              <ul className="text-gray-700">
                <li>
                  Reduce manning in our finish end by knowing when each machine
                  center was going to be needed
                </li>
                <li>
                  Reduce aged inventory by enforcing a process of netting out
                  what was in inventory vs. what incrementally was needed to
                  meet sales demand
                </li>
                <li>
                  Increase on time shipments as we now know what will be the
                  bottleneck in the mill any given week and work around it.
                </li>
                <li>
                  Highlighted issues of raw material supplies that had been
                  hidden in the past.
                </li>
                <li>
                  Allowed our maintenance staff to plan their work around
                  machine usage and not during times the machines are needed.
                </li>
              </ul>

              <p className="text-gray-700">
                Thanks for your help,
              </p>

              <p className="text-gray-700">
                <strong>Jeffery K Winter</strong>
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
