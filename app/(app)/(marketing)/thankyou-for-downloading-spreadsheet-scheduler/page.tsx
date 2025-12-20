import Image from 'next/image';
import Link from 'next/link';


import { Card, CardContent } from '@/components/ui/card';

export default function ThankYouSpreadsheetSchedulerPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 py-6 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              Thank You for Your Download!
            </h1>
            <p className="text-xl text-white/90">
              Your Spreadsheet Scheduler download is ready
            </p>
          </div>
        </div>
      </section>

      {/* Thank You Content */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 text-center">
              <Image
                src="https://www.usersolutions.com/wp-content/uploads/2022/10/thankyou.jpg"
                alt="Customer service representative smiling with headset at computer"
                width={600}
                height={400}
                className="mx-auto mb-6 rounded-lg shadow-lg"
              />
            </div>

            <Card className="mb-6">
              <CardContent className="p-8">
                <h2 className="mb-6 text-center text-3xl font-bold">
                  Thank you for your interest
                </h2>

                <div className="mb-6 text-center">
                  <Link
                    href="https://www.usersolutions.com/US_SS-2023D.xlsm"
                    className="inline-block rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-blue-700"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Click here to download your product
                  </Link>
                </div>

                <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
                  <p>
                    We will contact you to discuss your scheduling application
                    in complete detail. You are welcome to send sample data at
                    anytime to take advantage of our unique demoing approach –
                    proving the solution.
                  </p>

                  <p>
                    Send data or post questions anytime to{' '}
                    <a
                      href="mailto:us@usersolutions.com"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      us@usersolutions.com
                    </a>{' '}
                    or at{' '}
                    <a
                      href="tel:248.486.6365"
                      className="font-medium text-blue-600 hover:underline"
                    >
                      248.486.6365
                    </a>
                  </p>

                  <p className="font-semibold">
                    Kindest Regards,
                    <br />
                    User Solutions, Inc.
                    <br />
                    Since 1991 – Manufacturing Software made easy!
                  </p>
                </div>

                <div className="mt-8 text-center">
                  <Link
                    href="/"
                    className="inline-block rounded-lg bg-gray-600 px-6 py-3 text-white transition-colors hover:bg-gray-700"
                  >
                    Back to Home
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Related Products */}
            <div className="mt-6">
              <h3 className="mb-6 text-center text-2xl font-bold">
                You might also be interested in:
              </h3>
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="transition-all hover:shadow-xl">
                  <CardContent className="p-6">
                    <h4 className="mb-2 text-lg font-semibold">
                      Workcell Planner
                    </h4>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Plan and optimize your workcell operations
                    </p>
                    <Link
                      href="/workcell-planner"
                      className="text-blue-600 hover:underline"
                    >
                      Learn More →
                    </Link>
                  </CardContent>
                </Card>
                <Card className="transition-all hover:shadow-xl">
                  <CardContent className="p-6">
                    <h4 className="mb-2 text-lg font-semibold">
                      Resource Manager
                    </h4>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Advanced resource planning and management
                    </p>
                    <Link
                      href="/resource-manager-for-excel-2"
                      className="text-blue-600 hover:underline"
                    >
                      Learn More →
                    </Link>
                  </CardContent>
                </Card>
                <Card className="transition-all hover:shadow-xl">
                  <CardContent className="p-6">
                    <h4 className="mb-2 text-lg font-semibold">
                      Operations Manager
                    </h4>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Comprehensive operations management tools
                    </p>
                    <Link
                      href="/operations-manager"
                      className="text-blue-600 hover:underline"
                    >
                      Learn More →
                    </Link>
                  </CardContent>
                </Card>
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
                <div className="flex justify-center">
                  <img
                    src="https://www.usersolutions.com/wp-content/uploads/2022/07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                    alt="Collection of industry and business awards logos"
                    className="h-auto w-full max-w-full rounded-lg shadow-md"
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
