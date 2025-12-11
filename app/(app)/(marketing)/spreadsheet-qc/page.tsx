import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SpreadsheetQCPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-6 text-white dark:from-blue-800 dark:to-blue-900">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-7xl">
            <Badge
              variant="outline"
              className="mb-6 h-8 rounded-full border-white/30 bg-white/10 px-3 text-sm font-medium text-white shadow-sm"
            >
              PRODUCT
            </Badge>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">
              Spreadsheet QC
            </h1>
            <p className="mb-6 text-xl md:text-2xl">
              Quality Control and Statistical Process Control with Excel
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/product-downloads">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Free Sample
                </Button>
              </Link>
              <Link href="/pricing">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Request Free Product
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-3xl">Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  Spreadsheet QC is a collection of 15 Excel templates. The goal
                  of Spreadsheet QC is to make statistical process and quality
                  control more accessible by automating the main techniques in a
                  familiar form, the spreadsheet. Spreadsheet QC is ideally
                  suited for small operations which are just beginning to
                  implement quality improvement programs because of its low cost
                  and ease of use. It is also ideally suited for large
                  operations to introduce quality control techniques for their
                  workforce. Spreadsheet QC contains: Control Charts,
                  Statistical Process Control, P Charts, Acceptance Sampling,
                  and more! All in Excel and simple formulas based allows easy
                  customization.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-3xl">
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">
                  Spreadsheet QC will help customers maximize their existing
                  investment in software, hardware, and training. Using familiar
                  spreadsheet menus, users simply input the data into
                  spreadsheet cells and immediately obtain information that can
                  be used to pinpoint and solve quality problems. For any data
                  input, the user can enter in a simple number, an equation,
                  enter a link back to another spreadsheet for desired data, or
                  even read data from another system, all from within the
                  familiar spreadsheet environment. The spreadsheet's graphic
                  capability enables quick and easy presentation. Additionally,
                  the actual source code, referred to as "macros", is included
                  with each product, enabling customers to modify the macros to
                  further customize and enhance Spreadsheet QC.
                </p>

                <div className="my-6 flex justify-center">
                  <img
                    src="https://www.usersolutions.com/wp-content/uploads/2022/09/SQC-Menu.png"
                    alt="Spreadsheet quality control software with various graph templates"
                    className="h-auto max-w-full rounded-lg shadow-lg"
                  />
                </div>

                <div className="my-6 flex justify-center">
                  <img
                    src="https://www.usersolutions.com/wp-content/uploads/2022/09/SQC-MR-1024x713-1.png"
                    alt="Control chart and process capability analysis spreadsheet"
                    className="h-auto max-w-full rounded-lg shadow-lg"
                  />
                </div>

                <div className="my-6 flex justify-center">
                  <img
                    src="https://www.usersolutions.com/wp-content/uploads/2022/09/SQC-Pareto.png"
                    alt="Excel spreadsheet displaying a Pareto diagram with defect types"
                    className="h-auto max-w-full rounded-lg shadow-lg"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-3xl">
                  Applications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul>
                  <li>
                    <strong className="font-semibold text-foreground">
                      Control Charts:
                    </strong>{' '}
                    Seven different spreadsheets to do both R and X-Bar charts
                    as well as process capability histogram for each sample. R
                    and X-Bar Charts are made with 3 different intervals for
                    estimating the variation. All control chart templates are
                    very well suited to copy to do multiple charts within the
                    same file.
                  </li>
                  <li>
                    <strong className="font-semibold text-foreground">
                      P-Charts:
                    </strong>{' '}
                    Spreadsheet to do p-charts for variable sample size or fixed
                    sample size with 3 sigma lines.
                  </li>
                  <li>
                    <strong className="font-semibold text-foreground">
                      Acceptance Sampling:
                    </strong>{' '}
                    This spreadsheet allows the user to specify sample size and
                    max allowed defects for any or all of several sampling
                    categories: vendor incoming, first piece inspection,
                    in-process audit, finished goods. Prompts determine
                    pass/fail and whether to increase sample to confirm lot
                    acceptance or rejection. Probability curves are included.
                  </li>
                  <li>
                    <strong className="font-semibold text-foreground">
                      Process Capability:
                    </strong>{' '}
                    Graphical Analysis. Enter histogram data and spec limits and
                    the sheet graphs it overlaid with the calculated normal
                    curve, the spec limits, and an analysis of percent out of
                    spec and Cpk.
                  </li>
                  <li>
                    <strong className="font-semibold text-foreground">
                      Cumulative Sum Chart:
                    </strong>{' '}
                    This chart, along with the moving average and exponentially
                    weighted moving average, are alternatives to the X-Bar
                    chart. The CUSUM is more responsive to process shifts.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-6 text-center text-3xl font-bold text-foreground">
              Features
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    15 Excel Templates
                  </h3>
                  <p className="text-muted-foreground">
                    Complete QC toolkit for various quality scenarios
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Control Charts
                  </h3>
                  <p className="text-muted-foreground">
                    R-charts, X-Bar charts, and process capability histograms
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    P-Charts
                  </h3>
                  <p className="text-muted-foreground">
                    Track proportion defective with variable or fixed sample
                    size
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Acceptance Sampling
                  </h3>
                  <p className="text-muted-foreground">
                    Make lot acceptance decisions with probability curves
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Process Capability Analysis
                  </h3>
                  <p className="text-muted-foreground">
                    Calculate Cpk and visualize spec limits
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    CUSUM Charts
                  </h3>
                  <p className="text-muted-foreground">
                    Detect process shifts faster than traditional charts
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Quick Analysis
                  </h3>
                  <p className="text-muted-foreground">
                    Just input data - spreadsheet does the rest
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Minimal Skills Required
                  </h3>
                  <p className="text-muted-foreground">
                    No training needed - intuitive interface
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Easily Customized
                  </h3>
                  <p className="text-muted-foreground">
                    Adapt templates to your specific requirements
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Source Code Included
                  </h3>
                  <p className="text-muted-foreground">
                    Full access to modify and extend functionality
                  </p>
                </CardContent>
              </Card>
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
                <img
                  src="https://www.usersolutions.com/wp-content/uploads/2022/07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                  alt="Collection of industry and business awards logos"
                  className="mx-auto h-auto max-w-full"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
