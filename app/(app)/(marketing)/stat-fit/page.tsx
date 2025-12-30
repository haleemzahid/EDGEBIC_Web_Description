import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';


import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function StatFitPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-6 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <div className="mb-6">
            </div>
            <h1 className="mb-6 text-4xl font-bold md:text-6xl">Stat::Fit</h1>
            <p className="mb-6 text-xl md:text-2xl">
              Statistical distribution fitting and data analysis for accurate
              modeling
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/contact-us">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Request Free Product
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stat::Fit Overview */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-center text-3xl">
                  Statistical Distribution Fitting & Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Stat::Fit is a powerful statistical software application
                  designed to help analysts, engineers, and researchers identify
                  the best probability distributions for their data sets. By
                  providing comprehensive distribution fitting capabilities, it
                  enables accurate modeling and simulation of real-world
                  processes and systems.
                </p>

                <p className="text-lg leading-relaxed text-muted-foreground">
                  From quality control to risk analysis, Stat::Fit provides the
                  statistical foundation necessary for building reliable
                  simulation models, conducting accurate forecasts, and making
                  data-driven decisions with confidence.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="bg-muted/50 py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  Case Study: Manufacturing Quality Control
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    The Challenge
                  </h3>
                  <p className="mb-4 text-muted-foreground">
                    PrecisionTech Manufacturing needed to improve their quality
                    control processes by accurately modeling machine performance
                    variations and defect rates. Their existing statistical
                    analysis was based on assumptions rather than data-driven
                    distribution fitting, leading to inaccurate predictions and
                    suboptimal quality control decisions.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold text-green-600">
                    The Solution
                  </h3>
                  <p className="mb-4 text-muted-foreground">
                    Using Stat::Fit, the quality engineering team analyzed
                    historical production data to identify the best-fitting
                    probability distributions for machine cycle times, defect
                    occurrences, and measurement variations. These distributions
                    were then used in their simulation models and statistical
                    process control systems.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold text-purple-600">
                    Results Achieved
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="mr-3 size-3 rounded-full bg-green-500" />
                        <span className="text-sm">
                          85% improvement in prediction accuracy
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-3 size-3 rounded-full bg-blue-500" />
                        <span className="text-sm">
                          40% reduction in false alarms
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-3 size-3 rounded-full bg-purple-500" />
                        <span className="text-sm">
                          60% improvement in defect detection
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="mr-3 size-3 rounded-full bg-orange-500" />
                        <span className="text-sm">
                          30% reduction in quality costs
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-3 size-3 rounded-full bg-red-500" />
                        <span className="text-sm">
                          25% increase in overall equipment effectiveness
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-3 size-3 rounded-full bg-teal-500" />
                        <span className="text-sm">
                          Data-driven quality decisions
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-6 text-center text-3xl font-bold text-foreground">
              Statistical Analysis Features
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    Distribution Fitting
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Automatic fitting of 40+ probability distributions with
                    goodness-of-fit tests
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    Goodness-of-Fit Tests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Chi-square, Kolmogorov-Smirnov, and Anderson-Darling
                    statistical tests
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    Data Visualization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Histograms, Q-Q plots, P-P plots, and probability density
                    functions
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    Parameter Estimation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Maximum likelihood estimation and method of moments
                    parameter fitting
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    Random Number Generation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Generate random variates from fitted distributions for
                    simulation models
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    Export Capabilities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Export results to Excel, simulation software, and
                    statistical packages
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Distributions */}
      <section className="bg-muted/50 py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-6 text-center text-3xl font-bold text-foreground">
              Supported Probability Distributions
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">
                    Continuous Distributions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Normal, Lognormal, Exponential</li>
                    <li>• Weibull, Gamma, Beta</li>
                    <li>• Uniform, Triangular, Erlang</li>
                    <li>• Chi-square, F-distribution, t-distribution</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-green-600">
                    Discrete Distributions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Poisson, Binomial, Geometric</li>
                    <li>• Negative Binomial, Hypergeometric</li>
                    <li>• Discrete Uniform, Bernoulli</li>
                    <li>• Custom empirical distributions</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-purple-600">
                    Specialized Distributions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Johnson family distributions</li>
                    <li>• Pearson family distributions</li>
                    <li>• Extreme value distributions</li>
                    <li>• Reliability distributions</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">
                    Custom Distributions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• User-defined probability functions</li>
                    <li>• Empirical data distributions</li>
                    <li>• Piecewise linear distributions</li>
                    <li>• Mixture distributions</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-6 text-center text-3xl font-bold text-foreground">
              Application Areas
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">
                    Quality Control & Six Sigma
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Process capability analysis</li>
                    <li>• Statistical process control</li>
                    <li>• Defect rate modeling</li>
                    <li>• Measurement system analysis</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-green-600">
                    Reliability Engineering
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Failure time analysis</li>
                    <li>• Maintenance interval optimization</li>
                    <li>• Life data analysis</li>
                    <li>• Accelerated testing analysis</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-purple-600">
                    Risk Analysis & Finance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Monte Carlo simulation inputs</li>
                    <li>• Value-at-Risk calculations</li>
                    <li>• Insurance claims modeling</li>
                    <li>• Portfolio risk assessment</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">
                    Operations Research
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Simulation model validation</li>
                    <li>• Queuing system analysis</li>
                    <li>• Inventory level modeling</li>
                    <li>• Demand forecasting</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-8 text-center">
                <h3 className="mb-6 text-2xl font-bold text-slate-900">
                  CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
                </h3>
                <Image
                  src="/images/Edgebic/2022-07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                  alt="Collection of industry and business awards logos"
                  width={1024}
                  height={128}
                  className="mx-auto h-auto max-w-full"
                  unoptimized
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
