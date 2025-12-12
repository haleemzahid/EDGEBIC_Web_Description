import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function ThankYouJSLPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 py-6 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <Badge
              variant="outline"
              className="mb-6 h-8 rounded-full border-white/30 bg-white/10 px-3 text-sm font-medium text-white shadow-sm"
            >
              DOWNLOAD CONFIRMATION
            </Badge>
            <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              Thank You for Downloading EDGEBIC!
            </h1>
            <p className="text-xl text-white/90">
              Your download is ready. We'll be in touch shortly to help you get
              started.
            </p>
          </div>
        </div>
      </section>

      {/* Main Thank You Content */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-7xl">
            <CardContent className="p-8">
              <div className="mb-6 text-center">
                <img
                  src="https://www.usersolutions.com/wp-content/uploads/2022/10/thankyou.jpg"
                  alt="Customer service representative smiling with headset at computer"
                  className="mx-auto mb-6 h-auto w-full rounded-lg shadow-lg"
                />
              </div>

              <div className="mb-6 text-center">
                <Link
                  href="/jsl-job-scheduler-lite-download"
                  className="inline-block rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  Download EDGEBIC
                </Link>
              </div>

              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  We will contact you to discuss your scheduling application in
                  complete detail.
                </p>

                <p>
                  You are welcome to send sample data at anytime to take
                  advantage of our unique demoing approach – proving the
                  solution.
                </p>

                <p>
                  Send data or post questions anytime to{' '}
                  <Link
                    href="mailto:us@usersolutions.com"
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    us@usersolutions.com
                  </Link>{' '}
                  or at{' '}
                  <Link
                    href="tel:248.486.1934"
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    248.486.1934
                  </Link>
                </p>

                <p className="font-semibold">Kindest Regards,</p>

                <p>
                  User Solutions, Inc.
                  <br />
                  <span className="text-muted-foreground">
                    Since 1991 – Manufacturing Software made easy!
                  </span>
                </p>
              </div>

              <div className="pt-8 text-center">
                <Button
                  asChild
                  variant="outline"
                >
                  <Link href="/">
                    <ArrowLeft className="mr-2 size-4" />
                    Back to Home
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Awards Section */}
      <section>
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-8 text-center">
                <h3 className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl">
                  CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
                </h3>
                <img
                  src="https://www.usersolutions.com/wp-content/uploads/2022/07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                  alt="Collection of industry and business awards logos"
                  className="mx-auto h-auto w-full"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
