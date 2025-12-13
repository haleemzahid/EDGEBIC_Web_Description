import Link from 'next/link';


import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProductionSchedulingProductsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
              Production Planning and Scheduling Solutions
            </h1>
            <p className="mb-6 text-xl text-gray-700">
              Contact US to discuss which product is the best fit for your
              application and budget.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/contact-us">
                <Button
                  size="lg"
                  className="text-lg"
                >
                  Schedule a Live Demo Today!
                </Button>
              </Link>
              <Link href="/product-downloads">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg"
                >
                  Free Trial & Sample
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card>
              <CardContent className="pt-6">
                <p className="mb-4 text-lg leading-relaxed text-gray-700">
                  From a simple Excel based job shop scheduling application to
                  Advanced Planning and Scheduling software (APS) that works
                  either standalone or integrates with your ERP, we look forward
                  to resolving your manufacturing scheduling challenges.
                </p>
                <p className="text-lg leading-relaxed text-gray-700">
                  Choose the product that best suits your company's needs by
                  using our product matrix.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Product Note */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="pt-6">
                <p className="mb-4 text-gray-700">
                  Product license cost estimates. Customized training,
                  implementation and other support services available upon
                  request.
                </p>
                <Link href="/excel-applications">
                  <Button variant="outline">
                    Other Excel Template Solutions
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Product Tiers */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 md:grid-cols-3">
              {/* Starter - EDGEBIC */}
              <Card className="border-2 border-gray-300">
                <CardHeader className="bg-gradient-to-br from-gray-100 to-gray-200 text-center">
                  <div className="mb-4">
                    <span className="inline-block rounded-full bg-gray-400 px-6 py-2 text-lg font-bold text-white">
                      $1000
                    </span>
                  </div>
                  <CardTitle className="mb-2 text-2xl">Starter</CardTitle>
                  <h3 className="text-xl font-semibold text-blue-600">
                    EDGEBIC
                  </h3>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-6">
                    <p className="mb-4 text-center text-gray-700">
                      Simple and effective job shop scheduling for small to
                      medium businesses
                    </p>
                  </div>

                  <div className="mb-6 space-y-2">
                    <div className="flex items-center text-sm">
                      <span className="mr-2 text-green-600">✓</span>
                      <span className="text-gray-700">Job Shop Scheduling</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="mr-2 text-red-600">✗</span>
                      <span className="text-gray-400">Advanced Features</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Link
                      href="/jsl-job-scheduler-lite"
                      className="block"
                    >
                      <Button className="w-full">Read More</Button>
                    </Link>
                    <Link
                      href="/jsl-job-scheduler-lite"
                      className="block"
                    >
                      <Button
                        variant="outline"
                        className="w-full"
                      >
                        Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Advanced - Resource Manager DB */}
              <Card className="border-2 border-blue-500 shadow-lg">
                <CardHeader className="bg-gradient-to-br from-blue-100 to-blue-200 text-center">
                  <div className="mb-4">
                    <span className="inline-block rounded-full bg-blue-600 px-6 py-2 text-lg font-bold text-white">
                      $5000+
                    </span>
                  </div>
                  <CardTitle className="mb-2 text-2xl">Advanced</CardTitle>
                  <h3 className="text-xl font-semibold text-blue-600">
                    Resource Manager DB
                  </h3>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-6">
                    <p className="mb-4 text-center text-gray-700">
                      Database-driven APS with advanced planning and ERP
                      integration
                    </p>
                  </div>

                  <div className="mb-6 space-y-2">
                    <div className="flex items-center text-sm">
                      <span className="mr-2 text-green-600">✓</span>
                      <span className="text-gray-700">
                        Advanced Planning & Scheduling
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="mr-2 text-green-600">✓</span>
                      <span className="text-gray-700">ERP Integration</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="mr-2 text-green-600">✓</span>
                      <span className="text-gray-700">Database-Driven</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="mr-2 text-green-600">✓</span>
                      <span className="text-gray-700">Multi-User Support</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Link
                      href="/resource-manager-db-2"
                      className="block"
                    >
                      <Button className="w-full">Read More</Button>
                    </Link>
                    <Link
                      href="/resource-manager-db-2"
                      className="block"
                    >
                      <Button
                        variant="outline"
                        className="w-full"
                      >
                        Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Platinum - EDGEBIC */}
              <Card className="border-2 border-purple-500">
                <CardHeader className="bg-gradient-to-br from-yellow-100 to-yellow-200 text-center">
                  <div className="mb-4">
                    <span className="inline-block rounded-full bg-yellow-600 px-6 py-2 text-lg font-bold text-white">
                      $2500+
                    </span>
                  </div>
                  <CardTitle className="mb-2 text-2xl">Platinum</CardTitle>
                  <h3 className="text-xl font-semibold text-purple-600">
                    EDGEBIC (Bundled w/ RMDB)
                  </h3>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-6">
                    <p className="mb-4 text-center text-gray-700">
                      Business intelligence and analytics bundled with Resource
                      Manager DB
                    </p>
                  </div>

                  <div className="mb-6 space-y-2">
                    <div className="flex items-center text-sm">
                      <span className="mr-2 text-green-600">✓</span>
                      <span className="text-gray-700">All RMDB Features</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="mr-2 text-green-600">✓</span>
                      <span className="text-gray-700">
                        Business Intelligence
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="mr-2 text-green-600">✓</span>
                      <span className="text-gray-700">Advanced Analytics</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="mr-2 text-green-600">✓</span>
                      <span className="text-gray-700">Custom Dashboards</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Link
                      href="/edgebi"
                      className="block"
                    >
                      <Button className="w-full">Read More</Button>
                    </Link>
                    <Link
                      href="/edgebi"
                      className="block"
                    >
                      <Button
                        variant="outline"
                        className="w-full"
                      >
                        Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className=" py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 md:grid-cols-3">
              <Card>
                <CardContent className="pt-6">
                  <p className="mb-4 text-lg font-semibold text-gray-800">
                    "Best choice for MRP and project management software"
                  </p>
                  <p className="mb-4 text-gray-600">– Sleepmaster Ltd</p>
                  <Link href="/sleepmaster-ltd">
                    <Button variant="outline">Read More</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <p className="mb-4 text-lg font-semibold text-gray-800">
                    "Manufacturing scheduling software with fantastic support"
                  </p>
                  <p className="mb-4 text-gray-600">– Cook Compression</p>
                  <Link href="/cook-compression">
                    <Button variant="outline">Read More</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <p className="mb-4 text-lg font-semibold text-gray-800">
                    "Easy ERP add-on for manufacturing resource planning"
                  </p>
                  <p className="mb-4 text-gray-600">– Incon Incorporated</p>
                  <Link href="/incon-incorporate">
                    <Button variant="outline">Read More</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className=" pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <Card>
              <CardContent className="pt-8">
                <h2 className="mb-4 text-3xl font-bold">
                  Want to get your production in the groove?
                </h2>
                <p className="mb-6 text-xl text-gray-700">
                  Watch this classic video and get your operations movin' and
                  groovin' today!
                </p>
                <Link href="/videos">
                  <Button
                    size="lg"
                    className="text-lg"
                  >
                    Watch Video
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Awards and Recognition */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
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
      </section>
    </div>
  );
}
