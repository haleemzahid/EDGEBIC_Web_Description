import type { Metadata } from 'next';

import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Top 10 Manufacturing KPIs Every Factory Should Track',
  description:
    'The 10 most important manufacturing KPIs — OEE, WIP, lead time, OTIF, cost per unit, yield, downtime, inventory turnover, schedule attainment, and supplier OTIF — plus the 2026 trends reshaping how factories measure performance.',
  path: '/top-10-manufacturing-kpis',
  keywords:
    'manufacturing KPIs, top manufacturing KPIs, production KPIs, OEE, work in process, lead time KPI, on time in full, OTIF, cost per unit, first time yield, production downtime, inventory turnover, schedule attainment, supplier OTIF, manufacturing performance metrics'
});

export default function Top10ManufacturingKPIsPage() {
  return (
    <div className="min-h-screen text-[18px]">
      {/* Hero Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-7xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Top 10 Manufacturing KPIs Every Factory Should Track
            </h1>
            <p className="text-gray-700">
              Understanding shop-floor efficiency is hard without clear
              benchmarks. Key Performance Indicators (KPIs) give modern
              manufacturers an objective way to measure what is working,
              what is not, and where to focus next — from the classic
              ten below to the new metrics reshaping factories in 2026.
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
                  <a href="#trends-2026">
                    New KPIs & Trends Shaping 2026
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
              Manufacturing KPIs, or Key Performance Indicators, are the
              metrics that gauge the efficiency of critical functions
              inside a manufacturing enterprise. While all KPIs are
              metrics, not every metric qualifies as a KPI. The
              distinction lies in their purpose.
            </p>
            <p className="mb-4 leading-relaxed text-gray-700">
              Metrics encompass all measurable values, whereas KPIs are
              specifically linked to predetermined business objectives,
              making them pivotal indicators of success or failure.
              Tracking an excessive number of metrics without strategic
              relevance to your business is generally unproductive.
            </p>
            <p className="leading-relaxed text-gray-700">
              Aligning goals with selected metrics provides a reliable
              method to accurately assess progress and improve targeted
              processes.
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
              utilized to assess performance, KPIs are the ones deemed
              most crucial. What holds importance for companies can vary
              significantly based on their respective industries.
            </p>
            <p className="mb-4 leading-relaxed text-gray-700">
              Generally, it is advisable for a company to limit its
              focus to no more than ten manufacturing KPIs to avoid
              unnecessary complexity. These selected metrics should
              cover various aspects of the business, such as
              manufacturing efficiency, customer satisfaction, lead
              times, and more.
            </p>
            <div className="rounded-lg p-6">
              <h3 className="mb-4 font-semibold">
                An effective manufacturing KPI:
              </h3>
              <ol className="list-inside list-decimal space-y-4">
                <li className="text-gray-700">
                  <strong>Aligns with strategic objectives.</strong>{' '}
                  Before choosing a KPI to monitor, it is essential to
                  define your desired outcomes. Once objectives are
                  established, the KPI should serve as a tool to gauge
                  progress towards those goals.
                </li>
                <li className="text-gray-700">
                  <strong>Is quantifiable and measurable.</strong>{' '}
                  Without clear measurement criteria, it is impossible
                  to track progress. Goals must be specific to ensure
                  that KPIs provide tangible value to the business.
                </li>
                <li className="text-gray-700">
                  <strong>Is achievable and actionable.</strong> Setting
                  unrealistic goals is counterproductive, just as
                  tracking superficial metrics that do not accurately
                  reflect the business's status.
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
              Effective manufacturing KPIs enable businesses to optimize
              production capacity, improve productivity, elevate product
              quality, streamline delivery times, reduce waste, and
              manage costs efficiently.
            </p>
            <p className="mb-4 leading-relaxed text-gray-700">
              It is crucial to recognize that manufacturing KPIs evolve
              over time. Certain metrics hold greater significance
              during specific phases of a company's development, with
              priorities shifting as circumstances change.
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
                  Prioritizing categories based on the highest
                  percentage of losses
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
              While manufacturers should still monitor universal KPIs
              such as sales revenue and net profit margin, the nature of
              the production business requires tracking these ten
              manufacturing-specific metrics.
            </p>
          </div>

          {/* 1. OEE */}
          <div id="oee">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              1. Overall Equipment Effectiveness (OEE)
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              Overall Equipment Effectiveness (OEE) is the single most
              important indicator for monitoring and improving machine
              or production-line productivity inside a production
              center.
            </p>
            <div className="my-4 rounded-lg bg-gray-100 p-4">
              <p className="text-center font-mono font-semibold">
                OEE = Availability × Performance × Quality
              </p>
            </div>
            <p className="mb-4 leading-relaxed text-gray-700">
              OEE measures the percentage of scheduled production time
              during which a machine or line actually produces
              good-quality output.
            </p>
            <div className="rounded-lg  p-6">
              <h4 className="mb-2 font-semibold">Example Calculation:</h4>
              <p className="mb-2 text-sm text-gray-700">
                A machine scheduled to run 8 hours (7 a.m. to 3 p.m.)
                with a standard rate of 120 units/hour. 45 minutes
                downtime, 850 units produced, 800 units of adequate
                quality.
              </p>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>
                  • <strong>Availability:</strong> 90.63% (7.25 hours
                  actual / 8 hours planned)
                </li>
                <li>
                  • <strong>Performance:</strong> 97.70% (850 units /
                  870 ideal units)
                </li>
                <li>
                  • <strong>Quality:</strong> 94.12% (800 good units /
                  850 total units)
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
              Work-in-Process (WIP) is a critical performance metric
              that evaluates the value of raw materials and
              subassemblies tied up in production before they reach the
              finished-product stage.
            </p>
            <div className="my-4 rounded-lg bg-gray-100 p-4">
              <p className="text-center font-mono font-semibold">
                WIP = Manufacturing Lead Time × Production Flow Value
              </p>
            </div>
            <p className="leading-relaxed text-gray-700">
              The level of WIP inventory is influenced by manufacturing
              lead time, costs, number of orders in progress, and batch
              sizes.
            </p>
          </div>

          {/* 3. Lead Time */}
          <div id="lead-time">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              3. Lead Time (LT)
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              Lead time, also known as order cycle time, is a pivotal
              KPI for any business that manufactures and sells physical
              products. It reveals how efficiently your company
              processes orders and how promptly you meet customer
              demand.
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
                  deliver a product to the customer from available
                  stock
                </li>
                <li className="text-gray-700">
                  • <strong>Material lead time:</strong> Period required
                  for suppliers to deliver goods to the manufacturer
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
              On-Time-In-Full (OTIF) measures the proportion of orders
              delivered to customers with the correct quantity and
              quality, meeting the specified deadline.
            </p>
            <div className="my-4 rounded-lg bg-gray-100 p-4">
              <p className="text-center font-mono font-semibold">
                OTIF = Number of perfect orders / Total number of orders
              </p>
            </div>
            <div className="rounded-lg  p-6">
              <h4 className="mb-2 font-semibold">Example:</h4>
              <p className="text-sm text-gray-700">
                100 orders scheduled, but 4 orders had incorrect
                quantity, 3 exceeded quantity, 2 had defective products,
                1 arrived late.
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
              Cost per Unit (CPU) helps manufacturing systems optimize
              product costs. It enables companies to offer competitive
              prices in the market while protecting — and ideally
              growing — profitability.
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
              First-Time Yield (FTY) or First Time Through (FTT)
              measures production efficiency and quality. It reflects
              the number of units produced without defects or rework
              against the total number of produced items.
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
              Production downtime is any period when the manufacturing
              process is on hold and no products are produced. Idle
              time, downtime, and off-line period all refer to the same
              KPI.
            </p>
            <p className="leading-relaxed text-gray-700">
              Downtime is a critical metric — if no goods are being
              produced, a loss is being incurred. It is good practice to
              record the reasons for every stoppage and systematically
              reduce them.
            </p>
          </div>

          {/* 8. Inventory Turnover */}
          <div id="inventory">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              8. Inventory Turnover Ratio
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              Excessive inventory ties up valuable working capital. A
              higher inventory turnover rate signifies a more efficient
              supply chain.
            </p>
            <div className="my-4 rounded-lg bg-gray-100 p-4">
              <p className="text-center font-mono font-semibold">
                Inventory Turnover Ratio = Cost of Goods Sold (COGS) /
                Average Inventory
              </p>
            </div>
            <p className="leading-relaxed text-gray-700">
              An excessively high turnover may indicate insufficient
              inventory levels, while a low ratio may suggest sluggish
              sales or overstocking.
            </p>
          </div>

          {/* 9. Production Schedule Attainment */}
          <div id="schedule">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              9. Production Schedule Attainment
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              This KPI measures the effectiveness of production
              planning and the efficiency of production workers in
              hitting their targets.
            </p>
            <div className="my-4 rounded-lg bg-gray-100 p-4">
              <p className="text-center font-mono font-semibold">
                Production Schedule Attainment = (Actual Output /
                Planned Output) × 100
              </p>
            </div>
            <p className="leading-relaxed text-gray-700">
              Creating accurate production schedules to meet output
              targets is vital for meeting customer expectations and
              aligning with corporate strategy.
            </p>
          </div>

          {/* 10. Supplier OTIF */}
          <div id="supplier">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              10. Supplier OTIF
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              In manufacturing, the quality of suppliers significantly
              impacts operations. Dependable partners are integral to
              the success of your company, which is why monitoring
              supplier performance matters as much as monitoring your
              own.
            </p>
            <div className="my-4 rounded-lg bg-gray-100 p-4">
              <p className="text-center font-mono font-semibold">
                OTIF = Number of perfect orders / Total number of orders
              </p>
            </div>
          </div>

          {/* New KPIs & Trends 2026 */}
          <div id="trends-2026">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">
              New KPIs & Trends Shaping 2026
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700">
              The ten KPIs above remain the backbone of any serious
              manufacturing scorecard. But the last two years have
              introduced a new layer of metrics that forward-looking
              factories are adding alongside the classics — driven by
              ESG reporting requirements, the rise of AI on the shop
              floor, and the cyber-physical exposure of modern OT
              environments.
            </p>

            <h3 className="mb-2 mt-6 text-xl font-semibold text-slate-900">
              Carbon Intensity per Unit (CO₂e/unit)
            </h3>
            <p className="mb-4 leading-relaxed text-gray-700">
              With CSRD reporting now live in the EU and SEC climate
              disclosures spreading across North American supply
              chains, manufacturers are tracking kilograms of CO₂
              equivalent per unit produced the same way they used to
              track cost per unit. Customers increasingly ask for it in
              RFQs, and it is becoming a tiebreaker in procurement
              decisions.
            </p>

            <h3 className="mb-2 mt-6 text-xl font-semibold text-slate-900">
              Energy Cost per Unit
            </h3>
            <p className="mb-4 leading-relaxed text-gray-700">
              A close relative of Cost per Unit (KPI #5), but isolated
              to energy. With industrial electricity prices volatile
              and natural gas still unpredictable, separating energy
              out of manufacturing overhead gives plants a clearer
              lever for scheduling energy-intensive jobs during
              off-peak windows.
            </p>

            <h3 className="mb-2 mt-6 text-xl font-semibold text-slate-900">
              Predictive Maintenance Hit Rate
            </h3>
            <p className="mb-4 leading-relaxed text-gray-700">
              As more plants deploy vibration, temperature, and current
              sensors, the question is no longer "do we have predictive
              maintenance" but "how often does our model actually catch
              a failure before it happens?" Hit rate = correctly
              predicted failures / total failures. Best-in-class plants
              target ≥ 85%.
            </p>

            <h3 className="mb-2 mt-6 text-xl font-semibold text-slate-900">
              Schedule Stability Index
            </h3>
            <p className="mb-4 leading-relaxed text-gray-700">
              A finite-capacity scheduling metric measuring how much
              the published production schedule changes between
              releases. High churn usually signals upstream problems —
              late material, unreliable equipment, or unrealistic
              promise dates — and directly hurts Schedule Attainment
              (KPI #9).
            </p>

            <h3 className="mb-2 mt-6 text-xl font-semibold text-slate-900">
              OT Cybersecurity Incidents
            </h3>
            <p className="mb-4 leading-relaxed text-gray-700">
              Tracked as incidents per quarter on operational
              technology networks (PLCs, SCADA, MES). Not a
              productivity KPI in the traditional sense — but a single
              ransomware event can take more production offline than
              any downtime KPI on this list, so plant managers are
              adding it to the scorecard.
            </p>

            <h3 className="mb-2 mt-6 text-xl font-semibold text-slate-900">
              AI Utilization on the Shop Floor
            </h3>
            <p className="leading-relaxed text-gray-700">
              Percent of production decisions (scheduling moves,
              quality inspections, maintenance triggers) that are
              AI-assisted versus fully manual. Early days, but this is
              becoming a proxy KPI for digital maturity and is now
              tracked by most companies running a formal Industry 4.0
              program.
            </p>
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
                  KPIs stand out due to their critical role in assessing
                  the achievement of business objectives
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
                  Focus on a limited number of KPIs — around ten — to
                  avoid dashboard overload
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-600">✓</span>
                <span className="text-gray-700">
                  In 2026, add sustainability, predictive maintenance,
                  schedule stability, OT cybersecurity, and AI
                  utilization alongside the classic ten
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-green-600">✓</span>
                <span className="text-gray-700">
                  Regular review and adjustment of KPIs is necessary to
                  stay aligned with evolving goals and objectives
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
