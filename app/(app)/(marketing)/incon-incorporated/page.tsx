import { createArticleMetadata } from '@/lib/seo/metadata';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';
import { RelatedProducts } from '@/components/marketing/sections/related-products';

export const metadata = createArticleMetadata({
  title: 'INCON Incorporated',
  description:
    'Hi-tech Connector Mfr Accurately Schedules Labor with MRP Add-On.',
  path: '/incon-incorporated',
  keywords: 'INCON Incorporated, hi-tech connector, MRP add-on, labor scheduling, production scheduling case study'
});

export default function InconIncorporatedPage() {
  return (
    <div className="">
      {/* Hero Section */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Hi-tech Connector Mfr Accurately Schedules Labor with MRP Add-On
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section>
        <div className="mx-auto max-w-7xl">
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <Image
              src="/images/Edgebic/2022-10/logo003-58c6bad38b32e.jpg"
              alt="INCON"
              width={230}
              height={153}
              className="h-auto"
              unoptimized
            />
          </div>

          {/* Testimonial */}
          <div className="mt-6">
            <p className="leading-relaxed text-gray-700">
              For awhile, we had been seeking better scheduling information out
              of our system. Exact Software recommended Resource Manager-DB from
              User Solutions. We found that not only was the product quick to
              integrate with our Macola system, it also integrated easily with
              our current custom labor tracking system and provides the needed
              visibility for us to plan labor more accurately.
            </p>
            <p className="leading-relaxed text-gray-700">
              Finally, we can see in advance how to staff the plant for most
              efficient scheduling and respond accurately to our customers with
              realistic promise dates.
            </p>
            <p className="font-semibold text-gray-900">Ted Schultz</p>
          </div>
        </div>
      </section>
      <RelatedProducts storySlug="/success-stories/hi-tech-connector-mfr-accurately-schedules-labor-with-mrp-add-on" />
    </div>
  );
}
