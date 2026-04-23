import { createArticleMetadata } from '@/lib/seo/metadata';
import Image from 'next/image';


import { Card, CardContent } from '@/components/ui/card';

export const metadata = createArticleMetadata({
  title:
    'Smart Coffee Machines and ERP Add-On',
  description:
    'See how smart coffee machine manufacturers optimized purchasing decisions with integrated ERP add-on solutions.',
  path: '/success-stories/smart-coffee-machines-get-smarter-purchasing-with-erp-add-on',
  keywords: 'smart coffee machines, ERP add-on, purchasing optimization, RMDB, manufacturing',
});

export default function SmartCoffeeMachinesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-rose-50 via-white to-red-50 py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
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
              <h2 className="text-2xl font-bold text-gray-900">The Challenge</h2>
              <p className="text-gray-700">
                For manufacturers of smart coffee machines, managing raw material
                procurement is a constant challenge. With complex bills of materials
                spanning electronic components, mechanical parts, and specialized
                brewing elements, the purchasing team needed precise visibility into
                what to order, when to order it, and how much to buy.
              </p>

              <p className="text-gray-700">
                &ldquo;The big problem we have is knowing exactly which raw material
                was needed to be purchased (qty &amp; date) based on BOM, minimum
                quantity to order and basic costing,&rdquo; explained Claude R.,
                highlighting the daily frustration of operating without integrated
                material requirements planning.
              </p>

              <h2 className="text-2xl font-bold text-gray-900">The Solution</h2>
              <p className="text-gray-700">
                The company turned to Resource Manager-DB (RMDB) from User Solutions
                as an affordable MRP add-on that could integrate directly with their
                existing ERP system. Unlike standalone planning tools, RMDB connected
                seamlessly with the company&apos;s current software infrastructure,
                enabling automatic MRP calculations without replacing any existing
                systems.
              </p>

              <p className="text-gray-700">
                &ldquo;We chose Resource Manager-DB because it was the only affordable
                program available where we could link to our existing ERP
                system and have MRP calculated,&rdquo; said Claude R. The ability to
                leverage existing ERP data while adding advanced purchasing intelligence
                made the decision straightforward.
              </p>

              <h2 className="text-2xl font-bold text-gray-900">Key Results</h2>
              <p className="text-gray-700">
                After implementing Resource Manager-DB, the purchasing department
                experienced a significant increase in efficiency. The team could now
                see exactly which materials were needed, in what quantities, and by
                what dates, all calculated automatically from production schedules and
                bills of materials.
              </p>

              <p className="text-gray-700">
                &ldquo;The biggest benefit with using Resource Manager-DB is the
                increased efficiency in purchasing department,&rdquo; confirmed Claude R.
                By eliminating manual calculations and guesswork, the smart coffee
                machine manufacturer could focus on optimizing supplier relationships
                and reducing lead times rather than tracking spreadsheets.
              </p>

              <p className="text-gray-700">
                <strong>&mdash; Claude R.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
