import * as React from 'react';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';

export default function OperationsManagerAcceptsaPage(): React.JSX.Element {
  return (
    <div className="min-h-screen text-[18px]">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Operations Manager: ACCEPTSA
            </h1>
            <p className="text-gray-700">
              Acceptance Sampling for Quality Control
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl space-y-8">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">
                Acceptance Sampling (ACCEPTSA)
              </h2>
              <p className="mb-4 leading-relaxed text-gray-700">
                Acceptance sampling is a procedure for screening lots of
                incoming material. We decide whether to accept or reject the
                entire lot based on the results of a sample. A sampling plan
                is defined by two parameters: sample size and acceptance
                number. The acceptance number is the maximum number of
                allowable defects in the sample. If the sample contains this
                number or fewer defects, the lot is accepted without further
                inspection. If the sample contains more than the maximum
                number of defects, the lot is rejected and a 100% inspection
                is conducted.
              </p>
              <p className="leading-relaxed text-gray-700">
                The sample size and acceptance number determine the risks
                faced by the producer and consumer of the lot. The producer's
                risk is the probability that a "good" lot will be rejected by
                the sampling process. The consumer's risk is the probability
                that a "bad" lot will be accepted. Using the binomial
                distribution, the ACCEPTSA worksheet computes the producer's
                and consumer's risks, given the lot size, sample size,
                acceptance number, AQL, and LTPD.
              </p>
            </div>

            {/* Awards Banner */}
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-8 text-center">
                <h2 className="mb-6 text-2xl font-bold text-slate-900">
                  CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
                </h2>
                <Image
                  src="/images/Edgebic/2022-07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                  alt="Collection of industry and business awards logos"
                  width={1024}
                  height={128}
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
