import type { Metadata } from 'next';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title:
    'ERP Vendor and Manufacturer Both Turn to RM-DB for Flexible Scheduling | User Solutions',
  description:
    'Learn how both an ERP vendor and manufacturer chose Resource Manager-DB for advanced production planning and scheduling.',
  openGraph: {
    title:
      'ERP Vendor and Manufacturer Both Turn to RM-DB for Flexible Scheduling | User Solutions',
    description:
      'Learn how both an ERP vendor and manufacturer chose Resource Manager-DB for advanced production planning and scheduling.',
    url: 'https://www.usersolutions.com/success-stories/erp-vendor-and-manufacturer-both-turn-to-rm-db-for-flexible-scheduling'
  }
};

export default function ErpVendorManufacturerPage() {
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
              ERP Vendor and Manufacturer Both Turn to RM-DB for Flexible
              Scheduling
            </h1>
            <p className="mx-auto mb-4 max-w-3xl text-lg text-muted-foreground">
              Discover how Plastilite and Fourth Shift partnered with User
              Solutions for advanced scheduling capabilities.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-4xl">
              <div className="space-y-6">
                <p className="text-[18px] leading-relaxed text-gray-700 dark:text-gray-300">
                  User Solutions has announced another successful manufacturing
                  scheduling application for Plastilite. Plastilite Corporation,
                  located in Omaha Nebraska, provides insulated and protective
                  packing solutions to companies shipping perishable and fragile
                  products across the United States. Their containers are now
                  routinely used in transporting everything from Omaha Steaks to
                  pies to vaccines and even biological materials, and the list of
                  uses keeps growing.
                </p>

                <p className="text-[18px] leading-relaxed text-gray-700 dark:text-gray-300">
                  In order to continue their growth and improve manufacturing
                  competitiveness, Plastilite decided to implement a new ERP
                  System this year. Part of Plastilite's requirements was to
                  improve their manual planning and scheduling system which, up to
                  that point, was basically one person's hands-on experience of
                  running operations.
                </p>

                <p className="text-[18px] leading-relaxed text-gray-700 dark:text-gray-300">
                  Fourth Shift, an ERP system from Softbrands, Inc., was the
                  frontrunner for addressing most of their accounting and
                  inventory needs, however the scheduling module was not flexible
                  or advanced enough to manage the complexities of Plastitlite's
                  scheduling needs.
                </p>

                <p className="text-[18px] leading-relaxed text-gray-700 dark:text-gray-300">
                  According to Jon Ehly, Plastilite Chief Financial Officer,
                  Fourth Shift recommended Resource Manager-DB from User
                  Solutions, Inc. as an add-on for Fourth Shift to handle the
                  advanced production planning and scheduling requirements. The
                  combination of many injection molding machines, and with each
                  machine different tool configurations to manage holding
                  different combinations of molds for a variety of products was
                  far too complex for ERP's basic infinite capacity scheduling
                  system.
                </p>

                <blockquote className="border-l-4 border-green-600 pl-4 italic">
                  <p className="text-[18px] leading-relaxed text-gray-700 dark:text-gray-300">
                    "We made the decision to go live with both systems in the same
                    week – a process I would not necessarily recommend for the
                    faint of heart. We had started the ERP Training and
                    Implementation months ago then called User Solutions to come
                    on site to help us with the scheduling module. They arrived on
                    Monday and by Friday we had a complete optimized schedule
                    generated with full integration with our ERP System."
                  </p>
                  <footer className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                    - Jon Ehly, Plastilite Chief Financial Officer
                  </footer>
                </blockquote>

                <p className="text-[18px] leading-relaxed text-gray-700 dark:text-gray-300">
                  Within one week, User Solutions accomplished:
                </p>

                <ul className="list-disc space-y-2 pl-6 text-[18px] leading-relaxed text-gray-700 dark:text-gray-300">
                  <li>Breaking down key scheduling data</li>
                  <li>Entering routings with alternate workcenters</li>
                  <li>Managing variable chest and tool sizes</li>
                  <li>Importing open orders from the ERP system</li>
                  <li>Generating an optimized, finite capacity constrained schedule</li>
                  <li>Exporting updated dates back to synchronize with MRP and Inventory</li>
                </ul>

                <p className="text-[18px] leading-relaxed text-gray-700 dark:text-gray-300">
                  User Solutions proactively added functionality to select optimal
                  workcenters and corresponding chests and molds without additional
                  charges.
                </p>

                <p className="text-[18px] leading-relaxed text-gray-700 dark:text-gray-300">
                  Jon concludes, "It was refreshing to work with a vendor who
                  absolutely delivered on their promise. Initially, they expected
                  to have a prototype of the process implemented in one week.
                  Instead, they were able to fully load the schedule and integrate
                  with our ERP system – all in one week. We strongly recommend for
                  other manufacturing companies, who are struggling with manual
                  scheduling techniques, to give User Solutions and Resource
                  Manager-DB a try."
                </p>
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
