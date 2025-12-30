import Image from 'next/image';
import Link from 'next/link';


import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ResourceManagerForExcel2Page() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-6 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-7xl">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">
              Resource Manager For Excel
            </h1>
            <p className="mb-6 text-xl md:text-2xl">
              Basic MRP and Shop Scheduling with Excel
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/product-downloads">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Free Trial
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
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Resource Manager for Excel (RMX) offers basic MRP and Shop
                  Scheduling that is quick to implement and very affordable. RMX
                  is designed to adapt to your specific needs and utilizes all
                  the powerful features of Excel for data integration,
                  customization, sharing and reporting. A fully functional trial
                  is available for immediate download.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Summary Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-3xl">
                  Resource Manager for Excel: Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Resource Manager for Excel (RMX) features a Bill Of Resource
                  (BOR) that allows any combination of Workcenters and/or
                  Products. RMX is ideal for companies who have no formal
                  systems (ERP, MRP, etc.) as tool to plan for and implement
                  those systems, or to use to fill in any existing gaps for
                  production scheduling. With the BOR concept, you can manage
                  both Material Requirements Planning as well as Production
                  Planning and Scheduling considering Finite Capacity.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  For those applications that have a need for multiple
                  concurrent users, improved security (over Excel), seamless
                  integration with other systems, and advanced planning and
                  scheduling options, Resource Manager-DB (RMDB) is the best
                  choice.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-muted/50 py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card>
              <CardContent className="p-8">
                <blockquote className="text-center">
                  <p className="mb-4 text-lg italic text-muted-foreground">
                    "Adaptable and Flexible: Resource Manager for Excel is a
                    great solution for manufacturers who are not ready for a
                    full-blown MRPII, ERP, or Shop Management System but realize
                    the value of effective scheduling and planning. Resource
                    Manager for Excel is unique in that it easily adapts to the
                    way people are running their business today."
                  </p>
                  <footer className="text-sm font-semibold text-foreground">
                    — Mike Parks, Director of Georgia Tech's CMIT,
                    <br />
                    an affiliate of the NIST Manufacturing Extension Partnership
                  </footer>
                </blockquote>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-6 text-center text-3xl font-bold text-foreground">
              Features
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Excel add-On
                  </h3>
                  <p className="text-muted-foreground">
                    Works directly within Microsoft Excel
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Routings and Job Scheduling
                  </h3>
                  <p className="text-muted-foreground">
                    Create detailed production sequences
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Finite Capacity Scheduling
                  </h3>
                  <p className="text-muted-foreground">
                    Schedule based on actual capacity constraints
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Forward & Reverse Scheduling
                  </h3>
                  <p className="text-muted-foreground">
                    Schedule from start date or work backward from due date
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Bills-Of-Material
                  </h3>
                  <p className="text-muted-foreground">
                    Manage product component structures
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Robust Routings
                  </h3>
                  <p className="text-muted-foreground">
                    Define complex production workflows
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Basic MRP
                  </h3>
                  <p className="text-muted-foreground">
                    Material Requirements Planning functionality
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Large data model support
                  </h3>
                  <p className="text-muted-foreground">
                    Handle complex production environments
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Powerful scheduling engine
                  </h3>
                  <p className="text-muted-foreground">
                    Fast and efficient schedule generation
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
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-8 text-center">
                <h3 className="mb-6 text-2xl font-bold text-slate-900">
                  CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
                </h3>
                <img
                  src="/images/Edgebic/2022-07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
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
