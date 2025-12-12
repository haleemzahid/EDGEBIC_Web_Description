import * as React from 'react';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProModelPage(): React.JSX.Element {
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
                SIMULATION SOFTWARE
              </Badge>
            </div>
            <h1 className="mb-6 text-4xl font-bold md:text-6xl">ProModel</h1>
            <p className="mb-6 text-xl md:text-2xl">
              Advanced discrete event simulation for manufacturing and
              operations
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

      {/* ProModel Overview */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-center text-3xl">
                  ProModel Simulation Platform
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  ProModel is a powerful discrete event simulation software
                  designed for manufacturing systems, logistics operations, and
                  business process modeling. With over 25 years of industry
                  leadership, ProModel provides comprehensive tools for modeling
                  complex systems, analyzing performance, and optimizing
                  operations before implementation.
                </p>

                <p className="text-lg leading-relaxed text-muted-foreground">
                  From automotive assembly lines to healthcare facilities,
                  ProModel enables organizations to reduce risk, improve
                  efficiency, and make data-driven decisions through accurate
                  simulation modeling and analysis.
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
                  Case Study: Semiconductor Manufacturing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    The Challenge
                  </h3>
                  <p className="mb-4 text-muted-foreground">
                    ChipTech Manufacturing needed to evaluate the impact of
                    introducing new product lines in their semiconductor
                    fabrication facility. The complex re-entrant flow, multiple
                    process steps, and shared resources made it difficult to
                    predict system performance and identify potential
                    bottlenecks using traditional analysis methods.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold text-green-600">
                    The Solution
                  </h3>
                  <p className="mb-4 text-muted-foreground">
                    Using ProModel simulation software, the engineering team
                    built a detailed model of their fab operations including all
                    process steps, equipment, operators, and material handling
                    systems. They simulated various product mix scenarios and
                    capacity expansion alternatives to optimize performance.
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
                          30% increase in fab throughput
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-3 size-3 rounded-full bg-blue-500" />
                        <span className="text-sm">
                          25% reduction in cycle time
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-3 size-3 rounded-full bg-purple-500" />
                        <span className="text-sm">
                          40% improvement in equipment utilization
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="mr-3 size-3 rounded-full bg-orange-500" />
                        <span className="text-sm">
                          $10M capital investment savings
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-3 size-3 rounded-full bg-red-500" />
                        <span className="text-sm">
                          50% reduction in WIP inventory
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-3 size-3 rounded-full bg-teal-500" />
                        <span className="text-sm">
                          Optimal product mix identified
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
              ProModel Key Features
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    Graphical Modeling
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Intuitive drag-and-drop interface for building complex
                    simulation models
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    Animation & Visualization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Real-time 2D and 3D animation for model validation and
                    presentation
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    Statistical Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Comprehensive output analysis with confidence intervals and
                    reports
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Optimization</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Built-in optimization tools for finding best system
                    configurations
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    Data Integration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Import data from Excel, databases, and other enterprise
                    systems
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    Scenario Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Compare multiple scenarios and perform sensitivity analysis
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="bg-muted/50 py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-6 text-center text-3xl font-bold text-foreground">
              Industry Applications
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">
                    Manufacturing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Production line optimization</li>
                    <li>• Capacity planning and analysis</li>
                    <li>• Lean manufacturing implementation</li>
                    <li>• Equipment utilization studies</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-green-600">
                    Logistics & Supply Chain
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Warehouse design and optimization</li>
                    <li>• Distribution center operations</li>
                    <li>• Transportation network analysis</li>
                    <li>• Inventory management strategies</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-purple-600">
                    Healthcare
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Emergency department flow</li>
                    <li>• Operating room scheduling</li>
                    <li>• Patient flow optimization</li>
                    <li>• Resource capacity planning</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">
                    Service Operations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Call center optimization</li>
                    <li>• Banking service delivery</li>
                    <li>• Restaurant operations</li>
                    <li>• Government service systems</li>
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
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
