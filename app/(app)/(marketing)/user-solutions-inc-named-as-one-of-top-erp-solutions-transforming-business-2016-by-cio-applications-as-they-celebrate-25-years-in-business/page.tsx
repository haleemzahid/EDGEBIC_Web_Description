import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title:
    'User Solutions Inc Named as One of Top ERP Solutions Transforming Business 2016 by CIO Applications | 25 Years in Business',
  description:
    'User Solutions Inc. recognized as one of the top ERP solutions transforming business in 2016 by CIO Applications as they celebrate 25 years in business.',
  openGraph: {
    title: 'Top ERP Solutions 2016 - User Solutions 25 Years',
    description:
      'Recognized by CIO Applications as top ERP solution transforming business',
    url: 'https://www.usersolutions.com/user-solutions-inc-named-as-one-of-top-erp-solutions-transforming-business-2016-by-cio-applications-as-they-celebrate-25-years-in-business'
  }
};

export default function TopERPSolutions2016Page() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-white to-blue-50 py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <Badge
              variant="outline"
              className="mb-6 h-8 rounded-full border-purple-600/30 px-4 text-sm font-medium text-purple-700 shadow-sm"
            >
              CIO Applications Recognition 2016
            </Badge>
            <h1 className="mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl">
              User Solutions, Inc. Named as One of Top ERP Solutions
              Transforming Business 2016
            </h1>
            <p className="mb-4 text-xl text-gray-700">
              Celebrating 25 Years in Business
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-6">
        <div className="mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            {/* Subtitle */}
            <div className="mb-6 text-center">
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-6 text-3xl font-bold text-gray-900">
                    User Solutions receives recognition by CIO Applications for
                    the company&apos;s success as ERP Add-On for Production
                    Scheduling
                  </h2>
                </CardContent>
              </Card>
            </div>

            {/* Date and Location */}
            <div className="mb-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    South Lyon, MI - May 10, 2016
                  </h3>
                </CardContent>
              </Card>
            </div>

            {/* CIO Applications Quote */}
            <Card className="mb-6 border-l-4 border-purple-600">
              <CardContent className="pt-6">
                <blockquote className="mb-4 text-lg italic leading-relaxed text-gray-700">
                  &quot;We are pleased to recognize User Solutions as one among
                  the 25 ERP Solutions Transforming Business of 2016. After
                  evaluation from many quantitative and qualitative elements,
                  User Solutions has been selected from hundreds of entries. The
                  positioning is based on evaluation of User Solutions&apos;
                  specialties in Manufacturing Software, Scheduling Software,
                  Planning Software and Custom Manufacturing Applications. It
                  helps manufacturers become more profitable and competitive
                  through better production scheduling.&quot;
                </blockquote>
              </CardContent>
            </Card>

            {/* Managing Editor Quote */}
            <Card className="mb-6 border-l-4 border-blue-600">
              <CardContent className="pt-6">
                <blockquote className="mb-4 text-lg italic leading-relaxed text-gray-700">
                  &quot;User Solutions&apos; proven track record of successful
                  client deployments in the ERP arena demonstrates its prowess
                  in helping customers attain unprecedented efficiency.&quot;
                </blockquote>
                <p className="font-semibold text-gray-900">
                  – Sarah Wilson, Managing Editor, CIO Applications
                </p>
              </CardContent>
            </Card>

            {/* Read Full Article CTA */}
            <div className="mb-6 text-center">
              <a
                href="http://www.cioapplications.com/vendor/article12/user_solutions"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="text-lg"
                >
                  Read Full Article Here
                </Button>
              </a>
            </div>

            {/* About User Solutions */}
            <div className="mb-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-6 text-3xl font-bold text-gray-900">
                    About User Solutions, Inc.
                  </h2>
                  <p className="text-lg leading-relaxed text-gray-700">
                    User Solutions, Inc. was founded in 1991 to fulfill the
                    genuine need for lower cost, easy to learn and use software
                    solutions for the manufacturing and operations management
                    markets. As an add-on solution to existing ERP Solutions, or
                    running stand alone, their affordable products feature great
                    flexibility and speed to implement.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Awards Banner */}
            <div>
              <Card className="mt-6 rounded-xl border bg-gradient-to-br from-blue-50 to-blue-100 text-card-foreground shadow">
                <CardContent className="p-8 text-center">
                  <h2 className="mb-6 text-2xl font-bold text-slate-900">
                    CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
                  </h2>
                  <img
                    src="https://www.usersolutions.com/wp-content/uploads/2022/07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                    alt="Collection of industry and business awards logos"
                    className="mx-auto h-auto max-w-full"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
