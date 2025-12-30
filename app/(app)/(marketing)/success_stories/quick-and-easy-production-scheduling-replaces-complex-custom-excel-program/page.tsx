import type { Metadata } from 'next';
import Image from 'next/image';

 
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title:
    'Quick and Easy Production Scheduling Replaces Complex Custom Excel Program | User Solutions',
  description:
    'Kyocera Industrial Ceramics replaced a complex custom Excel program with User Solutions scheduling software.',
  openGraph: {
    title:
      'Quick and Easy Production Scheduling Replaces Complex Custom Excel Program | User Solutions',
    description:
      'Kyocera Industrial Ceramics replaced a complex custom Excel program with User Solutions scheduling software.',
    url: 'https://www.usersolutions.com/success-stories/quick-and-easy-production-scheduling-replaces-complex-custom-excel-program'
  }
};

export default function QuickSchedulingExcelReplacementPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-6 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Quick and Easy Production Scheduling Replaces Complex Custom Excel
              Program
            </h1>
            <p className="mx-auto mb-4 max-w-3xl text-lg text-muted-foreground">
              How Kyocera and Other Manufacturers Streamlined Their Scheduling
              Processes
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
                  We were looking for a way to schedule three in-line departments
                  and various machines. Scheduling was being completed by the
                  respective department supervisors with no commonality between
                  them. My major concern was being able to preprogram alternate
                  routes for certain part numbers to achieve the most flexibility
                  throughout all departments. With the guidance of User Solutions,
                  we were able to solve that problem easily as well as create one
                  common computerized production schedule that could be understood
                  by all departments involved. All this was done using data that
                  was already in an Excel format, which made implementation a
                  snap.
                </p>

                <p className="text-[18px] leading-relaxed text-gray-700">
                  Tijuana, Mex. Fiber Optic Jumper Assembly Operation
                </p>

                <p className="text-[18px] leading-relaxed text-gray-700">
                  "We used the same software in a traditional MRP / Scheduling
                  sense to track raw material usage and final product output. This
                  replaced a complex employee written Excel program that was
                  becoming very time consuming and difficult to maintain. We were
                  also able to use previously entered data from an Access Database
                  to bring the system online quickly. We found immediate
                  improvement in both predicting output and tracking raw material
                  usage in process".
                </p>

                <p className="text-[18px] leading-relaxed text-gray-700">
                  <strong>Brian Kendall</strong>
                  <br />
                  Industrial Engineer for Kyocera Industrial Ceramics.
                  <br />
                  North Carolina Ceramics Production Facility
                </p>
              </div>

              {/* Image Column */}
              <div className="lg:sticky lg:top-6">
                <Image
                  src="/images/Edgebic/2022-07/EdgeSS-1024x544.png"
                  alt="Production scheduling software interface"
                  width={1024}
                  height={544}
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
