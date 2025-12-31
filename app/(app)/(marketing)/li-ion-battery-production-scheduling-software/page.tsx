import type { Metadata } from 'next';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title:
    'Resource Manager-DB V6 Transforms Li-ion Battery Production Scheduling | User Solutions',
  description:
    'User Solutions releases Resource Manager-DB V6 with Bills-of-Resources, finite capacity planning, and advanced features. Enevate Corporation case study on Li-ion battery production.',
  openGraph: {
    title: 'Resource Manager-DB V6 Transforms Li-ion Battery Production',
    description:
      'South Lyon, MI 6/9/2016 - RM-DB V6 driven by customer demand for more power and flexibility',
    url: 'https://www.usersolutions.com/li-ion-battery-production-scheduling-software'
  }
};

export default function LiIonBatterySchedulingPage() {
  return (
    <div className="min-h-screen text-[18px]">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Resource Manager-DB V6 Transforms Li-ion Battery Production
              Scheduling
            </h1>
            <p className="text-gray-700">
              User Solutions releases powerful upgrade driven by customer demand
              for flexibility
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl space-y-8">
            {/* Date and Location */}
            <div>
              <p className="text-center font-semibold text-gray-700">
                South Lyon, MI - 6/9/2016
              </p>
            </div>

            {/* Introduction */}
            <div>
              <p className="mb-4 leading-relaxed text-gray-700">
                User Solutions, a leader in flexible production scheduling
                and planning software, has released Resource Manager-DB
                (RM-DB) V6. This upgrade was driven by customer demand for
                more power and flexibility in manufacturing scheduling.
              </p>
              <p className="leading-relaxed text-gray-700">
                RM-DB V6 introduces Bills-of-Resources that blend materials
                and workcenters in any combination. It also adds finite
                capacity planning, a unique sub-assembly management system
                for outsourced operations, and features like progressive lot
                traceability, job costing, and smooth data integration.
              </p>
            </div>

            {/* Scott Bennett Quote */}
            <Card className="border-l-4 border-amber-500">
              <CardContent className="p-6">
                <p className="italic leading-relaxed text-gray-800">
                  &quot;Resource Manager-DB gives us a unique mix of planning,
                  scheduling, and tracking tools in one flexible system.&quot;
                </p>
                <p className="mt-4 text-right font-semibold text-gray-900">
                  — Scott Bennett, Supply Chain Manager at Enevate Corp.
                </p>
              </CardContent>
            </Card>

            {/* Meeting Enevate's Unique Manufacturing Needs */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Meeting Enevate&apos;s Unique Manufacturing Needs
              </h2>
              <p className="leading-relaxed text-gray-700">
                In 2015, Enevate Corporation, a developer of next-generation
                Li-ion batteries, built a new manufacturing facility. They
                needed more than traditional ERP functions like costed
                bills-of-materials, inventory control, MRP, and lot
                traceability. The system also had to handle finite capacity
                scheduling and advanced routings—while staying adaptable.
              </p>
            </div>

            {/* Supply Chain Manager Empowerment */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Supply Chain Manager Empowerment
              </h2>
              <p className="mb-4 leading-relaxed text-gray-700">
                Scott Bennett, Supply Chain Manager for Enevate, says,
                &quot;The User Solutions team and Resource Manager-DB gave
                us the unique combination we needed, without losing
                flexibility, at a reasonable cost.&quot;
              </p>
              <p className="mb-4 leading-relaxed text-gray-700">
                Because Enevate was building new and original processes for
                innovative batteries, they needed dynamic supply chain
                reconfiguration. Resource Manager-DB&apos;s flexible format
                allowed them to combine workcenters, products, and
                sub-assemblies to test a wide range of &quot;what-if&quot;
                scenarios. They could create models in minutes or import
                different scenarios. Excel integration made managing data
                sets simple and quick.
              </p>
              <p className="mb-4 leading-relaxed text-gray-700">
                Scott adds, &quot;The product adapts easily to our business
                needs. User Solutions also customizes features to match our
                requests. We have used deep sub-assembly structures,
                imported new configurations via Excel, and scheduled
                workcenters and products in almost any combination. We keep
                finding new ways to benefit from the tool.&quot;
              </p>
              <p className="leading-relaxed text-gray-700">
                User Solutions also enhanced their Lot Management capability
                with traceability, pick lists, and inventory valuation by
                location and lot. They even combined Workcenters (for
                scheduling) and Products (for costing) into one powerful
                feature.
              </p>
            </div>

            {/* Affordable, Compatible, and Scalable - Text Left, Image Right */}
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-900">
                  Affordable, Compatible, and Scalable
                </h2>
                <p className="mb-4 leading-relaxed text-gray-700">
                  A single user version ranges from $5,000 – $10,000 which
                  includes implementation assistance. Resource Manager-DB runs
                  with Windows and uses Excel for reports.
                </p>
                <p className="mb-4 leading-relaxed text-gray-700">
                  Resource Manager-DB is the first tool that can be utilized
                  across the full manufacturing spectrum, from small shops
                  with no formal systems in place, all the way to large
                  multi-nationals needing to augment existing ERP systems.
                </p>
                <p className="leading-relaxed text-gray-700">
                  For more information or a free trial, contact{' '}
                  <span className="font-semibold text-amber-700">
                    www.UserSolutions.com
                  </span>{' '}
                  or call{' '}
                  <span className="font-semibold text-amber-700">
                    1(800) 321-8737
                  </span>
                </p>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/images/Edgebic/2022-09/Manufacturing_Excel_Dashboard-1024x376-1.png"
                  alt="Spreadsheet showing manufacturing process steps and status indicators"
                  width={1024}
                  height={376}
                  className="h-auto max-w-full rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* About User Solutions, Inc. */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                About User Solutions, Inc.
              </h2>
              <p className="leading-relaxed text-gray-700">
                Founded in 1991, User Solutions creates affordable,
                flexible, and easy-to-implement planning, scheduling, and
                tracking software for manufacturing and operations. Their
                tools can run alone or integrate with existing ERP systems.
              </p>
            </div>

            {/* About Enevate */}
            <div>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                About Enevate
              </h2>
              <p className="leading-relaxed text-gray-700">
                Enevate Corporation develops advanced rechargeable energy
                storage for mobile devices and drones. Its HD-Energy®
                Li-ion batteries deliver major performance gains over
                traditional batteries. Investors include Mission Ventures,
                Draper Fisher Jurvetson, and Sumitomo&apos;s Presidio
                Ventures.
              </p>
            </div>

            {/* Awards Banner */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-8 text-center">
                <h2 className="mb-6 text-2xl font-bold text-slate-900">
                  CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
                </h2>
                <Image
                  src="/images/Edgebic/2022-07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                  alt="Collection of industry and business awards logos"
                  width={1024}
                  height={128}
                  className="mx-auto h-auto max-w-full"
                  loading="lazy"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
