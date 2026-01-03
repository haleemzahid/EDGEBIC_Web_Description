import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Cook Compression | User Solutions',
  description:
    'Cook Compression shares their exceptional experience with User Solutions world-class support and service.',
  openGraph: {
    title: 'Cook Compression | User Solutions',
    description:
      'Cook Compression shares their exceptional experience with User Solutions world-class support and service.',
    url: 'https://www.usersolutions.com/cook-compression/'
  }
};

export default function CookCompressionPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-6 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              Cook Compression
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <Image
                src="/images/Edgebic/2022-07/cook.jpg"
                alt="Cook Compression"
                width={300}
                height={200}
                className="h-auto"
                unoptimized
              />
            </div>

            {/* Testimonial */}
            <div className="space-y-6">
              <p className="leading-relaxed text-gray-700">
                I feel thankful. For cause, I am dubious when dealing with
                enterprises and guarantees by long distance; more so when
                considering the promises made by others for software solutions,
                sight unseen. My experience with User Solutions, Inc. has set a
                higher standard for my internet business dealings and software
                vendor expertise. Your premier product is in support and
                service. Your software reflects this. The Product and Sales
                personnel at User Solutions, Inc. are world class in response,
                knowledge, and support of your product line in meeting my
                company's need. Your Company's faithfulness has been high in
                fidelity and your follow through timely. I will whole heartedly
                recommend User Solutions as I see need in my business community.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
