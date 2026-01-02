import Image from 'next/image';
import Link from 'next/link';


import { Card, CardContent } from '@/components/ui/card';

export default function RMDBv6PressReleasePage() {
  return (
    <div className="min-h-screen  ">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-6 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
              RMDB v6 Innovates Production Scheduling for Cutting Edge Battery
              Technology
            </h1>
            <p className="text-xl text-white/90">
              Enevate Corporation Selects User Solutions' Resource Manager
              Database
            </p>
            <p className="mt-2 text-lg text-white/80">June 9, 2016</p>
          </div>
        </div>
      </div>

      {/* Press Release Content */}
      <div className="container mx-auto px-4 pt-6">
        <div className="mx-auto max-w-4xl">
          <article className="prose prose-lg max-w-none">
            <header className="mb-6">
              <p className="text-lg font-semibold text-gray-700">
                South Lyon, MI - June 9, 2016
              </p>
            </header>

            <div className="space-y-6 leading-relaxed text-gray-700">
              <p className="text-xl font-medium text-gray-900">
                Enevate Corporation, a cutting-edge developer and licensor of
                advanced Li-ion battery technology, has selected User Solutions'
                Resource Manager database (RMDB) to manage production of their
                revolutionary battery cells.
              </p>

              <p>
                Enevate is pioneering next-generation Li-ion battery technology
                that enables extreme fast charging for electric vehicles and
                other applications. Their innovative manufacturing process
                requires sophisticated scheduling to coordinate complex,
                multi-level bill of materials and ensure quality and delivery
                commitments.
              </p>

              <blockquote className="my-6 border-l-4 border-blue-600 pl-6">
                <p className="mb-4 text-lg italic text-gray-800">
                  "Resource Manager database's flexible configuration allows us
                  to model our unique manufacturing processes with up to 10
                  level deep sub-assemblies. The system gives us complete
                  visibility into our production schedule and helps us maintain
                  the quality standards required for our advanced battery
                  technology."
                </p>
                <cite className="font-semibold text-gray-600">
                  - Scott Bennett, Supply Chain Manager, Enevate Corporation
                </cite>
              </blockquote>

              <h3 className="mb-4 mt-8 text-2xl font-bold text-gray-900">
                Greenfield Manufacturing Facility
              </h3>
              <p>
                Enevate's new manufacturing facility represents a greenfield
                implementation of advanced battery production technology.
                Starting with a clean slate allowed them to implement best
                practices from the beginning, and Resource Manager database was
                a key component of their production infrastructure.
              </p>

              <p>
                The complexity of battery cell manufacturing—with its precise
                specifications, quality requirements, and multi-level assembly
                processes—demanded a scheduling system that could handle deep
                bill of materials structures while maintaining clear visibility
                into capacity and delivery commitments.
              </p>

              <h3 className="mb-4 mt-8 text-2xl font-bold text-gray-900">
                Advanced Scheduling for Complex Production
              </h3>
              <p>
                RMDB's ability to handle up to 10 level deep bills of materials
                proved essential for Enevate's production requirements. The
                system tracks sub-assemblies through multiple production stages,
                ensuring that components are available when needed and that
                quality standards are maintained throughout the process.
              </p>

              <p>
                Key capabilities that made RMDB the right choice for Enevate
                include:
              </p>

              <ul className="my-6 space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="mr-2 text-blue-600">
                    •
                  </span>
                  <span>
                    <strong className="text-gray-900">
                      Deep BOM Support
                    </strong>{' '}
                    - Handles complex, multi-level bill of materials up to 10
                    levels deep
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-blue-600">
                    •
                  </span>
                  <span>
                    <strong className="text-gray-900">
                      Flexible Configuration
                    </strong>{' '}
                    - Easily adapts to unique manufacturing processes and
                    requirements
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-blue-600">
                    •
                  </span>
                  <span>
                    <strong className="text-gray-900">
                      Complete Visibility
                    </strong>{' '}
                    - Clear insight into production schedule, capacity, and
                    delivery dates
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-blue-600">
                    •
                  </span>
                  <span>
                    <strong className="text-gray-900">
                      Quality Focus
                    </strong>{' '}
                    - Supports the precise tracking required for high-tech
                    manufacturing
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-blue-600">
                    •
                  </span>
                  <span>
                    <strong className="text-gray-900">
                      Scalability
                    </strong>{' '}
                    - Designed to grow with the business as production ramps up
                  </span>
                </li>
              </ul>

              <h3 className="mb-4 mt-8 text-2xl font-bold text-gray-900">
                About Enevate Corporation
              </h3>
              <p>
                Enevate Corporation is a pioneering developer of advanced Li-ion
                battery technology that enables extreme fast charging for
                electric vehicles, consumer electronics, and other applications.
                Their proprietary technology allows batteries to charge in
                minutes rather than hours, potentially revolutionizing the
                electric vehicle industry. The company licenses its technology
                to battery manufacturers worldwide and produces prototype cells
                at its own manufacturing facility.
              </p>

              <div className="mt-8 rounded-lg border border-gray-200 p-6">
                <h4 className="mb-4 text-lg font-bold text-gray-900">
                  About User Solutions
                </h4>
                <p className="text-gray-700">
                  User Solutions has been providing production scheduling
                  software to manufacturers since 1982. Resource Manager
                  database (RMDB) is our flagship product, helping companies
                  across diverse industries optimize their production schedules,
                  improve on-time delivery, and reduce lead times. We specialize
                  in complex manufacturing environments including those with
                  deep bills of materials, job shop operations, and high-mix
                  production.
                </p>
              </div>

              <div className="mt-8 space-y-2 border-t border-gray-200 pt-6">
                <p className="font-semibold text-gray-900">
                  For More Information:
                </p>
                <p className="text-gray-700">
                  User Solutions, Inc.
                  <br />
                  Email:{' '}
                  <a
                    href="mailto:us@usersolutions.com"
                    className="text-blue-600 hover:underline"
                  >
                    us@usersolutions.com
                  </a>
                  <br />
                  Phone:{' '}
                  <a
                    href="tel:248.486.6365"
                    className="text-blue-600 hover:underline"
                  >
                    248.486.6365
                  </a>
                  <br />
                  Website:{' '}
                  <Link
                    href="/resource-manager-db-2"
                    className="text-blue-600 hover:underline"
                  >
                    Learn more about Resource Manager DB
                  </Link>
                </p>
              </div>
            </div>
          </article>

          {/* Related Links */}
          <div className="mt-6 rounded-lg border border-gray-200 p-6">
            <h3 className="mb-4 text-lg font-bold text-gray-900">
              Related Resources
            </h3>
            <div className="space-y-2">
              <Link
                href="/resource-manager-db-2"
                className="block text-blue-600 hover:underline"
              >
                → Learn more about Resource Manager DB
              </Link>
              <Link
                href="/product-downloads"
                className="block text-blue-600 hover:underline"
              >
                → Download Free Trial
              </Link>
              <Link
                href="/success_stories"
                className="block text-blue-600 hover:underline"
              >
                → Read Customer Success Stories
              </Link>
              <Link
                href="/press_release"
                className="block text-blue-600 hover:underline"
              >
                ← Back to Press Releases
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
