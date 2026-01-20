import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';


import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Success Stories | Manufacturing Scheduling Software',
  description:
    'Read how manufacturers across industries have improved on-time delivery, increased throughput, and optimized production scheduling with User Solutions software.',
  openGraph: {
    title:
      'Success Stories | Manufacturing Scheduling Software',
    description:
      'Read how manufacturers across industries have improved on-time delivery, increased throughput, and optimized production scheduling with User Solutions software.',
    url: 'https://www.usersolutions.com/success_stories'
  }
};

const successStories = [
  {
    title: 'Cook Compression',
    slug: 'cook-compression-scheduling-software-review',
    image: '/images/Edgebic/2022-07/cook.jpg',
    alt: 'Cook Compression company logo with emblem',
    excerpt:
      'I feel thankful. For cause, I am dubious when dealing with enterprises and guarantees by long distance; more so when considering the promises made by others for software solutions, sight unseen. My experience with User Solutions, Inc. has set a higher standard for my internet business dealings and software vendor expertise. Your premier […]'
  },
  {
    title:
      'Production What-If Scenario Gantt Chart Secures Largest Customer Order',
    slug: 'production-what-if-scenario-gantt-chart-secures-largest-customer-order',
    image:
      '/images/Edgebic/2022-07/turnerlogo22a-161208-5849d56942669.jpg',
    alt: 'Turner Bicycles logo since 1994.',
    excerpt:
      'Turner Suspension Bicycles, Inc. of Murrieta, CA manufactures top-of-the-line, world-class mountain bikes. From the birth of the first BURNER All Terrain Bikes (ATB) in 1992, to the current offerings, Turner has strove to make the suspension frame as simple, rigid, and low-maintenance as possible. The results are refined geometries and machines built using only the […]'
  },
  {
    title:
      'Job Shop Gains Control of Highly Volatile Schedule and Inventory Needs',
    slug: 'job-shop-gains-control-of-highly-volatile-schedule-and-inventory-needs',
    image:
      '/images/Edgebic/2022-07/AssembledProductsGroup-5949393aec366.png',
    alt: 'Corporate building with trees and address sign.',
    excerpt:
      '"Our products are constantly changing and, for only a few hours per month, the Resource Manager provides the ideal format to configure new Bills-Of-Material, prepare production schedules, and manage our inventory. Since we are already familiar with Excel, there wasn\'t even a learning curve." -Jim Muraski Production Control Manager of Assembled Products Group'
  },
  {
    title: 'NIST MEP and Industrial Damping Leader Improve On-Time Delivery',
    slug: 'nist-mep-and-industrial-damping-leader-improve-on-time-delivery',
    image:
      '/images/Edgebic/2022-07/Ace-Controls-59492d232fa7c.png',
    alt: 'ACE Controls Inc. company logo.',
    excerpt:
      "ACE Controls, Inc., located in Farmington MI, had a requirement to improve their current system, to immediately implement a solution for the day-to-day scheduling challenges of the machine shop. Supported by the NIST/Michigan Manufacturing Technology Center, Resource Manager was selected both for its benefit/cost ratio and for compatibility on the company's existing Excel platform, already […]"
  },
  {
    title: 'Lean Manufacturing Realized by Hi-Tech Amplifier Manufacturer',
    slug: 'lean-manufacturing-realized-by-hi-tech-amplifier-manufacturer',
    image:
      '/images/Edgebic/2022-07/IFI999-161208-5849ea6336e64.jpg',
    alt: 'IFI company logo with red initials.',
    excerpt:
      'Instruments For Industry, Inc (IFI), is a leader in the design and manufacture of Solid State and Traveling Wave Tube Amplifiers (both pulsed and CW). IFI equipment is used successfully in applications all over the world and is the leading supplier of high power transmitters. IFI has implemented Resource Manager-DB to support a transition to […]'
  },
  {
    title: 'Hi-tech Connector Mfr Accurately Schedules Labor with MRP Add-On',
    slug: 'hi-tech-connector-mfr-accurately-schedules-labor-with-mrp-add-on',
    image:
      '/images/Edgebic/2022-07/logo003-58c6bad38b32e.jpg',
    alt: 'Blue text logo reading "INCON".',
    excerpt:
      'For awhile, we had been seeking better scheduling information out of our system. Exact Software recommended Resource Manager-DB from User Solutions. We found that not only was the product quick to integrate with our Macola system, it also integrated easily with our current custom labor tracking system and provides the needed visibility for us to […]'
  },
  {
    title:
      'Simplifying Complexities Increased On-Time Deliveries, User Adoption for large Sawmills',
    slug: 'simplifying-complexities-increased-on-time-deliveries-user-adoption-for-large-sawmills',
    image:
      '/images/Edgebic/2022-07/GrayAmNavy-Taglogo3634-58c6ba9ccf1af.jpg',
    alt: 'Swanson Group logo with pine tree icon',
    excerpt:
      'We have been using the RMDB scheduling software, increasingly, for the last year. I say increasingly because there was a lot of reluctance to using it first. The reluctance came because there was the idea that even though plywood production is "Old Technology" manufacturing, the intricacies of the different species and manners to deconstruct a […]'
  },
  {
    title: 'Smart Coffee Machines Get Smarter Purchasing with ERP Add-On',
    slug: 'smart-coffee-machines-get-smarter-purchasing-with-erp-add-on',
    image:
      '/images/Edgebic/2022-07/GrayAmNavy-Taglog34-58c6ba204feb9.jpg',
    alt: 'Cafection Enterprises logo with steaming coffee cup icon.',
    excerpt:
      'The big problem we have is knowing exactly which raw material was needed to be purchased (qty & date) based on BOM, minimum quantity to order and basic costing. The biggest benefit with using Resource Manager-DB is the increased efficiency in purchasing department. We chose Resource Manager -DB because it was the only affordable program […]'
  },
  {
    title:
      'Scheduling Labor out Several Months Increases Customer Satisfaction',
    slug: 'scheduling-labor-out-several-months-increases-customer-satisfaction',
    image:
      '/images/Edgebic/2022-07/cumminslogo-59492683dd7a2.png',
    alt: 'Cummins logo with red background',
    excerpt:
      'Joe Van Wagner, Production Manager for Cummins Engine, selected a Resource Manager to assist in scheduling labor and machine resources. "We are in the midst of changing our corporate system and neither (old or new) system will handle job shop management the way we run our shops." We need a flexible tool for planning and […]'
  },
  {
    title:
      'ERP Vendor and Manufacturer Both Turn to RM-DB for Flexible Scheduling',
    slug: 'erp-vendor-and-manufacturer-both-turn-to-rm-db-for-flexible-scheduling',
    image:
      '/images/Edgebic/2022-07/Plastilite-161208-5849e7913fd3c.jpg',
    alt: 'Plastilite Corporation logo with tagline insulative and protective packaging.',
    excerpt:
      'User Solutions has announced another successful manufacturing scheduling application for Plastilite. Plastilite Corporation, located in Omaha Nebraska, provides insulated and protective packing solutions to companies shipping perishable and fragile products across the United States. Their containers are now routinely used in transporting everything from Omaha Steaks to pies to vaccines and even biological materials, and […]'
  },
  // {
  //   title: 'Repair Shops Triple On-Time Shipping Percentage from 30% to 90%',
  //   slug: 'repair-shops-triple-on-time-shipping-percentage-from-30-to-90',
  //   image:
  //     '/images/Edgebic/2022-07/logo1-161026-5810e0bfe3bef.png',
  //   alt: 'User Solutions Logo',
  //   excerpt:
  //     'GE Railcar Services Corporation, a unit of General Electric Corporation manages a fleet of over 180,000 railcars throughout North America. "Over the past several years, Workcenter SchedulerXL has successfully helped our repair network to improve the Shipping On-Time accuracy from 30% to over 90%. Additionally, since installing Workcenter SchedulerXL, we have improved our overall shop cycle time by […]'
  // },
  {
    title: 'Job Shop Increases Throughput While Improving Shipping on Time',
    slug: 'job-shop-increases-throughput-while-improving-shipping-on-time',
    image:
      '/images/Edgebic/2022-07/logo1-161026-5810e0bfe3bef.png',
    alt: 'User Solutions Logo',
    excerpt:
      'Technical Glass Products in Snoqualmie, WA quickly settled on Resource Manager-DB for multi-user support, advanced production scheduling options, and easy integration with corporate ERP systems. According to Scott McNeil, Master Production Scheduler for Technical Glass, "Resource Manager DB and User Solutions are great assets in empowering Technical Glass to deliver world class products, on time and under […]'
  },
  {
    title:
      'Quick and Easy Production Scheduling Replaces Complex Custom Excel Program',
    slug: 'quick-and-easy-production-scheduling-replaces-complex-custom-excel-program',
    image:
      '/images/Edgebic/2022-07/logo1-161026-5810e0bfe3bef.png',
    alt: 'User Solutions Logo',
    excerpt:
      'Kyocera Industrial Ceramics used Resource Manager to replace a complex employee written Excel program that was becoming very time consuming and difficult to maintain. "We found immediate improvement in both predicting output and tracking raw material usage in process" - Brian Kendall, Industrial Engineer for Kyocera Industrial Ceramics. We were looking for a way to schedule three […]'
  },
  {
    title:
      'Resource Manager DB Innovates Li-ion Battery Production Scheduling for Enevate',
    slug: 'resource-manager-db-innovates-li-ion-battery-production-scheduling-for-enevate',
    image:
      '/images/Edgebic/2022-07/logo1-161026-5810e0bfe3bef.png',
    alt: 'User Solutions Logo',
    excerpt:
      '"Resource Manager-DB product provided a unique combination of planning, scheduling, and tracking functionality within a single, yet flexible system." - Scott Bennett, Enevate Corp. In 2015 Enevate Corporation, creator of the next generation of Li-ion batteries was building out a greenfield manufacturing facility which demanded a unique combination of planning, scheduling, and tracking functionality within […]'
  },
  {
    title:
      "Finite Capacity Scheduling of World's Largest Aircraft Carrier Nimitz",
    slug: 'finite-capacity-scheduling-of-worlds-largest-aircraft-carrier-nimitz',
    image:
      '/images/Edgebic/2022-07/logo1-161026-5810e0bfe3bef.png',
    alt: 'User Solutions Logo',
    excerpt:
      "The USS Nimitz is one of the Navy's nuclear-powered aircraft carriers, classified as a 'super carrier' and the lead ship of its class. With a displacement of 100K+ tons, a length of 1K+ feet, a 4 acre deck, a crew of 5K strong and only two locations in the world that can handle its dry dock maintenance needs, it needs to be scheduled […]"
  },
  {
    title: 'Finite Capacity Resource Scheduling for Consulting Projects',
    slug: 'finite-capacity-resource-scheduling-for-consulting-projects',
    image:
      '/images/Edgebic/2022-07/logo1-161026-5810e0bfe3bef.png',
    alt: 'User Solutions Logo',
    excerpt:
      'GEMS Healthcare Solutions a wholly-owned subsidiary of GE Medical Systems headquartered in San Ramon, California, provides integrated data mining, Internet-based benchmarking and consulting solutions to healthcare providers. According to Shavonna Portue, Director, Product Operations "Delivering accurate information to our customers in a timely manner is the core of our business. Each financial analyst on our staff handles […]'
  },
  {
    title: 'Complements Traditional MRP and Shop Control Systems',
    slug: 'complements-traditional-mrp-and-shop-control-systems',
    image:
      '/images/Edgebic/2022-07/logo1-161026-5810e0bfe3bef.png',
    alt: 'User Solutions Logo',
    excerpt:
      "Arnold Quesenberry, Senior Consultant for A.G. Raymond & Co. Inc. has been using Resource Manager in conjunction with consulting projects. \"We have found these products are a perfect complement to traditional MRP and Shop Control systems. They enable the user to quickly generate various 'what-if' plans for feasible and efficient master scheduling, all without disrupting the current […]"
  },
  {
    title:
      'Amish Easily Adopt, Rapidly Amortize New Production Scheduling System',
    slug: 'amish-easily-adopt-rapidly-amortize-new-production-scheduling-system',
    image:
      '/images/Edgebic/2022-07/logo1-161026-5810e0bfe3bef.png',
    alt: 'User Solutions Logo',
    excerpt:
      "Nestled quietly in the heart of Ohio's Amish countryside is a furniture destination, Homestead Furniture. With all these advanced techniques and methodologies in place, the antiquated production scheduling system surfaced as a bottleneck holding them back. The article describes how a 40 hr/week production scheduling task, requiring an experienced production scheduler, was reduced to a mere 2 hour task by […]"
  },
  {
    title: 'Affordable, Easy to Implement MRP for Smaller Manufacturer',
    slug: 'affordable-easy-to-implement-mrp-for-smaller-manufacturer',
    image:
      '/images/Edgebic/2022-07/logo1-161026-5810e0bfe3bef.png',
    alt: 'User Solutions Logo',
    excerpt:
      'Sleepmaster, LTD in Australia is a relatively small organization (AUD$50M of sales) with an outdated MRP system. Resource Manager was chosen because it is very easy and intuitive to use, can be used in sections within days, is low cost, easily configurable/flexible, and good support is offered via Skype, phone and GoToMeeting. "The biggest benefit relative to other […]'
  },
  {
    title: 'Capacity and Production Planning Add-On for ERP',
    slug: 'capacity-and-production-planning-add-on-for-erp',
    image:
      '/images/Edgebic/2022-07/logo1-161026-5810e0bfe3bef.png',
    alt: 'User Solutions Logo',
    excerpt:
      "BAE Systems/Ordinance Systems Inc. set out to design and implement a process that would enable our manufacturing personnel to systematically identify process, equipment, labor, and material limitations. We had already purchased and implemented an ERP system but we weren't satisfied with its ability to recognize our capacity constraints or meet our finite scheduling needs. Now, we have a solution that […]"
  },
  {
    title: 'Enhancing Supply Chain Visibility through Advanced Scheduling Solutions',
    slug: 'enhancing-supply-chain-visibility-through-advanced-scheduling-solutions',
    image: '/images/Edgebic/2022-09/usersolutionsimage-300x211.png',
    alt: 'Advanced scheduling solutions for supply chain visibility',
    excerpt:
      'Discover how advanced scheduling solutions can transform your supply chain operations by providing real-time visibility, improving coordination, and enabling better decision-making across the entire manufacturing process.'
  },
  {
    title: 'The Role of Technology in Modern Production Planning and Scheduling',
    slug: 'erp-solutions-for-production-planning',
    image: '/images/Edgebic/2022-07/AirCraftMaint.jpg',
    alt: 'Technology in production planning and scheduling',
    excerpt:
      'Explore how modern technology is revolutionizing production planning and scheduling in manufacturing, from ERP integration to real-time data analytics and automated scheduling systems.'
  },
  {
    title: 'Implementing Lean Manufacturing Principles for Improved Production Efficiency',
    slug: 'lean-manufacturing-solutions',
    image: '/images/Edgebic/2024-02/sdf.jpg',
    alt: 'Lean manufacturing principles for production efficiency',
    excerpt:
      'Learn how implementing lean manufacturing principles can dramatically improve production efficiency, reduce waste, and optimize resource utilization in your manufacturing operations.'
  },
  {
    title: 'Li-ion Battery Production Scheduling Software',
    slug: 'li-ion-battery-production-scheduling-software',
    image: '/images/Edgebic/2022-09/image04-300x163.png',
    alt: 'Li-ion battery production scheduling software',
    excerpt:
      'Specialized production scheduling software designed for Li-ion battery manufacturing, addressing unique challenges in battery production including precise timing, quality control, and complex multi-stage processes.'
  },
  {
    title: 'Scheduling System Narrows Skills Gap for Fire-Rated Glass',
    slug: 'scheduling-system-narrows-skills-gap-for-fire-rated-glass',
    image: '/images/Edgebic/2022-09/image3-300x163.png',
    alt: 'Scheduling system for fire-rated glass manufacturing',
    excerpt:
      'See how an intelligent scheduling system helped a fire-rated glass manufacturer overcome workforce skill gaps while maintaining high production standards and meeting critical safety requirements.'
  },
  {
    title: 'Small Manufacturer and Job Shop Uses Planning, Scheduling, and Tracking Tools',
    slug: 'small-manufacturer-and-job-shop-uses-planning-scheduling-and-tracking-tools-from-user-solutions-inc-to-become-more-efficient-and-competitive',
    image: '/images/Edgebic/2022-09/image06-1-300x163.png',
    alt: 'Planning and scheduling tools for small manufacturers',
    excerpt:
      'Our products are constantly changing and, for only a few hours per month, the Resource Manager provides the ideal format to configure new Bills-Of-Material, prepare production schedules, and manage our inventory. Since we are already familiar with Excel, there wasn\'t even a learning curve.'
  },
  {
    title: 'User Solutions, Inc. Named as One of Top ERP Solutions Transforming Business 2016',
    slug: 'user-solutions-inc-named-as-one-of-top-erp-solutions-transforming-business-2016-by-cio-applications-as-they-celebrate-25-years-in-business',
    image: '/images/Edgebic/2022-09/image05-300x163.png',
    alt: 'Top ERP solutions transforming business award',
    excerpt:
      'User Solutions, Inc. recognized by CIO Applications as one of the Top ERP Solutions Transforming Business in 2016, celebrating 25 years of providing innovative production planning and scheduling solutions to manufacturers.'
  },
  {
    title: 'Celebrating National Manufacturing Day',
    slug: 'random-events-and-covariance',
    image: '/images/Edgebic/2022-07/celebrating-300x163.png',
    alt: 'Celebrating National Manufacturing Day',
    excerpt:
      'Join us in celebrating National Manufacturing Day and recognizing the vital role of manufacturing in our economy, showcasing the innovation, technology, and skilled workforce driving modern production facilities.'
  }
];

