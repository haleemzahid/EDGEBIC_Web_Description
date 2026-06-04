/**
 * Excel template profiles for programmatic SEO expansion.
 *
 * 30 NEW templates that complement the 14 existing static template pages.
 * Each entry produces one /excel-templates/[slug] page via the dynamic route.
 *
 * Existing static slugs (DO NOT duplicate): bill-of-materials, capacity-planning,
 * gantt-chart, inventory, job-scheduling, machine-scheduling,
 * master-production-schedule, mrp, oee-calculation, production-report,
 * production-schedule, production-tracking, takt-time-calculator, work-order.
 *
 * Each profile is fully self-contained — no template substitution. The
 * shared ExcelTemplatePage component renders the data as-is, so what you
 * write here is exactly what ships.
 */

import type { ExcelTemplatePageData } from '@/components/marketing/templates/excel-template-page';

type TemplateData = Omit<ExcelTemplatePageData, 'relatedTemplates'> & {
  /** Display title for hub listing. */
  displayTitle: string;
  /** Metadata title (≤70 chars typically). */
  metaTitle: string;
  /** Metadata description (~150 chars). */
  metaDescription: string;
  /** Metadata keywords (comma-separated). */
  metaKeywords: string;
  /** Category for hub grouping. */
  category: 'Tracking' | 'Quality' | 'Capacity & Labor' | 'Inventory' | 'Planning';
};

