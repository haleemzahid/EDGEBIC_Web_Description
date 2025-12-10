import type { Metadata } from 'next';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title:
    'Repair Shops Triple On-Time Shipping Percentage from 30% to 90% | User Solutions',
  description:
    'See how GE Railcar Services improved on-time shipping from 30% to over 90% using Workcenter SchedulerXL.',
  openGraph: {
    title:
      'Repair Shops Triple On-Time Shipping Percentage from 30% to 90% | User Solutions',
    description:
      'See how GE Railcar Services improved on-time shipping from 30% to over 90% using Workcenter SchedulerXL.',
    url: 'https://www.usersolutions.com/success-stories/repair-shops-triple-on-time-shipping-percentage-from-30-to-90'
  }
};

export default function RepairShopsTriplePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <Badge
              variant="outline"
              className="mb-6 h-8 rounded-full px-4 text-sm font-medium shadow-sm"
            >
              Success Story
            </Badge>
            <h1 className="mb-6 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Repair Shops Triple On-Time Shipping Percentage from 30% to 90%
            </h1>
            <p className="mx-auto mb-4 max-w-3xl text-lg text-muted-foreground">
              Discover how GE Railcar Services improved on-time shipping
              accuracy from 30% to over 90%.
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
                <p className="text-[18px] leading-relaxed text-gray-700 dark:text-gray-300">
                  GE Railcar Services Corporation, a unit of General Electric
                  Corporation manages a fleet of over 180,000 railcars throughout
                  North America and has successfully deployed Workcenter
                  SchedulerXL. According to Mr. Dan Barich, Manager of Process
                  Engineering, "In an effort to meet and exceed the expectations
                  of our customers, we have purchased and installed the Workcenter
                  SchedulerXL computer software system for all of our major repair
                  shops located throughout U.S. and Canada."
                </p>

                <p className="text-[18px] leading-relaxed text-gray-700 dark:text-gray-300">
                  Reporting on some of the major benefits of Workcenter
                  SchedulerXL, Mr. Barich replies, "Over the past several years,
                  Workcenter SchedulerXL has successfully helped our repair
                  network to improve the Shipping On-Time accuracy from 30% to
                  over 90%. Additionally, since installing Workcenter SchedulerXL,
                  we have improved our overall shop cycle time by several days.
                </p>

                <p className="text-[18px] leading-relaxed text-gray-700 dark:text-gray-300">
                  Workcenter SchedulerXL is also helping our shop Production
                  Control Managers better manage the railcar repair process by
                  preventing over booking of workcenter resources, establishing
                  workcenter tracking for railcars, and creating a master repair
                  schedule."
                </p>
              </div>

              {/* Image Column */}
              <div className="space-y-6 lg:sticky lg:top-6">
                <Image
                  src="https://www.usersolutions.com/wp-content/uploads/2022/07/railcar.png"
                  alt="GE Railcar Services repair operations"
                  width={600}
                  height={400}
                  className="h-auto w-full rounded-lg shadow-md"
                  unoptimized
                />
                <Image
                  src="https://www.usersolutions.com/wp-content/uploads/2022/07/WCXL-GUY.png"
                  alt="Workcenter SchedulerXL software interface"
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
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
              <CardContent className="p-8 text-center">
                <h3 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
                  CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
                </h3>
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
