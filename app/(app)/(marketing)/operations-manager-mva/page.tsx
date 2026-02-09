import * as React from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Multivariate Analysis for Operations',
  description:
    'MVA provides PCA, Factor Analysis, Cluster Analysis, Discriminant Analysis, and MANOVA for complex multi-variable data analysis.',
  path: '/operations-manager-mva',
  keywords: 'multivariate analysis, PCA, factor analysis, cluster analysis, discriminant analysis, MANOVA'
});

export default function OperationsManagerMVAPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-6 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <div className="mb-6">
            </div>
            <h1 className="mb-6 text-4xl font-bold md:text-6xl">
              Operations Manager: MVA
            </h1>
            <p className="mb-6 text-xl md:text-2xl">
              Multivariate Analysis for Operations Management
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

      {/* Main Content */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-6 text-center text-3xl font-bold">
              Multivariate Analysis (MVA)
            </h2>

            <Card>
              <CardContent className="p-8">
                <p className="mb-4 text-lg leading-relaxed">
                  Multivariate Analysis (MVA) provides powerful statistical
                  tools for analyzing datasets with multiple variables
                  simultaneously. Unlike univariate analysis that examines one
                  variable at a time, MVA reveals complex relationships,
                  patterns, and structures in your data that would remain hidden
                  in single-variable analysis. This comprehensive approach
                  enables operations managers to make data-driven decisions
                  based on the interaction of multiple factors affecting
                  business performance.
                </p>
                <p className="text-lg leading-relaxed">
                  Operations Manager's MVA module includes Principal Component
                  Analysis (PCA), Factor Analysis, Cluster Analysis,
                  Discriminant Analysis, and MANOVA. These techniques help
                  reduce data dimensionality, identify underlying patterns,
                  segment customers or products, classify observations, and
                  compare groups across multiple variables. Whether optimizing
                  manufacturing processes, analyzing customer behavior, or
                  improving quality control, MVA delivers actionable insights
                  from complex, multidimensional data.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
