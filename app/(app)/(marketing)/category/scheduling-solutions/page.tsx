import type { Metadata } from 'next';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Scheduling Solutions ',
  description:
    'Explore advanced scheduling solutions for supply chain and manufacturing optimization.',
  openGraph: {
    title: 'Scheduling Solutions ',
    description:
      'Explore advanced scheduling solutions for supply chain and manufacturing optimization.',
    url: 'https://www.usersolutions.com/category/scheduling-solutions'
  }
};

export default function SchedulingSolutionsCategoryPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-white to-emerald-50 py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-6 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl">
              Scheduling Solutions
            </h1>
            <p className="mb-4 text-xl text-gray-700">
              Discover articles and resources about advanced scheduling
              solutions
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
              <div className="relative h-96 w-full overflow-hidden">
                <Image
                  src="/images/Edgebic/2022-09/usersolutionsimage-1024x719.png"
                  alt="Businessman working on computer in office setting"
                  fill
                  className="object-cover transition-transform hover:scale-105"
                  unoptimized
                />
              </div>
              <CardContent className="p-8">
                <h2 className="mb-4 text-3xl font-bold text-gray-900 hover:text-green-600">
                  <a href="/enhancing-supply-chain-visibility-through-advanced-scheduling-solutions">
                    Enhancing Supply Chain Visibility through Advanced
                    Scheduling Solutions
                  </a>
                </h2>
                <p className="mb-6 text-lg leading-relaxed text-gray-700">
                  Supply Chain Visibility Solutions for Modern Manufacturers Are
                  your supply chain operations as transparent and efficient as
                  they should be? In today&apos;s fast-paced market, full
                  visibility is essential. Manufacturers must optimize
                  operations and respond quickly to changes. At User Solutions,
                  Inc., we deliver advanced scheduling solutions and ERP
                  software that improve visibility across your supply […]
                </p>
                <a
                  href="/enhancing-supply-chain-visibility-through-advanced-scheduling-solutions"
                  className="font-semibold text-green-600 hover:text-green-800"
                >
                  Read More →
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
