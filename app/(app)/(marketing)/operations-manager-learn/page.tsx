import * as React from 'react';
import Image from 'next/image';


import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LearnPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-6 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <div className="mb-6">
            </div>
            <h1 className="mb-6 text-4xl font-bold md:text-6xl">
              Operations Manager: LEARN
            </h1>
            <p className="mb-6 text-xl md:text-2xl">
              Learning curves - Predicting reduction in direct labor hours
            </p>
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

      {/* Content Section */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-3xl">
                  Learning curves (LEARN)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  The learning curve is a widely-used model that predicts a
                  reduction in direct labor hours or costs per unit as
                  cumulative production increases.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Award Section */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card className="overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader>
                <CardTitle className="text-center text-2xl text-blue-900">
                  CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center p-6">
                <div className="w-full max-w-4xl">
                  <Image
                    alt="Collection of industry and business awards logos"
                    className="h-auto w-full"
                    height={128}
                    src="https://www.usersolutions.com/wp-content/uploads/2022/07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                    width={1024}
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