export default function SuccessStoriesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-4xl font-bold text-transparent md:text-5xl lg:text-6xl">
              Manufacturing Success Stories
            </h1>
            <p className="mx-auto mb-4 max-w-3xl text-xl text-gray-700">
              Read how manufacturers across industries have improved on-time
              delivery, increased throughput, and optimized production
              scheduling with User Solutions software.
            </p>
          </div>
        </div>
      </section>

      {/* Success Stories Grid */}
      <section>
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
              {successStories.map((story, index) => (
                <Link
                  key={story.slug}
                  href={`/success_stories/${story.slug}`}
                  className="group"
                >
                  <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <CardContent className="p-6">
                      <div className="mb-4 overflow-hidden rounded-lg">
                        <Image
                          src={story.image}
                          alt={story.alt}
                          width={600}
                          height={400}
                          className="h-48 w-full object-contain transition-transform duration-300 group-hover:scale-105"
                          unoptimized
                        />
                      </div>
                      <h2 className="mb-3 text-xl font-bold text-gray-900 transition-colors group-hover:text-blue-600">
                        {story.title}
                      </h2>
                      <p className="line-clamp-4 text-gray-600">
                        {story.excerpt}
                      </p>
                      <div className="mt-4 flex items-center text-blue-600">
                        <span className="text-sm font-semibold">Read More</span>
                        <svg
                          className="ml-2 size-4 transition-transform group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
