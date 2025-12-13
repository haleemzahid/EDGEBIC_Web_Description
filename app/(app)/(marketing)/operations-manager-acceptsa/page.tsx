import * as React from 'react';
import Image from 'next/image';


import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function OperationsManagerAcceptsaPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-6 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <div className="mb-6">
            </div>
            <h1 className="mb-6 text-4xl font-bold md:text-6xl">
              Operations Manager: ACCEPTSA
            </h1>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Request Free Product
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* AcceptSA Overview */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-center text-3xl">
                  Acceptance Sampling (ACCEPTSA)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg leading-relaxed text-muted-foreground">
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

                <p className="text-lg leading-relaxed text-muted-foreground">
                  The sample size and acceptance number determine the risks
                  faced by the producer and consumer of the lot. The producer's
                  risk is the probability that a "good" lot will be rejected by
                  the sampling process. Lots are defined as good if they contain
                  no more than a certain level of defectives called the
                  acceptable quality level (AQL). The consumer's risk is the
                  probability that a "bad" lot will be accepted. Lots are called
                  bad if they contain more than a certain level of defectives
                  called the lot tolerance percent defective (LTPD). Using the
                  binomial distribution, the ACCEPTSA worksheet computes the
                  producer's and consumer's risks, given the lot size, sample
                  size, acceptance number, AQL, and LTPD.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-8 text-center">
                <h2 className="mb-6 text-2xl font-bold text-foreground">
                  CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
                </h2>
                <div className="flex justify-center">
                  <Image
                    src="https://www.usersolutions.com/wp-content/uploads/2022/07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                    alt="Collection of industry and business awards logos"
                    width={1024}
                    height={128}
                    className="h-auto max-w-full rounded-lg shadow-md"
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
