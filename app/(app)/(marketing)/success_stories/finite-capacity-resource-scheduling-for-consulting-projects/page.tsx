import type { Metadata } from 'next';
import Image from 'next/image';


import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title:
    'Finite Capacity Resource Scheduling for Consulting Projects | User Solutions',
  description:
    'GEMS Healthcare Solutions uses   to manage multiple consulting projects with shared resources.',
  openGraph: {
    title:
      'Finite Capacity Resource Scheduling for Consulting Projects | User Solutions',
    description:
      'GEMS Healthcare Solutions uses   to manage multiple consulting projects with shared resources.',
    url: 'https://www.usersolutions.com/success-stories/finite-capacity-resource-scheduling-for-consulting-projects'
  }
};

export default function ConsultingProjectsSchedulingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-6 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Finite Capacity Resource Scheduling for Consulting Projects
            </h1>
            <p className="mx-auto mb-4 max-w-3xl text-lg text-muted-foreground">
              How GEMS Healthcare Solutions Manages Shared Resources Across
              Multiple Consulting Projects
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
                  GEMS Healthcare Solutions a wholly-owned subsidiary of GE
                  Medical Systems headquartered in San Ramon, California, provides
                  integrated data mining, Internet-based benchmarking and
                  consulting solutions to healthcare providers who seek new
                  strategies to reduce costs and improve quality of health care
                  services.
                </p>

                <p className="text-[18px] leading-relaxed text-gray-700">
                  According to Shavonna Portue, Director, Product Operations
                  "Delivering accurate information to our customers in a timely
                  manner is the core of our business. Each financial analyst on
                  our staff handles multiple accounts, and our biggest challenge
                  was finding a resource scheduling system which would allow us to
                  share the same resources across multiple projects. User
                  Solutions'   provided that solution".
                </p>

                <p className="text-[18px] leading-relaxed text-gray-700">
                  Shavonna continues "We tried several options before Workcenter
                  Scheduler XL, including Microsoft Project. We found the others
                  to be difficult to maintain in our environment, or simply
                  undependable. Consequently, we were unable to adequately predict
                  delivery times and our customers were suffering. After viewing
                  the Noah 2000 system and speaking with the representative from
                  User Solutions, I found them to be very responsive. The
                  application filled almost all my needs, and User Solutions was
                  happy to provide customization to tailor the product for our
                  company. They proved to be avid problem solvers and a great
                  example of what a customer solution provider should be".
                </p>

                <p className="text-[18px] leading-relaxed text-gray-700">
                  Shavonna reports on key benefits from using Workcenter Scheduler
                  XL "Setting accurate customer expectations has been the greatest
                  benefit. We are able to track problem areas and get good
                  feedback on potential bottlenecks before they happen. No more
                  unknown statuses, and it makes adjusting schedules easy! We now
                  know exactly what staffing requirements are and can flex our
                  workforce to fit the changing needs of our customers".
                </p>
              </div>

              {/* Image Column */}
              <div className="lg:sticky lg:top-6">
                <Image
                  src="/images/Edgebic/2022-07/wCXL-1024x342.png"
                  alt="Workcenter Scheduler XL interface"
                  width={1024}
                  height={342}
                  className="h-[400px] w-full rounded-lg shadow-md object-cover"
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
