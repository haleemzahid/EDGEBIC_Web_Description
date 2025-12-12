import type { Metadata } from 'next';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title:
    'Hi-Tech Connector Mfr Accurately Schedules Labor with MRP Add-On | User Solutions',
  description:
    'Discover how a hi-tech connector manufacturer improved labor scheduling accuracy with MRP add-on solutions.',
  openGraph: {
    title:
      'Hi-Tech Connector Mfr Accurately Schedules Labor with MRP Add-On | User Solutions',
    description:
      'Discover how a hi-tech connector manufacturer improved labor scheduling accuracy with MRP add-on solutions.',
    url: 'https://www.usersolutions.com/success-stories/hi-tech-connector-mfr-accurately-schedules-labor-with-mrp-add-on'
  }
};

export default function HiTechConnectorMfrPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-cyan-50 via-white to-teal-50 py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <Badge
              variant="outline"
              className="mb-6 h-8 rounded-full px-4 text-sm font-medium shadow-sm"
            >
              Success Story
            </Badge>
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
              <p className="text-gray-700">
                For awhile, we had been seeking better scheduling information
                out of our system. Exact Software recommended Resource
                Manager-DB from User Solutions. We found that not only was the
                product quick to integrate with our Macola system, it also
                integrated easily with our current custom labor tracking system
                and provides the needed visibility for us to plan labor more
                accurately " according Ted.
              </p>

              <p className="text-gray-700">
                "Finally, we can see in advance how to staff the plant for most
                efficient scheduling and respond accurately to our customers
                with realistic promise dates.
              </p>

              <p className="text-gray-700">
                <strong>Ted Schultz</strong>
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
