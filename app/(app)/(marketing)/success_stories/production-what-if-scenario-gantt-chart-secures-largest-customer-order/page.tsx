import type { Metadata } from 'next';
import Image from 'next/image';


import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title:
    'Production What-If Scenario Gantt Chart Secures Largest Customer Order | User Solutions',
  description:
    'Learn how Turner Suspension Bicycles used Resource Manager for Excel to handle their largest customer order with what-if scenario planning.',
  openGraph: {
    title:
      'Production What-If Scenario Gantt Chart Secures Largest Customer Order | User Solutions',
    description:
      'Learn how Turner Suspension Bicycles used Resource Manager for Excel to handle their largest customer order with what-if scenario planning.',
    url: 'https://www.usersolutions.com/success-stories/production-what-if-scenario-gantt-chart-secures-largest-customer-order'
  }
};

export default function ProductionWhatIfScenarioPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl">
              Production What-If Scenario Gantt Chart Secures Largest Customer
              Order
            </h1>
            <p className="mx-auto mb-4 max-w-3xl text-xl text-gray-700">
              Discover how Turner Suspension Bicycles leveraged advanced
              planning and scheduling tools to manage their biggest order.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            {/* Featured Image */}
            <div className="mb-6 flex justify-center">
              <Image
                src="/images/Edgebic/2022-07/turnerlogo22a-161208-5849d56942669.jpg"
                alt="Turner Bicycles logo since 1994"
                width={300}
                height={66}
                className="h-auto"
                unoptimized
              />
            </div>

            <div className="prose prose-lg mx-auto">
              <p className="lead text-gray-700">
                Turner Suspension Bicycles, Inc. of Murrieta, CA manufactures
                top-of-the-line, world-class mountain bikes. From the birth of
                the first BURNER All Terrain Bikes (ATB) in 1992, to the current
                offerings, Turner has strove to make the suspension frame as
                simple, rigid, and low-maintenance as possible. The results are
                refined geometries and machines built using only the best
                materials, combined with the highest quality manufacturing. This
                led to success that put a strain on their product flow and
                production scheduling systems.
              </p>

              <div className="my-6 flex justify-center">
                <Image
                  src="/images/Edgebic/2022-07/2016_czar_xx1_blue_4500-300x188-161208-5849eb9c81e6d.jpg"
                  alt="Turner mountain bike"
                  width={300}
                  height={188}
                  className="h-auto rounded-lg"
                  unoptimized
                />
              </div>

              <h2 className="mt-8 text-2xl font-bold text-gray-900">
                Planning and Scheduling Customer Orders
              </h2>

              <p className="text-gray-700">
                According to Mike Votaw, Production Manager, "While our
                production numbers are small compared to many companies we still
                suffer from many of the production scheduling pitfalls of much
                larger operations. Demand for our product has not been a
                problem. Trying to plan and schedule all the customer orders in
                an efficient way is a huge challenge that is only going to get
                worse. Just trying to a get basic handle on Shop Capacity,
                Material Lead-times, Customer Due Dates is too much for a manual
                scheduling board and a fist-full of post-it notes."
              </p>

              <p className="text-gray-700">
                Under advice of a business consultant who had already set Turner
                Bikes up with a basic accounting system using QuickBooks Pro,
                Mr. Votaw downloaded a free trial of Resource Manager for XL, a
                planning and scheduling system based on Microsoft Excel
                available from User Solutions, and was able to evaluate the
                program using their own operational data.
              </p>

              <p className="text-gray-700">
                According to Mike Votaw, "We are much too small for most of the
                big, costly, complex programs out there, and we really didn't
                want to toss out the progress we had made with QuickBooks. Plus,
                I was already familiar with Excel – so the idea of adding a
                planning, scheduling, and tracking component to QuickBooks was
                very appealing – especially since it could be done so
                affordably."
              </p>

              <p className="text-gray-700">
                After a successful test trial of Resource Manager for Excel,
                Mike ordered the program and began implementing it. In just a
                few days, Mike had entered in all the basic shop constraints,
                such as numbers and types of machines and laborers, shop
                calendar, materials, vendors, customers, and was able to
                construct the Bills-Of-Resources that describe what has to be
                done, in what order, and how long it takes.
              </p>

              <h2 className="mt-8 text-2xl font-bold text-gray-900">
                Exceeding Expectations
              </h2>

              <p className="text-gray-700">
                Mike reports, "Now that we have the full program, its abilities
                have exceeded our expectations. We have found it to be powerful
                and relatively easy to learn. For the first time, we now have a
                handle on our flow of product from projections, to orders, to
                shipments. What is especially encouraging is the program's
                flexibility to respond to new demands.
              </p>

              <p className="text-gray-700">
                For example, after only having the program a few weeks, the
                owner came back from a trade show in Japan with the biggest
                order in our history. When he asked me when we could deliver – I
                simply entered in the demand, scheduled it, and printed out a
                Gantt Chart schedule showing exactly when we could deliver the
                product and what our manufacturing costs would be. He was
                ecstatic to have that information so quickly and accurately to
                respond back to our customer."
              </p>

              <div className="my-6 flex justify-center">
                <Image
                  src="/images/Edgebic/2022-07/Exceeding-Expections-161208-5849ebfe1962c.jpg"
                  alt="Exceeding Expectations"
                  width={600}
                  height={400}
                  className="h-auto rounded-lg"
                  unoptimized
                />
              </div>

              <p className="text-gray-700">
                Mike continues, "Resource Manager for Excel is helping us
                achieve our goals of increased sales of more profitable products
                (custom and special order) – without increasing our overhead.
                Using the various reports and 'what-if' capabilities, I can look
                at the options of adding more direct labor and purchasing more
                equipment for shop metal working and doing the work ourselves –
                or outsourcing. Turns out, I can completely manage our supply
                chain quickly and easily from Resource Manager – tracking jobs
                and inventory as they flow between our operations and various
                sub-contractors."
              </p>

              <p className="text-gray-700">
                While it was originally brought in to complement and integrate
                with QuickBooks Inventory, it turned out that it was just easier
                to do more in Resource Manager for Excel, including complete
                inventory control, than to integrate daily between the two
                products. According to Mr. Votaw, "QuickBooks is a great program
                if you fit exactly their target user, such as a service
                provider, but there is no flexibility for manufacturers. We now
                just use it for invoicing and use Resource Manager for
                everything else.
              </p>

              <div className="my-6 flex justify-center">
                <Image
                  src="/images/Edgebic/2022-07/thankyougirl-161208-5849ec3536e21.png"
                  alt="Thank you for your business"
                  width={400}
                  height={300}
                  className="h-auto rounded-lg"
                  unoptimized
                />
              </div>

              <h2 className="mt-8 text-2xl font-bold text-gray-900">
                Refreshing Customer Support
              </h2>

              <p className="text-gray-700">
                Throughout this entire project and continuing to today, we are
                very pleased with the customer support we have received from
                User Solutions. They have responded quickly and thoroughly to
                our every request from simple questions to special situations.
                That kind of personal support, for affordable manufacturing
                software is refreshing".
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Banner */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <Card className="rounded-xl border bg-gradient-to-br from-blue-50 to-blue-100 text-card-foreground shadow">
              <CardContent className="p-8 text-center">
                <h2 className="mb-6 text-2xl font-bold text-slate-900">
                  CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
                </h2>
                <div className="relative mx-auto h-auto w-full max-w-4xl">
                  <Image
                    src="/images/Edgebic/2022-07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                    alt="Collection of industry and business awards logos"
                    width={1024}
                    height={128}
                    className="mx-auto h-auto max-w-full"
                    unoptimized
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
