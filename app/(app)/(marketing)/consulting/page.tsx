import * as React from 'react';
import Image from 'next/image';


import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ConsultingPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-6 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <div className="mb-6">
            </div>
            <h1 className="mb-6 text-4xl font-bold md:text-6xl">
              Consulting Services
            </h1>
            <p className="mb-6 text-xl md:text-2xl">
              Expert simulation consulting to accelerate your optimization and
              decision-making success
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Consulting Overview */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-center text-3xl">
                  Professional Simulation Consulting Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Our expert consulting team brings decades of simulation
                  modeling experience to help you achieve breakthrough results
                  in operational efficiency, cost reduction, and strategic
                  decision-making. From project kickoff to implementation
                  success, we provide the expertise and guidance needed to
                  maximize your simulation investment.
                </p>

                <p className="text-lg leading-relaxed text-muted-foreground">
                  Whether you need complete project outsourcing, specialized
                  expertise for complex challenges, or strategic guidance for
                  simulation program development, our consultants deliver proven
                  methodologies and industry best practices tailored to your
                  unique requirements.
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
                  Case Study: Healthcare System Transformation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    The Challenge
                  </h3>
                  <p className="mb-4 text-muted-foreground">
                    MedCenter Health System faced critical capacity constraints
                    across multiple facilities with patient wait times exceeding
                    industry standards. They needed to optimize patient flow,
                    reduce bottlenecks, and improve resource utilization while
                    maintaining quality of care within budget constraints.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold text-green-600">
                    The Solution
                  </h3>
                  <p className="mb-4 text-muted-foreground">
                    Our consulting team conducted comprehensive analysis across
                    emergency departments, surgical suites, and inpatient units.
                    We developed detailed simulation models, performed extensive
                    validation with clinical staff, and identified optimal
                    staffing patterns, scheduling policies, and resource
                    allocation strategies.
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
                          45% reduction in average wait times
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-3 size-3 rounded-full bg-blue-500" />
                        <span className="text-sm">
                          30% increase in patient throughput
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-3 size-3 rounded-full bg-purple-500" />
                        <span className="text-sm">
                          25% improvement in resource utilization
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="mr-3 size-3 rounded-full bg-orange-500" />
                        <span className="text-sm">
                          95% patient satisfaction achievement
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-3 size-3 rounded-full bg-red-500" />
                        <span className="text-sm">$8M annual cost savings</span>
                      </div>
                      <div className="flex items-center">
                        <div className="mr-3 size-3 rounded-full bg-teal-500" />
                        <span className="text-sm">
                          Award-winning implementation
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

      {/* Consulting Services */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-6 text-center text-3xl font-bold text-foreground">
              Consulting Services
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    Project Development
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Complete simulation project execution from concept to
                    implementation
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    Strategic Planning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Long-term simulation program development and technology
                    roadmaps
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    Model Validation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Expert review and validation of existing simulation models
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    Optimization Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Advanced optimization studies and performance improvement
                    identification
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    Technology Integration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    System integration with ERP, MES, and other enterprise
                    platforms
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    Change Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Organizational transformation and adoption support
                    strategies
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Consulting Approach */}
      <section className="bg-muted/50 py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-6 text-center text-3xl font-bold text-foreground">
              Our Consulting Approach
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">
                    Discovery & Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Comprehensive system analysis</li>
                    <li>• Stakeholder requirement gathering</li>
                    <li>• Current state documentation</li>
                    <li>• Opportunity identification</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-green-600">
                    Solution Design
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Custom methodology development</li>
                    <li>• Technology architecture planning</li>
                    <li>• Implementation roadmap creation</li>
                    <li>• Risk mitigation strategies</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-purple-600">
                    Implementation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Agile project execution</li>
                    <li>• Iterative model development</li>
                    <li>• Continuous validation testing</li>
                    <li>• Stakeholder engagement</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">
                    Knowledge Transfer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Team training and certification</li>
                    <li>• Documentation and procedures</li>
                    <li>• Ongoing support planning</li>
                    <li>• Success measurement frameworks</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Expertise */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-6 text-center text-3xl font-bold text-foreground">
              Industry Expertise
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">
                    Manufacturing & Production
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Lean manufacturing optimization</li>
                    <li>• Production line balancing</li>
                    <li>• Supply chain integration</li>
                    <li>• Quality system improvement</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-green-600">
                    Healthcare & Life Sciences
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Patient flow optimization</li>
                    <li>• Operating room efficiency</li>
                    <li>• Emergency department design</li>
                    <li>• Pharmaceutical operations</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-purple-600">
                    Logistics & Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Warehouse optimization</li>
                    <li>• Transportation planning</li>
                    <li>• Network design analysis</li>
                    <li>• Inventory management</li>
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
                    <li>• Financial services modeling</li>
                    <li>• Retail operations analysis</li>
                    <li>• Government process improvement</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
