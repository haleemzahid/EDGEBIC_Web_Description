import type { Metadata } from 'next';
import Image from 'next/image';


import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title:
    'Complements Traditional MRP for Job Shop Scheduling and Efficiency | User Solutions',
  description:
    'Explore how complementary scheduling solutions enhance traditional MRP systems in job shop environments.',
  openGraph: {
    title:
      'Complements Traditional MRP for Job Shop Scheduling and Efficiency | User Solutions',
    description:
      'Explore how complementary scheduling solutions enhance traditional MRP systems in job shop environments.',
    url: 'https://www.usersolutions.com/success-stories/complements-traditional-mrp-and-shop-control-systems'
  }
};

export default function ComplementsTraditionalMrpPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-6 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Complements Traditional MRP for Job Shop Scheduling and Efficiency
            </h1>
            <p className="mx-auto mb-4 max-w-3xl text-lg text-muted-foreground">
              Learn how advanced scheduling solutions complement MRP systems to
              boost job shop efficiency.
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
                  Arnold Quesenberry, Senior Consultant for A.G. Raymond & Co.
                  Inc. has been using Resource Manager in conjunction with
                  consulting projects. "We have found these products are a perfect
                  complement to traditional MRP and Shop Control systems. They
                  enable the user to quickly generate various 'what-if' plans for
                  feasible and efficient master scheduling, all without disrupting
                  the current system".
                </p>

                <p className="text-[18px] leading-relaxed text-gray-700">
                  Mr. Quesenberry continues, "In addition to complementing
                  traditional systems, the Resource Manager is the perfect
                  beginning system for companies just getting started with
                  computerizing their operations, both here and abroad. It
                  provides a quick, easy, and flexible method to organize parts,
                  routings, operations, costs, Bills-Of-Materials, and perform
                  basic scheduling, inventory management, even purchasing.
                </p>

                <p className="text-[18px] leading-relaxed text-gray-700">
                  Our customers love the fact that since the Resource Manager is
                  compatible with Excel, they are immediately comfortable with
                  running the system."
                </p>
              </div>

              {/* Image Column */}
              <div className="lg:sticky lg:top-6">
                <Image
                  src="https://www.usersolutions.com/wp-content/uploads/2022/07/RMX.png"
                  alt="Resource Manager RMX"
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
