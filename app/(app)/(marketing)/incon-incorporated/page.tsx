import type { Metadata } from 'next';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'INCON Incorporated | User Solutions',
  description:
    'Hi-tech Connector Mfr Accurately Schedules Labor with MRP Add-On.',
  openGraph: {
    title: 'INCON Incorporated | User Solutions',
    description:
      'Hi-tech Connector Mfr Accurately Schedules Labor with MRP Add-On.',
    url: 'https://www.usersolutions.com/incon-incorporate/'
  }
};

export default function InconIncorporatedPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-6 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Hi-tech Connector Mfr Accurately Schedules Labor with MRP Add-On
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section>
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <Image
                src="/images/Edgebic/2022-10/logo003-58c6bad38b32e.jpg"
                alt="INCON"
                width={230}
                height={153}
                className="h-auto"
                unoptimized
              />
            </div>

            {/* Testimonial */}
            <div className="space-y-6">
              <p className="leading-relaxed text-gray-700">
                For awhile, we had been seeking better scheduling information
                out of our system. Exact Software recommended Resource
                Manager-DB from User Solutions. We found that not only was the
                product quick to integrate with our Macola system, it also
                integrated easily with our current custom labor tracking system
                and provides the needed visibility for us to plan labor more
                accurately.
              </p>
              <p className="leading-relaxed text-gray-700">
                Finally, we can see in advance how to staff the plant for most
                efficient scheduling and respond accurately to our customers
                with realistic promise dates.
              </p>
              <p className="font-semibold text-gray-900">
                Ted Schultz
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Banner */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
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
