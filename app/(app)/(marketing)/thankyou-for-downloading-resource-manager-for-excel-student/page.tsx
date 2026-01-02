import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AlertCircle, ArrowLeft, Download } from 'lucide-react';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ThankYouResourceManagerStudentPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 py-6 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              Thank You for Downloading Resource Manager for Excel
            </h1>
            <p className="text-xl text-white/90">
              Student Edition - 60 Day Trial Version
            </p>
          </div>
        </div>
      </section>

      {/* Main Thank You Content */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-7xl">
            <CardContent className="p-8">
              <div className="mb-6 text-center">
                <Image
                  src="/images/Edgebic/2022-10/thankyou.jpg"
                  alt="Customer service representative smiling with headset at computer"
                  width={800}
                  height={600}
                  className="mx-auto mb-6 h-auto w-full rounded-lg shadow-lg"
                  loading="lazy"
                />
              </div>

              <div className="mb-6 text-center">
                <Button
                  asChild
                  size="lg"
                >
                  <a
                    href="https://www.usersolutions.com/RMX011223D.xlsm"
                    download
                  >
                    <Download className="mr-2 size-5" />
                    Click here to download your product
                  </a>
                </Button>
              </div>

              <Alert className="mb-6">
                <AlertCircle className="size-4" />
                <AlertDescription className="text-lg">
                  Thank you for downloading Resource Manager for Excel (Student
                  version). This is exactly the same as production version with
                  a 60 day trial.
                </AlertDescription>
              </Alert>

              <div className="space-y-4 text-lg text-muted-foreground">
                <div className="border-l-4 border-blue-600 bg-blue-50 p-4">
                  <p className="mb-2 font-semibold text-slate-900">
                    Important Setup Instructions:
                  </p>
                  <ol className="list-inside list-decimal space-y-2">
                    <li>
                      After downloading, right click on Properties for RMX…xlsx
                      and <strong>UNBLOCK file</strong>
                    </li>
                    <li>
                      Next, review follow up letter that tells how to enable
                      macros
                    </li>
                  </ol>
                </div>

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
    </div>
  );
}
