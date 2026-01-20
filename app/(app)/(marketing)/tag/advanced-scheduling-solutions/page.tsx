import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Advanced Scheduling Solutions',
  description:
    'Explore articles about advanced scheduling solutions for modern manufacturing and supply chain management.'
};

export default function AdvancedSchedulingSolutionsTagPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-6">
      {/* Hero Section */}
      <div className="mb-6 text-center">
        <h1 className="mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
          Advanced Scheduling Solutions
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Explore articles about advanced scheduling solutions for modern
          manufacturing and supply chain management.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="mb-6">
        <Card className="overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg">
          <Link
            href="/enhancing-supply-chain-visibility-through-advanced-scheduling-solutions"
            className="block transition-all duration-300"
          >
            <div className="relative h-96 w-full overflow-hidden">
              <Image
                src="/images/Edgebic/2022-09/usersolutionsimage-300x211.png"
                alt="Businessman working on computer in office setting"
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
                unoptimized
              />
            </div>
            <CardContent className="p-6">
              <h2 className="mb-3 text-2xl font-bold text-slate-900">
                Enhancing Supply Chain Visibility through Advanced Scheduling
                Solutions
              </h2>
              <p className="text-sm text-muted-foreground">
                Supply Chain Visibility Solutions for Modern Manufacturers Are
                your supply chain operations as transparent and efficient as
                they should be? In today's fast-paced market, full visibility is
                essential. Manufacturers must optimize operations and respond
                quickly to changes. At User Solutions, Inc., we deliver advanced
                scheduling solutions and ERP software that improve visibility
                across your supply […]
              </p>
            </CardContent>
          </Link>
        </Card>
      </div>
    </div>
  );
}
