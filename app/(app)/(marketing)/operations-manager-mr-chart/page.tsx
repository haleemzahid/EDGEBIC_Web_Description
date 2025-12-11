import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MrChartPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-4 text-white dark:from-blue-800 dark:to-blue-900">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <div className="mb-6">
              <Badge
                variant="outline"
                className="h-8 rounded-full border-white/20 bg-white/10 px-3 text-sm font-medium text-white shadow-sm"
              >
                OPERATIONS MANAGER
              </Badge>
            </div>
            <h1 className="mb-6 text-4xl font-bold md:text-6xl">
              Operations Manager: MR Chart
            </h1>
            <p className="mb-6 text-xl md:text-2xl">
              Statistical Process Control with Mean and Range Control Charts for
              Quality Management
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

      {/* Simple Analysis Overview */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-3xl">
                  Control Chart For Mean and Range (MR-CHART)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  The basic idea in all quality control charts is to select a
                  sample from a production process at equal intervals of time
                  and record some quality characteristic. The most common
                  quality characteristic is the mean of each sample. If the
                  process is under control, the series of sample means should
                  vary about the population mean in a random manner.
                </p>

                <p className="text-lg leading-relaxed text-muted-foreground">
                  We should expect some natural variation in any process and
                  there should be no real assignable cause to this variation. If
                  the process is in control, almost all sample mean values
                  should fall within control limits, almost always defined as
                  the mean plus or minus 3 standard deviations. The standard
                  deviation is a measure of the variation of a process.
                </p>

                <p className="text-lg leading-relaxed text-muted-foreground">
                  The control charts do not measure the standard deviation
                  directly. Instead, the range (high value minus low value) of
                  each sample is used as a simpler measure of variation. To
                  establish control limits, the range is automatically converted
                  to a standard deviation.
                </p>

                <p className="text-lg leading-relaxed text-muted-foreground">
                  It is important to understand that the control chart is a
                  management-by-exception tool. If a sample mean falls outside
                  the control limits, there is a very small probability that
                  this happened due to randomness or chance alone. In fact, with
                  control limits set at 3 standard deviations, the probability
                  is less than 1% that the sample mean occurred due to chance.
                </p>

                <p className="text-lg leading-relaxed text-muted-foreground">
                  There is a very large probability, more than 99%, that the
                  sample mean is due to an assignable cause and an investigation
                  should be conducted.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Variables and Attributes */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-3xl">
                  Variable and Attribute Control Charts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  The control charts in SOM are classified as either variable or
                  attribute charts. Variables are measurements on a continuous
                  scale such as inches or pounds. What types of variables can be
                  monitored with the variables control charts? Anything that can
                  be measured and expressed in numbers, such as temperature,
                  dimension, hardness number, tensile strength, weight,
                  viscosity, etc.
                </p>

                <p className="text-lg leading-relaxed text-muted-foreground">
                  Variables are monitored in the MR-CHART worksheet for the mean
                  and range of samples and in the I-CHART for individual
                  observations. Attributes are discrete data such as the number
                  of items in the sample that are defective or the number of
                  defects in one unit of product. The P-CHART and CU-CHART
                  models are available for attributes data.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Implementation Guide */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  MR-CHART Implementation and Process Control
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="mb-3 text-xl font-semibold text-blue-600">
                    Quality Characteristic Selection
                  </h3>
                  <p className="mb-4 text-muted-foreground">
                    Select a sample from your production process at equal
                    intervals of time and record a quality characteristic. The
                    most common quality characteristic is the mean of each
                    sample. Monitor variables such as temperature, dimension,
                    hardness number, tensile strength, weight, or viscosity -
                    anything that can be measured and expressed in numbers.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold text-green-600">
                    Control Limit Establishment
                  </h3>
                  <p className="mb-4 text-muted-foreground">
                    Control limits are set at the mean plus or minus 3 standard
                    deviations. The range (high value minus low value) of each
                    sample is used as a simpler measure of variation and is
                    automatically converted to a standard deviation to establish
                    these control limits.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-semibold text-purple-600">
                    Management by Exception
                  </h3>
                  <p className="mb-4 text-muted-foreground">
                    When a sample mean falls outside the control limits, there
                    is less than 1% probability this occurred due to chance
                    alone. There is more than 99% probability that an assignable
                    cause exists and investigation should be conducted
                    immediately.
                  </p>
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-center text-lg text-blue-600">
                        Mean Chart (X-bar)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-sm text-muted-foreground">
                        Monitors process central tendency and detects shifts in
                        the process average
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-center text-lg text-blue-600">
                        Range Chart (R)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-sm text-muted-foreground">
                        Tracks process variability and ensures consistent
                        manufacturing quality
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Analysis Features */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-6 text-center text-3xl font-bold text-foreground">
              MR-CHART Technical Features
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    Sample Mean Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Records quality characteristics at equal time intervals and
                    monitors sample means for process control
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    3-Sigma Control Limits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Sets control limits at mean ± 3 standard deviations with
                    less than 1% probability of false alarms
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    Range-to-Sigma Conversion
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Automatically converts sample range (high minus low) to
                    standard deviation for control limits
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    Variable Data Types
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Monitor temperature, dimension, hardness, tensile strength,
                    weight, viscosity and other measurable variables
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    Assignable Cause Detection
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    99%+ probability detection of special causes requiring
                    investigation when points fall outside limits
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">
                    Management by Exception
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground">
                    Focus attention only on out-of-control conditions requiring
                    immediate investigation and corrective action
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Analysis Categories */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-6 text-center text-3xl font-bold text-foreground">
              MR Chart Implementation Categories
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">
                    Manufacturing Quality Control
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Dimensional measurement control</li>
                    <li>• Process mean monitoring</li>
                    <li>• Variability reduction programs</li>
                    <li>• Specification compliance tracking</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-green-600">
                    Process Improvement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Capability assessment studies</li>
                    <li>• Control limit optimization</li>
                    <li>• Special cause investigation</li>
                    <li>• Process stability validation</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-purple-600">
                    Statistical Process Control
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Real-time process monitoring</li>
                    <li>• Pattern recognition and analysis</li>
                    <li>• Out-of-control signal management</li>
                    <li>• Continuous capability tracking</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">
                    Quality Assurance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Defect prevention strategies</li>
                    <li>• Quality cost reduction</li>
                    <li>• Customer satisfaction improvement</li>
                    <li>• Regulatory compliance support</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-6 text-center text-3xl font-bold text-foreground">
              MR Chart Application Scenarios
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">
                    High-Volume Manufacturing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Continuous production monitoring</li>
                    <li>• Multi-station quality control</li>
                    <li>• Automated data collection integration</li>
                    <li>• Real-time process adjustments</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-green-600">
                    Precision Industries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Tight tolerance monitoring</li>
                    <li>• Critical dimension control</li>
                    <li>• Six Sigma quality programs</li>
                    <li>• Zero-defect initiatives</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-purple-600">
                    Regulated Industries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• FDA validation requirements</li>
                    <li>• ISO 9001 compliance support</li>
                    <li>• Audit trail documentation</li>
                    <li>• Statistical evidence generation</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-orange-600">
                    Continuous Improvement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Lean manufacturing support</li>
                    <li>• Kaizen event facilitation</li>
                    <li>• Process optimization studies</li>
                    <li>• Cost of quality reduction</li>
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
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
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
