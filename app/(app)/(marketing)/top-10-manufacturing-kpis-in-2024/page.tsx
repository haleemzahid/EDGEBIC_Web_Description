import { Card, CardContent } from '@/components/ui/card';

export default function Top10ManufacturingKPIsPage() {
  return (
    <div className="min-h-screen text-[18px]">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Top 10 Manufacturing KPIs in 2024
            </h1>
            <p className="text-gray-700">
              Understanding your efficiency can be challenging without clear
              benchmarks and objectives. This is where Key Performance
              Indicators (KPIs) in manufacturing prove invaluable.
            </p>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="pt-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl">
            <div className="rounded-lg border-l-4  p-6">
              <h2 className="mb-4 text-xl font-bold text-slate-900">Table of Contents</h2>
              <ol className="list-inside list-decimal space-y-2">
                <li className="text-blue-600 hover:text-blue-800">
                  <a href="#what-is-kpi">What is a manufacturing KPI?</a>
                </li>
                <li className="text-blue-600 hover:text-blue-800">
                  <a href="#selecting-kpis">
                    Selecting the right Manufacturing KPIs
                  </a>
                </li>
                <li className="text-blue-600 hover:text-blue-800">
                  <a href="#using-kpis">How to use Manufacturing KPIs?</a>
                </li>
                <li className="text-blue-600 hover:text-blue-800">
                  <a href="#top-10">
                    Top 10 most important Manufacturing KPIs
                  </a>
                </li>
                <li className="text-blue-600 hover:text-blue-800">
                  <a href="#takeaways">Key Takeaways</a>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className=" pt-6">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* What is a manufacturing KPI? */}
          <div id="what-is-kpi">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              What is a Manufacturing KPI?
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              Manufacturing KPIs, or Key Performance Indicators, serve as
              metrics essential for gauging the efficiency of critical
              functions within a manufacturing enterprise. While all KPIs
              are metrics, not every metric qualifies as a KPI. The
              distinction lies in their purpose.
            </p>
            <p className="mb-4 leading-relaxed text-gray-700">
              Metrics encompass all measurable values, whereas KPIs are
              specifically linked to predetermined business objectives,
              making them pivotal indicators of success or failure. Tracking
              an excessive number of metrics without strategic relevance to
              your business is generally unproductive.
            </p>
            <p className="leading-relaxed text-gray-700">
              However, aligning goals with selected metrics provides a
              reliable method to accurately assess progress and enhance
              targeted processes.
            </p>
          </div>

          {/* Selecting the right KPIs */}
          <div id="selecting-kpis">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              Selecting the Right Manufacturing KPIs
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              The designation of KPIs as "Key" Performance Indicators
              underscores their significance. While any metric can be
              utilized to assess performance, KPIs are the ones deemed most
              crucial. What holds importance for companies can vary
              significantly based on their respective industries.
            </p>
            <p className="mb-4 leading-relaxed text-gray-700">
              Generally, it's advisable for a company to limit its focus to
              no more than ten manufacturing KPIs to avoid unnecessary
              complexity. These selected metrics should cover various
              aspects of the business, such as manufacturing efficiency,
              customer satisfaction, lead times, and more.
            </p>
            <div className="rounded-lg p-6">
              <h3 className="mb-4 font-semibold">
                An effective manufacturing KPI:
              </h3>
              <ol className="list-inside list-decimal space-y-4">
                <li className="text-gray-700">
                  <strong>Aligns with strategic objectives.</strong> Before
                  choosing a KPI to monitor, it's essential to define your
                  desired outcomes. Once objectives are established, the KPI
                  should serve as a tool to gauge progress towards those
                  goals.
                </li>
                <li className="text-gray-700">
                  <strong>Is quantifiable and measurable.</strong> Without
                  clear measurement criteria, it's impossible to track
                  progress. Goals must be specific to ensure that KPIs
                  provide tangible value to the business.
                </li>
                <li className="text-gray-700">
                  <strong>Is achievable and actionable.</strong> Setting
                  unrealistic goals is counterproductive, just as tracking
                  superficial metrics that don't accurately reflect the
                  business's status.
                </li>
              </ol>
            </div>
          </div>

          {/* How to use KPIs */}
          <div id="using-kpis">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              How to Use Manufacturing KPIs?
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              Having effective manufacturing KPIs enables businesses to
              optimize production capacity, enhance productivity, elevate
              product quality, streamline delivery times, reduce waste, and
              manage costs efficiently.
            </p>
            <p className="mb-4 leading-relaxed text-gray-700">
              It's crucial to recognize that manufacturing KPIs can evolve
              over time. Certain metrics hold greater significance during
              specific phases of a company's development, with priorities
              shifting as circumstances change.
            </p>
            <div className="rounded-lg  p-6">
              <h3 className="mb-4 font-semibold">
                The Iterative KPI Process:
              </h3>
              <ol className="list-inside list-decimal space-y-2">
                <li className="text-gray-700">Measuring the KPI</li>
                <li className="text-gray-700">
                  Breaking down the KPI into categories
                </li>
                <li className="text-gray-700">
                  Prioritizing categories based on the highest percentage of
                  losses
                </li>
                <li className="text-gray-700">
                  Identifying the root cause of issues
                </li>
                <li className="text-gray-700">
                  Implementing countermeasures for problem-solving
                </li>
                <li className="text-gray-700">
                  Reassessing the KPI in an iterative manner
                </li>
              </ol>
            </div>
          </div>

          {/* Top 10 KPIs Header */}
          <div id="top-10" className="rounded-lg   p-6 text-center">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              Top 10 Most Important Manufacturing KPIs
            </h2>
            <p className="text-gray-700">
              While it's important for manufacturers to monitor universal
              KPIs such as sales revenue and net profit margin, the nature
              of the production business necessitates tracking specific
              manufacturing KPIs.
            </p>
          </div>

          {/* 1. OEE */}
          <div id="oee">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              1. Overall Equipment Effectiveness (OEE)
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              Overall Equipment Effectiveness (OEE) serves as a pivotal
              performance indicator, facilitating the monitoring and
              enhancement of machine or production line productivity within
              production centers.
            </p>
            <div className="my-4 rounded-lg bg-gray-100 p-4">
              <p className="text-center font-mono font-semibold">
                OEE = Availability × Performance × Quality
              </p>
            </div>
            <p className="mb-4 leading-relaxed text-gray-700">
              OEE measures the percentage of time that a machine or
              production line produces good quality articles during the
              scheduled production time.
            </p>
            <div className="rounded-lg  p-6">
              <h4 className="mb-2 font-semibold">Example Calculation:</h4>
              <p className="mb-2 text-sm text-gray-700">
                A machine scheduled to run 8 hours (7 a.m. to 3 p.m.) with
                standard rate of 120 units/hour. 45 minutes downtime, 850
                units produced, 800 units of adequate quality.
              </p>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>
                  • <strong>Availability:</strong> 90.63% (7.25 hours actual
                  / 8 hours planned)
                </li>
                <li>
                  • <strong>Performance:</strong> 97.70% (850 units / 870
                  ideal units)
                </li>
                <li>
                  • <strong>Quality:</strong> 94.12% (800 good units / 850
                  total units)
                </li>
                <li>
                  • <strong>OEE:</strong> 84.83%
                </li>
              </ul>
            </div>
          </div>

          {/* 2. WIP */}
          <div id="wip">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              2. Work-in-Process (WIP)
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              Work-in-process (WIP) serves as a critical performance metric
              that evaluates the value of raw materials or subassemblies
              within the manufacturing process before reaching the finished
              product stage.
            </p>
            <div className="my-4 rounded-lg bg-gray-100 p-4">
              <p className="text-center font-mono font-semibold">
                WIP = Manufacturing Lead Time × Production Flow Value
              </p>
            </div>
            <p className="leading-relaxed text-gray-700">
              The level of WIP inventory is influenced by factors such as
              manufacturing lead time, costs, number of orders in progress,
              and batch sizes.
            </p>
          </div>

          {/* 3. Lead Time */}
          <div id="lead-time">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              3. Lead Time (LT)
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              Lead time, also known as order cycle time, stands as a pivotal
              KPI for businesses involved in manufacturing and product
              sales. It offers insights into your company's order processing
              efficiency and the promptness with which customer demands are
              met.
            </p>
            <div className="rounded-lg  p-6">
              <h4 className="mb-3 font-semibold">Lead Time Components:</h4>
              <ul className="space-y-2">
                <li className="text-gray-700">
                  • <strong>Production lead time:</strong> Duration from
                  commencement to completion of manufacturing
                </li>
                <li className="text-gray-700">
                  • <strong>Delivery lead time:</strong> Time taken to
                  deliver a product to customer from available stock
                </li>
                <li className="text-gray-700">
                  • <strong>Material lead time:</strong> Period required for
                  suppliers to deliver goods to manufacturer
                </li>
              </ul>
            </div>
          </div>

          {/* 4. OTIF */}
          <div id="otif">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              4. On-Time-In-Full (OTIF)
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              The On Time In Full (OTIF) serves as a crucial performance
              metric that assesses the proportion of orders delivered to
              customers with the correct quantity and quality, meeting the
              specified deadline.
            </p>
            <div className="my-4 rounded-lg bg-gray-100 p-4">
              <p className="text-center font-mono font-semibold">
                OTIF = Number of perfect orders / Total number of orders
              </p>
            </div>
            <div className="rounded-lg  p-6">
              <h4 className="mb-2 font-semibold">Example:</h4>
              <p className="text-sm text-gray-700">
                100 orders scheduled, but 4 orders had incorrect quantity, 3
                exceeded quantity, 2 had defective products, 1 arrived late.
              </p>
              <p className="mt-2 font-semibold text-gray-800">
                OTIF = (100 - 10) / 100 = 90%
              </p>
            </div>
          </div>

          {/* 5. CPU */}
          <div id="cpu">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              5. Cost per Unit (CPU)
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              Cost per Unit (CPU) serves as a significant key performance
              indicator aiding manufacturing systems in optimizing product
              costs. It plays a vital role in enabling companies to offer
              competitive prices in the market while simultaneously boosting
              profitability.
            </p>
            <div className="my-4 rounded-lg bg-gray-100 p-4">
              <p className="text-center font-mono text-sm font-semibold">
                CPU = (Direct Material + Direct Labor + Manufacturing
                Overhead) / Total units produced
              </p>
            </div>
          </div>

          {/* 6. Yield */}
          <div id="yield">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              6. Yield or First Time Through
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              The first-time yield (FTY) or first time through (FTT) key
              performance indicator measures production efficiency and
              quality. FTT reflects the number of units produced without
              defects or additional improvements against the total number of
              produced items.
            </p>
            <div className="my-4 rounded-lg bg-gray-100 p-4">
              <p className="text-center font-mono font-semibold">
                FTT = (Total Items Produced – Defective Items) / Items
                Produced
              </p>
            </div>
          </div>

          {/* 7. Production Downtime */}
          <div id="downtime">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              7. Production Downtime
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              Production downtime is a period when the manufacturing process
              is on hold and no products are produced. Terms such as idle
              time, downtime, or off-line period usually relate to the same
              KPI.
            </p>
            <p className="leading-relaxed text-gray-700">
              Downtime is a critical metric since if for some reason no
              goods are being produced, a loss will be incurred. It's good
              practice to record the reasons for downtime and try to reduce
              them in the future.
            </p>
          </div>

          {/* 8. Inventory Turnover */}
          <div id="inventory">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              8. Inventory Turnover Ratio
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              Excessive inventory usage ties up valuable resources. A higher
              inventory turnover rate signifies a more efficient supply
              chain.
            </p>
            <div className="my-4 rounded-lg bg-gray-100 p-4">
              <p className="text-center font-mono font-semibold">
                Inventory Turnover Ratio = Cost of Goods Sold (COGS) /
                Average Inventory
              </p>
            </div>
            <p className="leading-relaxed text-gray-700">
              An excessively high turnover may indicate insufficient
              inventory levels, while a low ratio may suggest sluggish sales
              or overstocking.
            </p>
          </div>

          {/* 9. Production Schedule Attainment */}
          <div id="schedule">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              9. Production Schedule Attainment
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              This manufacturing KPI measures the effectiveness of
              production planning and the efficiency of production workers
              in achieving their targets.
            </p>
            <div className="my-4 rounded-lg bg-gray-100 p-4">
              <p className="text-center font-mono font-semibold">
                Production Schedule Attainment = (Actual Output / Planned
                Output) × 100
              </p>
            </div>
            <p className="leading-relaxed text-gray-700">
              Creating accurate production schedules to meet output targets
              is vital for meeting customer expectations and aligning with
              corporate strategy.
            </p>
          </div>

          {/* 10. Supplier OTIF */}
          <div id="supplier">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              10. Supplier OTIF
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              In manufacturing, the quality of suppliers significantly
              impacts operations. Dependable partners are integral to the
              success of your company, underscoring the importance of
              monitoring KPIs related to supplier performance.
            </p>
            <div className="my-4 rounded-lg bg-gray-100 p-4">
              <p className="text-center font-mono font-semibold">
                OTIF = Number of perfect orders / Total number of orders
              </p>
            </div>
          </div>

          {/* Key Takeaways */}
          <div id="takeaways" className="rounded-lg bg-gradient-to-br p-6">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">Key Takeaways</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="mr-2 text-green-600">✓</span>
                <span className="text-gray-700">
                  While all metrics are measurable, not all metrics are
                  elevated to the status of KPIs
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-600">✓</span>
                <span className="text-gray-700">
                  KPIs stand out due to their critical role in assessing the
                  achievement of business objectives
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-600">✓</span>
                <span className="text-gray-700">
                  Effective KPIs should align with strategic goals, be
                  quantifiable, measurable, achievable, and actionable
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-600">✓</span>
                <span className="text-gray-700">
                  It's advisable for companies to focus on a limited number
                  of KPIs, ideally around ten
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-600">✓</span>
                <span className="text-gray-700">
                  Well-defined KPIs empower businesses to enhance operations
                  across all facets
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-600">✓</span>
                <span className="text-gray-700">
                  Regular review and adjustment of KPIs are necessary to
                  align with evolving goals and objectives
                </span>
              </li>
            </ul>
          </div>

          {/* Awards Banner */}
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-8 text-center">
              <h2 className="mb-6 text-2xl font-bold text-slate-900">
                CELEBRATING 25 YEARS OF AWARD WINNING SOFTWARE!
              </h2>
              <img
                src="https://www.usersolutions.com/wp-content/uploads/2022/07/banner-logoso-sm-58c9a28d237d6-1024x128.jpg"
                alt="Collection of industry and business awards logos"
                className="mx-auto h-auto max-w-full"
              />
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
