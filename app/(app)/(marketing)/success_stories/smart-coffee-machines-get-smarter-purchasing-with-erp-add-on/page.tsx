import type { Metadata } from 'next';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title:
    'Smart Coffee Machines Get Smarter Purchasing with ERP Add-On | User Solutions',
  description:
    'See how smart coffee machine manufacturers optimized purchasing decisions with integrated ERP add-on solutions.',
  openGraph: {
    title:
      'Smart Coffee Machines Get Smarter Purchasing with ERP Add-On | User Solutions',
    description:
      'See how smart coffee machine manufacturers optimized purchasing decisions with integrated ERP add-on solutions.',
    url: 'https://www.usersolutions.com/success-stories/smart-coffee-machines-get-smarter-purchasing-with-erp-add-on'
  }
};

export default function SmartCoffeeMachinesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-rose-50 via-white to-red-50 py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <Badge
              variant="outline"
              className="mb-6 h-8 rounded-full px-4 text-sm font-medium shadow-sm"
            >
              Success Story
            </Badge>
            <h1 className="mb-6 bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl">
              Smart Coffee Machines Get Smarter Purchasing with ERP Add-On
            </h1>
            <p className="mx-auto mb-4 max-w-3xl text-xl text-gray-700">
              Learn how ERP add-ons enhanced purchasing intelligence for smart
              coffee machine production.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <div className="prose prose-lg mx-auto">
              <p className="text-gray-700">
                The big problem we have is knowing exactly which raw material
                was needed to be purchased (qty & date) based on BOM, minimum
                quantity to order and basic costing.
              </p>

              <p className="text-gray-700">
                The biggest benefit with using Resource Manager-DB is the
                increased efficiency in purchasing department.
              </p>

              <p className="text-gray-700">
                We chose Resource Manager -DB because it was the only affordable
                program available where we could link via to our existing ERP
                system and have MRP calculated.
              </p>

              <p className="text-gray-700">
                <strong>Claude R.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Banner */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card className="rounded-xl border bg-gradient-to-br from-blue-50 to-blue-100 text-card-foreground shadow">
              <CardContent className="p-8 text-center">
                <h2 className="mb-6 text-2xl font-bold text-slate-900">
                  CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
                </h2>
                <div className="relative mx-auto h-auto w-full max-w-4xl">
                  <Image
                    src="https://www.usersolutions.com/wp-content/uploads/2022/07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
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
