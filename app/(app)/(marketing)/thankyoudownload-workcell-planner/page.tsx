import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ThankYouDownloadWorkcellPlannerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 py-6 text-white dark:from-green-800 dark:to-green-900">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-7xl">
            <div className="mb-6 flex justify-center">
              <CheckCircle className="size-20" />
            </div>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">
              Thank You for Downloading!
            </h1>
            <p className="mb-6 text-xl md:text-2xl">
              Your Workcell Planner download should begin shortly
            </p>
          </div>
        </div>
      </section>

      {/* Confirmation Section */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-3xl">
                  Your Download is Ready
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-center">
                  Your Workcell Planner software download should begin
                  automatically. If your download doesn't start, please check
                  your browser's download folder or contact our support team.
                </p>
                <p className="text-center">
                  Need help getting started? Check out our quick start guide or
                  contact us for a personalized demo.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Next Steps Section */}
      <section className="bg-muted/50 pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-3xl">
                  What's Next?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="text-center">
                    <h3 className="mb-2 text-lg font-semibold text-blue-600">
                      1. Install the Software
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Follow the installation instructions in the downloaded
                      file
                    </p>
                  </div>
                  <div className="text-center">
                    <h3 className="mb-2 text-lg font-semibold text-blue-600">
                      2. Explore Features
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Try out the sample data and explore all capabilities
                    </p>
                  </div>
                  <div className="text-center">
                    <h3 className="mb-2 text-lg font-semibold text-blue-600">
                      3. Get Full Access
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Ready to purchase? Unlock all features today
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
              <CardContent className="p-8 text-center">
                <h2 className="mb-6 text-3xl font-bold text-foreground">
                  Ready to Get Started?
                </h2>
                <p className="mb-6 text-lg text-muted-foreground">
                  Purchase the full version or schedule a demo with our team
                </p>
                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Link href="/contact-us">
                    <Button
                      size="lg"
                      className="bg-blue-600 text-white hover:bg-blue-700"
                    >
                      Request Free Product
                    </Button>
                  </Link>
                  <Link href="/contact-us">
                    <Button
                      size="lg"
                      variant="outline"
                    >
                      Schedule Demo
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button
                      size="lg"
                      variant="outline"
                    >
                      Return to Dashboard
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
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
