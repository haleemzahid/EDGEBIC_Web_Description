import type { Metadata } from 'next';
import Image from 'next/image';


import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title:
    'Capacity and Production Planning Reduce Outsourcing Costs, Backlog | User Solutions',
  description:
    'Discover how effective capacity and production planning strategies reduced outsourcing costs and eliminated backlog.',
  openGraph: {
    title:
      'Capacity and Production Planning Reduce Outsourcing Costs, Backlog | User Solutions',
    description:
      'Discover how effective capacity and production planning strategies reduced outsourcing costs and eliminated backlog.',
    url: 'https://www.usersolutions.com/success-stories/capacity-and-production-planning-add-on-for-erp'
  }
};

export default function CapacityProductionPlanningPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-6 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Capacity and Production Planning Reduce Outsourcing Costs, Backlog
            </h1>
            <p className="mx-auto mb-4 max-w-3xl text-lg text-muted-foreground">
              See how strategic capacity planning eliminated costly outsourcing
              and production backlogs.
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
                  BAE Systems/Ordinance Systems Inc. set out to design and
                  implement a process that would enable our manufacturing
                  personnel to systematically identify process, equipment, labor,
                  and material limitations when responding to customer order
                  delivery inquiries. We had already purchased and implemented an
                  ERP system (with Material Requirements Planning and Capacity
                  Requirements Planning functionality), but we weren't satisfied
                  with its ability to recognize our capacity constraints or meet
                  our finite scheduling needs. The MRP product allowed us to enter
                  a Master Scheduler that exceeded available capacity and offered
                  little visibility when we did so. Consequently, we chose to
                  discontinue its use for production planning activities.
                </p>

                <p className="text-[18px] leading-relaxed text-gray-700">
                  After a review process, that included sending sample data from
                  our ERP System, we selected User Solutions' Resource Manager-DB
                  solution. User Solutions has always been highly responsive in
                  addressing our specific needs. In a very short time, we had the
                  majority of our bills of resource, inventory items and work
                  centers loaded.
                </p>

                <p className="text-[18px] leading-relaxed text-gray-700">
                  Now, we have a solution that has become a vital tool in our
                  production planning and scheduling activities. We are extremely
                  satisfied with the offering and are pleased to recommend to
                  others looking for a capacity and production planning solution –
                  either integrated with ERP or standalone.
                </p>

                <p className="text-[18px] leading-relaxed text-gray-700">
                  <strong>Marc Phillippi</strong>
                  <br />
                  ERP Systems Manager
                  <br />
                  BAE Systems / Ordnance Systems, Inc.
                </p>
              </div>

              {/* Image Column */}
              <div className="lg:sticky lg:top-6">
                <Image
                  src="/images/Edgebic/2022-07/BackLog.png"
                  alt="Backlog and Production Planning Chart"
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