export const EXCEL_TEMPLATES: TemplateData[] = [
  // ===========================================================================
  // GROUP 1 — TRACKING / MONITORING (6)
  // ===========================================================================
  {
    slug: 'wip-tracker',
    displayTitle: 'WIP Tracker',
    category: 'Tracking',
    metaTitle: 'Free WIP Tracker Excel Template (2026) — Work-In-Process Manufacturing',
    metaDescription: 'Free WIP tracker Excel template for manufacturers. Track work-in-process by job, work center, and stage with aging analysis. Built by manufacturing veterans.',
    metaKeywords: 'wip tracker excel, work in process tracker, wip excel template, work in process spreadsheet, manufacturing wip tracker, wip aging report excel',
    h1: 'Free WIP Tracker Excel Template',
    subtitle: 'Track every job sitting between raw material and finished goods. See aging WIP, identify stuck jobs, and stop counting half-finished orders on a clipboard.',
    tldr: 'A working WIP tracker that shows every open job by work center and stage, with automatic aging analysis. Use it today; upgrade to live WIP visibility with RMX when your spreadsheet stops keeping up.',
    introParagraphs: [
      'Work-in-process is the hidden inventory most manufacturers cannot see. Raw material on the dock and finished goods in the warehouse get counted weekly. The work sitting at operation 4 of 7, two days behind schedule, with no obvious reason it stalled — that one is invisible until a customer calls.',
      'Excel WIP trackers work because they force a shop to write down what is actually open at each work center. The discipline matters more than the formula. This template gives you a structured grid for capturing every job, every stage, and every elapsed-day count, with conditional formatting that flags jobs aging beyond your target.',
      'It will carry you for a while. Past 50–80 open jobs, the daily update becomes the planner\'s second job. That is when manufacturers move to Resource Manager for Excel (RMX) — the same WIP visibility, populated automatically from work order completions.'
    ],
    whatsInside: [
      { title: 'Open work order list', description: 'Job number, customer, item, quantity, due date, current operation, and current work center.' },
      { title: 'Operation-level progress', description: 'Each row shows the active operation in the routing — not just "job is open" but exactly where it is stuck.' },
      { title: 'WIP aging buckets', description: '0–3 days, 4–7 days, 8–14 days, 15+ days — color-coded so stalled jobs jump off the page.' },
      { title: 'Work-center load summary', description: 'Roll-up showing how much WIP is parked at each work center waiting to be worked.' },
      { title: 'Stalled-job flag column', description: 'Manual override to mark a job as blocked, with a notes field for the reason.' },
      { title: 'Daily snapshot tab', description: 'Save a frozen copy of WIP at end-of-day for week-over-week trend analysis.' }
    ],
    howToUseSteps: [
      { title: 'Export your open work orders', description: 'Pull a list of all open work orders from your ERP or job-tracking system. Paste into the "Open WIP" tab.' },
      { title: 'Tag current operation per job', description: 'For each job, indicate which operation in its routing is active. This is the one column you need to keep current daily.' },
      { title: 'Run the aging refresh', description: 'A simple formula compares the operation start date to today and assigns the aging bucket. Conditional formatting handles the rest.' },
      { title: 'Review with production daily', description: 'Use the work-center load tab in your morning standup. Jobs in the 15+ bucket get owner assignment and a reason code.' }
    ],
    whenToUpgrade: [
      'Open job count regularly exceeds 100 and the daily refresh takes more than 15 minutes.',
      'You want WIP populated automatically from shop floor scan-outs, not entered manually.',
      'Multiple planners need to update the tracker simultaneously without overwriting each other.',
      'You need WIP visibility to flow back into the finite-capacity schedule, not just a separate spreadsheet.'
    ],
    faqs: [
      { question: 'What is WIP tracking and why does it matter?', answer: 'WIP — work-in-process — is everything that has started production but is not yet finished. Untracked WIP is the largest source of late shipments in most shops. When you cannot see how long a job has been parked at operation 4 of 7, you cannot react until the customer calls.' },
      { question: 'How is this different from a generic job tracker?', answer: 'A job tracker shows that a job is open. A WIP tracker shows where in the routing the job currently sits, how long it has been there, and whether it is aging beyond target. The operation-level detail is what makes it useful for daily shop floor decisions.' },
      { question: 'Can I track WIP across multiple work centers?', answer: 'Yes — the work-center load tab rolls up open WIP per work center automatically. This lets supervisors see "we have 14 jobs parked at the mill, only 6 of which are this week\'s priority" without re-sorting the data.' },
      { question: 'How do I know when I have outgrown this spreadsheet?', answer: 'Three signals: (1) the daily refresh takes more than 15 minutes; (2) shop floor reality and the spreadsheet disagree by mid-afternoon; (3) you need WIP to drive scheduling decisions, not just report on them. At that point RMX or RMDB gives you live WIP without the manual update burden.' }
    ]
  },
  {
    slug: 'downtime-tracker',
    displayTitle: 'Downtime Tracker',
    category: 'Tracking',
    metaTitle: 'Free Downtime Tracker Excel Template (2026) — Machine & Line Downtime Log',
    metaDescription: 'Free downtime tracker Excel template. Log machine and line downtime by reason code, calculate MTBF/MTTR, and surface the real causes of lost capacity.',
    metaKeywords: 'downtime tracker excel, downtime log template, machine downtime excel, downtime tracking spreadsheet, mtbf calculator excel, mttr excel template',
    h1: 'Free Downtime Tracker Excel Template',
    subtitle: 'Log every minute a machine is down and which reason caused it. Surface the top 5 causes of lost capacity — usually 80% of total downtime sits in 4 reasons.',
    tldr: 'A working downtime log that captures start time, end time, machine, reason code, and operator. Calculates MTBF and MTTR automatically. Use it for 90 days and the patterns are obvious.',
    introParagraphs: [
      'Every shop knows machines go down. Few shops can tell you, with data, which 4 reasons cause 80% of total downtime. That gap costs more capacity than any other single thing you can fix.',
      'A downtime tracker exists to convert anecdotes ("the press kept jamming on Tuesday") into a Pareto chart ("press jams account for 38% of total downtime — fix the feed roller and we recover 18 hours a month"). The format does not need to be fancy. The discipline of capturing every event does.',
      'This template gives you the smallest workable structure: timestamp in, timestamp out, machine, reason code, operator, and notes. After 90 days of daily logs, the analysis tabs surface the real causes. Then RMX or EDGEBI can give you the live version pulled directly from machine signals.'
    ],
    whatsInside: [
      { title: 'Downtime event log', description: 'One row per downtime event with start time, end time, duration, machine, reason code, operator, and free-text notes.' },
      { title: 'Reason code dictionary', description: 'A standardized list of downtime reasons (setup, breakdown, material wait, no operator, planned PM, etc.) so the data aggregates cleanly.' },
      { title: 'MTBF calculator', description: 'Mean Time Between Failures by machine — formula-driven from the event log.' },
      { title: 'MTTR calculator', description: 'Mean Time To Repair by machine and by reason code.' },
      { title: 'Pareto chart of reasons', description: 'Automatic top-10 chart showing which reason codes account for the most cumulative downtime hours.' },
      { title: 'Availability % rollup', description: 'Scheduled hours minus downtime hours, by machine and by shift, expressed as a percentage.' }
    ],
    howToUseSteps: [
      { title: 'Define your reason codes upfront', description: 'Before logging anything, agree on 15–25 standard reason codes. Free-text reasons make aggregation impossible. The template ships with a starter list — edit to fit your shop.' },
      { title: 'Log every event of >5 minutes', description: 'Anything shorter is noise. The threshold matters — if operators log 30-second pauses, the data drowns.' },
      { title: 'Review weekly, not daily', description: 'Daily noise hides patterns. Weekly Pareto charts surface the real culprits. Set a 30-minute weekly review meeting.' },
      { title: 'Pick one reason per quarter', description: 'Do not try to fix all 25 reasons. Pick the #1 from the Pareto, fix it, then move to the next. Most shops recover 15–25% of lost capacity in the first year.' }
    ],
    whenToUpgrade: [
      'Operators stop logging events because it is "too much paperwork" — manual logs always degrade over 90 days.',
      'You want downtime captured automatically from machine signals (MTConnect, OPC-UA, stack lights).',
      'You need downtime data to feed real-time OEE dashboards visible on the shop floor.',
      'Multi-shift operations make manual handoff of the log unreliable.'
    ],
    faqs: [
      { question: 'What downtime reason codes should I use?', answer: 'Start with 15–25 codes covering setup/changeover, mechanical breakdown, electrical fault, no material, no operator, planned PM, quality hold, tool wear, and miscellaneous. Adjust based on your equipment. Avoid "Other" — it becomes a dumping ground.' },
      { question: 'How do I calculate MTBF and MTTR?', answer: 'MTBF (Mean Time Between Failures) = total uptime hours ÷ number of failures. MTTR (Mean Time To Repair) = total downtime hours ÷ number of failures. The template calculates both automatically from your event log.' },
      { question: 'How long should I track before drawing conclusions?', answer: '90 days minimum. Shorter windows over-weight one-off events. After 90 days the top 5 reasons are usually stable — those are the ones worth fixing.' },
      { question: 'Should I track planned downtime separately from unplanned?', answer: 'Yes — planned PM should not be in the same bucket as breakdowns. The template separates planned and unplanned in the availability rollup. You manage them differently: planned gets optimized, unplanned gets eliminated.' }
    ]
  },
  {
    slug: 'scrap-rate-tracker',
    displayTitle: 'Scrap Rate Tracker',
    category: 'Tracking',
    metaTitle: 'Free Scrap Rate Tracker Excel Template (2026) — Manufacturing Scrap Log',
    metaDescription: 'Free scrap rate tracker Excel template. Log scrap by job, work center, and reason code. Calculate scrap % trends and root-cause Pareto charts.',
    metaKeywords: 'scrap rate tracker excel, scrap log template, manufacturing scrap tracker, scrap rate calculator, defect tracking excel, scrap pareto excel',
    h1: 'Free Scrap Rate Tracker Excel Template',
    subtitle: 'Log every scrapped part with a real reason code. Calculate scrap rate by work center, by operator, and by part number. Most shops cut scrap 30%+ in year one.',
    tldr: 'Working scrap tracker with reason codes, cost roll-up, and Pareto analysis. Captures the data needed to actually attack scrap — not just report on it after the fact.',
    introParagraphs: [
      'Scrap is the most visible waste in any shop, and the hardest to fix without data. Every scrap event has a reason — but if the reason is logged as "operator error" or "material issue," nothing improves. Categorical clarity in the reason codes is what separates a useful scrap tracker from a paper trail.',
      'This template forces structure: part number, quantity scrapped, work center, operator, root-cause category, and a free-text "what actually happened" field. The free text matters as much as the code — patterns hide in the descriptions that codes miss.',
      'A 90-day tracking discipline plus a weekly Pareto review is usually enough to identify the top 3 causes. Fix those, and most shops drop their scrap rate 30–40% in the first year. After that, RMX or RMDB can wire scrap capture directly into the work order so you do not need a separate spreadsheet.'
    ],
    whatsInside: [
      { title: 'Scrap event log', description: 'Date, work order, part number, operation, quantity scrapped, scrap cost, work center, operator, root-cause code, and notes.' },
      { title: 'Root-cause code dictionary', description: 'Standardized categories: setup error, material defect, tool wear, programming error, operator skill, equipment fault, design issue.' },
      { title: 'Scrap rate by work center', description: 'Scrap quantity ÷ total produced quantity, by work center. Identifies which areas of the shop produce the most defects.' },
      { title: 'Scrap cost rollup', description: 'Total cost of scrapped material + labor consumed before scrap. The financial size of the problem.' },
      { title: 'Pareto by root cause', description: 'Top 10 root causes by scrap cost. This is the worksheet you use to pick your improvement project.' },
      { title: 'Trend chart by month', description: '12-month rolling chart of scrap rate. Track whether interventions are working.' }
    ],
    howToUseSteps: [
      { title: 'Standardize reason codes before logging', description: 'Agree on 10–15 root-cause codes with your quality and production team. Codes the operators understand get used; abstract codes do not.' },
      { title: 'Capture cost, not just count', description: 'A 100-part scrap event of a $2 part is different from a 5-part scrap event of a $300 part. The cost column drives the Pareto priority.' },
      { title: 'Review weekly, attack monthly', description: 'Weekly reviews keep the data fresh. Monthly improvement projects are paced for impact — pick one root cause and run a 30-day fix project.' },
      { title: 'Close the loop with verification', description: 'After each fix, the trend chart confirms whether scrap on that work center actually dropped. If not, the root cause was wrong.' }
    ],
    whenToUpgrade: [
      'Scrap volume makes manual logging unreliable — operators skip events because there is no time.',
      'You need scrap to be captured at the work-order level automatically, not in a separate spreadsheet.',
      'Cost data needs to flow back into job costing for accurate margin reporting.',
      'Multi-shift operations need the same log without paper handoffs.'
    ],
    faqs: [
      { question: 'What scrap rate is "normal" for manufacturing?', answer: 'It varies wildly by industry. Precision machining typically runs 1–3%. Plastic injection molding can run 0.5–2%. Food processing can run 5–10% due to yield variability. The right benchmark is your own trend — is scrap going down over time?' },
      { question: 'How do I calculate scrap rate correctly?', answer: 'Scrap rate = (scrap quantity ÷ total produced quantity) × 100. Always use the same units — pieces, pounds, gallons. The trap is calculating against "good parts" instead of "total parts" — that understates the problem.' },
      { question: 'Should I track scrap by part, by work center, or by operator?', answer: 'All three. By part identifies design issues. By work center identifies process issues. By operator identifies training gaps (and protects against blame culture — patterns across many operators usually mean a process problem).' },
      { question: 'What is the difference between scrap and rework?', answer: 'Scrap = part is unsalvageable, written off completely. Rework = part can be fixed with additional labor. Both cost money but the fix paths differ. Track them separately — combining them obscures the right action.' }
    ]
  },
  {
    slug: 'cycle-time-tracker',
    displayTitle: 'Cycle Time Tracker',
    category: 'Tracking',
    metaTitle: 'Free Cycle Time Tracker Excel Template (2026) — Manufacturing Cycle Time',
    metaDescription: 'Free cycle time tracker Excel template. Compare standard cycle time to actual, by operation and work center. Surface routing assumptions that no longer match reality.',
    metaKeywords: 'cycle time tracker excel, cycle time calculator, manufacturing cycle time template, standard vs actual cycle time, cycle time analysis excel',
    h1: 'Free Cycle Time Tracker Excel Template',
    subtitle: 'Compare what the routing says a job should take with what it actually takes. Most manufacturers find routings are 20–40% off reality — that is the biggest source of schedule misses.',
    tldr: 'Working cycle-time log with standard vs actual variance by operation. Captures the data needed to fix outdated routings before they cause customer impact.',
    introParagraphs: [
      'Cycle time is the foundation everything else builds on. If your routing says operation 3 takes 45 minutes and it actually takes 70, every promise date downstream is wrong by that gap multiplied by the queue. Inaccurate cycle times are the silent killer of manufacturing schedules.',
      'Most shops set cycle times once — usually 5+ years ago — and never revisit them. Tooling improves, programs get tuned, operators get faster. The routing standards rot in the ERP. This template gives you a structured way to compare reality to standard, operation by operation, until you have the data to update the routings.',
      'A 30-day capture window for the top 20 routings is usually enough. The pattern emerges quickly: some operations are 30% faster than standard, some are 50% slower. Both directions matter. After the routings are updated, RMX or RMDB can capture cycle time automatically from shop floor moves, eliminating the manual log.'
    ],
    whatsInside: [
      { title: 'Cycle-time observation log', description: 'Date, work order, part, operation, work center, operator, standard time, actual time, variance, and notes.' },
      { title: 'Standard-vs-actual variance', description: 'Auto-calculated % variance per row. Color-coded: green if within 10%, amber 10–25%, red beyond 25%.' },
      { title: 'Operation-level rollup', description: 'Average actual cycle time per operation, with sample size. Lets you trust the data — 3 observations is noise, 30 is signal.' },
      { title: 'Routing-update worksheet', description: 'Top variance operations sorted by impact (variance × frequency). This is your routing-correction priority list.' },
      { title: 'Operator effect filter', description: 'Filter cycle time by operator to identify training gaps without exposing individuals (the data drives a group conversation, not a callout).' },
      { title: 'Bottleneck detection', description: 'Operations where actual cycle time is significantly higher than the next operation downstream — usually the real bottleneck.' }
    ],
    howToUseSteps: [
      { title: 'Pick 20 routings to start', description: 'Trying to track every routing fails. Pick the top 20 by volume or revenue — that covers 80% of your throughput.' },
      { title: 'Use stopwatch or shop-floor stamps', description: 'Either is fine. The discipline matters more than the precision. A stopwatch observation by a supervisor once per shift is enough to build a meaningful sample.' },
      { title: 'Gather 30+ observations per operation', description: 'Less than 30 and you cannot distinguish noise from signal. The variance column lights up red on individual rows but you only act on the operation-level rollup.' },
      { title: 'Update the routing in your ERP', description: 'Once an operation has a stable 30+ observation set, update the routing standard in your ERP. Then the schedule starts matching reality.' }
    ],
    whenToUpgrade: [
      'You want cycle times captured automatically from shop floor scan-in/scan-out, not from stopwatch.',
      'Standard vs actual variance needs to feed back into scheduling decisions in real time.',
      '20-routing manual sample no longer covers enough of your business as part mix grows.',
      'You need cycle-time data to drive continuous improvement projects, not just refresh routings.'
    ],
    faqs: [
      { question: 'What is the difference between cycle time and takt time?', answer: 'Cycle time is how long an operation actually takes to produce one unit. Takt time is the rate at which you must produce one unit to meet customer demand. Cycle time < takt time = you can keep up. Cycle time > takt time = you are falling behind no matter how hard you push.' },
      { question: 'How many observations do I need before updating a routing?', answer: '30 minimum. Anything less and you are reacting to noise. The exception: if every one of 5 observations is dramatically different from standard in the same direction, that is signal — but treat it as a flag to gather more data.' },
      { question: 'What if cycle times vary by operator?', answer: 'Operator-driven variance signals one of two things: training gap (consistent slow performer) or technique difference (some operators have a better method). Both are improvement opportunities — the spread is the lesson.' },
      { question: 'How often should I refresh cycle time standards?', answer: 'Annually at minimum for any routing that runs regularly. After any major change — new tooling, new program, new fixture — re-baseline immediately. Routings that have not been touched in 5+ years are almost certainly wrong.' }
    ]
  },
  {
    slug: 'material-yield-tracker',
    displayTitle: 'Material Yield Tracker',
    category: 'Tracking',
    metaTitle: 'Free Material Yield Tracker Excel Template (2026) — Manufacturing Yield Log',
    metaDescription: 'Free material yield tracker Excel template. Calculate yield % per job, identify yield losses, and surface the material cost of process inefficiency.',
    metaKeywords: 'material yield tracker excel, yield calculator manufacturing, yield analysis template, manufacturing yield excel, material loss tracker',
    h1: 'Free Material Yield Tracker Excel Template',
    subtitle: 'Track material in vs material out for every job. Yield losses are the most invisible cost in manufacturing — usually 5–15% of material spend, hidden in plain sight.',
    tldr: 'Working yield tracker that compares standard yield (from routing/BOM) to actual yield per job, with cost impact. The data needed to attack the largest hidden material cost in most shops.',
    introParagraphs: [
      'Material yield is the ratio of usable material out of an operation to material put in. A 95% yield sounds good until you realize 5% on $4M of annual material spend is $200K — usually larger than the entire continuous improvement budget.',
      'Yield problems hide because the material was "consumed" — gone from inventory, paid for, accounted for. Whether it became product or became scrap is often not distinguished. This template forces that distinction job by job, surfacing yield losses that the ERP rolls into "material variance" without explanation.',
      'A 60-day capture window across your top routings is usually enough to identify the 3–5 operations with the biggest yield gap. Fixing those is the highest-ROI material cost project most shops never do because they cannot see the size of the prize.'
    ],
    whatsInside: [
      { title: 'Yield event log', description: 'Job, part, operation, material in (qty/weight), material out (qty/weight), yield %, standard yield %, variance, and cost impact.' },
      { title: 'Yield by operation rollup', description: 'Average actual yield per operation with sample size. Identifies the operations consistently underperforming standard.' },
      { title: 'Cost impact calculator', description: 'Yield gap × material unit cost × annual volume = annual cost of the yield gap. This number gets people to act.' },
      { title: 'Top 10 yield loss drivers', description: 'Sorted by annualized cost, not by variance %. A small % gap on a high-volume part beats a big % gap on a low-volume one.' },
      { title: 'Process-vs-standard chart', description: 'Visual comparison of yield by operation against routing standard. Routings that drift below standard for 90+ days need updating or process intervention.' },
      { title: 'Material-input variance', description: 'Flags jobs where input material exceeded BOM — often the first signal of scrap being absorbed into yield loss.' }
    ],
    howToUseSteps: [
      { title: 'Define the input/output for each operation', description: 'For machining: pounds of stock vs pounds of finished part. For chemistry: gallons in vs gallons of usable product out. Be explicit before logging.' },
      { title: 'Capture at the operation, not the job', description: 'Job-level yield obscures which operation lost the material. The granularity of operation-level capture is what makes the data actionable.' },
      { title: 'Run weekly Pareto by cost impact', description: 'Variance % alone misranks priorities. The cost-impact column is what drives the improvement project list.' },
      { title: 'Pair yield data with scrap data', description: 'Yield losses and scrap events are usually the same problem viewed from different angles. Reviewing them together surfaces root causes faster.' }
    ],
    whenToUpgrade: [
      'Yield capture per job becomes unsustainable manual work as job volume grows.',
      'You need yield data fed back into BOM and routing standards automatically.',
      'Cost impact rollups need to drive financial reporting, not sit in a separate spreadsheet.',
      'Quality and production teams need a shared view of yield with real-time updates.'
    ],
    faqs: [
      { question: 'What is the difference between yield and scrap rate?', answer: 'Scrap is parts produced that fail quality and get thrown out. Yield is the ratio of usable output to material input — it captures both scrap AND material lost in process (shavings, evaporation, trim waste, etc.). Yield is the broader number; scrap is a subset.' },
      { question: 'How do I set realistic yield standards?', answer: 'Use the actual data from 90 days of capture as the starting baseline, then negotiate up. The routing standard from 10 years ago is almost certainly wrong — either too generous or too tight. Anchor on observed reality, then improve.' },
      { question: 'What yield % should I target?', answer: 'Industry-specific. Precision machining: 80–90% is common. Plastic injection: 95–98% is achievable with good mold design. Chemical processing: highly variable. Your benchmark is your own trend, not an industry average.' },
      { question: 'Why does yield loss hide in the ERP?', answer: 'ERP "material variance" rolls yield loss, scrap, miscounts, and theft into one number. Without operation-level capture, you cannot tell which is which. This template separates yield from the rest so you can attack it.' }
    ]
  },
  {
    slug: 'setup-time-tracker',
    displayTitle: 'Setup Time Tracker',
    category: 'Tracking',
    metaTitle: 'Free Setup Time Tracker Excel Template (2026) — Changeover & SMED Tracking',
    metaDescription: 'Free setup time tracker Excel template. Log setup/changeover time by job and machine. Identify SMED opportunities and reduce setup time 30%+.',
    metaKeywords: 'setup time tracker excel, changeover tracker template, smed excel, setup reduction worksheet, changeover time log, setup time analysis',
    h1: 'Free Setup Time Tracker Excel Template',
    subtitle: 'Log every setup and changeover. Compare standard to actual. Most shops cut setup time 30%+ once they can see the pattern of where time is actually being spent.',
    tldr: 'Working setup-time log structured for SMED analysis. Separates internal time (machine stopped) from external time (machine could be running) — the foundation of every setup-reduction project.',
    introParagraphs: [
      'Setup time is the cleanest target in any manufacturing improvement program. Unlike cycle time (limited by physics) or yield (limited by material), setup time is almost always reducible — the only question is how much. Shops that systematically attack setup typically cut it 30–60% in the first year.',
      'The unlock is SMED (Single-Minute Exchange of Die) discipline: separate internal setup (must happen while the machine is stopped) from external setup (can happen while the previous job runs). Most shops mix the two and lose 20–40% of setup time to "external" tasks done internally — finding tools, walking to the supply room, looking up programs.',
      'This template gives you the smallest workable structure to enable SMED analysis: every setup event logged with start time, end time, internal vs external task breakdown, and notes on what specifically caused delay. After 30 days of disciplined logging, the patterns are obvious.'
    ],
    whatsInside: [
      { title: 'Setup event log', description: 'Job from/to, machine, operator, setup start, setup end, total time, standard time, variance, and notes.' },
      { title: 'Internal/external task breakdown', description: 'For each setup, break time into internal (machine down) and external (machine could have been running) sub-tasks.' },
      { title: 'Setup variance by machine', description: 'Identifies machines where setup time consistently exceeds standard. These are the SMED project candidates.' },
      { title: 'Top 10 delay reasons', description: 'Coded reasons (tool search, program load, fixture issue, material wait, operator question) sorted by total time lost.' },
      { title: 'SMED conversion candidates', description: 'Tasks currently done internally that could be moved external — sorted by minutes saved per setup × setups per month.' },
      { title: 'Setup reduction trend', description: 'Month-over-month average setup time per machine. Tracks whether SMED projects are actually working.' }
    ],
    howToUseSteps: [
      { title: 'Time the next 5 setups on one machine', description: 'Start with one bottleneck machine. Get a baseline. Trying to track every setup on every machine immediately is the fastest way to abandon the system.' },
      { title: 'Separate internal vs external during observation', description: 'A simple checkbox per sub-task: is the machine stopped while this happens? Yes = internal. No = external. That distinction drives 90% of the value.' },
      { title: 'Pick one external-conversion opportunity', description: 'From the Pareto, pick one task that is currently done internally and could be done externally. Build a 30-day project to make it external.' },
      { title: 'Measure the result and pick the next one', description: 'After the conversion, observe 5 more setups. The trend column confirms the gain. Pick the next opportunity. Cycle.' }
    ],
    whenToUpgrade: [
      'Setup events become too frequent to time manually — the data gets stale.',
      'You want setup time captured automatically from machine signals (start/stop times).',
      'SMED project results need to flow back into routing standards, not just live in a spreadsheet.',
      'Multi-machine, multi-shift coordination of setup tracking exceeds what one supervisor can manage.'
    ],
    faqs: [
      { question: 'What is SMED and how does this template support it?', answer: 'SMED (Single-Minute Exchange of Die) is a methodology for reducing setup time by separating internal tasks (require the machine to be stopped) from external tasks (can be done while the machine runs the previous job). The template forces that separation on every logged event.' },
      { question: 'How long should a "good" setup take?', answer: 'It depends on equipment and complexity. The right benchmark is your own trend, not an industry number. A shop that cuts average setup from 90 minutes to 50 minutes wins regardless of whether competitor benchmarks say 30 minutes.' },
      { question: 'Should I track setup time on every machine?', answer: 'No — start with bottleneck machines. Setup time on a non-bottleneck machine is mostly cost; setup time on a bottleneck machine is also throughput. Always go after bottlenecks first.' },
      { question: 'How is setup time different from changeover time?', answer: 'In most shops they mean the same thing — the time between the last good part of job A and the first good part of job B. Some shops distinguish "changeover" as the cleaning/teardown portion only. Use whatever terminology your operators use; consistency matters more than the label.' }
    ]
  },
  // ===========================================================================
  // GROUP 2 — QUALITY (6)
  // ===========================================================================
  {
    slug: 'quality-inspection-log',
    displayTitle: 'Quality Inspection Log',
    category: 'Quality',
    metaTitle: 'Free Quality Inspection Log Excel Template (2026) — Manufacturing QC',
    metaDescription: 'Free quality inspection log Excel template. Record incoming, in-process, and final inspections with pass/fail and disposition. Built for ISO 9001 / AS9100 traceability.',
    metaKeywords: 'quality inspection log excel, qc log template, manufacturing inspection record, inspection sheet excel, qc tracking spreadsheet',
    h1: 'Free Quality Inspection Log Excel Template',
    subtitle: 'Record every inspection — incoming, in-process, final — with disposition, signatures, and traceability. Built for the audit trail ISO 9001 and AS9100 require.',
    tldr: 'Working inspection log with three tabs (incoming, in-process, final), conditional formatting for failed dispositions, and a monthly rollup. Use it as your QC system until volume justifies an eQMS.',
    introParagraphs: [
      'Every quality system, no matter how sophisticated, comes back to one question: did you inspect, and what did you find? An inspection log is the substrate of every other quality artifact — corrective actions, supplier scorecards, customer complaints. Without it, the system is hollow.',
      'Most small shops run inspection logs on paper or in tab-per-month Excel workbooks that nobody can analyze. This template gives you the smallest workable structure: incoming inspection (supplier material), in-process inspection (between operations), and final inspection (before ship). Each row has the fields auditors look for: date, item, supplier or work order, sample size, results, disposition, inspector.',
      'For an ISO 9001 or AS9100 shop running fewer than 200 inspections a day, this template handles the audit trail. Beyond that, an eQMS makes sense. RMDB can wire inspection data directly into job records so the log stays tied to production reality.'
    ],
    whatsInside: [
      { title: 'Incoming inspection tab', description: 'Date, PO, supplier, item, lot, sample size, pass/fail, disposition (accept/reject/rework), inspector, notes.' },
      { title: 'In-process inspection tab', description: 'Date, work order, operation, sample size, characteristics inspected, results, pass/fail, inspector.' },
      { title: 'Final inspection tab', description: 'Date, work order, item, customer, sample size, characteristics, results, disposition, customer-specific requirements flag.' },
      { title: 'Failed-disposition rollup', description: 'All failed inspections from any tab in one view, with corrective action link column.' },
      { title: 'Monthly summary', description: 'Total inspections, pass rate by category, top 5 failure modes. The data you bring to management review.' },
      { title: 'Audit-ready format', description: 'Columns laid out to match the evidence an ISO 9001 / AS9100 auditor expects to see.' }
    ],
    howToUseSteps: [
      { title: 'Define what gets inspected vs not', description: 'You cannot inspect everything. Define the sampling plan upfront — first article, every nth piece, every lot, etc. The template documents what you committed to.' },
      { title: 'Train inspectors on the disposition rules', description: 'Accept, reject, rework, use-as-is — each disposition has rules. Train inspectors to apply them consistently, especially "use-as-is" which always requires engineering approval.' },
      { title: 'Tie every failed inspection to a corrective action', description: 'A failed inspection without a CA is just a complaint. The link column forces the discipline of opening a CA when needed.' },
      { title: 'Review monthly with quality and production', description: 'The monthly summary is the input to management review. Trends matter more than individual events.' }
    ],
    whenToUpgrade: [
      'Inspection volume exceeds 200/day and Excel updates slow to a crawl.',
      'Auditors require electronic signatures and 21 CFR Part 11 compliance for medical / pharma.',
      'You need inspection records linked directly to work orders and traceability lots.',
      'Multi-site quality system requires shared real-time inspection data.'
    ],
    faqs: [
      { question: 'Does this template meet ISO 9001 documentation requirements?', answer: 'Yes for the inspection-record requirement. ISO 9001 expects you to document what was inspected, by whom, when, the result, and the disposition. The template captures all of those. Other ISO requirements (procedures, management review, CAPA) need separate documents.' },
      { question: 'What sample size should I use?', answer: 'Depends on industry. For non-critical commercial parts, 1-out-of-50 or AQL-based sampling is common. For aerospace or medical, 100% inspection of critical characteristics is standard. The template does not enforce sample size — your quality plan does.' },
      { question: 'How do I handle "use-as-is" dispositions?', answer: 'Use-as-is is a deviation from spec accepted by engineering and (often) the customer. The template flags use-as-is rows and requires an approver signature column. Without that discipline, use-as-is becomes a workaround that hides recurring problems.' },
      { question: 'How long do I need to keep inspection records?', answer: 'Industry-specific. ISO 9001 minimum is typically 3 years. AS9100 typically requires 7+ years. Medical device requires the lifetime of the device + 2 years. FDA requires GMP records for the regulatory period. Check your specific requirements.' }
    ]
  },
  {
    slug: 'nonconformance-tracker',
    displayTitle: 'Nonconformance Tracker',
    category: 'Quality',
    metaTitle: 'Free Nonconformance Tracker Excel Template (2026) — NCR Log',
    metaDescription: 'Free nonconformance report (NCR) tracker Excel template. Log NCRs with disposition, root cause, and corrective action linkage. ISO 9001 / AS9100 ready.',
    metaKeywords: 'nonconformance tracker excel, ncr log template, ncr excel, nonconformance report template, ncr tracking spreadsheet, quality nonconformance log',
    h1: 'Free Nonconformance Tracker (NCR Log) Excel Template',
    subtitle: 'Log every nonconformance — supplier, in-process, customer-returned. Track disposition, root cause, and corrective action linkage. Built for ISO 9001 traceability.',
    tldr: 'Working NCR log with disposition workflow (accept / reject / rework / scrap), root cause analysis fields, and CA linkage. The substrate of an ISO 9001 quality system.',
    introParagraphs: [
      'A nonconformance is any deviation from specification — a supplier shipped the wrong material, an in-process inspection failed, a customer returned a defective part. The NCR log is the central evidence that you noticed, decided what to do, and (sometimes) prevented recurrence.',
      'Most quality systems fail not from lack of NCRs but from lack of follow-through. NCRs get logged, dispositioned, and forgotten. The same nonconformance recurs next month. The root-cause analysis column is what separates a useful NCR log from an event diary.',
      'This template enforces that discipline: every NCR has a root-cause field (even "unknown" is a valid answer that flags the row for follow-up), and a corrective-action link column that ties the NCR to the CA workflow. Tracked over 90 days, the patterns drive the improvement project list.'
    ],
    whatsInside: [
      { title: 'NCR event log', description: 'NCR number, date, source (supplier/in-process/customer), item, quantity, description, severity, disposition, root cause, CA linkage.' },
      { title: 'Disposition workflow', description: 'Accept / reject / rework / scrap / use-as-is — each with required signature fields and a return-to-supplier flag where applicable.' },
      { title: 'Root cause categorization', description: '5M categories: Man, Machine, Material, Method, Measurement. Free-text root cause underneath the category.' },
      { title: 'CA linkage tracker', description: 'NCRs requiring corrective action are flagged with the CA number; rollup shows open CAs aging beyond target.' },
      { title: 'NCR Pareto by source', description: 'Where are NCRs coming from? Suppliers, in-process operations, customers. Drives the supplier development and process improvement priorities.' },
      { title: 'Monthly trend chart', description: 'NCR count by month, by source. Track whether quality is actually improving over time.' }
    ],
    howToUseSteps: [
      { title: 'Define what triggers an NCR', description: 'Not every defect needs an NCR — but every NCR-eligible event needs one. Define the threshold upfront (e.g., any failed final inspection, any customer return, any supplier reject batch).' },
      { title: 'Assign NCR numbers sequentially', description: 'A simple YYYY-NNNN format works. Auditors expect to see sequential numbering with no gaps — gaps suggest deletions and trigger questions.' },
      { title: 'Force a root cause within 5 business days', description: 'Open NCRs without a root cause are dead. Set a 5-day SLA. "Unknown — under investigation" is acceptable for week one; not after that.' },
      { title: 'Close the loop with CA verification', description: 'When a CA closes, the NCR rollup should show the recurrence trend for that root cause. If recurrence continues, the CA did not work.' }
    ],
    whenToUpgrade: [
      'NCR volume exceeds 50/month and root-cause analysis falls behind.',
      'Multi-site operations need shared real-time NCR visibility.',
      'Auditors require electronic signatures and 21 CFR Part 11 for regulated environments.',
      'NCR data needs to drive supplier scorecards, customer reporting, and continuous improvement automatically.'
    ],
    faqs: [
      { question: 'What is the difference between an NCR and a defect?', answer: 'A defect is any deviation from spec. An NCR is a formal record opened when the defect warrants disposition and root-cause analysis. Most shops do not open an NCR for every defect — only for ones above a severity threshold or that affect customer-facing product.' },
      { question: 'How fast does a root cause need to be identified?', answer: 'ISO 9001 does not specify, but auditors will ask. A reasonable internal SLA is 5 business days for "preliminary root cause" and 30 days for "confirmed root cause with corrective action." NCRs older than 60 days without root cause raise audit flags.' },
      { question: 'Should I link every NCR to a corrective action?', answer: 'No — not every NCR requires a CA. Severity matters. A one-off supplier defect that was caught at incoming inspection might not need a CA. A recurring in-process defect with customer impact definitely does. The flag column makes the decision explicit.' },
      { question: 'How does this template support ISO 9001 / AS9100?', answer: 'It satisfies the "documented information of nonconformities" requirement in both standards. The disposition workflow, root cause field, and CA linkage create the traceability auditors expect. The template does not satisfy other clauses (management review, internal audit, etc.) — those are separate documents.' }
    ]
  },
  {
    slug: 'corrective-action-log',
    displayTitle: 'Corrective Action Log',
    category: 'Quality',
    metaTitle: 'Free Corrective Action (CAPA) Log Excel Template (2026)',
    metaDescription: 'Free corrective action and CAPA log Excel template. Track corrective actions through 8D / 5-Why methodology with effectiveness verification.',
    metaKeywords: 'corrective action log excel, capa log template, 8d corrective action excel, 5 why template, capa tracking spreadsheet, quality corrective action template',
    h1: 'Free Corrective Action (CAPA) Log Excel Template',
    subtitle: 'Track every corrective action from problem statement to effectiveness verification. Built around 8D / 5-Why methodology. Closes the loop on quality issues.',
    tldr: 'Working CAPA log structured for 8D discipline: problem definition, containment, root cause (5-Why), corrective action, preventive action, verification. The system that turns NCRs into actual improvement.',
    introParagraphs: [
      'A corrective action is the bridge between a quality event and not having that event again. Most CAPA systems fail at the same place: the corrective action is implemented but never verified for effectiveness. The problem recurs, a new CAPA is opened, and the cycle repeats.',
      'This template enforces the effectiveness verification step. Every CAPA has a target verification date and a verification result column. Until that column is filled with "effective" or "ineffective + re-open," the CAPA stays open in the rollup.',
      'The structure follows the 8D discipline that most quality systems converge to: define, contain, root cause, correct, prevent, verify. Free-text fields give space for the substance; the workflow columns enforce that no step gets skipped. After 90 days of disciplined use, the CAPA log becomes the most-referenced document in management review.'
    ],
    whatsInside: [
      { title: 'CAPA log', description: 'CAPA number, source NCR/event, problem statement, severity, owner, target completion, status.' },
      { title: '8D workflow columns', description: 'D1 (team), D2 (problem definition), D3 (containment), D4 (root cause), D5 (corrective action), D6 (implement), D7 (prevent), D8 (verify).' },
      { title: '5-Why analysis worksheet', description: 'A separate tab per CAPA for the 5-Why drill-down. Forces the discipline of going past symptom to system cause.' },
      { title: 'Containment action tracker', description: 'What was done immediately to prevent the issue from reaching customers? Date stamped and signed.' },
      { title: 'Effectiveness verification', description: 'The most important column. Target verification date, verification method, actual result. CAPAs without verification are not closed.' },
      { title: 'Aging report', description: 'Open CAPAs sorted by age. Anything past target date is flagged red. Management review focuses here.' }
    ],
    howToUseSteps: [
      { title: 'Open one CAPA per root cause, not per event', description: 'Multiple NCRs with the same root cause = one CAPA covering all of them. Multiple CAPAs for the same cause splits effort and obscures the trend.' },
      { title: 'Force 5-Why before action', description: 'Quality teams jump to corrective action too fast. The 5-Why worksheet enforces the discipline of asking "why" five times before deciding what to fix. Otherwise you fix symptoms.' },
      { title: 'Set verification dates at CAPA opening', description: 'Decide upfront how you will verify the CA worked, and by when. Verification methods include trend analysis, follow-up audit, customer feedback, or repeat of the failed scenario.' },
      { title: 'Close only on verified effectiveness', description: 'A CAPA where the action was implemented but the problem recurred is not closed — it gets re-opened with a new 5-Why. This is the discipline that prevents the same issue from showing up every quarter.' }
    ],
    whenToUpgrade: [
      'CAPA volume exceeds 20 open at a time and Excel becomes unwieldy.',
      'You need CAPAs linked directly to NCRs, audits, and customer complaints in one system.',
      'Multi-site operations require shared real-time CAPA status.',
      'Regulatory environments (FDA, AS9100, ISO 13485) require validated electronic systems.'
    ],
    faqs: [
      { question: 'What is the difference between corrective and preventive action?', answer: 'Corrective action addresses an existing problem (something already happened). Preventive action addresses a potential problem (something has not happened yet but the data suggests it might). Both belong in a CAPA system; many shops underweight preventive action.' },
      { question: 'How does 8D differ from 5-Why?', answer: '5-Why is a root-cause analysis technique (one column in the CAPA process). 8D is a full problem-solving methodology that includes 5-Why plus team formation, containment, action implementation, prevention, and verification. The template uses 8D as the overall workflow with 5-Why as the root-cause sub-step.' },
      { question: 'How long should a CAPA take to close?', answer: 'Depends on complexity. Simple containment-only CAPAs can close in days. Full root-cause-and-prevention CAPAs typically take 30–90 days. Anything over 90 days needs scrutiny — is the action ineffective, or is the team avoiding the harder questions?' },
      { question: 'What if verification shows the corrective action did not work?', answer: 'Re-open the CAPA. The 5-Why goes deeper. The new corrective action attacks a different layer. Verification fails are valuable data — they tell you the root cause analysis was wrong, not that the system failed.' }
    ]
  },
  {
    slug: 'first-article-inspection',
    displayTitle: 'First Article Inspection (FAI)',
    category: 'Quality',
    metaTitle: 'Free First Article Inspection (FAI) Excel Template (2026) — AS9102 Compatible',
    metaDescription: 'Free First Article Inspection (FAI) Excel template. AS9102-aligned format for aerospace and precision manufacturing. Forms 1, 2, and 3 included.',
    metaKeywords: 'first article inspection excel, fai template, as9102 fai excel, first article inspection report template, aerospace fai template',
    h1: 'Free First Article Inspection (FAI) Excel Template',
    subtitle: 'AS9102-aligned FAI template for aerospace and precision manufacturing. Forms 1 (article info), 2 (raw material), and 3 (characteristic accountability) in one workbook.',
    tldr: 'Working FAI template structured for AS9102 compliance: part identification, raw material certification, and characteristic-by-characteristic verification. Used by manufacturers who supply aerospace, defense, and high-precision customers.',
    introParagraphs: [
      'First Article Inspection (FAI) is the formal verification that the first production article meets every drawing requirement. AS9102 is the aerospace standard for what an FAI report must contain. Suppliers who cannot produce a clean FAI lose customers; suppliers who can build it as a competitive advantage.',
      'Most FAI reports fail not from missing inspections but from missing documentation. A characteristic was inspected but not recorded. A drawing revision was used but not noted. A raw material certificate was reviewed but not attached. AS9102 auditors look for the documentation trail; this template builds it.',
      'The three-form structure mirrors AS9102 Forms 1, 2, and 3 exactly. Use it for AS9100 customers, defense customers, medical-device suppliers, and any high-precision shop where the customer expects a formal FAI on first production article.'
    ],
    whatsInside: [
      { title: 'Form 1 — Part number accountability', description: 'Part number, revision, serial number, drawing rev, manufacturer name and cage code, customer name, FAI date, signed by.' },
      { title: 'Form 2 — Product accountability', description: 'Raw material verification: lot, certificate, supplier, specification. Special process verification: heat treat, plating, NDT.' },
      { title: 'Form 3 — Characteristic accountability', description: 'Every drawing characteristic listed with: characteristic number, requirement (nominal + tolerance), actual measurement, accept/reject, balloon reference.' },
      { title: 'Balloon-numbered drawing reference', description: 'Worksheet for capturing which characteristic on the drawing corresponds to each row of Form 3.' },
      { title: 'Variance and disposition', description: 'For any nonconforming characteristic: disposition (accept/reject/rework/use-as-is) and approval signature.' },
      { title: 'Customer-specific addendums', description: 'Tab for customer-specific FAI requirements that exceed AS9102 baseline.' }
    ],
    howToUseSteps: [
      { title: 'Balloon the drawing first', description: 'Before FAI starts, every drawing characteristic gets a balloon number. The FAI inspector works from the ballooned drawing — every balloon = one row in Form 3.' },
      { title: 'Verify raw material before machining', description: 'Form 2 raw material verification happens before the first chip is cut. Material certificates get attached to the FAI package before production starts.' },
      { title: 'Inspect every characteristic, not just critical', description: 'AS9102 requires every characteristic, not just critical ones. The discipline matters — partial FAI reports get rejected and the part is reworked.' },
      { title: 'Include the FAI in the work order packet', description: 'For customers requiring FAI on every lot, the FAI travels with the work order. For customers requiring FAI only on first production, the FAI gets stored against the part number for future reference.' }
    ],
    whenToUpgrade: [
      'FAI volume justifies dedicated FAI software with drawing markup integration.',
      'Customers require electronic FAI submission via NetInspect, InspectionXpert, or similar systems.',
      'Multi-site FAI coordination needs shared real-time status.',
      'FAI data needs to flow into supplier scorecard and PPAP packages automatically.'
    ],
    faqs: [
      { question: 'What is AS9102 and when do I need to comply?', answer: 'AS9102 is the aerospace industry standard for First Article Inspection. You need to comply if you supply parts to an aerospace customer — most aerospace primes (Boeing, Lockheed, Northrop, Airbus) require AS9102-compliant FAI on first production article and after any significant change.' },
      { question: 'When does FAI need to be re-done?', answer: 'AS9102 requires re-FAI after: a 2-year gap in production, a process change, an equipment change, a drawing revision, a material change, or a discrepancy in production. The template documents which trigger applies for each FAI.' },
      { question: 'Do I need to do FAI on every part I make?', answer: 'No — only on first production article. After the FAI passes, normal in-process and final inspection takes over. The exception is some customers require FAI on every lot — check your contract.' },
      { question: 'What if a characteristic is out of tolerance during FAI?', answer: 'Document the variance, disposition it (typically reject — the first article should meet every requirement), and rework or scrap the part. Out-of-tolerance characteristics on FAI are a process signal, not just a part issue — investigate the root cause before continuing production.' }
    ]
  },
  {
    slug: 'spc-control-chart',
    displayTitle: 'SPC Control Chart',
    category: 'Quality',
    metaTitle: 'Free SPC Control Chart Excel Template (2026) — X-Bar / R Charts',
    metaDescription: 'Free Statistical Process Control (SPC) Excel template with X-bar and R charts. Calculate control limits, identify out-of-control signals, monitor process stability.',
    metaKeywords: 'spc control chart excel, x bar r chart template, statistical process control excel, control chart template, spc excel calculator, process control chart',
    h1: 'Free SPC Control Chart Excel Template (X-Bar / R)',
    subtitle: 'X-bar and R control charts with auto-calculated limits, Western Electric rule violations, and Cpk capability analysis. The foundation of every SPC program.',
    tldr: 'Working SPC chart template: enter your subgroup data, get X-bar and R charts with control limits, out-of-control signal detection, and capability analysis (Cp, Cpk, Pp, Ppk).',
    introParagraphs: [
      'Statistical Process Control distinguishes signal from noise. Every process varies; the question is whether that variation is normal (in control) or signals a change worth investigating (out of control). Control charts answer that question with discipline.',
      'Most shops know SPC matters but never start because the math feels intimidating. This template hides the math behind a structured input grid: enter subgroup measurements, get charts. The Western Electric rules detect out-of-control signals automatically.',
      'For day-to-day shop floor use, X-bar and R is the workhorse — the chart that operators actually maintain. After 25 subgroups, the control limits stabilize and the chart becomes a real signal generator. Cpk capability shows whether the process meets specification, separate from whether it is in control.'
    ],
    whatsInside: [
      { title: 'Subgroup data entry', description: 'Enter up to 5 measurements per subgroup, up to 50 subgroups. Standard size for X-bar and R charts.' },
      { title: 'X-bar chart with limits', description: 'Subgroup averages plotted with UCL and LCL automatically calculated from D and A constants.' },
      { title: 'R chart with limits', description: 'Subgroup ranges plotted with UCL and LCL. Detects variation changes the X-bar chart misses.' },
      { title: 'Western Electric rule alerts', description: 'Automatic detection of: points beyond limits, 2 of 3 beyond 2σ, 4 of 5 beyond 1σ, 8 in a row on one side of center. Each flag is colored on the chart.' },
      { title: 'Cp / Cpk capability', description: 'Process capability calculation against your specification limits. Cpk < 1.0 = process incapable; Cpk > 1.33 = process capable; Cpk > 1.67 = process highly capable.' },
      { title: 'Pp / Ppk performance', description: 'Long-term capability using all data variation. Comparison to Cp/Cpk surfaces whether subgroup-based capability is misleading.' }
    ],
    howToUseSteps: [
      { title: 'Pick the right characteristic', description: 'SPC on every dimension is overkill. Pick the critical-to-quality characteristics — the ones where variation hurts customer-facing quality. Start with 1–3 per process.' },
      { title: 'Establish baseline with 25+ subgroups', description: 'Control limits calculated from fewer than 25 subgroups are unstable. Run the process and collect data before drawing lines. The limits define "normal" — they need real data to mean anything.' },
      { title: 'Train operators to react to signals', description: 'A chart that nobody reacts to is wallpaper. When an out-of-control signal fires, the operator stops, investigates, and documents. The chart is the trigger; the action is the value.' },
      { title: 'Re-baseline after process changes', description: 'New machine, new operator, new material lot, new tooling — re-establish control limits. Carrying old limits forward after a change makes the chart misleading.' }
    ],
    whenToUpgrade: [
      'You need SPC on dozens of characteristics across multiple processes — Excel becomes unmanageable.',
      'Operators need real-time SPC charts on shop floor terminals, not a once-per-shift refresh.',
      'You want process capability data to flow into customer reporting and quarterly business reviews automatically.',
      'Customer requirements (medical, aerospace) demand validated SPC software with audit trail.'
    ],
    faqs: [
      { question: 'What is the difference between Cp and Cpk?', answer: 'Cp measures whether the process spread fits inside the specification spread, assuming the process is centered. Cpk also accounts for whether the process is actually centered. Cpk is always ≤ Cp. A process with Cp = 2.0 and Cpk = 1.0 has good spread but is off-center; the fix is to recenter, not to reduce variation.' },
      { question: 'When does a control chart say my process is "out of control"?', answer: 'When one or more Western Electric rules fire: a point beyond 3σ, 2 of 3 beyond 2σ on the same side, 4 of 5 beyond 1σ on the same side, or 8 in a row on the same side of center. The template flags these automatically.' },
      { question: 'Why X-bar and R instead of individual values?', answer: 'X-bar and R uses subgroups (typically 3–5 measurements per subgroup) to reduce noise. Within-subgroup variation estimates short-term process spread; between-subgroup variation surfaces real shifts. Individuals charts are useful when you cannot subgroup (e.g., chemistry batches), but X-bar / R is more sensitive.' },
      { question: 'How often should I re-calculate control limits?', answer: 'After any major process change (equipment, material, method). Otherwise, leave them stable for at least 3 months. Re-calculating limits every week defeats the purpose — limits should reflect the current capable state of the process, not the trailing average.' }
    ]
  },
  {
    slug: 'customer-complaint-tracker',
    displayTitle: 'Customer Complaint Tracker',
    category: 'Quality',
    metaTitle: 'Free Customer Complaint Tracker Excel Template (2026)',
    metaDescription: 'Free customer complaint tracker Excel template. Log complaints, link to root cause, track corrective action, and report on resolution metrics.',
    metaKeywords: 'customer complaint tracker excel, complaint log template, customer complaint excel, complaint tracking spreadsheet, voc tracker, complaint resolution log',
    h1: 'Free Customer Complaint Tracker Excel Template',
    subtitle: 'Log every complaint with severity, root cause, resolution, and customer satisfaction follow-up. Convert complaints from PR damage into the most reliable quality signal you have.',
    tldr: 'Working customer complaint log with severity classification, RCA linkage, resolution tracking, and trend analysis. The system that converts complaint volume into actionable improvement.',
    introParagraphs: [
      'Customer complaints are the highest-signal quality data any manufacturer gets — and the most underused. A customer who complains is telling you exactly what they care about, where you are failing, and (usually) what would satisfy them. Most shops respond, resolve, and forget. The pattern across complaints is the gold.',
      'This template forces structure on complaint capture: severity (does it affect safety, ship date, or just convenience?), category (defect, delivery, billing, service), root-cause linkage, resolution date, and customer satisfaction follow-up. Each field exists because dropping it costs information.',
      'After 90 days of disciplined logging, the Pareto by category and root cause is unmissable. Most shops discover that 60–70% of complaints concentrate in 3–4 patterns — fix those and complaint volume drops dramatically. The template makes that analysis trivial.'
    ],
    whatsInside: [
      { title: 'Complaint event log', description: 'Date received, customer, complaint number, category, severity, description, owner, target resolution date, status.' },
      { title: 'Severity classification', description: 'Critical (safety/recall), High (ship-affecting), Medium (quality variance), Low (convenience). Each has an SLA for response.' },
      { title: 'Root-cause linkage', description: 'Every complaint requiring CA gets linked to the corrective action log. The link column tracks whether RCA was actually done.' },
      { title: 'Resolution tracker', description: 'Resolution date, what was done, customer-confirmed acceptance. Open complaints aging beyond SLA are flagged red.' },
      { title: 'Customer satisfaction follow-up', description: 'Post-resolution check: did the customer report the resolution worked? Most shops skip this step and miss the most important data point.' },
      { title: 'Pareto and trend', description: 'Complaint count by category and root cause, with 12-month rolling trend. The picture that drives improvement priorities.' }
    ],
    howToUseSteps: [
      { title: 'Capture every complaint, not just formal ones', description: 'A customer who calls and says "this part was off" is a complaint event, even without a formal complaint form. The template captures informal complaints separately so you do not under-count.' },
      { title: 'Acknowledge within SLA', description: 'Critical: same day. High: 1 business day. Medium: 3 days. Low: 5 days. The SLA column tracks acknowledgment date vs SLA. Late acknowledgments compound the original complaint.' },
      { title: 'Force a root cause for repeat complaints', description: 'If the same customer complains about the same issue twice, no root cause analysis = system failure. The template flags repeat complaints automatically.' },
      { title: 'Follow up after resolution', description: 'A complaint is closed only when the customer confirms the resolution worked. "We sent them a replacement" is not a closed complaint — "the customer received the replacement and accepted it" is.' }
    ],
    whenToUpgrade: [
      'Complaint volume exceeds 50/month and Excel rollups slow you down.',
      'You need complaints linked to CRM customer records and shipment data automatically.',
      'Multi-site customer service operations need shared real-time complaint visibility.',
      'Regulatory environments (medical device MDR, FDA) require validated complaint systems with audit trail.'
    ],
    faqs: [
      { question: 'What counts as a "complaint" for tracking purposes?', answer: 'Any expression of dissatisfaction by a customer about the product, service, or relationship. Informal complaints (a phone call) count as much as formal ones (an email or returned material). The template captures both — formal complaints are higher signal but informal ones surface earlier.' },
      { question: 'How do I separate complaints from returns?', answer: 'Returns are a transaction; complaints are a quality event. A return that includes a complaint about quality is both — log the return in your ERP and the complaint in the tracker. A return for "wrong size ordered" without quality issue is not a complaint.' },
      { question: 'Should every complaint trigger a corrective action?', answer: 'No. One-off complaints with no recurrence pattern usually do not need a formal CA. Repeat complaints (same root cause, multiple customers) absolutely do. The Pareto chart makes the distinction visible.' },
      { question: 'How long should I keep complaint records?', answer: 'Industry-specific. ISO 9001 minimum is typically 3 years. Medical devices require lifetime of device + 2 years. FDA-regulated industries require GMP retention. Check your specific compliance requirements.' }
    ]
  },
  // ===========================================================================
  // GROUP 3 — CAPACITY & LABOR (6)
  // ===========================================================================
  {
    slug: 'shift-schedule',
    displayTitle: 'Shift Schedule',
    category: 'Capacity & Labor',
    metaTitle: 'Free Shift Schedule Excel Template (2026) — Manufacturing Shift Planner',
    metaDescription: 'Free shift schedule Excel template for manufacturing. Plan operators across shifts, work centers, and weeks. Handle overtime, rotation, and coverage gaps.',
    metaKeywords: 'shift schedule excel template, manufacturing shift planner, shift roster excel, shift rotation template, factory shift schedule, weekly shift planner',
    h1: 'Free Shift Schedule Excel Template for Manufacturing',
    subtitle: 'Plan operators across shifts, work centers, and weeks. Spot coverage gaps before they hit the floor and minimize unplanned overtime by 30%+.',
    tldr: 'Working shift planner with operator assignment by work center per shift, automatic coverage gap detection, and weekly/monthly views. Replaces the whiteboard most shops still use.',
    introParagraphs: [
      'Most shops still plan shifts on a whiteboard. It works until somebody calls in sick at 6 AM and nobody can see what the impact is across the rest of the week. A spreadsheet is not a fancy upgrade — it is the first step toward seeing coverage holistically instead of one shift at a time.',
      'This template lays out shifts horizontally across the week and operators vertically. Each cell shows the work center assignment. Conditional formatting flags coverage gaps (a work center with no operator on a shift) and over-coverage (more operators than the work center needs).',
      'For a single-site shop with under 50 operators, this template handles weekly planning. Past 50 operators or multiple sites, you need shift-planning software with integrated time tracking. RMDB ties labor scheduling to the production schedule so operator assignment reflects actual job priorities.'
    ],
    whatsInside: [
      { title: 'Weekly shift grid', description: 'Operators × shifts (7 days × 3 shifts = 21 columns). Each cell shows work center assignment or PTO/training/absent.' },
      { title: 'Coverage gap detector', description: 'For each work center × shift, the template counts assigned operators against minimum coverage. Gaps flag red.' },
      { title: 'Operator hour rollup', description: 'Total scheduled hours per operator per week. Compared to standard (40 hrs); overtime highlighted.' },
      { title: 'Shift rotation pattern', description: 'Pre-built rotation patterns (DuPont, 2-2-3, Continental) you can apply to specific operator groups.' },
      { title: 'PTO / training calendar', description: 'Separate tab for planned absences that flow into the shift grid as "unavailable" automatically.' },
      { title: 'Monthly summary', description: 'Total hours by operator, overtime cost estimate, coverage gap count. The report management actually reads.' }
    ],
    howToUseSteps: [
      { title: 'Define minimum coverage per work center per shift', description: 'Before scheduling anyone, define how many operators each work center needs per shift. Without this, "coverage gap" has no meaning.' },
      { title: 'Lock the rotation pattern for steady-state', description: 'Set a fixed rotation for operators who are always on the same pattern. The weekly schedule then only needs to handle exceptions (PTO, overtime, training).' },
      { title: 'Review next week every Thursday', description: 'Look at next week\'s schedule by Thursday so you have time to react to gaps before they become Monday\'s problem. The template\'s gap detector makes this 5 minutes instead of an hour.' },
      { title: 'Track actual vs scheduled at week-end', description: 'A separate tab captures who actually worked which shift. The variance between scheduled and actual is the data that improves future planning.' }
    ],
    whenToUpgrade: [
      'Operator count exceeds 50 and weekly planning takes more than an hour.',
      'You need shift schedule tied to specific job assignments (not just work center coverage).',
      'Multi-site operations require coordinated shift planning across locations.',
      'You want time clock data to flow back automatically for actual-vs-scheduled analysis.'
    ],
    faqs: [
      { question: 'What is the difference between a shift schedule and a production schedule?', answer: 'A shift schedule assigns operators to work centers and shifts. A production schedule assigns jobs to work centers and time slots. They are complementary — the production schedule says "Job 1234 runs on Mill 2 from 8 AM to noon"; the shift schedule says "Operator Jones is at Mill 2 on first shift Monday."' },
      { question: 'How do I handle operators with cross-training?', answer: 'Use the operator skill matrix template alongside this one. Cross-trained operators show as "available for" multiple work centers in the skill matrix; the shift schedule picks the optimal assignment based on the day\'s priorities.' },
      { question: 'What is the DuPont schedule and when does it work?', answer: 'DuPont is a 4-team rotating shift pattern that covers 24/7 operations: 4 days on (12-hour shifts), 4 days off, then rotation between days and nights. It works for continuous-process operations (chemistry, food, paper) where shutdown is expensive. Less common for discrete manufacturing.' },
      { question: 'How do I minimize overtime with shift scheduling?', answer: 'Three levers: cross-train operators so coverage holes have alternatives; build PTO patterns into the rotation so they predict instead of disrupt; review next week\'s schedule on Thursday so you have time to balance load instead of paying premium overtime on Friday.' }
    ]
  },
  {
    slug: 'operator-skill-matrix',
    displayTitle: 'Operator Skill Matrix',
    category: 'Capacity & Labor',
    metaTitle: 'Free Operator Skill Matrix Excel Template (2026)',
    metaDescription: 'Free operator skill matrix Excel template. Track operator certifications by work center, identify cross-training opportunities, and plan succession.',
    metaKeywords: 'operator skill matrix excel, skill matrix template, training matrix manufacturing, cross training tracker, operator certification template, manufacturing skill matrix',
    h1: 'Free Operator Skill Matrix Excel Template',
    subtitle: 'Visualize which operators can run which work centers, at what proficiency. The single document that drives cross-training, shift planning, and succession in any shop.',
    tldr: 'Working skill matrix with 4-level proficiency, certification dates, recertification flags, and gap analysis by work center. The visualization that turns workforce flexibility from luck to strategy.',
    introParagraphs: [
      'The skill matrix is the most under-used document in most shops. Operators know who can run what; planners do not. When that knowledge stays in people\'s heads, scheduling decisions get made on guesswork, cross-training stays ad-hoc, and the day a key operator quits is a disaster.',
      'A skill matrix makes the knowledge explicit. Operators along one axis, work centers along the other. Each cell shows proficiency: not trained, trained, certified, certified trainer. Recertification dates trigger automatic flags before certifications lapse.',
      'For a single shop, this template makes the matrix maintainable on a quarterly review cycle. After updating, the gap analysis tab surfaces which work centers have single-operator coverage (the highest-risk situation) and which operators are over-concentrated. Those are the cross-training priorities.'
    ],
    whatsInside: [
      { title: 'Operator × work center grid', description: 'Visual matrix with proficiency levels (0 = not trained, 1 = trained, 2 = certified, 3 = certified trainer) in each cell.' },
      { title: 'Certification date tracking', description: 'Date of last certification per operator per work center. Recertification due dates flag yellow at 30 days out, red after.' },
      { title: 'Coverage gap analysis', description: 'For each work center, count of operators at level 2+. Single-operator coverage flagged red (highest risk).' },
      { title: 'Cross-training priority list', description: 'Operator × work center pairs where adding skill would close coverage gaps. Sorted by gap closure impact.' },
      { title: 'Succession planning view', description: 'For each work center, list of operators currently certified and operators at level 1 (training pipeline). Surfaces work centers with no succession depth.' },
      { title: 'Training cost rollup', description: 'Estimated training hours and cost to close priority gaps. The business case for the cross-training budget.' }
    ],
    howToUseSteps: [
      { title: 'Define proficiency levels with operations', description: 'Levels mean nothing without definitions. Work with operations to agree what "certified" means for each work center — typically a sign-off after independent operation for X hours with no defects.' },
      { title: 'Survey operators to get baseline', description: 'First pass is a survey — what operators say they can do. Verify with operations before locking the baseline. Subjective and verified are different inputs; both matter.' },
      { title: 'Set quarterly review cadence', description: 'The matrix degrades fast without maintenance. A 30-minute quarterly review with supervisors keeps it current. Certifications go up; people leave; new equipment changes the work center list.' },
      { title: 'Use the gap report to drive training', description: 'The cross-training priority list is the agenda for the training budget. Pick the top 3 gaps each quarter; assign trainers and trainees; track to completion in this same template.' }
    ],
    whenToUpgrade: [
      'Operator count exceeds 100 and matrix maintenance overwhelms supervisors.',
      'You need skill data integrated with shift scheduling so coverage gaps surface automatically.',
      'Training records require regulatory compliance (medical, aerospace) with full audit trail.',
      'Multi-site workforce needs shared skill visibility for inter-site transfers.'
    ],
    faqs: [
      { question: 'How is a skill matrix different from a training record?', answer: 'A training record documents what an operator was trained on (transaction). A skill matrix shows current proficiency by work center (state). The matrix is what you use to make scheduling decisions; the training record is what you use to prove compliance during audits.' },
      { question: 'How do I handle operators learning new equipment?', answer: 'Level 1 (trained) means they completed initial training. Level 2 (certified) means they can run the equipment independently. The path from 1 to 2 is supervised operation time; the matrix tracks the path, not just the endpoint.' },
      { question: 'What is "single-operator coverage" and why does it matter?', answer: 'A work center where only one operator is certified to run it. If that operator is absent or quits, the work center stops. Most shops have several single-coverage work centers and discover them the hard way. The gap analysis flags them so you can cross-train before crisis.' },
      { question: 'How often should certifications expire?', answer: 'Industry and equipment specific. Critical safety equipment: annual recertification. Standard production equipment: 2–3 years or no expiration with continuous use. Inactive certifications (operator has not run the equipment in 12+ months) should re-certify regardless of original expiration date.' }
    ]
  },
  {
    slug: 'bottleneck-analysis',
    displayTitle: 'Bottleneck Analysis',
    category: 'Capacity & Labor',
    metaTitle: 'Free Bottleneck Analysis Excel Template (2026) — Manufacturing Theory of Constraints',
    metaDescription: 'Free bottleneck analysis Excel template. Identify the constraint work center, calculate throughput impact, and prioritize capacity investment.',
    metaKeywords: 'bottleneck analysis excel, theory of constraints template, manufacturing bottleneck template, throughput analysis excel, constraint identification spreadsheet',
    h1: 'Free Bottleneck Analysis Excel Template',
    subtitle: 'Theory of Constraints worksheet to identify your real bottleneck, calculate throughput impact, and make capacity investments that actually unblock the system.',
    tldr: 'Working bottleneck analysis template that calculates capacity utilization, queue time, and throughput per work center. Identifies the constraint — the only place where capacity investment moves the needle.',
    introParagraphs: [
      'Theory of Constraints is the most under-applied idea in manufacturing. Eli Goldratt\'s insight is brutally simple: every system has one bottleneck, and investing in capacity anywhere else makes things worse. Most shops invest in the loudest work center, not the constraint, and wonder why nothing improves.',
      'Identifying the real bottleneck requires data, not gut. The bottleneck has three signatures: (1) work piles up in front of it, (2) it runs at near-100% utilization while others run at 60–70%, (3) it sets the throughput of the entire system. A work center with high utilization but no queue is not a bottleneck — it is just busy.',
      'This template captures the data needed to identify the real constraint: utilization per work center, average queue waiting in front of each, average cycle time, throughput rate. Three months of data makes the bottleneck obvious. After that, every capacity dollar goes to the constraint until it stops being the constraint.'
    ],
    whatsInside: [
      { title: 'Work center capacity input', description: 'Per work center: available hours per shift, hours scheduled, actual hours run, idle hours, downtime hours.' },
      { title: 'Utilization calculation', description: 'Actual run hours ÷ available hours per work center, per shift. The first signature of the bottleneck.' },
      { title: 'Queue waiting analysis', description: 'Hours of work-in-process waiting in front of each work center. The second signature.' },
      { title: 'Throughput rate', description: 'Units completed per available hour. The throughput of the system equals the throughput of the bottleneck — no other work center matters for total output.' },
      { title: 'Constraint identification', description: 'Combined utilization + queue + throughput rank surfaces the bottleneck. The work center on top is where capacity investment pays.' },
      { title: 'Investment ROI calculator', description: 'For a proposed capacity addition: how much does throughput improve? The calculation that gets the capex approved.' }
    ],
    howToUseSteps: [
      { title: 'Capture 30 days of work center data', description: 'Daily capture of hours scheduled, hours run, downtime hours, and ending queue per work center. 30 days is enough to see the pattern; less is noise.' },
      { title: 'Calculate utilization and queue per work center', description: 'The template does the math. The bottleneck shows up as the work center with highest utilization AND highest queue. High utilization without queue = correctly sized. High queue without utilization = different problem (setup, breakdown).' },
      { title: 'Apply Theory of Constraints discipline', description: 'Exploit (run the bottleneck at maximum efficiency — never let it sit idle), subordinate (schedule other work centers to feed the bottleneck), elevate (invest only after exploitation is maxed).' },
      { title: 'Re-measure quarterly', description: 'When you elevate the bottleneck, the constraint moves. The bottleneck this quarter is not the bottleneck next quarter — the analysis has to be repeated.' }
    ],
    whenToUpgrade: [
      'You need bottleneck identification updated automatically from live shop floor data, not a 30-day spreadsheet refresh.',
      'Multi-product flows make manual queue tracking unreliable.',
      'You want bottleneck-aware finite-capacity scheduling, not just analysis.',
      'Capacity investment decisions exceed the precision Excel-based analysis can support.'
    ],
    faqs: [
      { question: 'How do I tell the difference between a bottleneck and a busy work center?', answer: 'A bottleneck has BOTH high utilization AND a persistent queue in front of it. A work center with high utilization but no queue is correctly sized — it is just busy. The queue is the key signature; without it, you do not have a constraint, you have full throughput at that station.' },
      { question: 'What does "subordinate to the constraint" mean in practice?', answer: 'It means non-bottleneck work centers should slow down to match the bottleneck\'s pace. Running upstream work centers at full capacity just builds inventory in front of the bottleneck. Running downstream work centers at full capacity is impossible — they cannot run faster than the bottleneck feeds them.' },
      { question: 'Should I always invest in the bottleneck?', answer: 'Yes — until you have exhausted exploitation. Theory of Constraints says EXPLOIT first (run the bottleneck at maximum efficiency without spending money: reduce setup, eliminate downtime, ensure material always ready), THEN elevate (invest in more capacity). Most shops skip exploit and go straight to elevate, which is expensive.' },
      { question: 'What if my bottleneck moves every week?', answer: 'A constantly moving bottleneck usually means: (1) high mix and the constraint depends on job mix, or (2) inadequate data and you cannot see the real constraint. Either way, the template surfaces it. For high-mix shops, the constraint is often a class of resource (skilled operators, specific tooling) rather than a single work center.' }
    ]
  },
  {
    slug: 'capacity-utilization-tracker',
    displayTitle: 'Capacity Utilization Tracker',
    category: 'Capacity & Labor',
    metaTitle: 'Free Capacity Utilization Tracker Excel Template (2026)',
    metaDescription: 'Free capacity utilization tracker Excel template. Track utilization by work center, shift, and week. Identify chronic underutilization and overload.',
    metaKeywords: 'capacity utilization excel, utilization tracker template, capacity utilization calculator, manufacturing capacity tracker, work center utilization spreadsheet',
    h1: 'Free Capacity Utilization Tracker Excel Template',
    subtitle: 'Track utilization by work center, shift, and week. Surface chronic underutilization (wasted investment) and chronic overload (the real constraints) in 30 days.',
    tldr: 'Working capacity utilization tracker that calculates utilization % per work center per shift. Includes target bands, trend analysis, and load-balancing recommendations.',
    introParagraphs: [
      'Capacity utilization is the most misused KPI in manufacturing. Most shops report utilization at the plant level — useless. Plant-average utilization of 75% hides work centers running at 95% (constraint) and work centers running at 40% (wasted investment) — both signals require different action.',
      'This template captures utilization at the right granularity: work center × shift × day. Patterns emerge over 30 days that average reports hide. The mill running 95% on first shift but 35% on third shift is telling you something. The press running 60% every shift is telling you something else.',
      'Target bands matter. Utilization at 100% sounds good but leaves no buffer — small disruptions become big delays. Target bands of 75–90% for primary work centers and 50–70% for surge capacity surface where the system is over- and under-tuned.'
    ],
    whatsInside: [
      { title: 'Daily utilization log', description: 'Date, work center, shift, available hours, run hours, utilization %. One row per work center per shift.' },
      { title: 'Work center summary', description: 'Average utilization per work center over the period, with trend direction (rising, stable, declining).' },
      { title: 'Shift-level comparison', description: 'Utilization by shift surfaces patterns — first shift overload with third shift underuse, weekend overtime hiding weekday underuse, etc.' },
      { title: 'Target band analysis', description: 'For each work center, configurable target band (e.g., 75–90%). Utilization above or below the band flags as out-of-range.' },
      { title: 'Underutilization cost', description: 'Estimated cost of chronic underutilization (carrying cost of unused capacity). Builds the case for consolidation or capacity divestment.' },
      { title: 'Overload action list', description: 'Work centers chronically over target band — candidates for capacity addition, overtime, or load shift to alternative work centers.' }
    ],
    howToUseSteps: [
      { title: 'Define available hours per shift correctly', description: 'Available hours = scheduled hours minus planned downtime (PM, breaks, lunch). Do not include unplanned downtime here — that goes against utilization. Common error: counting 8 hours as available when 6.5 is the real number.' },
      { title: 'Capture daily, not weekly', description: 'Weekly averages hide daily patterns. Daily capture takes 5 minutes per work center per shift and produces 30× the signal of weekly capture.' },
      { title: 'Set target bands by work center role', description: 'Primary throughput work centers: 75–90%. Surge capacity: 50–70%. Specialty work centers: 30–50%. Targets vary by role; one universal target makes everything look out-of-spec.' },
      { title: 'Review monthly with operations and planning', description: 'The monthly utilization-vs-target report drives capacity decisions: add, divest, shift load, or maintain. Without the review cadence, the data sits and the decisions never get made.' }
    ],
    whenToUpgrade: [
      'You need utilization captured automatically from machine signals, not a manual log.',
      'Capacity decisions require real-time data, not 30-day-old spreadsheets.',
      'Multi-site capacity balancing exceeds what Excel can model.',
      'You want utilization data tied to the finite-capacity schedule for predictive load analysis.'
    ],
    faqs: [
      { question: 'What is the difference between utilization and OEE?', answer: 'Utilization = run hours ÷ available hours. OEE = availability × performance × quality. Utilization measures whether the machine is running; OEE measures whether it is running well. A machine at 95% utilization producing 50% defects has terrible OEE. Use both — they answer different questions.' },
      { question: 'Why not target 100% utilization?', answer: 'Because 100% utilization leaves no buffer. A small disruption (5-minute breakdown, late material) becomes a multi-hour cascade because there is no slack to absorb it. Target bands of 75–90% allow recovery from normal variation without sacrificing throughput.' },
      { question: 'How do I handle work centers with multiple machines?', answer: 'Track each machine separately if they are independently scheduled (most cases). Track as a single work center if they run as a cell (all machines load and unload together). The granularity should match the scheduling granularity.' },
      { question: 'Should I include setup time in utilization or not?', answer: 'Yes — setup is productive use of capacity (you cannot run without setting up). However, track setup separately as a sub-category. A work center at 90% utilization with 40% of that being setup is a different problem than a work center at 90% utilization with 10% setup.' }
    ]
  },
  {
    slug: 'labor-utilization-tracker',
    displayTitle: 'Labor Utilization Tracker',
    category: 'Capacity & Labor',
    metaTitle: 'Free Labor Utilization Tracker Excel Template (2026)',
    metaDescription: 'Free labor utilization tracker Excel template. Compare direct labor hours to indirect, idle, and lost time. Find the 20% of labor hours hiding in waste.',
    metaKeywords: 'labor utilization tracker excel, labor productivity template, direct labor tracker, indirect labor excel, labor efficiency spreadsheet, manufacturing labor analysis',
    h1: 'Free Labor Utilization Tracker Excel Template',
    subtitle: 'Compare direct labor (on jobs) to indirect labor (support tasks) and idle time. Most shops find 15–25% of paid labor is unaccounted-for — that is the gold.',
    tldr: 'Working labor utilization tracker that splits paid hours into direct, indirect, and unaccounted. Captures the data needed to surface where labor cost is actually going.',
    introParagraphs: [
      'Direct labor cost is reported on every job; indirect labor cost is a bucket; unaccounted labor cost is invisible — but it is the largest single waste category in most shops. The gap between paid hours and labor hours allocated to a job or support task is "unaccounted." Most shops never measure it.',
      'A labor utilization tracker fixes that. Every paid hour gets classified into one of three buckets: direct (worked on a specific job, charged to the job), indirect (supported production but not on a specific job — setup, maintenance, training), or unaccounted (paid but not allocated — waiting, looking for tools, meetings, walking).',
      'The discipline of forcing every hour into one of three buckets is what makes the data appear. After 30 days, the Pareto by unaccounted-time reason is unmissable. Most shops find that 60% of unaccounted time concentrates in 3–4 reasons (waiting for material, looking for tools, machine waiting for operator). Each is fixable.'
    ],
    whatsInside: [
      { title: 'Daily labor log', description: 'Operator, paid hours, direct hours (allocated to jobs), indirect hours (allocated to support tasks), unaccounted hours.' },
      { title: 'Direct vs indirect split', description: 'For each operator and each work center, percentage breakdown of paid hours by category. Direct % is the headline KPI.' },
      { title: 'Unaccounted reason codes', description: 'For unaccounted time: dropdown of reasons (waiting for material, no work assigned, machine down, training, meeting, etc.).' },
      { title: 'Pareto of unaccounted reasons', description: 'Top 10 reasons for unaccounted time, sorted by total hours. Drives the waste-elimination project list.' },
      { title: 'Operator utilization rollup', description: 'Each operator\'s direct/indirect/unaccounted split. Patterns surface — usually system issues, not operator issues.' },
      { title: 'Cost of unaccounted time', description: 'Total unaccounted hours × loaded labor rate = annualized cost of the waste. Builds the case to fix the top reasons.' }
    ],
    howToUseSteps: [
      { title: 'Define the three buckets explicitly', description: 'Direct = on a specific work order. Indirect = supporting production (setup not on a specific job, PM, training, 5S, kaizen). Unaccounted = paid but not allocated. Be ruthless about the boundary between indirect and unaccounted.' },
      { title: 'Capture daily, not weekly', description: 'Operators cannot reconstruct yesterday accurately. End-of-shift capture (10 minutes) is the right cadence. Weekly capture produces fiction.' },
      { title: 'Define unaccounted reason codes upfront', description: 'Without reason codes, unaccounted is a black box. With 15–20 standard reason codes, the Pareto is meaningful. "Other" should be banned — it becomes the dumping ground.' },
      { title: 'Attack the top reason quarterly', description: 'The Pareto identifies the top reason. A quarterly project to eliminate that reason (kanban for material delivery, shadow-board for tools, etc.) usually cuts unaccounted time 15–25% per project.' }
    ],
    whenToUpgrade: [
      'Labor tracking volume exceeds what manual logging can sustain.',
      'You need labor hours tied to work orders automatically via shop floor terminals.',
      'Job costing requires accurate labor allocation at the operation level.',
      'Multi-shift operations need shared labor visibility without paper handoff.'
    ],
    faqs: [
      { question: 'How is this different from clock-in/clock-out tracking?', answer: 'Clock-in/clock-out tracks paid hours. This tracks where those paid hours went. The difference between "paid 40 hours" and "directly productive on jobs 26 hours" is the data that drives improvement; clock data alone hides it.' },
      { question: 'What direct labor % should I target?', answer: 'Varies by shop type. High-volume repetitive manufacturing: 70–85% direct is achievable. High-mix job shops: 50–65% direct is more realistic. The right target is your own trend — is direct labor going up over time as a percentage?' },
      { question: 'Is unaccounted time always waste?', answer: 'Mostly yes, but not always. Some unaccounted time (training, kaizen events, problem-solving) is investment that pays back in future productivity. The reason codes distinguish "waste unaccounted" from "investment unaccounted." Treat them differently.' },
      { question: 'How do I get operators to log honestly?', answer: 'Make it about system improvement, not individual blame. The rollups should be by work center and reason code, not by operator. When operators trust that the data is used to fix waiting-for-material issues (not to write them up for it), the logging gets honest.' }
    ]
  },
  {
    slug: 'overtime-tracker',
    displayTitle: 'Overtime Tracker',
    category: 'Capacity & Labor',
    metaTitle: 'Free Overtime Tracker Excel Template (2026) — Manufacturing OT Log',
    metaDescription: 'Free overtime tracker Excel template. Log OT by operator, work center, and reason. Reveal the recurring causes of overtime and reduce OT spend 20–30%.',
    metaKeywords: 'overtime tracker excel, ot log template, overtime tracking spreadsheet, manufacturing overtime log, overtime cost tracker, ot reason analysis',
    h1: 'Free Overtime Tracker Excel Template',
    subtitle: 'Log every overtime hour with the reason it happened. Most overtime is the symptom of a fixable scheduling problem — the data reveals which.',
    tldr: 'Working OT tracker by operator, work center, and reason. Cost rollup with year-over-year trend. Surfaces whether OT is one-off urgency or systemic understaffing.',
    introParagraphs: [
      'Overtime is the easiest expense to track and the hardest expense to control. Payroll captures the dollars; nobody captures the why. Without the why, you cannot tell whether last week\'s overtime was unavoidable (genuine demand spike) or a symptom of poor scheduling (avoidable).',
      'This template forces a reason code on every OT event. Patterns emerge quickly: 40% of OT is "rush order from customer X" (sales-driven), 25% is "machine breakdown recovery" (maintenance-driven), 20% is "schedule fell behind" (planning-driven), 15% is "absence coverage" (workforce-driven). Each reason has a different fix.',
      'After 90 days of disciplined logging, the largest reason becomes obvious. Most shops can cut OT 20–30% by attacking just the top reason — not by clamping down on overtime authorization (which usually fails), but by fixing the upstream cause.'
    ],
    whatsInside: [
      { title: 'OT event log', description: 'Date, operator, work center, OT hours, reason code, approver, OT cost (hours × premium rate).' },
      { title: 'OT reason code dictionary', description: 'Pre-built code list: rush order, breakdown recovery, schedule fell behind, absence coverage, customer change, supplier delay, planned project.' },
      { title: 'Weekly cost rollup', description: 'Total OT hours and cost by week. Year-over-year comparison surfaces trends the weekly view hides.' },
      { title: 'OT by reason Pareto', description: 'Total OT hours by reason code, sorted by impact. Drives the improvement project list.' },
      { title: 'OT by work center', description: 'Identifies whether OT is concentrated in specific work centers (capacity problem) or spread across the shop (systemic planning problem).' },
      { title: 'Authorization audit', description: 'OT hours by approver, with patterns flagged — same approver authorizing OT across multiple unrelated reasons usually signals approval-rubber-stamping.' }
    ],
    howToUseSteps: [
      { title: 'Require a reason code at authorization', description: 'The OT approval workflow should require selecting a reason from the dictionary before approval. Without that gate, reasons get backfilled inaccurately or not at all.' },
      { title: 'Capture at the event, not in payroll', description: 'Payroll has the hours; payroll does not have the why. Capture the why at the work-center level when the OT is worked, not 2 weeks later when payroll runs.' },
      { title: 'Review monthly with planning and ops', description: 'The reason Pareto is the agenda for the monthly OT review. The top reason gets a 60-day improvement project; everything else gets monitored.' },
      { title: 'Track the trend after intervention', description: 'When you fix a reason (e.g., add safety stock to eliminate "supplier delay" OT), the trend chart confirms it worked. No trend improvement = wrong root cause.' }
    ],
    whenToUpgrade: [
      'OT volume exceeds the precision manual tracking can provide.',
      'You need OT tied to specific work orders and customers for true profitability analysis.',
      'Multi-site OT management requires shared real-time visibility.',
      'OT data needs to feed into job costing and customer billing automatically.'
    ],
    faqs: [
      { question: 'How is "premium" overtime cost calculated?', answer: 'OT cost = hours × (base rate × 1.5) for time-and-a-half jurisdictions, or × 2.0 for double-time situations. The template uses configurable multipliers per operator type. The full OT cost is not just the premium — it is the entire hourly rate during overtime, with the premium portion being the extra cost vs straight time.' },
      { question: 'What is "good" overtime vs "bad" overtime?', answer: 'Good OT covers genuine demand spikes you could not have predicted (sudden customer pull-in). Bad OT covers systemic problems (chronic understaffing, poor scheduling, predictable supplier delays). The reason codes separate them; the action plan differs.' },
      { question: 'Should I authorize OT to recover from a missed schedule?', answer: 'Almost never — but most shops do this routinely. OT to recover usually means the original schedule was unrealistic, and OT papers over the planning problem without fixing it. The honest fix is to plan against real capacity. The tracker surfaces this pattern.' },
      { question: 'How do I reduce overtime without hurting throughput?', answer: 'Fix the top reason in the Pareto. If "supplier delay" causes 40% of OT, fix supplier reliability or carry buffer stock. If "schedule fell behind" causes 30% of OT, fix the schedule (finite capacity vs infinite capacity planning). Reducing OT by management decree without fixing the cause usually backfires.' }
    ]
  },
  // ===========================================================================
  // GROUP 4 — INVENTORY (6)
  // ===========================================================================
  {
    slug: 'raw-material-tracker',
    displayTitle: 'Raw Material Tracker',
    category: 'Inventory',
    metaTitle: 'Free Raw Material Inventory Tracker Excel Template (2026)',
    metaDescription: 'Free raw material inventory tracker Excel template. Track stock by material, lot, location, and supplier. Surface stockouts and excess inventory.',
    metaKeywords: 'raw material tracker excel, material inventory template, manufacturing inventory excel, material stock tracker, raw material spreadsheet',
    h1: 'Free Raw Material Inventory Tracker Excel Template',
    subtitle: 'Track raw material stock by lot, location, supplier, and aging. Spot stockouts before they hit production and excess inventory before it ties up cash.',
    tldr: 'Working raw material tracker with lot-level detail, reorder point flags, supplier-by-supplier rollup, and aging analysis. The system that bridges from spreadsheet to MRP.',
    introParagraphs: [
      'Most small manufacturers run raw material on instinct. The buyer "knows" what is in stock. Production "knows" what is needed. The gap between the two shows up as either unplanned stockouts (production stops because nobody ordered) or unplanned excess (cash tied up in material that will not be used for 6 months).',
      'A raw material tracker is the first step toward MRP without becoming MRP. It captures what is in stock by lot, where the lot lives, when it arrived, and which supplier provided it. Reorder points flag when stock dips below the trigger; aging surfaces lots that have been sitting too long.',
      'For a small shop with under 200 raw material SKUs, this template handles inventory visibility. Past 200 SKUs or any multi-location operation, MRP becomes the right tool — but most shops outgrow this template gradually over 12–18 months, and the template carries the load until then.'
    ],
    whatsInside: [
      { title: 'Material master', description: 'Material number, description, supplier, unit of measure, reorder point, reorder quantity, standard cost.' },
      { title: 'Lot-level stock', description: 'Lot number, material, quantity, location, received date, certificate reference. Multiple lots per material allowed.' },
      { title: 'Reorder flag', description: 'For each material, total on-hand quantity vs reorder point. Below reorder = red flag for buyer review.' },
      { title: 'Aging report', description: 'Lots aged 30/60/90/180/365 days from receipt. Aged lots tie up cash and risk expiring (for shelf-life materials).' },
      { title: 'Supplier rollup', description: 'Total on-hand value by supplier. Lets buyers see supplier concentration and negotiate at volume.' },
      { title: 'Stockout risk forecast', description: 'For each material, current stock ÷ average daily usage = days of supply. Below 7 days flags imminent stockout risk.' }
    ],
    howToUseSteps: [
      { title: 'Establish baseline through physical count', description: 'A spreadsheet tracker is only as good as the starting count. Do a physical count at startup. Without that, the system is fiction from day one.' },
      { title: 'Update at receipt and at issue', description: 'Receipts get logged when material arrives. Issues get logged when material goes to a work order. Either daily batch or transaction-level — daily batch is fine for small volume.' },
      { title: 'Set reorder points based on actual usage', description: 'Reorder point = average daily usage × lead time + safety stock. Use the last 90 days of usage to set it; revisit quarterly.' },
      { title: 'Review weekly with the buyer', description: 'The reorder-flag report is the buyer\'s weekly priority list. The aging report surfaces materials to use up or return. Two short reports drive purchasing discipline.' }
    ],
    whenToUpgrade: [
      'Material SKU count exceeds 200 and Excel updates lag behind reality.',
      'You need real-time stock visibility tied to work orders and the production schedule.',
      'Multi-location operations require shared real-time material data.',
      'You want MRP logic to drive automatic reorder rather than manual review.'
    ],
    faqs: [
      { question: 'How is a raw material tracker different from MRP?', answer: 'A tracker tells you what you have. MRP tells you what you need to buy based on future demand from forecasts and orders. The tracker is a static snapshot; MRP is a forward-looking calculation. Start with the tracker; move to MRP when forward visibility matters more than current visibility.' },
      { question: 'How do I set reorder points correctly?', answer: 'Reorder point = (average daily usage × lead time in days) + safety stock. Use 90 days of actual usage to calculate average. Safety stock depends on demand variability — typically 1–2 weeks of usage for stable materials, 4+ weeks for volatile.' },
      { question: 'Should I track every raw material or just the expensive ones?', answer: 'ABC classify the SKUs: A items (80% of spend) get tight tracking with frequent counts. B items (15% of spend) get monthly review. C items (5% of spend) can run on a two-bin or visual system without full tracking. Tracking discipline scales with cost impact.' },
      { question: 'How often should I do physical counts?', answer: 'Cycle counting beats annual wall-to-wall. A counts: every 4–8 weeks. B counts: every quarter. C counts: annually. Cycle counts spread the work and surface errors before they accumulate into year-end disasters.' }
    ]
  },
  {
    slug: 'finished-goods-inventory',
    displayTitle: 'Finished Goods Inventory',
    category: 'Inventory',
    metaTitle: 'Free Finished Goods Inventory Excel Template (2026)',
    metaDescription: 'Free finished goods inventory Excel template. Track FG by SKU, location, lot, customer allocation, and shelf life. Surface excess and stockout risk.',
    metaKeywords: 'finished goods inventory excel, fg tracker template, finished goods spreadsheet, fg inventory management, finished goods stock template',
    h1: 'Free Finished Goods Inventory Excel Template',
    subtitle: 'Track every finished SKU by lot, location, and customer allocation. Spot excess inventory tying up cash and stockout risk before customers find them.',
    tldr: 'Working FG tracker with allocation logic (allocated vs available), shelf-life flagging, and reorder-point analysis. Bridges make-to-stock operations to MRP.',
    introParagraphs: [
      'Finished goods inventory is the most expensive inventory in the shop. Raw material can be returned to suppliers; WIP can be finished into different products; finished goods can only sell or be written off. Misjudging FG levels is the largest single source of working capital waste in most make-to-stock operations.',
      'This template tracks FG with the discipline that prevents both excess and stockout. Each SKU has a current on-hand quantity, an allocated quantity (committed to specific customer orders), and an available quantity (on-hand minus allocated). Reorder triggers fire based on available, not on-hand — preventing the common mistake of thinking you have stock when half of it is already sold.',
      'Shelf-life tracking matters for any FG with expiration. The template flags lots aging past 50% / 75% / 90% of shelf life, giving operations time to push the older lots before they expire.'
    ],
    whatsInside: [
      { title: 'FG master', description: 'SKU, description, customer (if make-to-order), unit of measure, reorder point, reorder quantity, shelf life days.' },
      { title: 'Lot-level stock', description: 'Lot number, SKU, on-hand quantity, location, produced date, expiration date.' },
      { title: 'Allocated vs available calculation', description: 'On-hand minus customer-allocated = available. Reorder logic uses available, not on-hand. This is the bug in most FG tracking.' },
      { title: 'Reorder flag', description: 'Available below reorder point triggers a buy/make signal for planning review.' },
      { title: 'Shelf-life aging', description: 'Lots flagged at 50% / 75% / 90% of shelf life consumed. Older lots get sold first (FIFO discipline).' },
      { title: 'Customer allocation tab', description: 'For make-to-order or contract manufacturing: which SKU quantity is allocated to which customer order.' }
    ],
    howToUseSteps: [
      { title: 'Distinguish make-to-stock from make-to-order', description: 'MTS SKUs need reorder points and trend analysis. MTO SKUs need allocation tracking. Mixing them in one template confuses both.' },
      { title: 'Set reorder points based on customer service level', description: 'Higher service level = more safety stock = more inventory cost. Common targets: 95% service level for A items, 90% for B, 85% for C. Choose the right tradeoff per SKU.' },
      { title: 'Enforce FIFO at picking', description: 'The lot-level detail enables FIFO. Without enforcement, operators pick the closest lot. FIFO discipline cuts shelf-life expirations dramatically.' },
      { title: 'Review monthly with sales and operations', description: 'S&OP discipline starts here. The FG report shows which SKUs are excess (slow movers) and which are at stockout risk (fast movers). The conversation reshapes production priorities.' }
    ],
    whenToUpgrade: [
      'FG SKU count exceeds 500 and Excel becomes slow.',
      'You need real-time allocation tied to sales orders and the production schedule.',
      'Multi-warehouse operations require shared real-time FG visibility.',
      'You want MRP-driven replenishment rather than reorder-point-only logic.'
    ],
    faqs: [
      { question: 'What is the difference between on-hand and available inventory?', answer: 'On-hand = total physical quantity in stock. Available = on-hand minus quantity already allocated to customer orders. Reorder logic must use available, not on-hand — otherwise you think you have stock that is actually already sold. This is the single most common error in spreadsheet FG tracking.' },
      { question: 'How do I calculate the right safety stock?', answer: 'Safety stock = service level Z-score × √(lead time + review period) × demand standard deviation. The math is intimidating; the template provides a simplified version using usage variability over the last 90 days. Get to 80% of optimal with the simple formula; do not chase the last 20% in Excel.' },
      { question: 'What inventory turnover should I target?', answer: 'Industry-specific. Distribution: 12+ turns/year. High-mix manufacturing: 6–10 turns. Long-cycle aerospace: 2–4 turns. Compare to your own trailing year, not to industry benchmarks. Improving turns by 1.5× over 18 months is realistic and impactful.' },
      { question: 'How do I handle obsolete inventory?', answer: 'A separate "obsolete" status flag in the master. Obsolete SKUs do not trigger reorders, do not count toward turn calculations, and need a disposition decision (sell at discount, scrap, return to supplier). The aging report surfaces candidates for obsolete review.' }
    ]
  },
  {
    slug: 'economic-order-quantity',
    displayTitle: 'EOQ Calculator',
    category: 'Inventory',
    metaTitle: 'Free Economic Order Quantity (EOQ) Calculator Excel Template (2026)',
    metaDescription: 'Free EOQ calculator Excel template. Calculate optimal order quantity by SKU using annual demand, order cost, and carrying cost. Built-in sensitivity analysis.',
    metaKeywords: 'eoq calculator excel, economic order quantity template, eoq formula excel, optimal order quantity calculator, inventory eoq spreadsheet',
    h1: 'Free Economic Order Quantity (EOQ) Calculator Excel Template',
    subtitle: 'Calculate the optimal order quantity for every SKU. Balance ordering cost against carrying cost — the right answer is rarely "what the supplier suggests."',
    tldr: 'Working EOQ calculator using the standard Wilson formula plus practical adjustments (minimum order, supplier discounts, shelf life). Sensitivity analysis surfaces how robust each answer is.',
    introParagraphs: [
      'Economic Order Quantity is the most well-known inventory formula and one of the most misapplied. The Wilson formula minimizes the sum of ordering cost and carrying cost — but only under specific assumptions (steady demand, single SKU, no quantity discounts). Most real shops violate at least one assumption.',
      'This template starts with the textbook EOQ then layers practical adjustments: minimum order quantities from suppliers, quantity discounts (when ordering more cuts unit price), shelf life (limiting order size for short-life materials), and storage constraints. The output is a practical order quantity, not just a math output.',
      'Sensitivity analysis matters. EOQ is famously insensitive to errors in inputs — being 20% off on demand changes the optimal order quantity by less than 10%. The template shows the sensitivity so you stop tuning to false precision.'
    ],
    whatsInside: [
      { title: 'EOQ input grid', description: 'Per SKU: annual demand, order cost ($/order), unit cost, carrying cost rate (% of unit cost per year). Standard inputs.' },
      { title: 'Wilson formula calculation', description: 'EOQ = √(2 × annual demand × order cost ÷ carrying cost per unit). Auto-calculated per SKU.' },
      { title: 'Practical adjustments', description: 'Minimum order quantity override, supplier discount break analysis, shelf-life cap, storage constraint cap.' },
      { title: 'Annual cost analysis', description: 'Order frequency, total ordering cost, average inventory cost, total annual cost. Shows the dollars at stake.' },
      { title: 'Sensitivity analysis', description: 'How much does optimal EOQ change if demand is ±20%? If order cost is ±50%? Surfaces which inputs need precision and which do not.' },
      { title: 'Final recommended order quantity', description: 'Practical recommendation per SKU considering all constraints, not just the textbook formula output.' }
    ],
    howToUseSteps: [
      { title: 'Estimate order cost honestly', description: 'Order cost includes: purchase order processing, receiving, inspection, putaway. Most shops have $50–250/order order cost. Underestimating order cost biases EOQ low (more frequent small orders); overestimating biases high.' },
      { title: 'Use realistic carrying cost', description: 'Carrying cost = cost of capital + storage + obsolescence + insurance + handling. Typically 20–30% of unit cost per year. Underestimating this biases EOQ high (large orders that look efficient but tie up cash).' },
      { title: 'Apply EOQ to A items, simpler rules to B and C', description: 'EOQ is precision tuning. Apply it to A SKUs (top 20% of spend). For B and C items, simpler rules (fixed reorder quantity, two-bin) cost less to maintain and produce comparable results.' },
      { title: 'Revisit EOQ when demand or cost changes meaningfully', description: 'EOQ is robust to small input changes; not robust to large ones. When annual demand or unit cost changes 30%+, recalculate. Otherwise leave it alone.' }
    ],
    whenToUpgrade: [
      'You need EOQ embedded in MRP-driven reordering, not a manual calculation.',
      'Multi-location optimization (where to hold inventory) exceeds Excel\'s capability.',
      'Supplier discount structures get complex enough that manual analysis misses optima.',
      'You want to evaluate alternative replenishment policies (min/max, periodic review) against EOQ.'
    ],
    faqs: [
      { question: 'When does EOQ NOT apply?', answer: 'EOQ assumes steady demand and continuous review. It does NOT apply well when: demand is lumpy (a few large orders per year), supplier requires large minimums that exceed EOQ, the material has shelf life shorter than EOQ\'s implied stock cover, or you have quantity discounts that change the optimal point. The template handles each adjustment.' },
      { question: 'What carrying cost percentage should I use?', answer: '20% is the textbook answer; 25–30% is more realistic for most manufacturing. The components: cost of capital (5–10%), storage and handling (5–10%), obsolescence and shrinkage (3–8%), insurance and taxes (2–5%). Use a higher % for high-obsolescence categories (fashion, technology) and a lower % for stable categories.' },
      { question: 'Why does EOQ recommend so many small orders?', answer: 'Because the carrying cost beats the ordering cost when ordering is cheap. If ordering cost is $50 and carrying cost is 25%, optimal order frequency is high. If your shop genuinely has $50 ordering cost (automated PO), this is right; if your ordering process is manual and burdensome, $50 is unrealistically low.' },
      { question: 'How is EOQ different from reorder point?', answer: 'EOQ = how much to order. Reorder point = when to order. They are independent calculations that work together: when stock hits the reorder point, you order EOQ quantity. Both need to be set; one without the other does not work.' }
    ]
  },
  {
    slug: 'safety-stock-calculator',
    displayTitle: 'Safety Stock Calculator',
    category: 'Inventory',
    metaTitle: 'Free Safety Stock Calculator Excel Template (2026)',
    metaDescription: 'Free safety stock calculator Excel template. Calculate optimal safety stock by SKU using demand variability, lead time variability, and target service level.',
    metaKeywords: 'safety stock calculator excel, safety stock formula template, service level calculator, inventory safety stock spreadsheet, demand variability excel',
    h1: 'Free Safety Stock Calculator Excel Template',
    subtitle: 'Calculate the right safety stock for each SKU based on demand variability, lead time variability, and your target service level. Stop guessing — start using the math.',
    tldr: 'Working safety stock calculator using the statistical formula (Z-score × √(LT × σD² + D² × σLT²)). Includes service-level lookup, sensitivity analysis, and what-if scenarios.',
    introParagraphs: [
      'Safety stock is the inventory buffer that prevents stockouts when demand spikes or lead times slip. Setting it too low causes stockouts and missed customers. Setting it too high ties up cash in inventory that never moves. Most shops set safety stock by gut — typically too high for stable items and too low for volatile ones.',
      'The statistical formula uses demand variability AND lead time variability. Most shops only think about demand variability and underestimate the lead time component. A material with stable demand but a supplier that occasionally delivers 2 weeks late needs more safety stock than a material with variable demand and a rock-solid supplier.',
      'This template calculates safety stock per SKU using both inputs and lets you adjust the target service level (95%, 97.5%, 99% are common). Higher service level = more safety stock; the tradeoff is explicit. Most shops cannot afford 99% on every SKU; the template makes the choice deliberate.'
    ],
    whatsInside: [
      { title: 'SKU input grid', description: 'Per SKU: average demand, demand standard deviation, average lead time, lead time standard deviation, target service level.' },
      { title: 'Service level Z-score lookup', description: 'Standard normal table built in: 90% = 1.28, 95% = 1.65, 97.5% = 1.96, 99% = 2.33, 99.9% = 3.09.' },
      { title: 'Safety stock calculation', description: 'SS = Z × √(LT × σD² + D² × σLT²). Auto-calculated per SKU using both demand and lead time variability.' },
      { title: 'Inventory investment estimate', description: 'Safety stock × unit cost = capital tied up in safety stock per SKU. Total across SKUs shows what service level costs.' },
      { title: 'Service level sensitivity', description: 'How much does safety stock change if you increase target from 95% to 99%? The chart that justifies tradeoff decisions.' },
      { title: 'ABC class differentiation', description: 'A items: higher service level (97.5–99.5%). B items: middle (95%). C items: lower (90% or two-bin). Different SLAs by ABC class is the right answer for most shops.' }
    ],
    howToUseSteps: [
      { title: 'Get 90 days of demand data first', description: 'Safety stock math requires statistical inputs — mean and standard deviation. 90 days of daily or weekly demand data is the minimum input. Shorter windows produce unstable answers.' },
      { title: 'Measure lead time variability', description: 'Most shops know the average lead time; few measure the variability. Survey the last 20 orders per supplier: actual lead time vs promised. The standard deviation is the input.' },
      { title: 'Set service level by ABC class, not blanket', description: 'A items deserve 97.5–99% service level (customer-facing). B items 95%. C items 90% or replenish by visual control. A blanket "99% on everything" answer overbuys C items by 5–10×.' },
      { title: 'Recalculate quarterly', description: 'Demand pattern and supplier reliability both change. Quarterly recalculation keeps safety stock right-sized. Annual recalculation is too slow for any shop with meaningful volume.' }
    ],
    whenToUpgrade: [
      'Safety stock calculation needs to feed MRP-driven replenishment automatically.',
      'Multi-echelon inventory (raw, WIP, FG) requires coordinated safety stock optimization.',
      'You want demand forecasting integrated with safety stock so they update together.',
      'Service level targets vary by customer (not just by SKU class).'
    ],
    faqs: [
      { question: 'What service level is "right" for safety stock?', answer: 'Depends on what stockout costs. If a stockout costs $10K in expedite + lost margin, you can afford high service level (99%+). If a stockout costs $50 in delay, 90% is plenty. The right service level matches the cost of stockout to the cost of carrying.' },
      { question: 'What is the difference between safety stock and cycle stock?', answer: 'Cycle stock is the inventory needed for normal demand during the replenishment cycle (replenished as it depletes). Safety stock is the buffer above cycle stock to handle variability. Total inventory at any moment = remaining cycle stock + full safety stock.' },
      { question: 'Why does safety stock include lead time variability?', answer: 'Because a stockout can happen two ways: demand spikes faster than expected (demand variability) or replenishment arrives later than expected (lead time variability). Both need protection. Shops that only consider demand variability under-buffer for supplier risk.' },
      { question: 'How does safety stock relate to reorder point?', answer: 'Reorder point = (average daily demand × lead time) + safety stock. The cycle-stock portion handles average behavior; safety stock handles variability. When stock hits the reorder point, you place an order that arrives — on average — just as you exhaust the cycle portion, leaving safety stock to absorb the variability.' }
    ]
  },
  {
    slug: 'supplier-evaluation-scorecard',
    displayTitle: 'Supplier Evaluation Scorecard',
    category: 'Inventory',
    metaTitle: 'Free Supplier Evaluation Scorecard Excel Template (2026)',
    metaDescription: 'Free supplier evaluation scorecard Excel template. Rate suppliers on quality, delivery, cost, and responsiveness. Drive supplier improvement and consolidation.',
    metaKeywords: 'supplier scorecard excel, supplier evaluation template, supplier rating spreadsheet, vendor scorecard excel, supplier performance template, supplier qbr',
    h1: 'Free Supplier Evaluation Scorecard Excel Template',
    subtitle: 'Score every supplier on quality, delivery, cost, and responsiveness. Use the data to drive supplier improvement, consolidation, and contract renegotiation.',
    tldr: 'Working supplier scorecard with weighted scoring on 4 dimensions: quality (rejection rate), delivery (OTD %), cost (price variance), responsiveness (response time). Auto-roll-up to A/B/C/D supplier classification.',
    introParagraphs: [
      'Most shops have 100–500 suppliers. Most of those suppliers are inherited — no formal evaluation, no clear performance bar, no consolidation discipline. The result: too many suppliers, mediocre performance from most, and no leverage to negotiate better terms.',
      'A supplier scorecard turns supplier relationships from inherited to managed. Each supplier gets scored on the four dimensions that matter — quality (reject rate from your inspection records), delivery (OTD against promised dates), cost (price variance and total cost), responsiveness (how fast they reply to RFQs and issues). Weighted average produces an overall score.',
      'The scorecard becomes the agenda for quarterly business reviews with key suppliers. It also drives consolidation — when 5 suppliers cover a category and 2 score in the top tier, the bottom 3 lose the business. Most shops cut supplier count 20–30% in year one of scorecard discipline.'
    ],
    whatsInside: [
      { title: 'Supplier master', description: 'Supplier name, category, contract dates, contact info, spend last 12 months.' },
      { title: 'Quality score', description: 'Rejection rate (failed incoming inspections ÷ total inspections), weighted average over 12 months. Lower is better.' },
      { title: 'Delivery score', description: 'On-time delivery % (deliveries received within promised date) over 12 months.' },
      { title: 'Cost score', description: 'Price variance vs benchmark or PO, total cost variance, response to cost-down requests.' },
      { title: 'Responsiveness score', description: 'Average days to RFQ response, issue resolution time, communication quality.' },
      { title: 'Composite supplier rank', description: 'Weighted overall score (default 35% quality, 30% delivery, 20% cost, 15% responsiveness). A/B/C/D classification.' }
    ],
    howToUseSteps: [
      { title: 'Set the weighting that matches your business', description: 'A high-volume distributor weights cost heavily; a regulated medical device shop weights quality heavily; a JIT operation weights delivery heavily. The weighting is a strategic decision — make it explicitly.' },
      { title: 'Capture data monthly, score quarterly', description: 'Data collection is monthly: incoming inspection results, delivery receipts, PO price variance. Score calculation is quarterly. The cadence balances rigor with manageability.' },
      { title: 'Use the scorecard in QBRs', description: 'The quarterly business review with top suppliers should start with their scorecard. "You scored a B-, here are the specific events that drove it." That conversation drives improvement.' },
      { title: 'Drive consolidation from the bottom', description: 'D-tier suppliers usually justify dropping. C-tier suppliers get an improvement plan with 6-month review. B-tier suppliers are maintained. A-tier suppliers are protected and grown.' }
    ],
    whenToUpgrade: [
      'Supplier count exceeds 100 active suppliers and Excel rollups slow down.',
      'You need supplier data integrated with PO history, receipt data, and quality records automatically.',
      'Multi-site procurement requires shared real-time supplier visibility.',
      'You want supplier performance to drive automatic sourcing decisions in the buying system.'
    ],
    faqs: [
      { question: 'How often should I update supplier scores?', answer: 'Quarterly is the right cadence for most shops. Monthly is too granular — scores swing on small events. Annually is too slow — bad performance compounds for too long. Quarterly review with quarterly action drives sustainable improvement.' },
      { question: 'How do I score suppliers I have little volume with?', answer: 'Low-volume suppliers get scored on the same dimensions but the data is sparse. Use a smaller sample with explicit "sample size: low" flag in the rollup. Do not over-weight 1–2 transactions.' },
      { question: 'Should I share scorecards with suppliers?', answer: 'Yes — for A and B suppliers. The scorecard is the basis for improvement conversations. For C and D suppliers under review for dropping, sharing makes sense as the "improve or lose business" warning. For one-off suppliers, scorecard sharing has little ROI.' },
      { question: 'What is the typical action plan for a C-tier supplier?', answer: 'A 90-day improvement plan with specific targets (e.g., OTD from 78% to 90%, reject rate from 4% to under 2%) and a quarterly review. If targets are missed, drop or restrict volume. If hit, move to B with continued monitoring.' }
    ]
  },
  {
    slug: 'inventory-turnover-calculator',
    displayTitle: 'Inventory Turnover Calculator',
    category: 'Inventory',
    metaTitle: 'Free Inventory Turnover Calculator Excel Template (2026)',
    metaDescription: 'Free inventory turnover calculator Excel template. Calculate turns by category, identify slow movers, and surface the cash trapped in unproductive inventory.',
    metaKeywords: 'inventory turnover excel, turnover ratio calculator, inventory turns template, manufacturing turnover spreadsheet, days inventory excel',
    h1: 'Free Inventory Turnover Calculator Excel Template',
    subtitle: 'Calculate inventory turns by category, by SKU, and by location. Surface the slow movers tying up cash. Most shops can free 20–30% of working capital here.',
    tldr: 'Working inventory turnover calculator with multi-level rollup (overall, by category, by SKU), days-of-inventory calculation, and slow-mover identification. The data that frees working capital.',
    introParagraphs: [
      'Inventory turnover is the single best measure of how productive your inventory is. Cost of goods sold ÷ average inventory = turns per year. High turns = inventory is moving. Low turns = cash sitting on the floor doing nothing.',
      'Plant-average turnover hides the action. The overall number might be 6 turns per year — looks decent. Underneath, A items might be turning 12× while a tail of C items is turning 0.5× and quietly tying up 30% of total inventory value. The detail is where the cash hides.',
      'This template calculates turnover at three levels: overall, by category, by SKU. The SKU-level analysis surfaces slow movers — SKUs with under 2 turns per year are candidates for promotion, write-off, or supplier return. Most shops free 20–30% of working capital in the first year of disciplined turnover analysis.'
    ],
    whatsInside: [
      { title: 'Overall turnover calculation', description: 'Annual COGS ÷ average inventory value = company-wide turns per year. The headline number.' },
      { title: 'Category-level rollup', description: 'Turnover by raw material, WIP, finished goods. Each typically turns at different rates; segmenting reveals the dynamics.' },
      { title: 'SKU-level analysis', description: 'Each SKU\'s annual usage ÷ average on-hand = SKU turns. Sorted to surface slow and fast movers.' },
      { title: 'Days of inventory', description: '365 ÷ turns = days of inventory on hand. Easier to interpret than turns for many people (30 days vs 6 turns).' },
      { title: 'Slow mover identification', description: 'SKUs with under 2 turns per year, flagged for disposition decision (promote, discount, return, scrap).' },
      { title: 'Trend analysis', description: '12-month rolling turnover by category. Improving = working capital release. Declining = working capital trap forming.' }
    ],
    howToUseSteps: [
      { title: 'Use accurate average inventory', description: '"Year-end inventory" understates the average if year-end is a low season. Calculate average using 12 monthly snapshots (or 4 quarterly) for accuracy.' },
      { title: 'Use COGS, not sales', description: 'Turnover uses COGS in the numerator, not sales. Sales inflates turnover artificially because it includes margin. COGS gives the true productivity number.' },
      { title: 'Segment by category to find the pattern', description: 'Plant-average turns lie. RM might turn 8×, WIP 20×, FG 4× — different problems with different fixes. Always segment.' },
      { title: 'Convert slow movers monthly, not annually', description: 'Slow-mover decisions made quarterly drift; made annually fail. Monthly review with sales and operations keeps obsolete inventory from accumulating.' }
    ],
    whenToUpgrade: [
      'You need turnover analysis tied to MRP-driven replenishment and obsolete-inventory write-off automatically.',
      'Multi-location inventory requires shared real-time turnover visibility.',
      'Forecast-driven inventory planning requires more sophisticated analysis than Excel supports.',
      'CFO reporting on working capital requires audit-trail and validated calculations.'
    ],
    faqs: [
      { question: 'What inventory turnover is "good"?', answer: 'Industry-specific. Distribution: 12+ turns/year. Job shop manufacturing: 6–10 turns. Make-to-stock manufacturing: 4–8 turns. Long-cycle aerospace: 2–4 turns. The right benchmark is your own trend — improving turns by 1.5× over 18 months is achievable and impactful regardless of starting point.' },
      { question: 'How is inventory turnover different from days of inventory?', answer: 'Inverse measures. Turns = how many times you cycle through inventory per year. Days of inventory = how many days of demand you have on hand. 6 turns = 61 days; 12 turns = 30 days. Either works; pick whichever your team understands intuitively.' },
      { question: 'Why is my plant-average turnover hiding bad SKUs?', answer: 'Because averages are weighted by value. A few high-volume fast-moving SKUs (10+ turns) can mask a tail of slow movers (under 1 turn) that account for 30%+ of inventory value. The SKU-level analysis is required to see the slow movers; the average never will.' },
      { question: 'What should I do with slow-moving inventory?', answer: 'Disposition decisions: promote (discount to move), return to supplier (if recently bought), substitute (use in different application), donate, scrap, write-off. The right answer depends on the SKU. The discipline is making the decision quarterly, not letting slow movers age into obsolescence.' }
    ]
  },
  // ===========================================================================
  // GROUP 5 — PLANNING (6)
  // ===========================================================================
  {
    slug: 'weekly-production-plan',
    displayTitle: 'Weekly Production Plan',
    category: 'Planning',
    metaTitle: 'Free Weekly Production Plan Excel Template (2026) — Manufacturing',
    metaDescription: 'Free weekly production plan Excel template. Plan jobs by day, work center, and shift. Balance load, spot conflicts, and ship on time.',
    metaKeywords: 'weekly production plan excel, weekly production schedule template, week production planner, manufacturing weekly plan, production planning spreadsheet weekly',
    h1: 'Free Weekly Production Plan Excel Template',
    subtitle: 'Plan the week ahead — every job, every work center, every shift. Spot capacity conflicts before they hit the floor and stop running production reactively.',
    tldr: 'Working weekly production plan with day-by-day job assignment, load balancing per work center, and conflict detection. The first step from reactive scheduling to proactive planning.',
    introParagraphs: [
      'Most shops plan production daily, which means they plan reactively — yesterday\'s problems drive today\'s schedule. Weekly planning is different in kind, not degree. Looking 5–7 days ahead surfaces capacity conflicts in time to fix them: borrow operators, run overtime, push customer dates, or expedite material.',
      'This template lays out the week as a grid: days across the top, work centers down the left. Each cell shows the scheduled job, quantity, and estimated hours. Load summary per work center surfaces over-allocation (more hours scheduled than available) before Monday turns into Friday\'s disaster.',
      'For a 5–15 work center shop, this template handles weekly planning. Past that, finite-capacity scheduling software becomes necessary — manual load balancing across more than ~15 resources is the point where humans miss conflicts. RMDB takes over at that scale while preserving the same logical flow.'
    ],
    whatsInside: [
      { title: 'Weekly grid', description: 'Days × work centers grid. Each cell shows scheduled job, quantity, and estimated hours.' },
      { title: 'Job priority list', description: 'Open orders sorted by due date and customer priority. Drag from this list into the grid.' },
      { title: 'Work center load summary', description: 'Per work center, sum of scheduled hours vs available hours per day. Over-allocation flags red.' },
      { title: 'Material readiness check', description: 'For each scheduled job, flag whether all required material is on hand. Schedule with missing material = guaranteed disruption.' },
      { title: 'Conflict resolution worksheet', description: 'When a work center is over-allocated, the worksheet helps decide: move job, overtime, alternate work center, push customer date.' },
      { title: 'Friday review report', description: 'End-of-week comparison: planned vs actual completion by job. Variance feeds next week\'s plan.' }
    ],
    howToUseSteps: [
      { title: 'Plan on Wednesday for the following week', description: 'Wednesday gives time to fix issues — order material, schedule operators, negotiate customer dates. Friday is too late. Monday morning is reactive, not planning.' },
      { title: 'Schedule by capacity, not by hope', description: 'Hours scheduled per work center per day cannot exceed available hours. The template flags violations. Overriding the flag because "we can probably catch up" is how missed ships happen.' },
      { title: 'Sequence for setup efficiency', description: 'Group similar jobs (same fixture, same material) on the same day at the same work center. Setup time reduction from sequencing typically frees 5–10% of capacity.' },
      { title: 'Review Friday vs Monday', description: 'The variance between Monday\'s plan and Friday\'s reality is the data. Track it. The shop that consistently delivers 85% of planned work has a different fix than the one delivering 50%.' }
    ],
    whenToUpgrade: [
      'Work center count exceeds 15 and manual load balancing misses conflicts.',
      'You need the weekly plan tied to the customer-facing promise dates automatically.',
      'Multi-shift coordination makes paper-based handoffs unreliable.',
      'You want what-if scheduling (simulate a customer expedite without disrupting the live plan).'
    ],
    faqs: [
      { question: 'How is a weekly plan different from a daily schedule?', answer: 'A weekly plan establishes the work center load and job sequencing for the week ahead. A daily schedule executes against that plan, handling the inevitable disruptions (sick operator, late material, expedite). The week sets direction; the day adapts to reality.' },
      { question: 'How do I handle expedites mid-week?', answer: 'Every weekly plan needs a 10–15% buffer to absorb expedites. Without buffer, every expedite blows up the plan and forces overtime. With buffer, expedites slot in. The buffer is a slack allocation per work center, not a phantom capacity.' },
      { question: 'What if material is not ready by the scheduled start day?', answer: 'Either push the job (most common) or pull substitute material (rare). The material readiness check at planning time should catch missing material before scheduling. Scheduling a job without material is planning to fail.' },
      { question: 'How do I plan for the long lead-time jobs?', answer: 'Long lead-time jobs (3+ weeks of cycle time) get planned at the master production schedule level, not the weekly plan. The weekly plan executes a slice of the MPS. The MPS template is a separate tool for that purpose.' }
    ]
  },
  {
    slug: 'daily-shop-schedule',
    displayTitle: 'Daily Shop Schedule',
    category: 'Planning',
    metaTitle: 'Free Daily Shop Schedule Excel Template (2026) — Manufacturing Dispatch List',
    metaDescription: 'Free daily shop schedule Excel template. Hour-by-hour job assignment per work center for the next 24 hours. Shop floor dispatch list ready.',
    metaKeywords: 'daily shop schedule excel, daily production schedule template, dispatch list excel, daily manufacturing schedule, shop floor schedule daily',
    h1: 'Free Daily Shop Schedule Excel Template',
    subtitle: 'Hour-by-hour job assignment per work center for the next 24 hours. The dispatch list the shop floor actually reads at the start of every shift.',
    tldr: 'Working daily schedule with hourly granularity per work center. Real-time updates as jobs complete or shift. The dispatch list the floor actually uses.',
    introParagraphs: [
      'A daily shop schedule is different from a weekly plan in granularity, not concept. The weekly plan says "Job 1234 runs at Mill 2 on Tuesday." The daily schedule says "Job 1234 starts at Mill 2 at 8:30 AM Tuesday, runs 4.5 hours, then Job 1235 takes over at 1:30 PM." That precision is what the shop floor needs to execute.',
      'Most shops produce a daily dispatch list — paper, Excel, or whiteboard. The format matters less than the discipline of producing it every morning before first shift. Operators starting the day with a clear list of what to run next have 20–30% fewer "what do I do" interruptions to supervisors.',
      'This template gives you that dispatch list in a printable format, with hourly time slots, job numbers, item numbers, quantities, and setup time noted. As jobs complete or shift, the template updates and reprints. Past the point where this manual update becomes a chore, finite-capacity scheduling software (RMDB) handles the same flow automatically.'
    ],
    whatsInside: [
      { title: 'Hourly schedule grid', description: 'Per work center, time slots in 30-minute increments from shift start to shift end. Each slot shows the active job.' },
      { title: 'Job detail per slot', description: 'Job number, item, customer, quantity, estimated hours, setup time. Enough info for operators to execute without questions.' },
      { title: 'Material readiness flag', description: 'Per job, confirmation that material is staged at the work center. Red flag = material not ready, job at risk.' },
      { title: 'Dispatch list printable', description: 'One-page-per-work-center printable format. Goes to the shop floor at the start of each shift.' },
      { title: 'Real-time progress update', description: 'As jobs complete, the template updates remaining schedule. Late-running jobs cascade downstream automatically.' },
      { title: 'Shift handoff report', description: 'End-of-shift summary: planned vs completed, late jobs, issues encountered. Hands off to the next shift cleanly.' }
    ],
    howToUseSteps: [
      { title: 'Build at end-of-shift, not start-of-shift', description: 'Build tomorrow\'s schedule before the team leaves today. Operators arriving to a complete dispatch list start working immediately. Operators waiting for a schedule lose 30 minutes per day.' },
      { title: 'Sequence by setup', description: 'Within each work center, group jobs requiring similar setup. Sequencing well frees 5–10% of daily capacity through setup avoidance.' },
      { title: 'Block time for known disruptions', description: 'PM, breaks, training, shift change overhead — block these in the schedule. Pretending they do not exist makes the schedule fail by 10 AM.' },
      { title: 'Update at shift change', description: 'The schedule that started the day is rarely the schedule that ended it. Update at the shift handover so the next shift starts with current reality.' }
    ],
    whenToUpgrade: [
      'You need the schedule updated automatically from shop floor scan-ins, not manual entry.',
      'Real-time rescheduling required when a job breaks down or material runs late.',
      'Multi-shift, multi-work-center coordination exceeds what a printed dispatch list can handle.',
      'You want what-if scheduling (simulate an expedite without disturbing the live schedule).'
    ],
    faqs: [
      { question: 'How granular should the schedule be?', answer: '30-minute slots is right for most shops. 15-minute is too granular (people cannot dispatch that precisely; the false precision wastes time). Hourly is too coarse for short-cycle work. 30 minutes balances precision against maintenance overhead.' },
      { question: 'How do I handle jobs that take longer than expected?', answer: 'The schedule cascades downstream — late completion of Job A pushes Job B\'s start. The template reflects that automatically. The supervisor decides: catch up with overtime, push customer dates, or move work to an alternate work center.' },
      { question: 'Who maintains the daily schedule?', answer: 'A dedicated dispatcher or planning person in larger shops; the production supervisor in smaller shops. Operators do not maintain the schedule — they execute against it. Mixing roles confuses ownership.' },
      { question: 'What if the customer changes priority mid-day?', answer: 'Three options: (1) swap the new priority into the current slot and push the bumped job, (2) accept the new priority but schedule it later in the day, (3) push back to the customer with a revised commitment. The template makes the tradeoff visible (what gets pushed if we do this) so the decision is informed.' }
    ]
  },
  {
    slug: 'monthly-production-plan',
    displayTitle: 'Monthly Production Plan',
    category: 'Planning',
    metaTitle: 'Free Monthly Production Plan Excel Template (2026)',
    metaDescription: 'Free monthly production plan Excel template. Aggregate planning by product family for the next 30 days. Tie sales forecast to production capacity.',
    metaKeywords: 'monthly production plan excel, monthly production schedule template, monthly manufacturing plan, production planning monthly, manufacturing forecast template',
    h1: 'Free Monthly Production Plan Excel Template',
    subtitle: 'Aggregate planning by product family for the next 30 days. The bridge between sales forecast and weekly production execution.',
    tldr: 'Working monthly production plan template with product-family aggregation, sales forecast input, capacity check, and inventory position. The horizon that S&OP discipline lives in.',
    introParagraphs: [
      'Monthly planning is the horizon where S&OP (Sales and Operations Planning) discipline lives. Daily and weekly schedules execute; monthly plans decide. How much capacity to commit to which product family. Whether to hire, run overtime, or carry inventory. Which customer orders to accept for the period ahead.',
      'Most small manufacturers do monthly planning informally — sales has a number, operations has a capacity, the gap gets debated and resolved without explicit data. This template makes the data explicit: forecast demand by family, available capacity by work center, beginning and ending inventory targets, identified capacity gaps.',
      'Done well, monthly planning surfaces decisions 30–60 days before they become emergencies. The capacity gap at the press 6 weeks from now becomes hire-a-second-operator now, not pay-double-overtime then. Most shops adopt this discipline once and never go back.'
    ],
    whatsInside: [
      { title: 'Product family forecast', description: 'Per family, forecast quantity for the month. Combined sales-pipeline + historical run rate + customer commitments.' },
      { title: 'Capacity required per family', description: 'Forecast quantity × hours per unit = required hours by work center per family.' },
      { title: 'Capacity available', description: 'Per work center, available hours per month (shift hours × days × number of machines minus planned downtime).' },
      { title: 'Capacity gap report', description: 'Required vs available, per work center, per family. Negative = shortfall (overtime, expedite, push date, hire); positive = surplus (sales push or maintenance window).' },
      { title: 'Beginning + ending inventory', description: 'For each family, beginning inventory + production - shipments = ending inventory. Inventory target by family informs production volume.' },
      { title: 'Aggregate plan output', description: 'Final monthly production target per family, reconciled with capacity and inventory targets. This is the input to the weekly plan.' }
    ],
    howToUseSteps: [
      { title: 'Plan one month ahead with 60-day visibility', description: 'Monthly plan covers next month\'s production. Forecast extends 60 days so the plan-after-next is visible too. Six weeks of forward visibility is the sweet spot for actionable planning.' },
      { title: 'Reconcile sales forecast with production capacity', description: 'Sales forecast that exceeds capacity is not a plan — it is a wish. The reconciliation conversation (S&OP) decides what gets cut, added, or pushed. Without explicit reconciliation, the forecast lies.' },
      { title: 'Use product families, not individual SKUs', description: 'Monthly planning at the SKU level is too granular and unstable. Product families (similar process, similar capacity profile) make the planning robust. Disaggregate to SKU at the weekly level.' },
      { title: 'Hold monthly S&OP meeting', description: 'The output of this template is the input to the monthly S&OP meeting (sales, operations, planning, sometimes finance). The decisions made there set the direction for the next 30–60 days.' }
    ],
    whenToUpgrade: [
      'Forecast accuracy needs statistical methods beyond Excel\'s capability.',
      'Multi-site capacity planning exceeds what a single spreadsheet can model.',
      'You need MPS-driven MRP that flows from monthly plan to material requisitions automatically.',
      'S&OP discipline requires shared scenarios and what-if analysis across sales, operations, finance.'
    ],
    faqs: [
      { question: 'What is a "product family" for planning purposes?', answer: 'A group of SKUs that share process route and similar capacity requirements. For a machine shop, this might be "small precision parts" vs "large structural parts." For food manufacturing, "frozen products" vs "shelf-stable." Family granularity is shop-specific — typically 5–20 families covers most operations.' },
      { question: 'How does monthly planning relate to S&OP?', answer: 'S&OP is the process of reconciling demand (sales forecast) with supply (production capacity) at a monthly horizon. The monthly production plan template is the substrate of S&OP — the data the cross-functional team reviews to make decisions about capacity, inventory, and customer commitments.' },
      { question: 'How accurate does the monthly forecast need to be?', answer: 'Accuracy improves over the planning horizon: 30 days out should be within 10–15% at the family level; 60 days out within 20–25%. Demand at the SKU level is always less accurate than at the family level. Plan capacity at the family level; resolve SKU detail at the weekly level.' },
      { question: 'What if sales forecast and production capacity do not match?', answer: 'That is the point of the planning meeting. Options: increase capacity (overtime, hire, second shift, outsource), reduce demand (push customer dates, deprioritize speculative orders), or change inventory position (build ahead to use future capacity). The template makes the gap visible; the meeting makes the call.' }
    ]
  },
  {
    slug: 'demand-forecast-template',
    displayTitle: 'Demand Forecast Template',
    category: 'Planning',
    metaTitle: 'Free Demand Forecast Excel Template (2026) — Manufacturing Forecasting',
    metaDescription: 'Free demand forecast Excel template. Build statistical forecasts (moving average, exponential smoothing) with seasonality. Compare forecast methods.',
    metaKeywords: 'demand forecast excel template, sales forecast spreadsheet, manufacturing forecast template, statistical forecast excel, exponential smoothing template',
    h1: 'Free Demand Forecast Excel Template',
    subtitle: 'Build statistical forecasts from history — moving average, weighted moving average, exponential smoothing, with seasonal adjustment. Compare methods on the same data.',
    tldr: 'Working demand forecast template with 4 forecast methods, forecast error metrics (MAPE, MAD, bias), and seasonal index calculation. Pick the right method for each SKU based on data.',
    introParagraphs: [
      'Most shops "forecast" demand by extrapolating last quarter and adjusting by gut. The result is forecasts that are biased optimistic (sales\' instinct), inconsistent across SKUs, and impossible to improve because nobody measures forecast error.',
      'Statistical forecasting is not complicated math — but it is consistent math. The template provides 4 forecast methods (simple moving average, weighted moving average, single exponential smoothing, double exponential smoothing for trend) and runs each against the same historical data. Forecast error metrics (MAPE, MAD, bias) tell you which method fits each SKU best.',
      'For most manufacturing demand, exponential smoothing wins. For seasonal products (consumer goods, food), seasonal-adjusted forecasts beat naïve methods substantially. The template handles both; the discipline of measuring forecast error is what turns "forecast" from gut guess to managed input.'
    ],
    whatsInside: [
      { title: 'Demand history input', description: 'Up to 36 months of historical demand per SKU. Weekly or monthly granularity.' },
      { title: 'Simple moving average', description: '3-month, 6-month, and 12-month moving averages. Stable but slow to react.' },
      { title: 'Weighted moving average', description: 'Recent months weighted higher. Faster reaction to trend than simple MA.' },
      { title: 'Single exponential smoothing', description: 'Smoothing constant α adjustable (typically 0.1–0.3). Better at handling level shifts than moving averages.' },
      { title: 'Double exponential smoothing', description: 'Holt method — handles trend (gradual rise or decline) explicitly. The right choice for growing or declining demand patterns.' },
      { title: 'Seasonal index', description: 'For seasonal products, calculate monthly seasonal index from historical data. Apply to base forecast for seasonal-adjusted forecast.' },
      { title: 'Forecast accuracy metrics', description: 'MAPE (Mean Absolute Percent Error), MAD (Mean Absolute Deviation), bias. Compare methods on the same data.' }
    ],
    howToUseSteps: [
      { title: 'Use enough history', description: 'Minimum 12 months of data; 24+ months for seasonal products. Forecasting from 6 months of history is dart-throwing.' },
      { title: 'Pick the method that minimizes MAPE per SKU', description: 'Different SKUs respond to different methods. Stable demand: moving average. Trending demand: double exponential smoothing. Seasonal demand: seasonal-adjusted. Test each method on each SKU and pick the winner.' },
      { title: 'Track forecast error over time', description: 'Update MAPE and bias monthly. Bias drifting positive = forecasts systematically too high. Bias drifting negative = systematically too low. Both correctable.' },
      { title: 'Override statistical forecasts with explicit reasons', description: 'Sales sometimes knows things history does not (lost a customer, won a contract). Overrides are allowed; they must be documented with reason. Tracking override accuracy separately surfaces whether sales\' instinct beats the math (rarely does).' }
    ],
    whenToUpgrade: [
      'SKU count exceeds 200 and Excel slows down with 24 months × method × SKU.',
      'Advanced methods (ARIMA, Croston for intermittent demand, machine learning) outperform basic methods on your data.',
      'Forecast needs to flow into MRP and S&OP automatically.',
      'Demand sensing (real-time signals from POS, IoT, sentiment) requires platforms Excel cannot match.'
    ],
    faqs: [
      { question: 'What is MAPE and what is "good" MAPE?', answer: 'MAPE = Mean Absolute Percent Error = average of |actual - forecast| / actual. 10% is excellent for most manufacturing demand. 20% is OK. 30%+ means the method is not fitting and you should try another. Intermittent or low-volume SKUs may run higher MAPE — they are statistically harder.' },
      { question: 'What does "forecast bias" mean?', answer: 'Bias = average of (forecast - actual). Bias near zero = unbiased forecasts. Bias positive = forecasts systematically too high (over-ordering, excess inventory). Bias negative = forecasts systematically too low (stockouts, expediting). Bias is the most actionable forecast error metric.' },
      { question: 'How do I handle intermittent demand?', answer: 'Intermittent demand (frequent zero periods, occasional spikes) does not fit standard smoothing methods. Use Croston\'s method or simply use safety-stock-based logic rather than forecast-based logic. Template includes a basic Croston implementation for these SKUs.' },
      { question: 'How does seasonality affect forecast?', answer: 'Seasonality is the predictable monthly pattern around the base trend. Calculate the seasonal index from history (each month\'s average vs annual average), then apply: base forecast × seasonal index = seasonally-adjusted forecast. Done well, this drops MAPE by 30–50% on seasonal products.' }
    ]
  },
  {
    slug: 'backlog-tracker',
    displayTitle: 'Order Backlog Tracker',
    category: 'Planning',
    metaTitle: 'Free Order Backlog Tracker Excel Template (2026) — Manufacturing',
    metaDescription: 'Free order backlog tracker Excel template. Track open orders by customer, due date, and status. Surface late orders and capacity load from open backlog.',
    metaKeywords: 'order backlog tracker excel, backlog management template, open order tracker, manufacturing backlog spreadsheet, sales order backlog excel',
    h1: 'Free Order Backlog Tracker Excel Template',
    subtitle: 'Track open orders by customer, due date, and value. Surface late orders before customer calls and convert backlog into a capacity-load forecast for production.',
    tldr: 'Working order backlog tracker with aging, customer rollup, capacity-load conversion, and on-time risk flagging. The system that ties sales orders to production reality.',
    introParagraphs: [
      'Open order backlog is sales\' favorite report and operations\' worst-kept secret. Sales celebrates large backlogs as future revenue; operations sees them as future emergencies. The truth depends on whether the backlog matches available capacity — usually it does not, and nobody calculates the gap until customer escalations begin.',
      'This template converts the backlog list into a capacity-load forecast: which work centers are over-promised, which weeks have slack, which customers will get pushed if nothing changes. The math is straightforward; the discipline of doing it weekly is what separates shops that ship on time from shops that scramble.',
      'Backlog aging is the other half. Orders that have been open longer than the standard lead time signal something stalled — material issue, customer change, production block. Surfacing these proactively prevents the customer-driven escalation that always arrives too late to fix gracefully.'
    ],
    whatsInside: [
      { title: 'Open order list', description: 'Order number, customer, item, quantity, value, order date, due date, status.' },
      { title: 'Aging analysis', description: 'Days since order vs standard lead time. Orders aging beyond standard flag yellow; past due flag red.' },
      { title: 'Customer rollup', description: 'Total backlog value and order count by customer. Surfaces concentration and customer-specific lateness.' },
      { title: 'Capacity load conversion', description: 'For each open order, required hours per work center. Sum by week shows the load the backlog imposes on production.' },
      { title: 'Late-risk flagging', description: 'Orders where current capacity load + production time exceeds the due date — late before they start. The most important report in this template.' },
      { title: 'Win/lose probability for unfirm orders', description: 'For sales pipeline (not yet firm): include in backlog at probability-weighted volume to surface upside and downside scenarios.' }
    ],
    howToUseSteps: [
      { title: 'Refresh weekly', description: 'Backlog changes daily — new orders come in, shipments go out. Weekly refresh keeps the aging and load analysis current. Daily is overkill; monthly is too slow.' },
      { title: 'Convert backlog to capacity load', description: 'Total backlog hours per work center per week is the load. Comparing that to available capacity surfaces over-promised periods. This is the calculation most sales-driven shops never do.' },
      { title: 'Action late-risk orders proactively', description: 'When the template flags an order as "late before it starts," call the customer before they call you. Options: pull material to expedite, alternate work center, push due date, partial shipment. Late-risk orders managed proactively are recoverable; late-risk orders managed reactively are not.' },
      { title: 'Use in weekly sales-operations sync', description: 'The backlog vs capacity report is the agenda for the weekly sales-ops sync. Sales sees what they can promise; operations sees what they need to ship. Decisions made here prevent month-end fires.' }
    ],
    whenToUpgrade: [
      'Order volume exceeds 200 open orders and Excel rollups slow down.',
      'You need backlog tied to the live finite-capacity production schedule for real-time promise dates.',
      'Multi-site fulfillment requires shared real-time backlog visibility across locations.',
      'Sales pipeline integration (orders not yet firm) requires CRM-ERP-planning system integration.'
    ],
    faqs: [
      { question: 'What is "backlog" exactly?', answer: 'Open customer orders that have been accepted but not yet shipped. Different from sales pipeline (not yet firm orders) and different from forecast (predicted future orders). Backlog is committed work that production must deliver. Healthy backlog is 2–8 weeks; less = capacity is under-utilized; more = lead times are stretching dangerously.' },
      { question: 'How do I know if my backlog is "too big"?', answer: 'Backlog in weeks of capacity. Backlog dollars ÷ (annual revenue ÷ 52) = weeks of backlog. For most manufacturers, 4–8 weeks is healthy. Past 12 weeks, lead times are too long and you risk losing future orders. Under 2 weeks, capacity is underutilized.' },
      { question: 'What is "load" vs "backlog"?', answer: 'Backlog is the dollar (or quantity) measure of open orders. Load is the capacity (hours) measure. Backlog of $500K could be 200 hours of work or 2000 hours of work depending on the mix. Load is what production manages; backlog is what sales celebrates. Both matter; the template converts between them.' },
      { question: 'How do I handle unfirm orders (sales pipeline)?', answer: 'Include unfirm orders at probability-weighted volume in a separate scenario. Best case (90% probability orders included) shows ceiling; base case (70%+) shows likely; worst case (firm only) shows floor. Capacity planning needs all three views to make good hire/overtime/push decisions.' }
    ]
  },
  {
    slug: 'tool-life-tracker',
    displayTitle: 'Tool Life Tracker',
    category: 'Planning',
    metaTitle: 'Free Tool Life Tracker Excel Template (2026) — Cutting Tool Management',
    metaDescription: 'Free tool life tracker Excel template. Track cutting tool usage, expected life, and replacement timing. Prevent unexpected tool failures mid-cut.',
    metaKeywords: 'tool life tracker excel, cutting tool tracker, tool management spreadsheet, tool inventory excel, tool life calculator, machining tool tracker',
    h1: 'Free Tool Life Tracker Excel Template',
    subtitle: 'Track every cutting tool: hours used, expected life, location, replacement timing. Prevent the mid-job tool failure that turns a 4-hour run into an 8-hour scramble.',
    tldr: 'Working tool life tracker by tool ID, with usage hours, expected life, end-of-life predictions, and replacement signaling. Prevents unplanned downtime from preventable tool failures.',
    introParagraphs: [
      'Cutting tools are the most expensive consumable in most machining operations — and the least systematically managed. Most shops track tools the way they manage office supplies: notice when they are out, order more, hope nobody runs out mid-job.',
      'The cost is not just the tool inventory — it is the downtime. A tool failure mid-cut means: stop the machine, inspect the part (often scrap it), find a replacement tool (often not immediately available), reset, restart. A planned tool change at end-of-job takes 5 minutes; an unplanned change mid-job takes 30–60 minutes.',
      'This template tracks every tool by ID: machine, current usage hours, expected total life, percentage consumed. When tools cross thresholds (75% used, 90% used), the template signals time to replace. Maintenance windows become planned, not emergency. Most shops cut tool-related downtime 50–70% with this discipline.'
    ],
    whatsInside: [
      { title: 'Tool master', description: 'Tool ID, description, machine, part number, manufacturer, cost, expected life hours.' },
      { title: 'Usage log', description: 'Per tool, cumulative hours used (or pieces machined). Each job that uses the tool adds to the usage count.' },
      { title: 'Tool life percentage', description: 'Used hours ÷ expected life × 100. Color-coded: green under 50%, yellow 50–75%, orange 75–90%, red over 90%.' },
      { title: 'Replacement prediction', description: 'At current usage rate, when will this tool reach end-of-life? Predicted date drives proactive replacement scheduling.' },
      { title: 'End-of-life signal', description: 'Tools past 90% of expected life flag for replacement at next job change — never mid-job.' },
      { title: 'Tool inventory check', description: 'For each tool reaching end-of-life, check that a replacement is in inventory. Order signal fires if not.' }
    ],
    howToUseSteps: [
      { title: 'Establish expected life per tool', description: 'Use manufacturer recommendations as the starting point. Adjust based on observed performance — most shops find their actual tool life is 60–80% of catalog spec due to real-world conditions. Calibrate over 90 days of tracking.' },
      { title: 'Log usage by job, not by hour', description: 'At end of each job, log the hours that tool ran. Continuous time tracking is impractical; per-job logging is sustainable and accurate enough.' },
      { title: 'Replace at 90% consumed, not at failure', description: 'The temptation is to push tools to failure for maximum utilization. Resist it. Tools replaced at 90% prevent the mid-job failure; tools pushed to 110% statistically cause one mid-job failure for every 10 successful runs.' },
      { title: 'Track variance to predict better', description: 'When tools last longer or shorter than expected, update the expected life. Variance data over 90 days surfaces which tools have stable life and which are volatile. The volatile ones need more conservative replacement triggers.' }
    ],
    whenToUpgrade: [
      'Tool count exceeds what manual tracking sustains (200+ active tools).',
      'You need tool life data captured automatically from spindle hours or piece counts.',
      'Multi-machine, multi-shift tool management requires shared real-time visibility.',
      'You want tool replacement signals to drive automatic inventory reorder.'
    ],
    faqs: [
      { question: 'What is "expected tool life" exactly?', answer: 'The average operating time a tool can perform before quality or geometry degrades to unacceptable. Depends on material being cut, cutting parameters, cooling, and tool grade. Manufacturer catalog life is the starting point; observed life in your specific application is what you should calibrate to over time.' },
      { question: 'How do I know when a tool is at end-of-life?', answer: 'Three signals: (1) usage hours approach expected life (predictive); (2) part dimensions start drifting from spec (in-process check); (3) operator notices increased force or noise (qualitative). The template uses the first signal; the operator confirms with the second and third.' },
      { question: 'Should I always replace tools at end-of-life, or push them?', answer: 'Always replace at the planned threshold (typically 90% of expected life). Pushing tools to failure looks like efficiency on paper but creates mid-job failures that cost more in downtime and scrap than the saved tool cost. The math favors disciplined replacement.' },
      { question: 'How does tool tracking improve overall shop performance?', answer: 'Three ways: (1) prevents unplanned downtime from tool failure (often 5–10% of mill/lathe downtime); (2) prevents scrap from worn tools producing out-of-spec parts; (3) reduces tooling inventory by knowing what is actually needed vs hoarded "just in case." Combined, most shops see 8–15% capacity improvement.' }
    ]
  }
];

export function getExcelTemplateBySlug(slug: string): TemplateData | undefined {
  return EXCEL_TEMPLATES.find((t) => t.slug === slug);
}

export const EXCEL_TEMPLATE_SLUGS = EXCEL_TEMPLATES.map((t) => t.slug);
