import type { Metadata } from 'next';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title:
    'Resource Manager DB Innovates Li-Ion Battery Production Scheduling for Enevate | User Solutions',
  description:
    'Learn how Enevate Corporation uses Resource Manager-DB for innovative Li-ion battery production scheduling.',
  openGraph: {
    title:
      'Resource Manager DB Innovates Li-Ion Battery Production Scheduling for Enevate | User Solutions',
    description:
      'Learn how Enevate Corporation uses Resource Manager-DB for innovative Li-ion battery production scheduling.',
    url: 'https://www.usersolutions.com/success-stories/resource-manager-db-innovates-li-ion-battery-production-scheduling-for-enevate'
  }
};

export default function EnevatePage() {
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
              Resource Manager DB Innovates Li-Ion Battery Production Scheduling
              for Enevate
            </h1>
            <p className="mx-auto mb-4 max-w-3xl text-lg text-muted-foreground">
              See how Enevate Corporation revolutionized battery production with
              flexible scheduling solutions.
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
                <blockquote className="border-l-4 border-rose-600 pl-4 italic">
                  <p className="text-[18px] leading-relaxed text-gray-700">
                    "Resource Manager-DB product provided a unique combination of
                    planning, scheduling, and tracking functionality within a
                    single, yet flexible system."
                  </p>
                  <footer className="mt-2 text-sm font-medium text-gray-900">
                    - Scott Bennett, Enevate Corp.
                  </footer>
                </blockquote>

                <p className="text-[18px] leading-relaxed text-gray-700">
                  In 2015 Enevate Corporation, creator of the next generation of
                  Li-ion batteries was building out a greenfield manufacturing
                  facility which demanded a unique combination of planning,
                  scheduling, and tracking functionality within a single, yet
                  flexible system. Not only did the proposed system need to add
                  finite capacity scheduling and advanced routings to traditional
                  ERP functionality, such as costed bills-of-materials (BOMs),
                  inventory management, MRP and full lot traceability but also
                  provide a greater level of flexibility.
                </p>

                <h2 className="text-2xl font-bold text-gray-900">
                  Supply Chain Manager Empowerment
                </h2>

                <p className="text-[18px] leading-relaxed text-gray-700">
                  According to Scott Bennett, Supply Chain Manager for Enevate,
                  "We found that the User Solutions team and the Resource
                  Manager-DB product provided this unique combination we demanded
                  without sacrificing flexibility all at a palatable price point."
                </p>

                <p className="text-[18px] leading-relaxed text-gray-700">
                  Scott continues, "Due to our implementing brand new, original
                  processes to build our innovative batteries, we required dynamic
                  supply chain reconfiguration capability. We found Resource
                  Manager-DB's flexible format vital when combining workcenters,
                  products, and sub-assemblies, allowing us to run a wide variety
                  of 'what-if' scenarios. Having the option to build models
                  directly in minutes or import different scenarios, plus
                  leveraging Excel to hold the different data sets, made it
                  surprisingly easy."
                </p>

                <p className="text-[18px] leading-relaxed text-gray-700">
                  Scott summarizes, "Not only is the product inherently flexible
                  to adapt to how we do our business, but also, as a company, User
                  Solutions continually accommodated our particular requests into
                  the core software. From detailed 10-level deep sub-assembly
                  structures, through importing new configurations via Excel, to
                  scheduling workcenters and products in virtually any
                  combination, we keep finding new and beneficial uses for this
                  tool. User Solutions adapted their Lot Management capability,
                  including traceability and pick lists, plus added new inventory
                  valuation by location by lot and even combined workcenters
                  (scheduling) and products (costing) attributes into a single
                  entity."
                </p>
              </div>

              {/* Image Column */}
              <div className="lg:sticky lg:top-6">
                <Image
                  src="https://www.usersolutions.com/wp-content/uploads/2022/07/Manufacturing_Excel_Dashboard-1024x376-1.png"
                  alt="Manufacturing Excel Dashboard"
                  width={1024}
                  height={376}
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
