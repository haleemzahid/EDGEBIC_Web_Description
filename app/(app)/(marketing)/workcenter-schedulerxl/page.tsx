import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function WorkcenterSchedulerXLPage() {
  return (
    <div className="min-h-screen">

      {/* Overview Section */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-4 text-2xl font-bold">Overview</h2>
            <p className="text-muted-foreground">
              (WCXL) is an Excel based simple
              scheduler for getting visibility on workcenter loading to ship
              on time. Check out the videos for a quick overview, then
              download the fully functional trial or — better yet, simply
              schedule a live demo, customized with your sample data, and
              let us review your application needs.
            </p>
          </div>
        </div>
      </section>

      {/* Summary Section */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-4 text-2xl font-bold">Summary</h2>
            <p className="mb-4 text-muted-foreground">
              (WCXL) an Excel Add-On, offers a
              finite capacity scheduler for job shops, fabricators,
              service/repair shops, that have a simple, linear sequence of
              work that can be scheduled forward from a start date. (NOTE:
              For more robust planning, scheduling, tracking, and
              integration options please review Resource Manager-DB).
            </p>
            <p className="mb-4 text-muted-foreground">
              WCXL provides an easy method for:
            </p>
            <ul className="list-inside list-disc space-y-2 text-muted-foreground">
              <li>Entering resource definitions.</li>
              <li>Building jobs, with labor and workcenter routing details.</li>
              <li>Performing 'what-ifs' with different plans, resulting in feasible and effective production schedules.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <blockquote className="border-l-4 border-blue-500 pl-6">
              <p className="mb-2 italic text-muted-foreground">
                "With  , we knew: Daily schedules for
                Workcenters, Capacity requirements including Bottlenecks and
                Backlog, Strategic management information for optimizing
                on-time performance"
              </p>
              <footer className="text-sm font-semibold">
                — Dan Barich, GE Railcar Services
              </footer>
            </blockquote>
          </div>
        </div>
      </section>


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
                  src="https://www.usersolutions.com/wp-content/uploads/2022/07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
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
