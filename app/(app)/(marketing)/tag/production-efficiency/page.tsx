import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';


import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Production Efficiency | User Solutions',
  description:
    'Discover articles about production efficiency and lean manufacturing principles.',
  openGraph: {
    title: 'Production Efficiency | User Solutions',
    description:
      'Discover articles about production efficiency and lean manufacturing principles.',
    url: 'https://www.usersolutions.com/tag/production-efficiency'
  }
};

export default function ProductionEfficiencyTagPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-emerald-50 py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl">
              Production Efficiency
            </h1>
            <p className="mb-4 text-xl text-gray-700">
              Articles about production efficiency and lean manufacturing
              principles
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-6">
        <div className="mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            {/* Article */}
            <Card className="mb-6 overflow-hidden transition-shadow hover:shadow-lg">
              <Link
                href="/lean-manufacturing-solutions"
                className="block transition-all duration-300"
              >
                <div className="relative h-96 w-full overflow-hidden">
                  <Image
                    src="/images/Edgebic/2024-02/sdf.jpg"
                    alt="Illustration of a worker with construction tools icons"
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-110"
                    unoptimized
                  />
                </div>
                <CardContent className="p-8">
                  <h2 className="mb-4 text-3xl font-bold text-gray-900 hover:text-green-600">
                    Implementing Lean Manufacturing Principles for Improved
                    Production Efficiency
                  </h2>
                  <p className="mb-6 text-lg leading-relaxed text-gray-700">
                    Is your manufacturing process as streamlined and
                    cost-effective as it could be? In today's competitive
                    landscape, companies are constantly seeking methods to
                    enhance efficiency and reduce waste. Lean manufacturing
                    principles have emerged as a cornerstone in achieving these
                    goals. At User Solutions, Inc., we specialize in integrating
                    these principles with advanced resource management solutions
                    to […]
                  </p>
                  <span className="font-semibold text-green-600 hover:text-green-800">
                    Read More →
                  </span>
                </CardContent>
              </Link>
            </Card>

            {/* Awards Banner */}
            <Card className="mt-6 rounded-xl border bg-gradient-to-br from-blue-50 to-blue-100 text-card-foreground shadow">
              <CardContent className="p-8 text-center">
                <h2 className="mb-6 text-2xl font-bold text-slate-900">
                  CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
                </h2>
                <div className="relative mx-auto h-auto w-full max-w-4xl">
                  <Image
                    src="/images/Edgebic/2022-07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                    alt="Collection of industry and business awards logos"
                    width={1024}
                    height={128}
                    className="mx-auto h-auto max-w-full"
                    unoptimized
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
