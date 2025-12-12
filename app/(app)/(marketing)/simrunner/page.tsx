import * as React from 'react';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SimRunnerPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-6 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <div className="mb-6">
              <Badge
                variant="outline"
                className="h-8 rounded-full border-white/20 bg-white/10 px-3 text-sm font-medium text-white shadow-sm"
              >
                SIMULATION OPTIMIZATION
              </Badge>
            </div>
            <h1 className="mb-6 text-4xl font-bold md:text-6xl">SimRunner</h1>
            <p className="mb-6 text-xl md:text-2xl">
              Simulation optimization and experimentation for breakthrough
              performance
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

      {/* SimRunner Overview */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-center text-3xl">
                  Simulation Optimization & Experimentation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  SimRunner is an advanced simulation optimization tool that
                  automatically searches for the best system configuration by
                  intelligently exploring the solution space. Using
                  sophisticated optimization algorithms, it finds optimal
                  parameter settings that maximize or minimize specified
                  performance measures in your simulation models.
                </p>

                <p className="text-lg leading-relaxed text-muted-foreground">
                  From manufacturing systems to service operations, SimRunner
                  transforms simulation from analysis to optimization, enabling
                  organizations to discover breakthrough performance
                  improvements that would be impossible to find through manual
                  experimentation.
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
                  Case Study: Distribution Center Optimization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    The Challenge
                  </h3>
                  <p className="mb-4 text-muted-foreground">
                    LogisticsPro operated a complex distribution center with
                    hundreds of controllable parameters including staffing
                    levels, equipment allocation, routing policies, and
                    scheduling rules. Manual optimization was impractical due to
                    the vast number of possible combinations and their complex
                    interactions.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold text-green-600">
                    The Solution
                  </h3>
                  <p className="mb-4 text-muted-foreground">
                    Using SimRunner with their ProModel simulation, the
                    operations team defined optimization objectives (minimize
                    cost while maintaining service levels) and specified
                    controllable factors. SimRunner automatically ran thousands
                    of simulation experiments to find the optimal configuration.
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
                          35% reduction in operating costs
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-3 size-3 rounded-full bg-blue-500" />
                        <span className="text-sm">
                          45% improvement in throughput
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-3 size-3 rounded-full bg-purple-500" />
                        <span className="text-sm">
                          98% service level achievement
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="mr-3 size-3 rounded-full bg-orange-500" />
                        <span className="text-sm">
                          50% reduction in optimization time
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-3 size-3 rounded-full bg-red-500" />
                        <span className="text-sm">
                          Optimal parameter identification
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-3 size-3 rounded-full bg-teal-500" />
                        <span className="text-sm">
                          $5M annual savings identified
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
              Optimization Features
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    Evolutionary Optimization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Advanced genetic algorithms for finding global optima in
                    complex solution spaces
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    Neural Network Metamodels
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    AI-powered metamodels to accelerate optimization and reduce
                    simulation runs
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    Multi-Objective Optimization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Simultaneous optimization of multiple conflicting objectives
                    with Pareto frontiers
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    Design of Experiments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Statistical experimental design for efficient factor
                    screening and analysis
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    Sensitivity Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Identify critical factors and their impact on system
                    performance
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    Automated Reporting
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Comprehensive optimization reports with statistical analysis
                    and recommendations
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Optimization Methods */}
      <section className="bg-muted/50 py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-6 text-center text-3xl font-bold text-foreground">
              Optimization Methodologies
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">
                    Evolutionary Algorithms
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Genetic algorithms for global optimization</li>
                    <li>• Evolution strategies for continuous variables</li>
                    <li>• Particle swarm optimization</li>
                    <li>• Adaptive parameter control</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-green-600">
                    Statistical Methods
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Response surface methodology</li>
                    <li>• Factorial and fractional designs</li>
                    <li>• Central composite designs</li>
                    <li>• Taguchi methods</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-purple-600">
                    Machine Learning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Neural network surrogate models</li>
                    <li>• Gaussian process optimization</li>
                    <li>• Bayesian optimization</li>
                    <li>• Active learning strategies</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">
                    Hybrid Approaches
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Multi-method optimization strategies</li>
                    <li>• Adaptive algorithm selection</li>
                    <li>• Parallel optimization execution</li>
                    <li>• Constraint handling techniques</li>
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
              Optimization Applications
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">
                    Manufacturing Systems
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Production line balancing</li>
                    <li>• Inventory level optimization</li>
                    <li>• Maintenance scheduling</li>
                    <li>• Quality control parameter tuning</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-green-600">
                    Supply Chain & Logistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Distribution network design</li>
                    <li>• Warehouse layout optimization</li>
                    <li>• Transportation routing</li>
                    <li>• Demand-supply matching</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-purple-600">
                    Service Operations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Staffing level optimization</li>
                    <li>• Service capacity planning</li>
                    <li>• Queue management strategies</li>
                    <li>• Resource allocation policies</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">
                    Healthcare Systems
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Patient flow optimization</li>
                    <li>• Operating room scheduling</li>
                    <li>• Emergency department design</li>
                    <li>• Resource utilization maximization</li>
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
                  src="https://www.usersolutions.com/wp-content/uploads/2022/07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
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
