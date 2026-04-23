import { createArticleMetadata } from '@/lib/seo/metadata';
import Image from 'next/image';


import { Card, CardContent } from '@/components/ui/card';

export const metadata = createArticleMetadata({
  title:
    'Hi-Tech Connector Mfr Schedules Labor',
  description:
    'Discover how a hi-tech connector manufacturer improved labor scheduling accuracy with MRP add-on solutions.',
  path: '/success-stories/hi-tech-connector-mfr-accurately-schedules-labor-with-mrp-add-on',
  keywords: 'hi-tech connector, labor scheduling, MRP add-on, INCON, manufacturing scheduling',
});

export default function HiTechConnectorMfrPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cyan-50 via-white to-teal-50 py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-6 bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl">
              Hi-Tech Connector Mfr Accurately Schedules Labor with MRP Add-On
            </h1>
            <p className="mx-auto mb-4 max-w-3xl text-xl text-gray-700">
              Learn how MRP add-ons enabled precise labor scheduling for
              high-tech connector manufacturing.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <div className="prose prose-lg mx-auto">
              <h2 className="text-2xl font-bold text-gray-900">The Challenge</h2>
              <p className="text-gray-700">
                A leading hi-tech connector manufacturer needed better scheduling
                capabilities to accurately plan labor across their production
                facility. With complex manufacturing processes and fluctuating
                demand, the company struggled to determine optimal staffing levels
                and provide customers with reliable delivery dates. Their existing
                system lacked the scheduling visibility required to make confident
                workforce planning decisions.
              </p>

              <h2 className="text-2xl font-bold text-gray-900">The Solution</h2>
              <p className="text-gray-700">
                After evaluating options, Exact Software recommended Resource
                Manager-DB from User Solutions as an MRP add-on that could work
                alongside their existing Macola ERP system. The integration proved
                to be both fast and seamless, connecting not only with Macola but
                also with the company&apos;s custom labor tracking system.
              </p>

              <p className="text-gray-700">
                &ldquo;For awhile, we had been seeking better scheduling information
                out of our system. Exact Software recommended Resource
                Manager-DB from User Solutions. We found that not only was the
                product quick to integrate with our Macola system, it also
                integrated easily with our current custom labor tracking system
                and provides the needed visibility for us to plan labor more
                accurately,&rdquo; explained Ted Schultz.
              </p>

              <h2 className="text-2xl font-bold text-gray-900">Key Results</h2>
              <p className="text-gray-700">
                With Resource Manager-DB in place, the hi-tech connector manufacturer
                gained the ability to forecast labor requirements weeks and months
                in advance. Plant managers could now visualize workcenter loading,
                identify bottlenecks before they occurred, and adjust staffing levels
                proactively to meet production demands.
              </p>

              <p className="text-gray-700">
                &ldquo;Finally, we can see in advance how to staff the plant for most
                efficient scheduling and respond accurately to our customers
                with realistic promise dates,&rdquo; said Schultz. The improved visibility
                into labor scheduling translated directly into better customer
                service and more efficient plant operations.
              </p>

              <p className="text-gray-700">
                <strong>&mdash; Ted Schultz</strong>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
