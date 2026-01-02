import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';

export default function SpreadsheetQCPage() {
  return (
    <div className="min-h-screen text-[18px]">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Spreadsheet QC
            </h1>
            <p className="text-gray-700">
              Quality Control and Statistical Process Control with Excel
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl space-y-12">
            {/* Overview Section - Text Left, Image Right */}
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-900">Overview</h2>
                <p className="leading-relaxed text-gray-700">
                  Spreadsheet QC is a collection of 15 Excel templates. The goal
                  of Spreadsheet QC is to make statistical process and quality
                  control more accessible by automating the main techniques in a
                  familiar form, the spreadsheet. Spreadsheet QC is ideally
                  suited for small operations which are just beginning to
                  implement quality improvement programs because of its low cost
                  and ease of use. It is also ideally suited for large
                  operations to introduce quality control techniques for their
                  workforce.
                </p>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/images/Edgebic/2022-09/SQC-Menu.png"
                  alt="Spreadsheet quality control software with various graph templates"
                  width={800}
                  height={600}
                  className="h-auto max-w-full rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>

            {/* How It Works Section - Image Left, Text Right */}
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div className="order-2 flex justify-center md:order-1">
                <Image
                  src="/images/Edgebic/2022-09/SQC-MR-1024x713-1.png"
                  alt="Control chart and process capability analysis spreadsheet"
                  width={1024}
                  height={713}
                  className="h-auto max-w-full rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="mb-4 text-2xl font-bold text-slate-900">
                  How It Works
                </h2>
                <p className="leading-relaxed text-gray-700">
                  Spreadsheet QC will help customers maximize their existing
                  investment in software, hardware, and training. Using familiar
                  spreadsheet menus, users simply input the data into
                  spreadsheet cells and immediately obtain information that can
                  be used to pinpoint and solve quality problems. For any data
                  input, the user can enter in a simple number, an equation,
                  enter a link back to another spreadsheet for desired data, or
                  even read data from another system, all from within the
                  familiar spreadsheet environment.
                </p>
              </div>
            </div>

            {/* Applications Section - Text Left, Image Right */}
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-slate-900">
                  Applications
                </h2>
                <ul className="space-y-3 text-gray-700">
                  <li>
                    <strong className="text-slate-900">Control Charts:</strong>{' '}
                    Seven different spreadsheets to do both R and X-Bar charts
                    as well as process capability histogram for each sample.
                  </li>
                  <li>
                    <strong className="text-slate-900">P-Charts:</strong>{' '}
                    Spreadsheet to do p-charts for variable sample size or fixed
                    sample size with 3 sigma lines.
                  </li>
                  <li>
                    <strong className="text-slate-900">Acceptance Sampling:</strong>{' '}
                    Specify sample size and max allowed defects for various
                    sampling categories with pass/fail determination.
                  </li>
                  <li>
                    <strong className="text-slate-900">Process Capability:</strong>{' '}
                    Enter histogram data and spec limits for graphical analysis
                    with Cpk calculation.
                  </li>
                  <li>
                    <strong className="text-slate-900">Cumulative Sum Chart:</strong>{' '}
                    More responsive to process shifts than traditional X-Bar
                    charts.
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/images/Edgebic/2022-09/SQC-Pareto.png"
                  alt="Excel spreadsheet displaying a Pareto diagram with defect types"
                  width={800}
                  height={600}
                  className="h-auto max-w-full rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
