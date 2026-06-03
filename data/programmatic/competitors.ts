/**
 * Competitor profiles for programmatic SEO expansion.
 *
 * 20 NEW comparisons that complement the 10 existing static comparison pages
 * at /compare-products/rmdb-vs-{epicor,fishbowl,e2-shop-system,global-shop-
 * solutions,netsuite,odoo,preactor,proshop,quickbooks,sap}.
 *
 * Each profile must:
 *   - Reflect real competitor positioning (not generic "RMDB is better")
 *   - Provide balanced strengths/weaknesses on both sides
 *   - Identify the buyer profile that should pick each tool
 *   - Be substantive enough to clear the thin-content bar (≥600 words)
 *
 * Sources for competitor positioning: vendor websites, G2 reviews, Capterra,
 * customer case studies, industry analyst notes (Gartner, Forrester). Where
 * a fact is genuinely uncertain ("competitor X starts around $Y/user/month"),
 * the language is hedged. Pricing changes frequently — re-verify before
 * customer-facing use.
 */

import type { ComparisonPageData } from '@/components/marketing/compare/comparison-page';

export const COMPETITORS: ComparisonPageData[] = [
  {
    slug: 'rmdb-vs-plex',
    competitor: 'Plex Systems',
    competitorDescription: 'Cloud-based smart-manufacturing platform (Rockwell Automation) with ERP + MES + quality',
    h1: 'RMDB vs Plex Systems: Cloud ERP Power vs Finite-Capacity Focus',
    subtitle: 'Plex is a deeply integrated cloud manufacturing platform owned by Rockwell. RMDB is a finite-capacity scheduling system. They solve overlapping but different problems for different buyers.',
    tldr: 'Plex is the right answer for $50M+ manufacturers who want one cloud platform spanning ERP, MES, quality, and analytics — and who can afford the implementation. RMDB is the right answer for $5M–$200M manufacturers who need finite-capacity scheduling now, work alongside existing systems, and want a one-time license instead of perpetual SaaS.',
    introParagraphs: [
      'Plex Systems is one of the most ambitious cloud manufacturing platforms in the market. Bought by Rockwell Automation in 2021, Plex bundles ERP, MES, quality management, supply chain, and analytics into a single multi-tenant cloud system. For mid-to-large manufacturers committing to a full-platform play, it is a serious option.',
      'The Plex value proposition is integration depth. Production data, quality data, financials, and supply chain all live in the same data model — which means analytics and traceability work without the data-warehouse plumbing other ERPs require. The price of that integration is implementation effort and committed SaaS spend over a long horizon.',
      'RMDB takes a different approach. It is finite-capacity scheduling software that integrates with your existing ERP (QuickBooks, Sage, Epicor, NetSuite, SAP, JobBOSS) rather than replacing it. The one-time license model means you own the software after the first payment, not rent it indefinitely. For manufacturers whose primary pain is the production schedule itself — not the full ERP stack — RMDB is faster to deploy and substantially cheaper over a 5-year horizon.'
    ],
    features: [
      { name: 'Finite-capacity scheduling', rmdb: true, competitor: 'partial', note: 'Plex has scheduling but it is not a finite-capacity APS in the way schedulers mean the term.' },
      { name: 'Drag-and-drop Gantt', rmdb: true, competitor: 'partial' },
      { name: 'Sequence-dependent setup modeling', rmdb: true, competitor: false },
      { name: 'Full ERP (financials, AP/AR, GL)', rmdb: false, competitor: true },
      { name: 'Built-in MES / shop floor', rmdb: 'partial', competitor: true },
      { name: 'Built-in quality management', rmdb: false, competitor: true },
      { name: 'Multi-level BOM and routings', rmdb: true, competitor: true },
      { name: 'Multi-plant / multi-site scheduling', rmdb: true, competitor: true },
      { name: 'Cloud-only deployment', rmdb: false, competitor: true, note: 'RMDB offers on-premise and cloud; Plex is cloud-only.' },
      { name: 'On-premise / self-hosted option', rmdb: true, competitor: false },
      { name: 'What-if scheduling scenarios', rmdb: true, competitor: 'partial' },
      { name: 'Integrates with existing ERP', rmdb: true, competitor: false, note: 'Plex IS the ERP — it does not coexist with another ERP.' },
      { name: 'Pricing model', rmdb: 'One-time license', competitor: 'Per-user SaaS' },
      { name: 'Implementation time (typical)', rmdb: '5 days–4 weeks', competitor: '6–18 months' },
      { name: 'Best for company size', rmdb: '10–500+ employees', competitor: '100–5,000+ employees' }
    ],
    pricing: {
      rmdbPrice: 'From $5,000',
      rmdbModel: 'One-time license + optional support contract',
      competitorPrice: 'Custom (typically $100K–$500K+ first year)',
      competitorModel: 'Per-user / per-module SaaS subscription',
      summary: 'Plex pricing is custom and depends on company size, module count, and user count. Real-world deployments typically start in the low six figures for first-year cost and continue at substantial annual SaaS spend indefinitely. RMDB starts at $5,000 one-time and most mid-size deployments stay under $50,000 lifetime including support.'
    },
    rmdbWinsAt: [
      'Manufacturers who want scheduling fixed in weeks, not after a year-long ERP project',
      'Companies already running QuickBooks, Sage, Epicor, or another ERP they do not want to replace',
      'Shops where one-time licensing economics beat perpetual SaaS over 5+ years',
      'On-premise deployment requirements (defense, regulated environments, IP-sensitive)',
      'Finite-capacity scheduling depth (sequence-dependent setup, alternate work centers, what-if branches)'
    ],
    competitorWinsAt: [
      'Manufacturers replacing a fragmented stack with a single integrated cloud platform',
      'Companies that want ERP, MES, and quality from one vendor with one data model',
      'Operations needing built-in shop floor data collection with native MES capability',
      'Plants prioritizing automated quality management and traceability across all systems',
      'Buyers comfortable with cloud-only deployment and substantial implementation budget'
    ],
    rmdbBestFor: 'Manufacturers with $5M–$200M revenue who need finite-capacity scheduling without ripping out their existing ERP, who prefer one-time licensing, and who want a 5-day to 4-week implementation.',
    competitorBestFor: 'Manufacturers $50M+ committing to a single cloud platform for ERP, MES, quality, and analytics, with budget for 6–18 month implementation and ongoing SaaS spend.',
    migrationSteps: [
      { title: 'Keep your current ERP', description: 'No need to migrate financials, inventory, or order management. RMDB integrates with your existing system rather than replacing it — preserve the data and history you already have.' },
      { title: 'Import work orders and routings', description: 'Pull open work orders, item masters, and routings from your ERP into RMDB on day 1. Standard adapters exist for QuickBooks, Sage, Epicor, NetSuite, SAP, and JobBOSS.' },
      { title: 'Configure work centers and shift calendars', description: 'Mirror your physical shop layout in RMDB. Define machines, operators, shift patterns, planned downtime, and material constraints.' },
      { title: 'Run finite-capacity solve', description: 'Generate the first finite-capacity schedule. Compare to what your current system (Plex or otherwise) produced. Validate the constraints are honored correctly.' },
      { title: 'Go live with parallel run', description: 'For 1–2 weeks, run RMDB schedule alongside existing process. Once planners trust the output, transition fully. Most shops complete this in under 30 days.' }
    ],
    faqs: [
      { question: 'Can RMDB replace Plex entirely?', answer: 'Only the scheduling portion. Plex includes full ERP, MES, quality, and supply chain modules that RMDB does not provide. If you need only the scheduling capability and have ERP elsewhere, RMDB is a complete replacement for the Plex scheduling functionality. If you need the full Plex stack, RMDB cannot replace it.' },
      { question: 'How does Plex pricing actually work?', answer: 'Plex pricing is quote-based with no public list price. Reported deployments range from $80K–$300K first-year for mid-size manufacturers and $500K+ for larger plants. Pricing includes platform, modules, users, and implementation. SaaS subscription continues annually. RMDB at $5K–$50K one-time is substantially cheaper for shops that only need the scheduling capability.' },
      { question: 'Does Plex include real finite-capacity scheduling?', answer: 'Plex has production scheduling, but it is not a finite-capacity APS in the technical sense — it does not honor sequence-dependent setup times the way dedicated APS systems (RMDB, Preactor, Asprova) do. For shops where scheduling depth matters, the gap is real. For shops where the schedule is largely sequential and infinite-capacity-driven, Plex scheduling is usually sufficient.' },
      { question: 'Can RMDB integrate with Plex if we are already running Plex?', answer: 'Yes — RMDB can integrate with Plex via the Plex Connect API. This setup is rare (most shops do not need additional scheduling on top of Plex), but for shops with complex scheduling needs that Plex alone does not meet, the integration is supported.' },
      { question: 'How long does each implementation actually take?', answer: 'RMDB: 5 days for a standard deployment with existing ERP, up to 4 weeks for complex multi-plant setups. Plex: 6–18 months is typical for full-platform implementations. The order-of-magnitude difference reflects scope — Plex replaces your entire system; RMDB adds scheduling to it.' }
    ]
  },
  {
    slug: 'rmdb-vs-made2manage',
    competitor: 'Made2Manage',
    competitorDescription: 'ERP for small-to-mid discrete manufacturers, focused on job shops and made-to-order (now Aptean Industrial Manufacturing)',
    h1: 'RMDB vs Made2Manage: Job Shop ERP vs Dedicated Scheduling',
    subtitle: 'Made2Manage (now owned by Aptean) is a long-running job shop ERP. RMDB is a finite-capacity scheduling system. Made2Manage covers a wider scope; RMDB goes deeper on scheduling.',
    tldr: 'Made2Manage is a good fit for job shops needing full ERP — quoting, work orders, costing, financials — in one system. RMDB is the right choice when scheduling depth is the bottleneck, especially for shops that already have ERP or want one-time licensing.',
    introParagraphs: [
      'Made2Manage has served job shops and small-to-mid discrete manufacturers since the early 1990s. After multiple ownership changes, it is now part of Aptean\'s industrial manufacturing portfolio. It covers the breadth of what a small job shop ERP should: quoting, order management, work orders, costing, purchasing, basic scheduling, and financials.',
      'Where Made2Manage works well, it works through breadth. One system handles the workflow from customer RFQ through invoice. For shops that grew up on QuickBooks plus spreadsheets and need to consolidate, the unification is genuinely valuable. The trade-off is that no single Made2Manage module is best-in-class — including scheduling, which is functional but not finite-capacity APS depth.',
      'RMDB is the opposite trade-off. It does one thing — finite-capacity production scheduling — at high depth. It does not handle financials, AR/AP, or quoting. For shops where the scheduling is the actual bottleneck and the rest of the ERP stack is fine (or is already in QuickBooks or another system), RMDB delivers the scheduling capability in days rather than months and at a fraction of total cost.'
    ],
    features: [
      { name: 'Finite-capacity scheduling', rmdb: true, competitor: 'partial' },
      { name: 'Drag-and-drop Gantt', rmdb: true, competitor: 'partial' },
      { name: 'Sequence-dependent setup modeling', rmdb: true, competitor: false },
      { name: 'Quoting and estimating', rmdb: false, competitor: true },
      { name: 'Order management', rmdb: 'partial', competitor: true },
      { name: 'Full financials (AP/AR/GL)', rmdb: false, competitor: true },
      { name: 'Job costing', rmdb: 'partial', competitor: true },
      { name: 'Multi-level BOM and routings', rmdb: true, competitor: true },
      { name: 'What-if scheduling scenarios', rmdb: true, competitor: false },
      { name: 'Alternate work center routing', rmdb: true, competitor: 'partial' },
      { name: 'Cloud / on-premise options', rmdb: true, competitor: true },
      { name: 'Integrates with QuickBooks', rmdb: true, competitor: 'partial' },
      { name: 'Pricing model', rmdb: 'One-time license', competitor: 'Per-user subscription' },
      { name: 'Implementation time (typical)', rmdb: '5 days–4 weeks', competitor: '3–9 months' },
      { name: 'Best for company size', rmdb: '10–500+ employees', competitor: '10–250 employees' }
    ],
    pricing: {
      rmdbPrice: 'From $5,000',
      rmdbModel: 'One-time license + optional support',
      competitorPrice: 'Custom (typically $30K–$150K first year)',
      competitorModel: 'Per-user subscription with implementation services',
      summary: 'Made2Manage pricing is custom and quote-based. Typical first-year cost for a 10–50-user shop runs $30K–$150K including implementation services. Subscription continues annually. RMDB at $5K–$50K one-time covers the scheduling functionality at a fraction of the cost when ERP is not also needed.'
    },
    rmdbWinsAt: [
      'Shops where scheduling depth is the actual bottleneck and ERP elsewhere is fine',
      'Manufacturers wanting scheduling live in days, not months',
      'Companies preferring one-time license over perpetual subscription',
      'Operations requiring advanced what-if and sequence-dependent setup logic',
      'Job shops with existing ERP (QuickBooks, Sage, JobBOSS) that they do not want to replace'
    ],
    competitorWinsAt: [
      'Shops needing full ERP replacement in one system (quoting through invoice)',
      'Manufacturers wanting integrated job costing with full financial detail',
      'Companies with no existing ERP that want a unified vendor',
      'Job shops preferring a subscription model with bundled support',
      'Operations that value vendor consolidation over best-of-breed depth'
    ],
    rmdbBestFor: 'Job shops $5M–$100M where scheduling is the bottleneck, existing ERP works for everything else, and one-time licensing economics matter over a 5-year horizon.',
    competitorBestFor: 'Job shops $2M–$50M consolidating from spreadsheets or QuickBooks-only operations into a single integrated ERP that handles quoting through financials.',
    migrationSteps: [
      { title: 'Decide what you are actually buying', description: 'If you need full ERP replacement, RMDB is not the right answer alone — combine it with a financials/ERP system. If you need only scheduling depth, RMDB on top of your existing ERP is faster and cheaper.' },
      { title: 'Import open work orders and routings', description: 'Export work orders, BOMs, and routings from Made2Manage (or your current system). RMDB ingests via CSV or direct database connection.' },
      { title: 'Configure scheduling rules', description: 'Map your shop\'s work centers, shift calendars, and scheduling preferences into RMDB. Standard configurations cover most job shop patterns out of the box.' },
      { title: 'Run parallel for 2 weeks', description: 'Schedule in both systems for 2 weeks. Validate that RMDB output matches shop reality. Most shops trust the new schedule by week 2.' },
      { title: 'Cut over and decommission', description: 'Move scheduling fully to RMDB. If you kept Made2Manage for ERP, the integration handles handoff. If you replaced both, financials migrate to the new ERP separately.' }
    ],
    faqs: [
      { question: 'Why would I keep Made2Manage and add RMDB?', answer: 'Because Made2Manage is a competent ERP but its scheduling is not finite-capacity APS depth. Shops happy with Made2Manage for quoting, costing, and financials can add RMDB specifically to fix scheduling without disrupting the rest of the system. The integration is standard.' },
      { question: 'Is Made2Manage still being developed?', answer: 'Aptean continues to maintain and update Made2Manage, but the product roadmap is now part of Aptean\'s broader portfolio decisions. Some shops on older Made2Manage versions report uncertainty about long-term direction. Verify current roadmap with Aptean before a fresh deployment.' },
      { question: 'How does Made2Manage scheduling compare to RMDB?', answer: 'Made2Manage scheduling handles work order sequencing and basic capacity loading. It does not model sequence-dependent setup times the way RMDB does, and the Gantt is less interactive. For shops with simple sequential routings, Made2Manage scheduling is sufficient. For shops with complex setup logic, RMDB is materially deeper.' },
      { question: 'Can RMDB integrate with Made2Manage?', answer: 'Yes — direct database integration is supported. Work orders, routings, and BOMs flow from Made2Manage to RMDB; completion data flows back. This pattern is the most common deployment when shops want to keep Made2Manage as ERP and use RMDB for scheduling.' },
      { question: 'How much does the combined Made2Manage + RMDB approach cost?', answer: 'Made2Manage at $30K–$150K first year + RMDB at $5K–$50K one-time. Compared to a full replacement system like Plex or NetSuite Manufacturing, the combined approach typically costs 50–70% less over a 5-year horizon.' }
    ]
  },
  {
    slug: 'rmdb-vs-jobboss2',
    competitor: 'JobBOSS²',
    competitorDescription: 'Shoptech-developed job shop ERP, widely used by US precision machine shops (formerly Exact Macola JobBOSS)',
    h1: 'RMDB vs JobBOSS²: Job Shop ERP vs Pure Scheduling',
    subtitle: 'JobBOSS² is the job shop ERP many US precision shops grew up on. RMDB is finite-capacity scheduling. Different scope; different price point; different deployment timeline.',
    tldr: 'JobBOSS² handles the breadth of job shop ERP — estimating, work orders, costing, financials — in one system. RMDB delivers finite-capacity scheduling depth. For shops where JobBOSS² scheduling cannot keep up but the rest of the system works fine, RMDB is the targeted fix.',
    introParagraphs: [
      'JobBOSS² (developed by Shoptech) has been a workhorse for US job shops and precision machining operations for decades. It covers the full workflow from quote to ship to invoice: estimating, work orders, job costing, scheduling, purchasing, inventory, and accounting integration. For a small-to-mid shop wanting one system to run on, it is a credible choice.',
      'JobBOSS² scheduling is functional but not finite-capacity APS depth. It handles work order sequencing and basic load. It does not handle sequence-dependent setup times, what-if scenarios, or constraint-aware automatic optimization the way dedicated APS systems do. For shops growing past basic scheduling needs, the gap shows up as missed promise dates and overtime that should have been preventable.',
      'RMDB is built specifically for that gap. It is finite-capacity scheduling that integrates with JobBOSS² (or any ERP) so the rest of the workflow is preserved. The combination — JobBOSS² for ERP, RMDB for scheduling — is a common pattern for shops that outgrew JobBOSS² scheduling without wanting to replace the whole system.'
    ],
    features: [
      { name: 'Finite-capacity scheduling', rmdb: true, competitor: false },
      { name: 'Drag-and-drop Gantt', rmdb: true, competitor: 'partial' },
      { name: 'Sequence-dependent setup modeling', rmdb: true, competitor: false },
      { name: 'Estimating and quoting', rmdb: false, competitor: true },
      { name: 'Order entry and management', rmdb: 'partial', competitor: true },
      { name: 'Job costing', rmdb: 'partial', competitor: true },
      { name: 'Accounting integration', rmdb: 'partial', competitor: true },
      { name: 'Multi-level BOM and routings', rmdb: true, competitor: true },
      { name: 'What-if scheduling scenarios', rmdb: true, competitor: false },
      { name: 'Alternate work center routing', rmdb: true, competitor: false },
      { name: 'Integrates with QuickBooks', rmdb: true, competitor: true },
      { name: 'Cloud / on-premise options', rmdb: true, competitor: true },
      { name: 'Pricing model', rmdb: 'One-time license', competitor: 'Per-user subscription' },
      { name: 'Implementation time (typical)', rmdb: '5 days–4 weeks', competitor: '2–6 months' },
      { name: 'Best for company size', rmdb: '10–500+ employees', competitor: '5–150 employees' }
    ],
    pricing: {
      rmdbPrice: 'From $5,000',
      rmdbModel: 'One-time license + optional support',
      competitorPrice: 'From ~$200/user/month',
      competitorModel: 'Per-user subscription with bundled support',
      summary: 'JobBOSS² pricing is per-user subscription, typically $150–$300/user/month depending on edition and module count. A 10-user shop runs $20K–$35K annually. RMDB is one-time licensing — typical 5–10 user deployments are $5K–$15K total. Over 5 years, JobBOSS² subscriptions accumulate to $100K–$175K vs RMDB $5K–$15K.'
    },
    rmdbWinsAt: [
      'Shops where JobBOSS² scheduling has hit its limits and overtime is rising',
      'Manufacturers wanting finite-capacity logic without leaving JobBOSS² ERP',
      'Operations needing what-if and alternate routing logic',
      'Companies modeling sequence-dependent setup times that JobBOSS² cannot',
      'Shops wanting one-time licensing instead of perpetual subscription'
    ],
    competitorWinsAt: [
      'Small shops needing full ERP in one system with low setup overhead',
      'Operations wanting integrated estimating, quoting, and job costing',
      'Manufacturers preferring bundled vendor support across all modules',
      'Companies new to ERP wanting a single vendor relationship',
      'Job shops that value accounting integration tightly with shop floor data'
    ],
    rmdbBestFor: 'JobBOSS² shops who outgrew the built-in scheduling and want to add finite-capacity APS without replacing the rest of their system. Also for shops $10M+ where scheduling depth justifies a dedicated tool.',
    competitorBestFor: 'Small precision shops $1M–$30M that need integrated ERP with light-to-medium scheduling complexity, and that value one-vendor support.',
    migrationSteps: [
      { title: 'Keep JobBOSS² for ERP', description: 'Most shops keep JobBOSS² for estimating, work orders, costing, and accounting integration. Only the scheduling moves to RMDB.' },
      { title: 'Connect RMDB to JobBOSS² database', description: 'Direct database integration pulls work orders, routings, BOMs, and item masters into RMDB. Standard adapter available; setup is typically 1–2 days.' },
      { title: 'Configure RMDB scheduling rules', description: 'Define work centers, shift calendars, setup time rules, and scheduling constraints. JobBOSS² routing data feeds into the constraints automatically.' },
      { title: 'Run parallel for 1–2 weeks', description: 'Generate RMDB schedule and JobBOSS² schedule in parallel. Compare. Once RMDB output is trusted, transition planners fully.' },
      { title: 'Decommission JobBOSS² scheduling', description: 'JobBOSS² scheduling module becomes unused. Some shops drop the JobBOSS² scheduling subscription tier at renewal for additional savings.' }
    ],
    faqs: [
      { question: 'Can I replace JobBOSS² entirely with RMDB?', answer: 'No. JobBOSS² is full job shop ERP — estimating, quoting, accounting, purchasing. RMDB is scheduling only. To replace JobBOSS², you would need RMDB + a separate ERP. Most shops keep JobBOSS² for the breadth and add RMDB for scheduling depth.' },
      { question: 'Will my JobBOSS² users have to learn a new system?', answer: 'Only planners and schedulers — the people who currently use JobBOSS² scheduling. Estimators, accounting, and production users continue working in JobBOSS² as before. The scope of change is contained.' },
      { question: 'How does the JobBOSS² → RMDB integration work?', answer: 'Bi-directional. Work orders, routings, and BOMs flow from JobBOSS² to RMDB at start of shift. Completion data, scrap counts, and actual hours flow back from RMDB to JobBOSS² for accurate job costing. The integration runs as a scheduled service.' },
      { question: 'Why would I add RMDB to JobBOSS² rather than just upgrading JobBOSS²?', answer: 'Because JobBOSS² scheduling is not designed as finite-capacity APS — upgrading JobBOSS² versions does not change its scheduling architecture. The capability gap (sequence-dependent setup, what-if scenarios, alternate routings) is architectural. RMDB exists specifically to fill that gap.' },
      { question: 'Is RMDB cheaper than JobBOSS² total cost over 5 years?', answer: 'For the scheduling portion: yes, dramatically. JobBOSS² subscription at $200/user/month × 10 users × 60 months = $120K. RMDB one-time license $10K + support contract $1.5K/year × 5 years = $17.5K total. The combined JobBOSS² + RMDB approach over 5 years is also typically cheaper than full ERP replacement options.' }
    ]
  },
  {
    slug: 'rmdb-vs-jobpack',
    competitor: 'JobPack',
    competitorDescription: 'Job shop scheduling and machine monitoring software focused on US precision machine shops',
    h1: 'RMDB vs JobPack: Two Approaches to Job Shop Scheduling',
    subtitle: 'JobPack focuses on machine monitoring and shop floor visibility. RMDB focuses on finite-capacity scheduling depth. Both target US precision shops but the use case overlap is partial.',
    tldr: 'JobPack is strong on machine monitoring and shop floor data capture for CNC environments. RMDB is stronger on finite-capacity scheduling logic, alternate routings, and what-if analysis. For shops needing both, RMDB + EDGEBI covers monitoring; for shops where monitoring is the priority, JobPack is purpose-built.',
    introParagraphs: [
      'JobPack has built its reputation on machine monitoring for precision machine shops — capturing run time, idle time, and downtime reasons directly from CNC controllers. Their shop floor visibility module is widely respected in the US machine shop community.',
      'The scheduling side of JobPack is more capacity-loading than finite-capacity APS. It tracks what jobs are loaded on what machines and how long they will take, but it does not handle the constraint-aware sequence optimization that schedulers typically mean by "finite-capacity scheduling." For shops where the scheduling problem is sequencing and constraint management, the JobPack scheduling depth often does not match expectations.',
      'RMDB is built for the scheduling depth specifically — sequence-dependent setup times, alternate work centers, what-if branching, and constraint-aware automatic optimization. The visualization sidekick EDGEBI provides interactive Gantt and machine monitoring. For shops choosing between the two, the question is whether monitoring or scheduling depth is the bigger pain. Often the answer is both — at which point RMDB + EDGEBI is the more complete fit.'
    ],
    features: [
      { name: 'Finite-capacity scheduling', rmdb: true, competitor: 'partial' },
      { name: 'Drag-and-drop Gantt', rmdb: true, competitor: true },
      { name: 'Sequence-dependent setup modeling', rmdb: true, competitor: false },
      { name: 'Machine monitoring (CNC data capture)', rmdb: 'partial', competitor: true, note: 'RMDB + EDGEBI covers machine monitoring; standalone RMDB does not.' },
      { name: 'Real-time shop floor dashboards', rmdb: true, competitor: true },
      { name: 'OEE tracking and reporting', rmdb: true, competitor: true },
      { name: 'What-if scheduling scenarios', rmdb: true, competitor: false },
      { name: 'Alternate work center routing', rmdb: true, competitor: 'partial' },
      { name: 'Multi-level BOM and routings', rmdb: true, competitor: 'partial' },
      { name: 'Integrates with existing ERP', rmdb: true, competitor: true },
      { name: 'Cloud / on-premise options', rmdb: true, competitor: true },
      { name: 'Pricing model', rmdb: 'One-time license', competitor: 'Per-machine + per-user' },
      { name: 'Implementation time (typical)', rmdb: '5 days–4 weeks', competitor: '4–10 weeks' },
      { name: 'Best for company size', rmdb: '10–500+ employees', competitor: '15–200 employees' },
      { name: 'Industry focus', rmdb: 'Discrete manufacturing (broad)', competitor: 'Precision CNC machine shops' }
    ],
    pricing: {
      rmdbPrice: 'From $5,000',
      rmdbModel: 'One-time license + optional support',
      competitorPrice: 'Custom (per-machine + per-user)',
      competitorModel: 'Subscription with per-machine and per-user components',
      summary: 'JobPack pricing is custom and scales with machine count and user count. Typical mid-size shop deployments run $25K–$80K first year. Subscription continues annually. RMDB is one-time licensing with no per-machine fee — a critical difference for shops with 20+ machines where JobPack pricing escalates rapidly.'
    },
    rmdbWinsAt: [
      'Shops where scheduling depth (sequence-dependent setup, what-if, alternate routings) is the bigger pain',
      'Operations with 20+ machines where JobPack per-machine pricing escalates',
      'Manufacturers wanting one-time licensing instead of perpetual subscription',
      'Shops needing scheduling logic that works across non-CNC equipment too',
      'Companies that want monitoring + scheduling in one toolkit (RMDB + EDGEBI)'
    ],
    competitorWinsAt: [
      'Precision CNC shops where machine monitoring is the highest-priority capability',
      'Operations with deep CNC controller integration requirements (Fanuc, Mazak, Mori)',
      'Shops valuing JobPack\'s specific dashboards and visualization style',
      'Manufacturers preferring per-machine subscription with bundled service',
      'Smaller precision shops without complex multi-routing scheduling needs'
    ],
    rmdbBestFor: 'Precision shops $5M–$200M where scheduling depth (especially setup-dependent and alternate-routing logic) is the actual constraint, and where one-time licensing economics matter over 5+ years.',
    competitorBestFor: 'Precision CNC shops 15–80 employees where shop floor visibility and machine monitoring is the primary gap, and where scheduling complexity is modest.',
    migrationSteps: [
      { title: 'Audit your real scheduling problem', description: 'Is machine monitoring or scheduling depth the bigger pain? If monitoring, JobPack is purpose-built. If scheduling, RMDB is the right tool. If both, RMDB + EDGEBI covers both at one-time license economics.' },
      { title: 'Pull historical data from JobPack', description: 'JobPack data — machine runtime, downtime reasons, job history — can be exported for analysis. Use it to baseline RMDB scheduling assumptions about cycle time and capacity.' },
      { title: 'Configure RMDB work centers and constraints', description: 'Map machines, operators, shift calendars, and setup time rules into RMDB. The constraint configuration is where RMDB scheduling depth lives.' },
      { title: 'Add EDGEBI for monitoring (optional)', description: 'If machine monitoring matters, EDGEBI complements RMDB with interactive Gantt and machine data dashboards. Together they cover the scope JobPack provides plus deeper scheduling.' },
      { title: 'Parallel run for 2–4 weeks', description: 'Compare schedules generated by RMDB vs JobPack outputs. Validate that promise dates align with shop floor reality before cutting over.' }
    ],
    faqs: [
      { question: 'Is RMDB + EDGEBI equivalent to JobPack?', answer: 'Functionally similar in scope (scheduling + monitoring), but with different depth profiles. RMDB + EDGEBI has deeper finite-capacity scheduling. JobPack has deeper CNC controller integration. The right answer depends on which capability matters more for your shop.' },
      { question: 'Does RMDB pull data from CNC machines like JobPack does?', answer: 'EDGEBI (the visualization add-on) supports machine data capture from MTConnect, OPC-UA, Fanuc Focas, and Modbus. The depth of CNC integration varies — JobPack has invested heavily in this area and has deeper out-of-box support for common controllers.' },
      { question: 'How does pricing compare for a 30-machine shop?', answer: 'JobPack per-machine subscription for 30 machines + 10 users typically runs $50K–$100K first year and continues annually. RMDB at one-time licensing for the same shop is $15K–$30K total. Over 5 years, the gap is substantial.' },
      { question: 'Can I migrate from JobPack to RMDB while keeping data?', answer: 'Yes — JobPack data can be exported and imported into RMDB. Historical job data, routing standards, and capacity assumptions all transfer. The migration typically takes 2–4 weeks of parallel running.' },
      { question: 'What about reporting and dashboards — how do they compare?', answer: 'JobPack has well-respected dashboards specifically for CNC monitoring. EDGEBI provides interactive Gantt-style scheduling visualization plus configurable shop floor dashboards. Different design philosophies — JobPack is monitoring-first; EDGEBI is scheduling-first with monitoring layered in.' }
    ]
  },
  {
    slug: 'rmdb-vs-m1-erp',
    competitor: 'M1 ERP',
    competitorDescription: 'Discrete manufacturing ERP from ECi Software Solutions, focused on small-to-mid manufacturers',
    h1: 'RMDB vs M1 ERP: Discrete Manufacturing ERP vs Pure Scheduling',
    subtitle: 'ECi M1 is full ERP for small discrete manufacturers. RMDB is finite-capacity scheduling that integrates with M1 or runs alongside any ERP. Different scope; different value.',
    tldr: 'M1 ERP covers full small-manufacturer scope: estimating, work orders, costing, inventory, financials. RMDB adds scheduling depth that M1\'s built-in scheduling does not match. Combined, they handle ERP + APS at lower combined cost than higher-end alternatives.',
    introParagraphs: [
      'M1 ERP (developed by ECi Software Solutions) is one of the established discrete manufacturing ERP options for small-to-mid US manufacturers. It covers the breadth a job shop or small custom manufacturer needs: estimating, work orders, job costing, inventory, purchasing, and financial integration. ECi has continued investment in M1 with periodic UI updates and module additions.',
      'M1 scheduling is the typical ERP-bundled scheduling story: functional for basic capacity loading, not finite-capacity APS in the technical sense. It handles work order sequencing and shows backlog by work center. It does not model sequence-dependent setup times, run what-if scenarios with side-by-side comparison, or auto-optimize against constraint chains.',
      'RMDB exists to add that depth without replacing M1. The combination — M1 for ERP, RMDB for scheduling — is a common pattern for small manufacturers who like M1 but have hit the scheduling wall. RMDB integrates with M1 via direct database connection; work orders flow in, completion data flows back, M1 remains the system of record.'
    ],
    features: [
      { name: 'Finite-capacity scheduling', rmdb: true, competitor: 'partial' },
      { name: 'Drag-and-drop Gantt', rmdb: true, competitor: 'partial' },
      { name: 'Sequence-dependent setup modeling', rmdb: true, competitor: false },
      { name: 'Estimating and quoting', rmdb: false, competitor: true },
      { name: 'Order management', rmdb: 'partial', competitor: true },
      { name: 'Financial integration', rmdb: 'partial', competitor: true },
      { name: 'Job costing', rmdb: 'partial', competitor: true },
      { name: 'Multi-level BOM and routings', rmdb: true, competitor: true },
      { name: 'What-if scheduling scenarios', rmdb: true, competitor: false },
      { name: 'Alternate work center routing', rmdb: true, competitor: 'partial' },
      { name: 'Cloud / on-premise options', rmdb: true, competitor: true },
      { name: 'Integrates with M1 (or other ERP)', rmdb: true, competitor: false },
      { name: 'Pricing model', rmdb: 'One-time license', competitor: 'Per-user subscription' },
      { name: 'Implementation time (typical)', rmdb: '5 days–4 weeks', competitor: '3–6 months' },
      { name: 'Best for company size', rmdb: '10–500+ employees', competitor: '10–150 employees' }
    ],
    pricing: {
      rmdbPrice: 'From $5,000',
      rmdbModel: 'One-time license + optional support',
      competitorPrice: 'From ~$200/user/month',
      competitorModel: 'Per-user subscription',
      summary: 'M1 pricing is per-user subscription, typically $175–$275/user/month depending on edition. A 10-user shop runs $21K–$33K annually. RMDB one-time licensing for the scheduling capability typically runs $5K–$20K total. Over 5 years, M1-only subscription approaches $100K–$165K; M1 + RMDB approach typically saves vs full higher-end ERP replacement.'
    },
    rmdbWinsAt: [
      'M1 shops where scheduling depth is the bottleneck',
      'Operations wanting alternate routing and what-if logic M1 cannot provide',
      'Manufacturers preferring one-time licensing for the scheduling capability',
      'Shops needing scheduling integration across non-M1 work centers',
      'Companies wanting sequence-dependent setup logic'
    ],
    competitorWinsAt: [
      'Small manufacturers needing full ERP including financials in one system',
      'Operations valuing estimating-to-invoice in a single workflow',
      'Shops new to ERP wanting a single vendor relationship',
      'Companies preferring bundled support for accounting + production + estimating',
      'Manufacturers that like M1\'s UI and workflow specifically'
    ],
    rmdbBestFor: 'M1 shops who have outgrown the built-in scheduling. Also for small manufacturers $5M–$50M where finite-capacity scheduling alone is the immediate need.',
    competitorBestFor: 'Small discrete manufacturers $1M–$20M who need full integrated ERP, are coming from spreadsheets, and have scheduling complexity that does not yet require dedicated APS.',
    migrationSteps: [
      { title: 'Keep M1 for ERP', description: 'M1 continues handling estimating, work orders, costing, and accounting. Only the scheduling moves to RMDB. Scope of change is contained to planners and schedulers.' },
      { title: 'Configure M1 → RMDB integration', description: 'Direct database integration pulls work orders, routings, BOMs from M1 into RMDB. Standard adapter; typically 1–2 days setup.' },
      { title: 'Map work centers and constraints', description: 'Define M1\'s work centers in RMDB scheduling terms — shift calendars, setup time rules, capacity profiles, scheduling preferences.' },
      { title: 'Parallel run for 2 weeks', description: 'Generate schedules in both systems. Compare. Once planners trust RMDB output, transition fully.' },
      { title: 'Decommission M1 scheduling module', description: 'Stop using M1 scheduling. Some shops drop M1 scheduling-tier subscription at renewal for additional savings.' }
    ],
    faqs: [
      { question: 'Why would I keep M1 if I am adding RMDB?', answer: 'Because M1 handles estimating, quoting, costing, inventory, and accounting — all functions RMDB does not address. RMDB targets scheduling depth specifically. The combination preserves M1 investment while fixing the scheduling gap.' },
      { question: 'How is the M1 → RMDB integration maintained?', answer: 'The integration runs as a scheduled service (typically every 5–15 minutes) pulling open work orders and routings from M1 into RMDB, and pushing completion data back. Standard adapter; minimal ongoing maintenance.' },
      { question: 'What about M1 reporting?', answer: 'M1 reporting continues working normally. Completion data flowing back from RMDB feeds M1 job costing and inventory accuracy. Some shops add EDGEBI dashboards for scheduling-specific visualization that complements M1\'s standard reports.' },
      { question: 'Is RMDB harder to use than M1 scheduling?', answer: 'RMDB has more capability and therefore more configuration depth — but the planner workflow is intentionally simple: drag-and-drop Gantt, what-if scenarios, automatic constraint-aware solve. Standard implementations include planner training and most users are productive within days.' },
      { question: 'How does total cost compare for a 25-user shop over 5 years?', answer: 'M1-only: ~$60K/year × 5 = $300K. M1 + RMDB: ~$60K/year M1 + $25K one-time RMDB + $4K/year support = ~$325K over 5 years but with substantially better scheduling capability. Full ERP replacement (Plex, NetSuite Mfg) at this scale typically runs $400K+ over 5 years.' }
    ]
  },
  {
    slug: 'rmdb-vs-realtrac',
    competitor: 'Realtrac',
    competitorDescription: 'Job shop ERP focused on small-to-mid US machine shops and metal fabrication',
    h1: 'RMDB vs Realtrac: Small Shop ERP vs Finite-Capacity Scheduling',
    subtitle: 'Realtrac is a long-running job shop ERP for small US machine shops. RMDB is finite-capacity scheduling. Realtrac covers ERP breadth; RMDB delivers scheduling depth.',
    tldr: 'Realtrac is a credible small-shop ERP option for $1M–$20M machine shops needing one system for everything. RMDB adds the finite-capacity scheduling depth Realtrac does not provide. Combination works well for shops that outgrew Realtrac scheduling.',
    introParagraphs: [
      'Realtrac has served small US machine shops for over 30 years. It is a focused job shop ERP — quoting, work orders, job costing, inventory, scheduling, shop floor data collection, and accounting integration. For a 10–50 employee precision shop wanting one vendor, one database, and one support number, it is a sensible fit.',
      'Like most small-shop ERPs, Realtrac scheduling handles capacity loading and work order sequencing but is not finite-capacity APS depth. Sequence-dependent setup, what-if scenarios, and constraint-aware automatic optimization are not part of the architecture. For shops with simple sequential routings this is sufficient. For shops where setup matters and routings have alternates, it is not.',
      'RMDB is built for that gap and integrates with Realtrac via direct database connection. The combination — Realtrac for ERP, RMDB for scheduling — is the targeted upgrade path for shops that like Realtrac generally but need scheduling depth.'
    ],
    features: [
      { name: 'Finite-capacity scheduling', rmdb: true, competitor: 'partial' },
      { name: 'Drag-and-drop Gantt', rmdb: true, competitor: 'partial' },
      { name: 'Sequence-dependent setup modeling', rmdb: true, competitor: false },
      { name: 'Estimating and quoting', rmdb: false, competitor: true },
      { name: 'Order management', rmdb: 'partial', competitor: true },
      { name: 'Job costing', rmdb: 'partial', competitor: true },
      { name: 'Shop floor data collection', rmdb: 'partial', competitor: true },
      { name: 'Multi-level BOM and routings', rmdb: true, competitor: true },
      { name: 'What-if scheduling scenarios', rmdb: true, competitor: false },
      { name: 'Alternate work center routing', rmdb: true, competitor: false },
      { name: 'QuickBooks integration', rmdb: true, competitor: true },
      { name: 'Cloud / on-premise options', rmdb: true, competitor: true },
      { name: 'Pricing model', rmdb: 'One-time license', competitor: 'Subscription or one-time' },
      { name: 'Implementation time (typical)', rmdb: '5 days–4 weeks', competitor: '2–4 months' },
      { name: 'Best for company size', rmdb: '10–500+ employees', competitor: '5–75 employees' }
    ],
    pricing: {
      rmdbPrice: 'From $5,000',
      rmdbModel: 'One-time license + optional support',
      competitorPrice: 'Custom (around $10K–$50K first year typical)',
      competitorModel: 'Per-user with optional perpetual licensing',
      summary: 'Realtrac pricing is custom; typical small-shop deployments run $10K–$50K first year. RMDB at $5K–$15K one-time covers the scheduling depth for similar-sized shops. Combined Realtrac + RMDB approach typically runs under $60K total deployment cost.'
    },
    rmdbWinsAt: [
      'Realtrac shops that outgrew the built-in scheduling',
      'Operations needing setup-dependent and alternate-routing logic',
      'Manufacturers wanting what-if scheduling capability',
      'Shops where scheduling is the immediate pain and ERP is fine',
      'Companies preferring one-time scheduling license over subscription'
    ],
    competitorWinsAt: [
      'Small precision shops needing full ERP in one focused vendor',
      'Operations preferring small-vendor close support',
      'Shops that value Realtrac\'s specific shop floor data workflow',
      'Manufacturers with simple sequential routings (no complex setup logic)',
      'Companies wanting tight estimating-to-shop-floor workflow integration'
    ],
    rmdbBestFor: 'Realtrac shops where scheduling complexity exceeds what the built-in module handles. Also for small-to-mid manufacturers $5M–$50M needing finite-capacity scheduling depth.',
    competitorBestFor: 'Small US machine shops 5–50 employees needing focused job-shop ERP with integrated shop floor data and accounting, where scheduling complexity is modest.',
    migrationSteps: [
      { title: 'Keep Realtrac for ERP', description: 'Realtrac continues handling estimating, work orders, costing, and shop floor data. Only scheduling moves to RMDB.' },
      { title: 'Establish Realtrac → RMDB data flow', description: 'Direct database integration pulls work orders, routings, and BOMs. Setup typically takes 2–3 days.' },
      { title: 'Configure RMDB scheduling logic', description: 'Define work centers, shifts, setup time rules, and constraints. Realtrac routing data feeds in.' },
      { title: 'Parallel run for 2 weeks', description: 'Validate RMDB output matches shop reality. Most planners trust the new schedule within 10 working days.' },
      { title: 'Transition fully', description: 'Move scheduling to RMDB. Realtrac scheduling module unused; some shops drop the scheduling tier at next renewal.' }
    ],
    faqs: [
      { question: 'Why not just upgrade Realtrac instead of adding RMDB?', answer: 'Because Realtrac scheduling architecture is not finite-capacity APS — upgrading versions does not change that. The capability gap (sequence-dependent setup, alternate routings, what-if branches) is structural. RMDB fills it without disturbing the rest of Realtrac.' },
      { question: 'Can RMDB work with the data Realtrac already has?', answer: 'Yes — Realtrac\'s work order, routing, and BOM data flows into RMDB via standard integration. No data reshape required for the scheduling-side data.' },
      { question: 'How does Realtrac compare to JobBOSS² or M1?', answer: 'All three are credible small-shop ERPs with similar scope. Realtrac tends to focus on machine shops specifically; JobBOSS² and M1 cover broader discrete manufacturing. The choice between them is usually about UI preference and existing vendor relationships rather than capability gaps.' },
      { question: 'What does the combined Realtrac + RMDB cost over 5 years?', answer: 'Realtrac: typically $15K–$30K/year for a 15-user shop = $75K–$150K. RMDB: ~$15K one-time + $1.5K/year support = ~$22K over 5 years. Combined ~$100K–$175K with substantially better scheduling capability than Realtrac alone.' },
      { question: 'Is Realtrac being actively developed?', answer: 'Yes, with ongoing maintenance and module updates. The product is mature and stable. As with any small-vendor ERP, verify roadmap and support commitments before a fresh deployment.' }
    ]
  },
  {
    slug: 'rmdb-vs-statii',
    competitor: 'Statii',
    competitorDescription: 'Small-manufacturer ERP popular in the UK and Europe, focused on job shops and engineering firms',
    h1: 'RMDB vs Statii: UK Job Shop ERP vs Finite-Capacity Scheduling',
    subtitle: 'Statii is a focused UK-based job shop ERP. RMDB is finite-capacity scheduling that integrates with Statii or runs alongside any ERP. Different geographies, different scope.',
    tldr: 'Statii is a credible focused small-shop ERP for UK and European manufacturers. RMDB adds the finite-capacity scheduling depth Statii does not match. For shops with cross-border operations or US headquarters, RMDB has broader ERP integration coverage.',
    introParagraphs: [
      'Statii has built a strong reputation in UK and European job shop manufacturing — particularly engineering firms, subcontract machine shops, and small precision manufacturers. It covers the focused breadth a 5–40 employee shop needs: quoting, work orders, job costing, scheduling, purchasing, and accounting integration.',
      'Statii\'s scheduling is sufficient for shops with sequential routings and basic capacity loading needs. It does not extend to finite-capacity APS depth — sequence-dependent setup, alternate work centers, what-if scenarios are outside its scope. For shops with complex multi-step routings or significant setup variability, the gap shows up as missed promise dates.',
      'RMDB delivers the finite-capacity scheduling depth that Statii does not, and integrates with Statii through standard data exchange. For UK or European shops happy with Statii generally but constrained by its scheduling, the combination is a focused upgrade. For US-based shops, RMDB also has broader ERP integration with US-focused systems (QuickBooks, Sage, JobBOSS, Epicor).'
    ],
    features: [
      { name: 'Finite-capacity scheduling', rmdb: true, competitor: false },
      { name: 'Drag-and-drop Gantt', rmdb: true, competitor: 'partial' },
      { name: 'Sequence-dependent setup modeling', rmdb: true, competitor: false },
      { name: 'Quoting and estimating', rmdb: false, competitor: true },
      { name: 'Order management', rmdb: 'partial', competitor: true },
      { name: 'Job costing', rmdb: 'partial', competitor: true },
      { name: 'Multi-level BOM and routings', rmdb: true, competitor: true },
      { name: 'What-if scheduling scenarios', rmdb: true, competitor: false },
      { name: 'Alternate work center routing', rmdb: true, competitor: false },
      { name: 'UK / EU regulatory compliance', rmdb: 'partial', competitor: true },
      { name: 'US ERP integrations (QuickBooks, Epicor, JobBOSS)', rmdb: true, competitor: 'partial' },
      { name: 'Cloud / on-premise options', rmdb: true, competitor: true },
      { name: 'Pricing model', rmdb: 'One-time license', competitor: 'Per-user subscription' },
      { name: 'Implementation time (typical)', rmdb: '5 days–4 weeks', competitor: '2–4 months' },
      { name: 'Best for company size', rmdb: '10–500+ employees', competitor: '5–40 employees' }
    ],
    pricing: {
      rmdbPrice: 'From $5,000',
      rmdbModel: 'One-time license + optional support',
      competitorPrice: 'From ~£75/user/month',
      competitorModel: 'Per-user subscription',
      summary: 'Statii is per-user monthly subscription, typically £75–£150/user/month. A 10-user shop runs £15K–£30K annually. RMDB at one-time licensing typically runs £4K–£12K total. Combined Statii + RMDB approach typically costs less than full ERP replacement over 5 years.'
    },
    rmdbWinsAt: [
      'Statii shops needing finite-capacity scheduling depth',
      'Operations with sequence-dependent setup complexity',
      'Manufacturers wanting alternate routing logic',
      'US-based shops needing US ERP integration',
      'Companies preferring one-time scheduling license'
    ],
    competitorWinsAt: [
      'Small UK / European shops needing focused job-shop ERP',
      'Operations needing UK regulatory compliance built in',
      'Manufacturers preferring UK-based vendor support',
      'Shops with simpler sequential scheduling needs',
      'Small operations wanting full ERP in one familiar interface'
    ],
    rmdbBestFor: 'Statii shops where scheduling depth has become the constraint, or shops with $5M+ revenue where finite-capacity scheduling capability is critical.',
    competitorBestFor: 'UK and European small job shops 5–40 employees needing integrated ERP with UK accounting compliance, where scheduling complexity is modest.',
    migrationSteps: [
      { title: 'Keep Statii for ERP', description: 'Statii continues to handle quoting, work orders, costing, and accounting. Only the scheduling moves to RMDB.' },
      { title: 'Set up Statii → RMDB integration', description: 'Data exchange via standard interfaces. Work orders and routings flow into RMDB; completion data flows back.' },
      { title: 'Configure RMDB scheduling rules', description: 'Define work centers, shifts, and setup time logic. Statii routing data populates the base configuration.' },
      { title: 'Parallel run for 2 weeks', description: 'Validate RMDB schedule against Statii output and shop reality. Most shops trust the transition within 2 weeks.' },
      { title: 'Cut over fully', description: 'Move scheduling to RMDB. Statii scheduling module unused.' }
    ],
    faqs: [
      { question: 'Is RMDB available in the UK?', answer: 'Yes. RMDB is licensed and supported globally including UK, EU, Australia, and other English-speaking markets. Support is typically US-based but covers UK business hours.' },
      { question: 'How does Statii scheduling compare to RMDB?', answer: 'Statii handles work order sequencing and capacity loading. RMDB handles finite-capacity scheduling with constraint-aware logic. For sequential routings and simple capacity loading, Statii is sufficient. For complex setup-dependent or alternate-routing scenarios, RMDB is meaningfully deeper.' },
      { question: 'Can RMDB integrate with Sage 200 (common UK ERP)?', answer: 'Yes. RMDB integrates with Sage 200, Sage 50, Xero, and other UK-popular accounting and ERP systems via standard adapters.' },
      { question: 'What about VAT and UK accounting compliance?', answer: 'RMDB does not handle VAT, accounting, or UK tax compliance — that stays in your accounting system (Statii, Sage, Xero, etc.). RMDB integrates with these for production data flow but does not replicate their accounting functions.' },
      { question: 'What is the total cost of Statii + RMDB over 5 years?', answer: 'Statii subscription for 10-user shop ~£20K/year × 5 = £100K. RMDB one-time £8K + support ~£1K/year × 5 = £13K. Combined ~£113K with substantially deeper scheduling than Statii alone.' }
    ]
  },
  {
    slug: 'rmdb-vs-optipro',
    competitor: 'OptiPro ERP',
    competitorDescription: 'Mid-market discrete manufacturing ERP, focused on precision machine shops and contract manufacturers',
    h1: 'RMDB vs OptiPro ERP: Mid-Market Manufacturing ERP vs Scheduling',
    subtitle: 'OptiPro is a focused mid-market discrete manufacturing ERP. RMDB is finite-capacity scheduling. Different scopes that combine well for mid-market manufacturers wanting both depth.',
    tldr: 'OptiPro is a credible mid-market ERP for precision shops and contract manufacturers $10M–$100M. RMDB adds scheduling depth that OptiPro\'s built-in scheduling does not match. The combination handles both ERP breadth and scheduling depth without full enterprise platform costs.',
    introParagraphs: [
      'OptiPro ERP serves mid-market US discrete manufacturers — precision machine shops, contract manufacturers, custom industrial equipment producers. It covers the full ERP scope: estimating, order management, work orders, job costing, materials, purchasing, and accounting integration. Scope-wise it competes with E2 Shop System Pro, Global Shop, and Made2Manage in similar market segments.',
      'OptiPro scheduling is the typical bundled-with-ERP story: functional for work order sequencing and capacity loading, not finite-capacity APS depth. The gap is most visible in shops with complex setup-dependent routing, where the bundled scheduler cannot honor the setup-time-aware sequencing decisions planners need.',
      'RMDB targets exactly that gap. The integration with OptiPro is straightforward — work orders, routings, BOMs flow from OptiPro to RMDB; completion data flows back. For OptiPro shops where scheduling has become the bottleneck, the combination is materially cheaper than upgrading to a higher-end ERP that includes APS capability.'
    ],
    features: [
      { name: 'Finite-capacity scheduling', rmdb: true, competitor: 'partial' },
      { name: 'Drag-and-drop Gantt', rmdb: true, competitor: 'partial' },
      { name: 'Sequence-dependent setup modeling', rmdb: true, competitor: false },
      { name: 'Estimating and quoting', rmdb: false, competitor: true },
      { name: 'Full order management', rmdb: 'partial', competitor: true },
      { name: 'Job costing', rmdb: 'partial', competitor: true },
      { name: 'Multi-level BOM and routings', rmdb: true, competitor: true },
      { name: 'What-if scheduling scenarios', rmdb: true, competitor: false },
      { name: 'Alternate work center routing', rmdb: true, competitor: 'partial' },
      { name: 'Multi-plant scheduling', rmdb: true, competitor: 'partial' },
      { name: 'Integrates with existing ERP', rmdb: true, competitor: false },
      { name: 'Cloud / on-premise options', rmdb: true, competitor: true },
      { name: 'Pricing model', rmdb: 'One-time license', competitor: 'Per-user subscription' },
      { name: 'Implementation time (typical)', rmdb: '5 days–4 weeks', competitor: '4–9 months' },
      { name: 'Best for company size', rmdb: '10–500+ employees', competitor: '25–250 employees' }
    ],
    pricing: {
      rmdbPrice: 'From $5,000',
      rmdbModel: 'One-time license + optional support',
      competitorPrice: 'Custom (typically $40K–$200K first year)',
      competitorModel: 'Per-user subscription with implementation services',
      summary: 'OptiPro pricing is custom; mid-market deployments typically run $40K–$200K first year. Subscription continues annually. RMDB at $5K–$30K one-time covers the scheduling depth. Combined approach (OptiPro + RMDB) typically costs less than enterprise platforms (Plex, NetSuite) over 5 years.'
    },
    rmdbWinsAt: [
      'OptiPro shops where scheduling has become the constraint',
      'Operations needing sequence-dependent setup and alternate routing logic',
      'Manufacturers wanting what-if scheduling capability OptiPro lacks',
      'Shops preferring one-time scheduling license over additional subscription tier',
      'Mid-market manufacturers wanting APS depth without enterprise platform pricing'
    ],
    competitorWinsAt: [
      'Mid-market shops needing full ERP replacement in a single integrated system',
      'Operations valuing estimating-through-invoice in one workflow',
      'Manufacturers wanting bundled vendor support across ERP and scheduling',
      'Shops new to integrated ERP wanting single vendor relationship',
      'Companies preferring OptiPro\'s specific UI and workflow patterns'
    ],
    rmdbBestFor: 'OptiPro shops with scheduling complexity that exceeds the bundled scheduler. Also for mid-market manufacturers $10M–$100M where scheduling depth is a critical capability.',
    competitorBestFor: 'Mid-market discrete manufacturers $10M–$50M consolidating from fragmented systems into one integrated ERP covering estimating through accounting.',
    migrationSteps: [
      { title: 'Keep OptiPro for ERP', description: 'OptiPro continues to handle estimating, work orders, costing, materials, and accounting. Only the scheduling moves to RMDB.' },
      { title: 'Configure OptiPro → RMDB integration', description: 'Direct database integration pulls work orders, routings, and BOMs. Standard adapter; setup typically 2–3 days.' },
      { title: 'Map work centers and constraints', description: 'Define RMDB work center model matching OptiPro\'s production resources, shift calendars, and setup time rules.' },
      { title: 'Parallel run for 2–4 weeks', description: 'Validate RMDB schedule output against OptiPro\'s and shop floor reality. Validation period is longer for complex multi-plant deployments.' },
      { title: 'Decommission OptiPro scheduling', description: 'Move scheduling fully to RMDB. OptiPro scheduling unused. Some shops drop scheduling-tier subscription at renewal.' }
    ],
    faqs: [
      { question: 'Why add RMDB instead of upgrading OptiPro?', answer: 'Because OptiPro scheduling architecture is not finite-capacity APS — version upgrades do not change that. RMDB exists specifically to provide APS depth alongside any ERP. The combination is targeted to the actual capability gap.' },
      { question: 'How is OptiPro → RMDB integration maintained?', answer: 'Scheduled background service (every 5–15 minutes) syncs work orders and routings from OptiPro to RMDB; completion, scrap, and labor data syncs back. Minimal ongoing maintenance once configured.' },
      { question: 'Is OptiPro still being actively developed?', answer: 'Yes, with ongoing development and customer base in the US mid-market discrete manufacturing space. Verify current roadmap directly with OptiPro for fresh deployments.' },
      { question: 'What is the typical cost comparison vs full platform replacement?', answer: 'OptiPro + RMDB for a 50-user mid-market shop: typically $100K–$200K/year ongoing. Full enterprise platform replacement (Plex, NetSuite Mfg, Infor): typically $200K–$500K/year. The combined approach is materially cheaper for shops where the existing ERP works for everything except scheduling.' },
      { question: 'Can both systems handle multi-plant operations?', answer: 'OptiPro supports multi-plant with module additions. RMDB has native multi-location scheduling support. For shops with 2+ plants, both systems can coordinate, but the scheduling depth at the multi-plant level is materially better in RMDB.' }
    ]
  },
  {
    slug: 'rmdb-vs-cetec-erp',
    competitor: 'Cetec ERP',
    competitorDescription: 'Open-architecture cloud ERP for small-to-mid manufacturers, known for predictable per-user pricing',
    h1: 'RMDB vs Cetec ERP: Open Cloud ERP vs Finite-Capacity Scheduling',
    subtitle: 'Cetec ERP is a credible cloud ERP for small-to-mid manufacturers with predictable pricing and open architecture. RMDB is finite-capacity scheduling. Different focus, complementary scope.',
    tldr: 'Cetec ERP is a strong fit for $1M–$50M manufacturers wanting cloud ERP with predictable per-user pricing. RMDB adds scheduling depth that Cetec\'s built-in scheduling does not match. Combination handles ERP + APS at small-shop economics.',
    introParagraphs: [
      'Cetec ERP differentiates on two axes: open architecture (rest APIs everywhere, customer can extend) and predictable pricing ($40-$60/user/month with no hidden tier upgrades). For small-to-mid manufacturers tired of opaque ERP pricing and locked-down systems, Cetec is genuinely appealing.',
      'Cetec scheduling is functional for shops with sequential routings and basic capacity needs. It does not extend to finite-capacity APS — sequence-dependent setup, what-if scenarios, alternate routing logic are not part of its scope. For Cetec shops with growing scheduling complexity, the gap shows up as missed ship dates and reactive replanning.',
      'RMDB adds finite-capacity depth and integrates with Cetec via its open APIs. The setup is unusually clean given Cetec\'s API-first design. For Cetec shops where scheduling has become the constraint, the combination is a focused upgrade that preserves Cetec\'s small-shop economics.'
    ],
    features: [
      { name: 'Finite-capacity scheduling', rmdb: true, competitor: 'partial' },
      { name: 'Drag-and-drop Gantt', rmdb: true, competitor: 'partial' },
      { name: 'Sequence-dependent setup modeling', rmdb: true, competitor: false },
      { name: 'Quoting and estimating', rmdb: false, competitor: true },
      { name: 'Order management', rmdb: 'partial', competitor: true },
      { name: 'Job costing', rmdb: 'partial', competitor: true },
      { name: 'Open REST APIs', rmdb: 'partial', competitor: true },
      { name: 'Multi-level BOM and routings', rmdb: true, competitor: true },
      { name: 'What-if scheduling scenarios', rmdb: true, competitor: false },
      { name: 'Alternate work center routing', rmdb: true, competitor: false },
      { name: 'Cloud-only deployment', rmdb: false, competitor: true, note: 'RMDB offers both cloud and on-premise; Cetec is cloud-only.' },
      { name: 'On-premise / self-hosted option', rmdb: true, competitor: false },
      { name: 'Pricing model', rmdb: 'One-time license', competitor: 'Per-user subscription ($40–$60)' },
      { name: 'Implementation time (typical)', rmdb: '5 days–4 weeks', competitor: '4–12 weeks' },
      { name: 'Best for company size', rmdb: '10–500+ employees', competitor: '5–100 employees' }
    ],
    pricing: {
      rmdbPrice: 'From $5,000',
      rmdbModel: 'One-time license + optional support',
      competitorPrice: '$40–$60/user/month',
      competitorModel: 'Predictable per-user subscription',
      summary: 'Cetec is one of the most pricing-transparent ERPs in the market: $40–$60/user/month for the entire system. A 20-user shop runs $10K–$14K annually. RMDB at $5K–$20K one-time covers the scheduling depth. Combined approach is one of the lowest total-cost options in the small-to-mid manufacturing space.'
    },
    rmdbWinsAt: [
      'Cetec shops needing finite-capacity scheduling depth',
      'Operations with sequence-dependent setup complexity',
      'Manufacturers needing on-premise deployment (defense, IP-sensitive)',
      'Shops wanting one-time licensing for scheduling capability',
      'Operations needing alternate routing and what-if scheduling logic'
    ],
    competitorWinsAt: [
      'Small manufacturers wanting cloud ERP with predictable per-user pricing',
      'Operations needing open APIs for custom integrations',
      'Shops new to ERP wanting transparent total cost',
      'Manufacturers preferring cloud-only deployment with built-in maintenance',
      'Companies valuing Cetec\'s specific UI and API-first design'
    ],
    rmdbBestFor: 'Cetec shops where scheduling depth has become the constraint, or shops $5M+ needing finite-capacity scheduling alongside existing ERP.',
    competitorBestFor: 'Small-to-mid manufacturers $1M–$30M wanting cloud ERP with low per-user pricing, open APIs, and predictable cost — without enterprise platform complexity.',
    migrationSteps: [
      { title: 'Keep Cetec for ERP', description: 'Cetec continues handling estimating, work orders, costing, accounting, and customer-facing functions. Only scheduling moves to RMDB.' },
      { title: 'Configure Cetec API integration', description: 'Cetec\'s REST APIs make integration unusually clean. Work orders, routings, and BOMs flow into RMDB via API; completion data flows back the same way.' },
      { title: 'Configure RMDB scheduling logic', description: 'Define work centers, shift calendars, setup time rules. Cetec routing data populates the constraints automatically.' },
      { title: 'Parallel run for 2 weeks', description: 'Compare RMDB schedule against Cetec\'s built-in output. Validate against shop floor reality.' },
      { title: 'Transition fully', description: 'Move scheduling to RMDB. Cetec scheduling unused; Cetec subscription continues for ERP value.' }
    ],
    faqs: [
      { question: 'Is Cetec really only $40–$60/user/month?', answer: 'Yes, that is Cetec\'s public pricing. There are some module add-ons that extend the price but the base ERP is genuinely in that range. This pricing transparency is unusual in the manufacturing ERP market.' },
      { question: 'How does Cetec\'s open API help with RMDB integration?', answer: 'Significantly. Most ERPs require direct database access or vendor-built integrations. Cetec\'s REST APIs are documented and stable, which makes RMDB integration faster to build, easier to maintain, and less dependent on Cetec internals.' },
      { question: 'Can Cetec handle complex scheduling on its own?', answer: 'Not really. Cetec scheduling is functional for sequential routings and basic capacity loading. It is not finite-capacity APS. Cetec\'s strength is the rest of the ERP — scheduling is the area where adding a specialized tool (RMDB or similar) is most often beneficial.' },
      { question: 'Is Cetec a good choice for very small shops?', answer: 'Yes — Cetec scales down well to 5–10 employee operations because of the per-user pricing model. Small shops that need ERP but cannot justify $20K+ annual subscriptions find Cetec genuinely accessible.' },
      { question: 'What is the total Cetec + RMDB cost for a 20-user shop over 5 years?', answer: 'Cetec at $50/user/month × 20 users × 60 months = $60K. RMDB $10K one-time + $1.5K/year support × 5 = $17.5K. Combined ~$77.5K — one of the lowest total-cost options in the small-mid manufacturing scheduling space.' }
    ]
  },
  {
    slug: 'rmdb-vs-infor-syteline',
    competitor: 'Infor SyteLine',
    competitorDescription: 'Mid-to-upper-market discrete manufacturing ERP (Infor CloudSuite Industrial), popular with $50M+ manufacturers',
    h1: 'RMDB vs Infor SyteLine: Enterprise Manufacturing ERP vs Pure Scheduling',
    subtitle: 'Infor SyteLine (CloudSuite Industrial) is enterprise-grade manufacturing ERP. RMDB is finite-capacity scheduling. Wildly different scope, deployment effort, and pricing.',
    tldr: 'Infor SyteLine is a serious enterprise ERP for $50M+ discrete manufacturers needing full-platform deployment. RMDB is the right answer for shops where scheduling is the actual pain and a $500K+ ERP project is not the right fix.',
    introParagraphs: [
      'Infor SyteLine (also marketed as Infor CloudSuite Industrial) is one of the established enterprise-grade ERPs for discrete manufacturing. Built originally by Mapics, refined through multiple acquisitions, it now sits in Infor\'s mid-to-upper market portfolio. Deployments typically range from $200K to several million dollars first year, depending on plant count and module scope.',
      'SyteLine includes Advanced Planning and Scheduling (APS) as a module. The APS depth is real — Infor has invested in this capability and it competes meaningfully with dedicated APS systems. For shops committing to the full SyteLine platform, the bundled APS is sufficient for most scheduling needs.',
      'RMDB exists for shops that do not need (or cannot afford) a full SyteLine deployment but still need finite-capacity scheduling depth. The comparison is rarely apples-to-apples — they target different buyers. SyteLine is for the manufacturer rebuilding their ERP foundation; RMDB is for the manufacturer adding scheduling to an existing system.'
    ],
    features: [
      { name: 'Finite-capacity scheduling', rmdb: true, competitor: true },
      { name: 'Drag-and-drop Gantt', rmdb: true, competitor: true },
      { name: 'Sequence-dependent setup modeling', rmdb: true, competitor: true },
      { name: 'Full ERP (financials, AP/AR, GL)', rmdb: false, competitor: true },
      { name: 'Built-in MES / shop floor', rmdb: 'partial', competitor: true },
      { name: 'Multi-level BOM and routings', rmdb: true, competitor: true },
      { name: 'Multi-plant / multi-site scheduling', rmdb: true, competitor: true },
      { name: 'What-if scheduling scenarios', rmdb: true, competitor: true },
      { name: 'Integrates with existing ERP', rmdb: true, competitor: false, note: 'SyteLine IS the ERP — it does not coexist easily with another ERP.' },
      { name: 'Cloud / on-premise options', rmdb: true, competitor: true },
      { name: 'Pricing model', rmdb: 'One-time license', competitor: 'Per-user / per-module SaaS or perpetual' },
      { name: 'Implementation time (typical)', rmdb: '5 days–4 weeks', competitor: '9–24 months' },
      { name: 'Best for company size', rmdb: '10–500+ employees', competitor: '100–10,000+ employees' },
      { name: 'Implementation services', rmdb: 'Vendor + partner', competitor: 'Required (typically $300K+)' }
    ],
    pricing: {
      rmdbPrice: 'From $5,000',
      rmdbModel: 'One-time license + optional support',
      competitorPrice: 'Custom (typically $200K–$2M+ first year)',
      competitorModel: 'Per-user subscription with required implementation services',
      summary: 'SyteLine pricing is custom and quote-based. Mid-market deployments typically run $200K–$500K first year including platform, modules, users, and implementation services. Larger deployments $1M+. Subscription continues annually. RMDB at $5K–$50K one-time is fundamentally different in scope and cost.'
    },
    rmdbWinsAt: [
      'Manufacturers who cannot justify a $300K+ ERP rebuild project',
      'Operations where the actual pain is scheduling, not the full ERP stack',
      'Shops with existing ERP they do not want to replace',
      'Companies preferring one-time licensing economics',
      'Faster time-to-value (5 days–4 weeks vs 9–24 months)'
    ],
    competitorWinsAt: [
      'Manufacturers $50M+ rebuilding ERP foundation comprehensively',
      'Operations needing fully integrated platform spanning ERP, MES, APS, quality',
      'Shops with global multi-plant operations needing standardized platform',
      'Companies with regulatory environments (aerospace, automotive) requiring enterprise traceability',
      'Manufacturers with budget and timeline for multi-year platform implementation'
    ],
    rmdbBestFor: 'Manufacturers $10M–$200M where scheduling depth matters but a full enterprise ERP project does not fit the situation — either by budget, timeline, or scope.',
    competitorBestFor: 'Discrete manufacturers $50M+ committing to a full enterprise platform play with multi-year ERP rebuild including ERP, APS, MES, and quality consolidation.',
    migrationSteps: [
      { title: 'Decide what you are actually buying', description: 'If you need full ERP replacement, RMDB is not the right answer alone. If you need only scheduling depth at a fraction of the cost, RMDB delivers without the SyteLine project burden.' },
      { title: 'Identify your current ERP', description: 'If you have one (QuickBooks, Sage, Epicor, NetSuite), RMDB integrates with it. If you do not, RMDB plus a small-shop ERP is a much faster path than SyteLine for sub-$50M shops.' },
      { title: 'Configure RMDB scheduling', description: 'Define work centers, shifts, setup time rules, and routing logic. Standard configurations cover most shops out of the box.' },
      { title: 'Connect to existing ERP', description: 'Standard adapters exist for QuickBooks, Sage, Epicor, JobBOSS, E2, M1, OptiPro, and others. Setup typically 1–3 days.' },
      { title: 'Parallel run and cut over', description: '2 weeks of parallel running, then transition fully. End-to-end deployment usually 5 days to 4 weeks depending on complexity.' }
    ],
    faqs: [
      { question: 'Should I really compare RMDB to SyteLine?', answer: 'Honestly, often no — they target different buyers. The comparison is most useful when: (a) you are evaluating SyteLine and starting to suspect it is overkill for your actual problem, or (b) you have SyteLine and the APS module is not delivering what was promised. For most $10M–$50M shops, RMDB is the more proportionate answer.' },
      { question: 'How does SyteLine APS depth actually compare to RMDB?', answer: 'Both are credible finite-capacity APS systems. SyteLine APS has the advantage of native integration with the rest of the SyteLine platform — no integration layer needed. RMDB has the advantage of working with any ERP and being one-time licensed. For depth-of-scheduling-logic alone, they are similar; the difference is deployment scope.' },
      { question: 'What is the typical total cost over 5 years for each?', answer: 'SyteLine for a 100-user $50M manufacturer: typically $500K–$1.5M over 5 years. RMDB plus existing ERP (or RMDB + small-shop ERP for sub-$50M): typically $50K–$200K over 5 years. The gap reflects the scope difference, not the scheduling capability gap.' },
      { question: 'Can SyteLine handle a $10M shop?', answer: 'Technically yes; economically rarely. Infor positions SyteLine for $50M+ deployments. A $10M shop running SyteLine is usually paying for capability it cannot use. The right tool for a $10M shop is typically smaller-scale ERP (Cetec, JobBOSS², M1) plus RMDB for scheduling.' },
      { question: 'Is Infor still actively investing in SyteLine?', answer: 'Yes — SyteLine is part of Infor\'s CloudSuite Industrial portfolio with ongoing development. After Koch Industries\' acquisition of Infor, investment patterns may evolve; verify with Infor for current roadmap before committing to a multi-year deployment.' }
    ]
  },
  {
    slug: 'rmdb-vs-ifs-cloud',
    competitor: 'IFS Cloud',
    competitorDescription: 'Enterprise ERP platform popular in ETO, aerospace, and complex manufacturing (IFS Applications successor)',
    h1: 'RMDB vs IFS Cloud: Enterprise ETO Platform vs Pure Scheduling',
    subtitle: 'IFS Cloud is enterprise platform-grade ERP for complex ETO and aerospace manufacturing. RMDB is finite-capacity scheduling. Wildly different scope, audience, and price.',
    tldr: 'IFS Cloud is the right answer for $100M+ ETO, aerospace, and defense manufacturers needing fully integrated enterprise platforms. RMDB is the right answer for $5M–$200M shops where scheduling is the actual pain and enterprise ERP is the wrong tool.',
    introParagraphs: [
      'IFS Cloud (the cloud-native successor to IFS Applications) is enterprise-grade ERP focused on complex industries: engineer-to-order manufacturing, aerospace and defense, energy, and asset-heavy operations. It is genuinely good at what it does — IFS has invested heavily in industries that other enterprise ERPs underserve, and the platform depth shows.',
      'IFS Manufacturing module includes serious APS capability, particularly for complex multi-level BOM products with engineering changes flowing through production. For aerospace, defense, and similar regulated industries, the bundled IFS APS handles requirements that smaller systems struggle with.',
      'RMDB exists for a different buyer. For manufacturers that do not have the scale, complexity, or regulatory pressure to justify IFS Cloud, RMDB delivers focused scheduling depth at small-shop economics. The comparison is rarely a real choice — they serve different market segments.'
    ],
    features: [
      { name: 'Finite-capacity scheduling', rmdb: true, competitor: true },
      { name: 'Drag-and-drop Gantt', rmdb: true, competitor: true },
      { name: 'Sequence-dependent setup modeling', rmdb: true, competitor: true },
      { name: 'Full ERP (financials, AP/AR, GL)', rmdb: false, competitor: true },
      { name: 'Asset-intensive industries (energy, aerospace)', rmdb: 'partial', competitor: true },
      { name: 'ETO and configure-to-order depth', rmdb: 'partial', competitor: true },
      { name: 'Engineering change management', rmdb: 'partial', competitor: true },
      { name: 'Multi-plant / multi-site scheduling', rmdb: true, competitor: true },
      { name: 'What-if scheduling scenarios', rmdb: true, competitor: true },
      { name: 'Integrates with existing ERP', rmdb: true, competitor: false, note: 'IFS Cloud IS the ERP — typically a full replacement.' },
      { name: 'Cloud / on-premise options', rmdb: true, competitor: 'partial', note: 'IFS Cloud is cloud-first; on-premise mostly for legacy deployments.' },
      { name: 'Pricing model', rmdb: 'One-time license', competitor: 'Enterprise SaaS' },
      { name: 'Implementation time (typical)', rmdb: '5 days–4 weeks', competitor: '12–24 months+' },
      { name: 'Best for company size', rmdb: '10–500+ employees', competitor: '500–10,000+ employees' },
      { name: 'Implementation services', rmdb: 'Vendor + partner', competitor: 'Required (typically $500K+)' }
    ],
    pricing: {
      rmdbPrice: 'From $5,000',
      rmdbModel: 'One-time license + optional support',
      competitorPrice: 'Custom (typically $500K–$5M+ first year)',
      competitorModel: 'Enterprise SaaS with required implementation services',
      summary: 'IFS Cloud pricing is custom and enterprise-scale. Typical deployments run $500K–$5M first year including platform, modules, users, and implementation. Continues annually. RMDB at $5K–$50K is fundamentally different in scope and target market.'
    },
    rmdbWinsAt: [
      'Manufacturers that do not have $500K+ enterprise ERP budget',
      'Shops where scheduling is the actual pain, not the full ERP stack',
      'Operations preferring focused tool over enterprise platform',
      'Manufacturers with existing ERP they want to keep',
      'Faster time-to-value (weeks vs years)'
    ],
    competitorWinsAt: [
      'ETO and aerospace manufacturers with deep regulatory requirements',
      'Asset-heavy operations needing integrated EAM (enterprise asset management)',
      'Global manufacturers needing standardized platform across multiple plants',
      'Defense contractors with serialization and traceability requirements',
      'Enterprises with budget and timeline for multi-year platform deployment'
    ],
    rmdbBestFor: 'Discrete manufacturers $5M–$200M where finite-capacity scheduling is the immediate need and enterprise ERP is the wrong scope.',
    competitorBestFor: 'ETO, aerospace, defense, and asset-heavy manufacturers $100M+ requiring integrated enterprise platform with deep industry-specific capability.',
    migrationSteps: [
      { title: 'Validate that scheduling is the actual problem', description: 'If you need full enterprise ERP rebuild, RMDB is not the right answer. If scheduling depth is the actual pain, RMDB is dramatically more proportionate.' },
      { title: 'Inventory your current ERP', description: 'If existing ERP works for everything except scheduling, keep it and add RMDB. If you do not have ERP, RMDB plus a small-shop ERP is a much faster path than IFS for sub-$100M shops.' },
      { title: 'Configure RMDB scheduling', description: 'Define work centers, shifts, setup time rules, and constraint logic. Standard configurations cover most discrete manufacturing patterns.' },
      { title: 'Integrate with existing ERP', description: 'Standard adapters for QuickBooks, Sage, Epicor, NetSuite, SAP, and others. Setup typically 1–3 days.' },
      { title: 'Parallel run and cut over', description: '2 weeks parallel running. Full transition usually 5 days to 4 weeks depending on complexity.' }
    ],
    faqs: [
      { question: 'Should I compare RMDB to IFS at all?', answer: 'For most manufacturers, no — they target wildly different segments. IFS is for $100M+ complex enterprise. RMDB is for $5M–$200M shops needing scheduling. The comparison is useful only when evaluating IFS Cloud and realizing scope mismatch with actual needs.' },
      { question: 'How does IFS APS compare to RMDB scheduling depth?', answer: 'Both are credible finite-capacity APS. IFS APS has the advantage of native integration with the rest of the IFS platform — particularly for ETO and engineering-change-heavy environments. RMDB has the advantage of one-time licensing and integration with any ERP. For scheduling logic depth alone, both are strong; the difference is platform scope.' },
      { question: 'Can RMDB handle aerospace or defense?', answer: 'For scheduling, yes — RMDB serves defense contractors and aerospace suppliers. For the full traceability, serialization, and regulatory infrastructure these industries require, RMDB alone is not enough — combine with an industry-appropriate ERP. IFS Cloud covers both natively.' },
      { question: 'What is the typical implementation timeline difference?', answer: 'RMDB: 5 days to 4 weeks for a complete deployment. IFS Cloud: 12–24 months for a typical enterprise rollout, longer for global multi-plant deployments. The difference reflects scope — RMDB does one thing well; IFS Cloud rebuilds your entire operations platform.' },
      { question: 'Can I migrate from IFS to RMDB?', answer: 'You can move scheduling from IFS APS to RMDB if you want focused scheduling and the rest of IFS works for you. Most IFS deployments do not migrate because the integration with the rest of the platform is valuable. The migration scenario is rare.' }
    ]
  },
  {
    slug: 'rmdb-vs-sage-x3',
    competitor: 'Sage X3',
    competitorDescription: 'Mid-market ERP from Sage, focused on distribution and mid-tier manufacturing',
    h1: 'RMDB vs Sage X3: Mid-Market ERP vs Pure Scheduling',
    subtitle: 'Sage X3 is mid-market ERP covering manufacturing, distribution, and services. RMDB is finite-capacity scheduling. Different scope, different value, complementary when both are needed.',
    tldr: 'Sage X3 is a strong fit for mid-market manufacturers and distributors needing integrated ERP with global capability. RMDB adds the finite-capacity scheduling depth Sage X3 manufacturing scheduling does not match. Combination works well for shops where X3 is the ERP and scheduling has become the gap.',
    introParagraphs: [
      'Sage X3 sits in Sage\'s mid-market portfolio, above Sage 100 / Sage 300 and below the largest enterprise systems. It covers manufacturing, distribution, services, and financials with global multi-currency and multi-language support. For mid-market manufacturers needing breadth and global capability, X3 is a credible option.',
      'X3 manufacturing scheduling handles capacity loading and basic work order sequencing. It is not finite-capacity APS in the technical sense — sequence-dependent setup, what-if scheduling, and constraint-aware automatic optimization are outside the X3 scheduling module\'s scope. For shops with simple sequential routings, X3 scheduling is sufficient; for shops with complex setup-dependent logic, it is not.',
      'RMDB delivers finite-capacity depth and integrates with Sage X3 via standard data exchange. For X3 shops where scheduling has become the actual bottleneck while X3 itself works well for the rest, RMDB is the targeted upgrade.'
    ],
    features: [
      { name: 'Finite-capacity scheduling', rmdb: true, competitor: 'partial' },
      { name: 'Drag-and-drop Gantt', rmdb: true, competitor: 'partial' },
      { name: 'Sequence-dependent setup modeling', rmdb: true, competitor: false },
      { name: 'Full ERP (financials, AP/AR, GL)', rmdb: false, competitor: true },
      { name: 'Multi-currency / multi-country', rmdb: 'partial', competitor: true },
      { name: 'Distribution and warehousing depth', rmdb: false, competitor: true },
      { name: 'Multi-level BOM and routings', rmdb: true, competitor: true },
      { name: 'What-if scheduling scenarios', rmdb: true, competitor: false },
      { name: 'Alternate work center routing', rmdb: true, competitor: 'partial' },
      { name: 'Integrates with existing ERP', rmdb: true, competitor: false, note: 'X3 IS the ERP — typically a full system.' },
      { name: 'Cloud / on-premise options', rmdb: true, competitor: true },
      { name: 'Pricing model', rmdb: 'One-time license', competitor: 'Per-user subscription or perpetual' },
      { name: 'Implementation time (typical)', rmdb: '5 days–4 weeks', competitor: '6–18 months' },
      { name: 'Best for company size', rmdb: '10–500+ employees', competitor: '100–2,000 employees' }
    ],
    pricing: {
      rmdbPrice: 'From $5,000',
      rmdbModel: 'One-time license + optional support',
      competitorPrice: 'Custom (typically $150K–$700K first year)',
      competitorModel: 'Per-user subscription with implementation services',
      summary: 'Sage X3 pricing is custom; mid-market deployments typically run $150K–$700K first year. Subscription continues annually. RMDB at $5K–$50K covers the scheduling depth alone. Combined X3 + RMDB is materially cheaper than higher-end alternatives for shops that need both.'
    },
    rmdbWinsAt: [
      'X3 shops where scheduling depth has become the constraint',
      'Operations needing sequence-dependent setup and what-if logic',
      'Manufacturers preferring one-time scheduling license',
      'Smaller manufacturers where X3 alone is overkill',
      'Faster scheduling deployment (5 days vs months)'
    ],
    competitorWinsAt: [
      'Mid-market manufacturers needing full ERP including financials',
      'Global operations needing multi-currency and multi-country support',
      'Distribution-heavy operations needing integrated warehousing',
      'Shops valuing Sage\'s vendor support and ecosystem',
      'Companies in markets where Sage has strong local presence'
    ],
    rmdbBestFor: 'X3 shops where scheduling depth has become the bottleneck. Also for mid-market manufacturers $10M–$100M needing focused scheduling capability.',
    competitorBestFor: 'Mid-market manufacturers $30M–$300M needing integrated global ERP with multi-currency, multi-country, and distribution depth.',
    migrationSteps: [
      { title: 'Keep Sage X3 for ERP', description: 'X3 continues handling financials, order management, distribution, and accounting. Only scheduling moves to RMDB.' },
      { title: 'Configure X3 → RMDB integration', description: 'Standard data exchange via X3\'s integration framework. Work orders, routings, BOMs flow into RMDB; completion data flows back.' },
      { title: 'Define RMDB scheduling rules', description: 'Map X3 work centers and shift calendars into RMDB. Setup time logic, constraint chains, and routing preferences configured to match shop reality.' },
      { title: 'Parallel run for 2–3 weeks', description: 'Validate RMDB schedule against X3 output and shop floor reality. Longer validation for complex multi-plant X3 deployments.' },
      { title: 'Decommission X3 scheduling', description: 'Move scheduling fully to RMDB. X3 scheduling module unused. Some shops adjust X3 module licensing at renewal.' }
    ],
    faqs: [
      { question: 'Why add RMDB instead of using X3 scheduling?', answer: 'Because X3 scheduling architecture is not finite-capacity APS — version upgrades do not change that. The gap (sequence-dependent setup, what-if scheduling, constraint-aware optimization) is structural to X3. RMDB fills it without disturbing the rest of X3.' },
      { question: 'How is the integration maintained?', answer: 'Scheduled background service syncs work orders and routings from X3 to RMDB (every 5–15 minutes); completion, scrap, and labor flows back. Standard adapter; minimal ongoing maintenance.' },
      { question: 'Does Sage X3 have its own APS module?', answer: 'Sage offers APS extensions for X3 through partner ecosystem rather than as core modules. These vary in depth. For shops needing serious APS, evaluating Sage\'s recommended APS partners against RMDB makes sense — RMDB often comes out favorably on price and deployment time.' },
      { question: 'Can RMDB handle X3\'s multi-currency complexity?', answer: 'RMDB itself does not deal with currency — that stays in X3. Scheduling logic does not require currency awareness. The integration handles the production-side data; X3 continues handling financial-side data including currency.' },
      { question: 'What is total cost comparison for a 100-user shop?', answer: 'Sage X3 alone for 100 users: typically $250K–$500K/year. Sage X3 + RMDB: similar X3 cost + $30K one-time RMDB + ~$5K/year support. Adding RMDB is a marginal cost change for substantially better scheduling capability.' }
    ]
  },
  {
    slug: 'rmdb-vs-acumatica',
    competitor: 'Acumatica Manufacturing',
    competitorDescription: 'Cloud-native ERP popular with growing small-to-mid manufacturers, distinguished by consumption-based pricing',
    h1: 'RMDB vs Acumatica Manufacturing: Cloud ERP vs Finite-Capacity Scheduling',
    subtitle: 'Acumatica Manufacturing is cloud-native ERP with consumption-based pricing — popular with growing small-to-mid manufacturers. RMDB is finite-capacity scheduling that integrates with Acumatica or any ERP.',
    tldr: 'Acumatica is a good fit for growing manufacturers wanting modern cloud ERP without per-user pricing penalties. RMDB adds finite-capacity scheduling depth Acumatica\'s built-in scheduling does not match. Combination works well for shops where Acumatica is the ERP and scheduling needs more depth.',
    introParagraphs: [
      'Acumatica differentiates with consumption-based pricing (you pay for resource consumption, not per-user) and a fully cloud-native architecture. For growing manufacturers expecting headcount changes, the pricing model is genuinely advantageous — adding users does not penalize you. Acumatica Manufacturing Edition covers ERP, MRP, scheduling, and shop floor with reasonable depth.',
      'Acumatica scheduling handles capacity loading and basic work order sequencing. It does not extend to finite-capacity APS in the technical sense — sequence-dependent setup, what-if scenarios with side-by-side comparison, and constraint-aware automatic optimization are not part of its architecture. For shops with complex routings, the gap is visible.',
      'RMDB delivers the finite-capacity depth and integrates with Acumatica via Acumatica\'s well-documented REST APIs. The setup is relatively clean given Acumatica\'s API-first design. For Acumatica shops where scheduling has hit its limits, RMDB is a targeted upgrade.'
    ],
    features: [
      { name: 'Finite-capacity scheduling', rmdb: true, competitor: 'partial' },
      { name: 'Drag-and-drop Gantt', rmdb: true, competitor: 'partial' },
      { name: 'Sequence-dependent setup modeling', rmdb: true, competitor: false },
      { name: 'Full ERP (financials, AP/AR, GL)', rmdb: false, competitor: true },
      { name: 'Consumption-based pricing (not per-user)', rmdb: 'partial', competitor: true },
      { name: 'Multi-level BOM and routings', rmdb: true, competitor: true },
      { name: 'What-if scheduling scenarios', rmdb: true, competitor: false },
      { name: 'Alternate work center routing', rmdb: true, competitor: 'partial' },
      { name: 'Open REST APIs', rmdb: 'partial', competitor: true },
      { name: 'Cloud / on-premise options', rmdb: true, competitor: 'partial', note: 'Acumatica is cloud-first with private cloud option; pure on-premise less common.' },
      { name: 'Integrates with existing ERP', rmdb: true, competitor: false },
      { name: 'Pricing model', rmdb: 'One-time license', competitor: 'Consumption-based subscription' },
      { name: 'Implementation time (typical)', rmdb: '5 days–4 weeks', competitor: '4–9 months' },
      { name: 'Best for company size', rmdb: '10–500+ employees', competitor: '15–500 employees' }
    ],
    pricing: {
      rmdbPrice: 'From $5,000',
      rmdbModel: 'One-time license + optional support',
      competitorPrice: 'Custom consumption-based (typically $25K–$120K annually for mid-shops)',
      competitorModel: 'Cloud subscription based on transaction volume + module count',
      summary: 'Acumatica pricing is consumption-based — not per-user — which makes it favorable for growing shops. Typical mid-market deployments run $25K–$120K annually. RMDB at $5K–$30K one-time covers the scheduling depth. Combined approach is competitive against full-platform alternatives.'
    },
    rmdbWinsAt: [
      'Acumatica shops needing finite-capacity scheduling depth',
      'Operations with sequence-dependent setup complexity',
      'Manufacturers wanting on-premise scheduling deployment',
      'Shops preferring one-time scheduling license',
      'Operations needing alternate routing and what-if logic'
    ],
    competitorWinsAt: [
      'Growing manufacturers wanting cloud ERP with consumption pricing',
      'Operations expecting headcount changes (consumption pricing scales differently)',
      'Companies valuing Acumatica\'s open API and ecosystem',
      'Manufacturers wanting cloud-first deployment',
      'Shops needing integrated ERP including financials in one platform'
    ],
    rmdbBestFor: 'Acumatica shops where scheduling depth has become the constraint, or shops $10M+ needing focused finite-capacity scheduling alongside cloud ERP.',
    competitorBestFor: 'Growing manufacturers $5M–$100M wanting cloud-native ERP with consumption-based pricing that does not penalize user growth.',
    migrationSteps: [
      { title: 'Keep Acumatica for ERP', description: 'Acumatica continues handling financials, order management, and core ERP. Only scheduling moves to RMDB.' },
      { title: 'Configure Acumatica API integration', description: 'Acumatica\'s REST APIs make integration unusually clean. Work orders, routings, and BOMs flow into RMDB via API; completion data flows back the same way.' },
      { title: 'Define RMDB scheduling rules', description: 'Map work centers, shift calendars, setup time logic, and constraints. Acumatica routing data populates the base configuration.' },
      { title: 'Parallel run for 2 weeks', description: 'Compare RMDB schedule against Acumatica\'s built-in output and shop floor reality.' },
      { title: 'Transition fully', description: 'Move scheduling to RMDB. Acumatica scheduling unused; subscription continues for ERP value.' }
    ],
    faqs: [
      { question: 'How does Acumatica\'s pricing actually work?', answer: 'Acumatica is priced based on consumption — resource usage, transaction volume, and module count — rather than per-user. For growing manufacturers, this is favorable because adding users does not directly increase costs. Pricing is custom-quoted; mid-market shops typically run $25K–$120K annually.' },
      { question: 'What does Acumatica Manufacturing Edition include?', answer: 'Standard ERP (financials, inventory, sales orders), plus manufacturing-specific modules (BOM, MRP, scheduling, shop floor data, work orders). Acumatica\'s manufacturing depth is real but the bundled scheduling is not finite-capacity APS.' },
      { question: 'Can RMDB run on-premise even with cloud Acumatica?', answer: 'Yes — RMDB on-premise + cloud Acumatica is a supported deployment pattern. Integration runs via Acumatica\'s API; on-premise RMDB connects out to cloud Acumatica. Some shops prefer this for production-critical workloads.' },
      { question: 'How does the integration handle Acumatica\'s consumption pricing?', answer: 'RMDB integration uses Acumatica APIs efficiently — the data exchange volume is modest (work orders, routings, completions). RMDB integration is unlikely to materially impact Acumatica consumption pricing tier.' },
      { question: 'What is total 5-year cost for a 50-user shop?', answer: 'Acumatica for a 50-user mid-market shop: typically $50K–$100K/year × 5 = $250K–$500K. RMDB $20K one-time + $3K/year support × 5 = $35K. Combined ~$285K–$535K with substantially better scheduling capability.' }
    ]
  },
  {
    slug: 'rmdb-vs-dynamics-365-business-central',
    competitor: 'Microsoft Dynamics 365 Business Central',
    competitorDescription: 'Microsoft\'s cloud ERP for small-to-mid businesses, with manufacturing module',
    h1: 'RMDB vs Microsoft Dynamics 365 Business Central: SMB Cloud ERP vs Scheduling',
    subtitle: 'Business Central is Microsoft\'s small-to-mid business cloud ERP with a manufacturing module. RMDB is finite-capacity scheduling. Different scope, different deployment effort.',
    tldr: 'Business Central is a solid choice for small-to-mid manufacturers wanting Microsoft-aligned cloud ERP with broad capability. RMDB adds the finite-capacity scheduling depth BC manufacturing scheduling does not match. The combination works well for BC shops with serious scheduling needs.',
    introParagraphs: [
      'Microsoft Dynamics 365 Business Central (the cloud successor to Dynamics NAV / Navision) targets small-to-mid businesses with general-purpose ERP plus industry modules. The Manufacturing extension adds BOM, MRP, work orders, and basic scheduling for manufacturing customers. Microsoft\'s ecosystem (Power BI, Power Apps, Office 365) makes BC particularly attractive for shops already standardized on Microsoft.',
      'BC manufacturing scheduling handles work order sequencing and basic capacity loading. It is not finite-capacity APS in the technical sense — sequence-dependent setup, what-if branching, and constraint-aware automatic optimization are not part of its scope. For shops with simple sequential routings, BC scheduling is sufficient; for shops with complex setup-dependent logic, it is not.',
      'RMDB adds finite-capacity scheduling depth and integrates with Business Central via its REST APIs. The integration is straightforward given BC\'s API-first design. For BC shops with growing scheduling complexity, RMDB is the targeted upgrade without disrupting the rest of the Microsoft-aligned ERP.'
    ],
    features: [
      { name: 'Finite-capacity scheduling', rmdb: true, competitor: 'partial' },
      { name: 'Drag-and-drop Gantt', rmdb: true, competitor: 'partial' },
      { name: 'Sequence-dependent setup modeling', rmdb: true, competitor: false },
      { name: 'Full ERP (financials, AP/AR, GL)', rmdb: false, competitor: true },
      { name: 'Microsoft ecosystem integration', rmdb: 'partial', competitor: true },
      { name: 'Multi-level BOM and routings', rmdb: true, competitor: true },
      { name: 'What-if scheduling scenarios', rmdb: true, competitor: false },
      { name: 'Alternate work center routing', rmdb: true, competitor: 'partial' },
      { name: 'Cloud-only deployment', rmdb: false, competitor: true, note: 'RMDB offers both; BC is cloud-only (with on-premise BC NAV as legacy).' },
      { name: 'On-premise / self-hosted option', rmdb: true, competitor: false },
      { name: 'Integrates with existing ERP', rmdb: true, competitor: false },
      { name: 'Pricing model', rmdb: 'One-time license', competitor: 'Per-user subscription' },
      { name: 'Implementation time (typical)', rmdb: '5 days–4 weeks', competitor: '3–9 months' },
      { name: 'Best for company size', rmdb: '10–500+ employees', competitor: '5–250 employees' }
    ],
    pricing: {
      rmdbPrice: 'From $5,000',
      rmdbModel: 'One-time license + optional support',
      competitorPrice: '$70–$100/user/month (Essentials or Premium)',
      competitorModel: 'Per-user subscription',
      summary: 'Business Central is per-user subscription, $70/user/month (Essentials) or $100/user/month (Premium — required for manufacturing). A 20-user mfg shop runs $24K annually. RMDB at $5K–$25K one-time covers the scheduling depth. Combined BC + RMDB is typically cheaper than higher-end alternatives.'
    },
    rmdbWinsAt: [
      'BC shops where scheduling depth has become the constraint',
      'Operations with sequence-dependent setup complexity',
      'Manufacturers needing on-premise scheduling option',
      'Shops preferring one-time scheduling license',
      'Operations needing what-if scenario branching'
    ],
    competitorWinsAt: [
      'Small-to-mid manufacturers wanting Microsoft-aligned ERP',
      'Operations leveraging Microsoft ecosystem (Power BI, Power Apps, Office 365)',
      'Companies preferring cloud-only deployment with Microsoft Azure',
      'Shops with simpler scheduling needs that BC built-in covers',
      'Manufacturers wanting general business ERP plus manufacturing module'
    ],
    rmdbBestFor: 'BC shops where scheduling has become the bottleneck. Also for small-to-mid manufacturers needing focused finite-capacity scheduling depth.',
    competitorBestFor: 'Small-to-mid manufacturers $1M–$50M wanting Microsoft-aligned cloud ERP with broad business capability, where scheduling complexity is modest.',
    migrationSteps: [
      { title: 'Keep Business Central for ERP', description: 'BC continues handling financials, order management, inventory, and core ERP. Only scheduling moves to RMDB.' },
      { title: 'Configure BC API integration', description: 'Business Central\'s REST APIs make integration clean. Work orders, routings, BOMs flow into RMDB via API; completion data flows back.' },
      { title: 'Define RMDB scheduling rules', description: 'Map work centers, shift calendars, setup time logic. BC routing data populates the base configuration.' },
      { title: 'Parallel run for 2 weeks', description: 'Compare RMDB schedule against BC output and shop floor reality.' },
      { title: 'Transition fully', description: 'Move scheduling to RMDB. BC scheduling unused; BC subscription continues for ERP value.' }
    ],
    faqs: [
      { question: 'Does Business Central require the Premium tier for manufacturing?', answer: 'Yes — the Manufacturing module requires BC Premium ($100/user/month vs $70 for Essentials). For a manufacturing shop, Premium is the typical license.' },
      { question: 'How well does BC manufacturing scheduling work?', answer: 'It handles work order sequencing, basic capacity loading, and material planning. It is not finite-capacity APS. For shops with sequential routings and basic capacity needs, BC scheduling is sufficient. For shops with sequence-dependent setup or alternate routing complexity, the gap is structural and RMDB is the typical add-on.' },
      { question: 'What about Microsoft Power BI integration for scheduling reporting?', answer: 'Power BI can pull from both BC and RMDB. BC has native Power BI integration. RMDB exposes data via standard APIs and integrates with Power BI through standard data connectors. Reporting can unify across both systems.' },
      { question: 'Is BC the same as Dynamics NAV or AX?', answer: 'BC is the cloud successor to NAV (Navision). NAV was the small-to-mid product; AX (now Finance & Operations) was the enterprise product. BC inherits NAV\'s capability and architecture; it is targeted at small-to-mid businesses including manufacturing.' },
      { question: 'What is the total 5-year cost for a 25-user manufacturing shop?', answer: 'BC Premium at $100/user/month × 25 users × 60 months = $150K. RMDB $15K one-time + $2K/year support × 5 = $25K. Combined ~$175K with substantially better scheduling than BC alone.' }
    ]
  },
  {
    slug: 'rmdb-vs-rootstock',
    competitor: 'Rootstock Cloud ERP',
    competitorDescription: 'Salesforce-native cloud manufacturing ERP for mid-market discrete manufacturers',
    h1: 'RMDB vs Rootstock: Salesforce-Native ERP vs Pure Scheduling',
    subtitle: 'Rootstock is unique — manufacturing ERP built natively on Salesforce. RMDB is finite-capacity scheduling that integrates with any ERP. Different bet on platform; different scheduling depth.',
    tldr: 'Rootstock is a strong fit for mid-market manufacturers already deeply committed to Salesforce who want manufacturing ERP on the same platform. RMDB adds scheduling depth Rootstock\'s built-in scheduling does not match. Combination works for shops wanting Salesforce ERP + dedicated APS.',
    introParagraphs: [
      'Rootstock made a distinctive bet: build manufacturing ERP natively on the Salesforce platform. For manufacturers already running Salesforce CRM, the value is real — customer data, opportunity data, and production data live on the same platform without integration plumbing. For manufacturers not standardized on Salesforce, Rootstock is harder to justify because you adopt the Salesforce platform along with the ERP.',
      'Rootstock scheduling handles work order sequencing and capacity loading. It is not finite-capacity APS in the technical sense. For shops with simple sequential routings, it is sufficient. For shops with sequence-dependent setup or alternate routing complexity, the gap is visible — same pattern as most ERP-bundled scheduling modules.',
      'RMDB adds finite-capacity depth and integrates with Rootstock via Salesforce APIs. The integration leverages Salesforce\'s well-known integration patterns. For Rootstock shops where scheduling has become the constraint, the combination is targeted.'
    ],
    features: [
      { name: 'Finite-capacity scheduling', rmdb: true, competitor: 'partial' },
      { name: 'Drag-and-drop Gantt', rmdb: true, competitor: 'partial' },
      { name: 'Sequence-dependent setup modeling', rmdb: true, competitor: false },
      { name: 'Full ERP (financials, AP/AR, GL)', rmdb: false, competitor: true },
      { name: 'Native Salesforce platform', rmdb: false, competitor: true },
      { name: 'Integrated with Salesforce CRM', rmdb: 'partial', competitor: true },
      { name: 'Multi-level BOM and routings', rmdb: true, competitor: true },
      { name: 'What-if scheduling scenarios', rmdb: true, competitor: false },
      { name: 'Alternate work center routing', rmdb: true, competitor: 'partial' },
      { name: 'Cloud-only deployment', rmdb: false, competitor: true, note: 'RMDB offers cloud + on-premise; Rootstock is cloud-only on Salesforce.' },
      { name: 'Integrates with non-Salesforce ERP', rmdb: true, competitor: 'partial' },
      { name: 'Pricing model', rmdb: 'One-time license', competitor: 'Per-user subscription' },
      { name: 'Implementation time (typical)', rmdb: '5 days–4 weeks', competitor: '6–12 months' },
      { name: 'Best for company size', rmdb: '10–500+ employees', competitor: '50–500 employees' }
    ],
    pricing: {
      rmdbPrice: 'From $5,000',
      rmdbModel: 'One-time license + optional support',
      competitorPrice: 'Custom (typically $100K–$400K first year)',
      competitorModel: 'Per-user subscription plus Salesforce platform licenses',
      summary: 'Rootstock pricing includes both Rootstock ERP fees AND Salesforce platform licenses (Sales Cloud or Service Cloud foundation), making total cost meaningful. Typical mid-market deployments run $100K–$400K first year. RMDB at $5K–$50K one-time is fundamentally different in scope.'
    },
    rmdbWinsAt: [
      'Rootstock shops where scheduling depth has become the constraint',
      'Operations with sequence-dependent setup complexity',
      'Manufacturers not standardized on Salesforce',
      'Shops preferring one-time scheduling license',
      'Operations needing what-if and alternate routing logic'
    ],
    competitorWinsAt: [
      'Manufacturers already deeply committed to Salesforce platform',
      'Operations where CRM + ERP unification provides real value',
      'Companies leveraging Salesforce ecosystem (AppExchange, automation)',
      'Sales-driven manufacturers where customer data drives production',
      'Shops valuing single-vendor Salesforce relationship'
    ],
    rmdbBestFor: 'Rootstock shops where scheduling depth matters. Also for mid-market manufacturers not on Salesforce who want focused scheduling without the Salesforce platform commitment.',
    competitorBestFor: 'Mid-market manufacturers $20M–$200M already on Salesforce CRM who want manufacturing ERP on the same platform for unified customer-to-production data.',
    migrationSteps: [
      { title: 'Validate the Salesforce commitment', description: 'Rootstock is most valuable when you are already on Salesforce. If you are not on Salesforce, the platform commitment is part of what you are buying — evaluate that separately.' },
      { title: 'Keep Rootstock for ERP', description: 'Rootstock continues handling financials, order management, and Salesforce-integrated customer data. Only scheduling moves to RMDB.' },
      { title: 'Configure Rootstock → RMDB integration', description: 'Integration via Salesforce APIs. Work orders, routings, BOMs flow from Rootstock to RMDB; completion data flows back.' },
      { title: 'Define RMDB scheduling rules', description: 'Map work centers, shift calendars, setup time logic. Rootstock routing data populates the configuration.' },
      { title: 'Parallel run and cut over', description: '2 weeks parallel running, then transition fully. Rootstock scheduling unused; Rootstock + Salesforce subscriptions continue.' }
    ],
    faqs: [
      { question: 'Is Rootstock only useful if I am on Salesforce?', answer: 'Mostly yes. The core value proposition is Salesforce-native architecture — unified customer-to-production data. For shops not on Salesforce, you would be adopting both Salesforce and Rootstock together, which substantially changes the value equation.' },
      { question: 'How does Salesforce platform cost factor into Rootstock pricing?', answer: 'Rootstock requires Salesforce platform licenses underneath the Rootstock subscription. Total cost is Rootstock fees + Salesforce platform fees. For shops already paying Salesforce CRM licenses, the incremental platform cost is modest. For shops not on Salesforce, the platform cost is substantial.' },
      { question: 'Does RMDB work with Salesforce data directly?', answer: 'Not natively — RMDB integrates with Rootstock specifically, which lives on Salesforce. The data RMDB needs (work orders, routings) flows from Rootstock through standard APIs. RMDB does not require direct Salesforce platform access.' },
      { question: 'How is Rootstock scheduling different from Salesforce Field Service scheduling?', answer: 'Different products entirely. Salesforce Field Service is for dispatching service technicians (field operations). Rootstock manufacturing scheduling is for production work orders inside the plant. The two do not overlap meaningfully.' },
      { question: 'What is the total 5-year cost comparison?', answer: 'Rootstock for 50-user shop including Salesforce licenses: typically $200K–$400K/year × 5 = $1M–$2M. RMDB $25K one-time + $4K/year support × 5 = $45K. The order-of-magnitude difference reflects the difference between full Salesforce-native ERP platform and focused scheduling tool.' }
    ]
  },
  {
    slug: 'rmdb-vs-fulcrum-erp',
    competitor: 'Fulcrum ERP',
    competitorDescription: 'Modern cloud ERP for small-to-mid manufacturers, focused on user experience and ease of deployment',
    h1: 'RMDB vs Fulcrum ERP: Modern Cloud Manufacturing ERP vs Pure Scheduling',
    subtitle: 'Fulcrum ERP differentiates on modern UI and fast deployment. RMDB is finite-capacity scheduling. Different products solving different problems for different buyers.',
    tldr: 'Fulcrum is a fit for growing small-to-mid manufacturers wanting modern cloud ERP without enterprise complexity. RMDB adds scheduling depth Fulcrum\'s built-in scheduling does not match. Combination works for Fulcrum shops with growing scheduling complexity.',
    introParagraphs: [
      'Fulcrum ERP has built a reputation for two things: modern UI design (unusually good for manufacturing ERP) and fast deployment (weeks rather than months). For small-to-mid manufacturers tired of legacy ERP user experiences, Fulcrum is genuinely refreshing. Coverage includes work orders, BOM, MRP, inventory, basic scheduling, shop floor data, and integration with QuickBooks for accounting.',
      'Fulcrum scheduling handles capacity loading and work order sequencing. It does not extend to finite-capacity APS depth — sequence-dependent setup, what-if scheduling, and constraint-aware automatic optimization are not its focus. For shops with simple sequential routings, Fulcrum scheduling is sufficient; for shops with growing scheduling complexity, the gap appears.',
      'RMDB adds finite-capacity depth and integrates with Fulcrum via standard APIs. The pattern is similar to other small-mid ERPs — keep the ERP for what it does well (the integrated breadth and UX), add RMDB for scheduling depth. The combination preserves Fulcrum\'s economic and UX advantages while delivering serious scheduling capability.'
    ],
    features: [
      { name: 'Finite-capacity scheduling', rmdb: true, competitor: 'partial' },
      { name: 'Drag-and-drop Gantt', rmdb: true, competitor: 'partial' },
      { name: 'Sequence-dependent setup modeling', rmdb: true, competitor: false },
      { name: 'Modern cloud UI', rmdb: 'partial', competitor: true },
      { name: 'Quoting and estimating', rmdb: false, competitor: true },
      { name: 'Order management', rmdb: 'partial', competitor: true },
      { name: 'Shop floor data collection', rmdb: 'partial', competitor: true },
      { name: 'Multi-level BOM and routings', rmdb: true, competitor: true },
      { name: 'What-if scheduling scenarios', rmdb: true, competitor: false },
      { name: 'Alternate work center routing', rmdb: true, competitor: 'partial' },
      { name: 'QuickBooks integration', rmdb: true, competitor: true },
      { name: 'Cloud-only deployment', rmdb: false, competitor: true },
      { name: 'On-premise / self-hosted option', rmdb: true, competitor: false },
      { name: 'Pricing model', rmdb: 'One-time license', competitor: 'Per-user subscription' },
      { name: 'Best for company size', rmdb: '10–500+ employees', competitor: '5–100 employees' }
    ],
    pricing: {
      rmdbPrice: 'From $5,000',
      rmdbModel: 'One-time license + optional support',
      competitorPrice: 'Custom (typically $20K–$70K first year)',
      competitorModel: 'Per-user subscription with bundled implementation',
      summary: 'Fulcrum pricing is custom but generally accessible — typical small-to-mid shop deployments run $20K–$70K first year. RMDB at $5K–$20K one-time covers the scheduling depth. Combined Fulcrum + RMDB stays under $90K first year for most small-to-mid shops.'
    },
    rmdbWinsAt: [
      'Fulcrum shops where scheduling depth has become the constraint',
      'Operations with sequence-dependent setup complexity',
      'Manufacturers needing on-premise scheduling',
      'Shops preferring one-time scheduling license',
      'Operations needing what-if and alternate routing logic'
    ],
    competitorWinsAt: [
      'Small-to-mid manufacturers wanting modern UX in their ERP',
      'Operations valuing fast deployment (weeks vs months)',
      'Shops new to ERP wanting an accessible cloud-first option',
      'Manufacturers with simpler scheduling needs that Fulcrum covers',
      'Companies preferring integrated ERP including shop floor data'
    ],
    rmdbBestFor: 'Fulcrum shops where scheduling depth has become the bottleneck. Also for small-to-mid manufacturers $5M–$50M needing focused scheduling capability.',
    competitorBestFor: 'Small-to-mid manufacturers $1M–$30M wanting modern cloud ERP with strong UX, fast deployment, and broad ERP capability for shops where scheduling complexity is modest.',
    migrationSteps: [
      { title: 'Keep Fulcrum for ERP', description: 'Fulcrum continues handling quoting, work orders, BOM, inventory, shop floor data, and accounting integration. Only scheduling moves to RMDB.' },
      { title: 'Configure Fulcrum → RMDB integration', description: 'Standard API integration. Work orders, routings, and BOMs flow into RMDB; completion data flows back. Setup typically 2–3 days.' },
      { title: 'Define RMDB scheduling rules', description: 'Map work centers, shift calendars, setup time logic. Fulcrum routing data populates the constraints.' },
      { title: 'Parallel run for 2 weeks', description: 'Validate RMDB schedule against Fulcrum output and shop floor reality.' },
      { title: 'Transition fully', description: 'Move scheduling to RMDB. Fulcrum scheduling unused; Fulcrum subscription continues for the broader ERP value.' }
    ],
    faqs: [
      { question: 'How is Fulcrum different from other small-shop ERPs?', answer: 'Two main differentiators: UI design quality (genuinely modern, not the legacy aesthetic of most manufacturing ERP) and fast deployment time. Functionally, Fulcrum covers similar scope to other small-to-mid ERPs like Cetec, JobBOSS², or M1.' },
      { question: 'Does Fulcrum have its own finite-capacity APS?', answer: 'Fulcrum scheduling handles work order sequencing and capacity loading but is not finite-capacity APS in the technical sense. For shops with serious scheduling complexity, the gap is structural and adding a dedicated APS (RMDB) is the typical solution.' },
      { question: 'Can RMDB UX match Fulcrum\'s modern UI?', answer: 'RMDB UI is more functional than aesthetic — it serves the scheduling job with a Gantt-driven interface that planners are productive in. EDGEBI (the visualization layer) provides more modern dashboards. The combined Fulcrum (for ERP UX) + RMDB + EDGEBI (for scheduling UX) experience works well.' },
      { question: 'How do users transition between Fulcrum and RMDB workflows?', answer: 'Planners primarily work in RMDB for scheduling tasks. Other users (estimators, accounting, shop floor data entry) stay in Fulcrum. The scope of who-uses-what is contained — most users never need to learn RMDB.' },
      { question: 'What is the total 5-year cost for a 25-user shop?', answer: 'Fulcrum at typical mid-pricing ~$30K/year × 5 = $150K. RMDB $15K one-time + $2K/year support × 5 = $25K. Combined ~$175K with substantially better scheduling capability than Fulcrum alone.' }
    ]
  },
  {
    slug: 'rmdb-vs-xtuple',
    competitor: 'xTuple ERP',
    competitorDescription: 'Open-source manufacturing ERP (now owned by QAD) with strong customization capability',
    h1: 'RMDB vs xTuple ERP: Open-Source Manufacturing ERP vs Scheduling',
    subtitle: 'xTuple is open-source manufacturing ERP (now part of QAD) known for customization depth. RMDB is finite-capacity scheduling. Different deployment philosophy; complementary scope.',
    tldr: 'xTuple is a credible option for manufacturers wanting open-source ERP with deep customization. RMDB adds finite-capacity scheduling depth xTuple\'s built-in scheduling does not match. Combination works for xTuple shops with growing scheduling complexity.',
    introParagraphs: [
      'xTuple built a unique position in manufacturing ERP: fully open-source code base with a commercial product line layered on top. For manufacturers wanting customization depth, vendor independence, or who simply prefer open-source software, xTuple is a real option. After QAD\'s 2021 acquisition, xTuple sits within QAD\'s broader portfolio but maintains its open-source heritage.',
      'xTuple scheduling handles work order sequencing and basic capacity loading. The open architecture means customizations are possible — but the underlying scheduling model is not finite-capacity APS. For shops needing sequence-dependent setup logic or what-if scenarios, the depth required typically exceeds what reasonable customization can achieve.',
      'RMDB delivers finite-capacity depth out of the box and integrates with xTuple via standard data interfaces. The open architecture of xTuple makes the integration unusually flexible — many xTuple shops customize the integration patterns to their specific needs. For shops where xTuple\'s scheduling has hit its ceiling, RMDB is the targeted upgrade.'
    ],
    features: [
      { name: 'Finite-capacity scheduling', rmdb: true, competitor: 'partial' },
      { name: 'Drag-and-drop Gantt', rmdb: true, competitor: 'partial' },
      { name: 'Sequence-dependent setup modeling', rmdb: true, competitor: false },
      { name: 'Open-source codebase', rmdb: false, competitor: true },
      { name: 'Deep customization capability', rmdb: 'partial', competitor: true },
      { name: 'Full ERP (financials, AP/AR, GL)', rmdb: false, competitor: true },
      { name: 'Multi-level BOM and routings', rmdb: true, competitor: true },
      { name: 'What-if scheduling scenarios', rmdb: true, competitor: false },
      { name: 'Alternate work center routing', rmdb: true, competitor: 'partial' },
      { name: 'Cloud / on-premise options', rmdb: true, competitor: true },
      { name: 'Integrates with existing ERP', rmdb: true, competitor: false },
      { name: 'Pricing model', rmdb: 'One-time license', competitor: 'Open-source or commercial editions' },
      { name: 'Implementation time (typical)', rmdb: '5 days–4 weeks', competitor: '3–9 months' },
      { name: 'Best for company size', rmdb: '10–500+ employees', competitor: '10–150 employees' }
    ],
    pricing: {
      rmdbPrice: 'From $5,000',
      rmdbModel: 'One-time license + optional support',
      competitorPrice: 'Free (community edition) or commercial subscription',
      competitorModel: 'Open-source free or commercial edition with support',
      summary: 'xTuple offers a free community edition (open-source) and commercial editions with vendor support. Commercial pricing is custom; typical shops run $10K–$60K annually for commercial editions plus implementation. RMDB at $5K–$25K one-time covers the scheduling depth.'
    },
    rmdbWinsAt: [
      'xTuple shops where scheduling depth has become the constraint',
      'Operations with sequence-dependent setup complexity',
      'Manufacturers wanting commercial-quality scheduling without custom development',
      'Shops preferring one-time scheduling license',
      'Operations needing what-if and alternate routing logic'
    ],
    competitorWinsAt: [
      'Manufacturers committed to open-source software',
      'Operations needing deep ERP customization beyond standard configuration',
      'Companies with internal development resources for ERP customization',
      'Shops valuing vendor independence and source code access',
      'Manufacturers in regulated industries requiring custom workflows'
    ],
    rmdbBestFor: 'xTuple shops where scheduling depth matters and custom development is not the right path. Also for manufacturers $5M–$50M needing focused finite-capacity scheduling.',
    competitorBestFor: 'Manufacturers $2M–$30M wanting open-source ERP with deep customization capability, vendor independence, and internal development resources to maintain customizations.',
    migrationSteps: [
      { title: 'Keep xTuple for ERP', description: 'xTuple continues handling financials, order management, and core ERP. Only scheduling moves to RMDB.' },
      { title: 'Configure xTuple → RMDB integration', description: 'xTuple\'s open architecture allows flexible integration patterns. Work orders, routings, BOMs flow into RMDB via direct database connection or API; completion data flows back.' },
      { title: 'Define RMDB scheduling rules', description: 'Map work centers, shift calendars, setup time logic. xTuple routing data populates the configuration.' },
      { title: 'Parallel run for 2 weeks', description: 'Compare RMDB schedule against xTuple output and shop floor reality.' },
      { title: 'Transition fully', description: 'Move scheduling to RMDB. xTuple scheduling unused; xTuple continues for the rest of ERP.' }
    ],
    faqs: [
      { question: 'Is xTuple still open-source after the QAD acquisition?', answer: 'Yes — the community edition remains open-source. QAD has continued the dual community/commercial model. Long-term direction may evolve; verify with QAD before committing to a fresh deployment.' },
      { question: 'Can I just customize xTuple scheduling to be finite-capacity?', answer: 'Technically possible because the source is open. Practically very expensive — finite-capacity APS is sophisticated software requiring serious development investment. Most shops find buying RMDB is materially cheaper than building APS on xTuple.' },
      { question: 'How does the RMDB + xTuple integration leverage open architecture?', answer: 'xTuple\'s open database structure makes RMDB integration unusually clean — no API limits, no vendor restrictions, full data access. Shops can customize the integration pattern to their specific needs, which is harder with closed-source ERPs.' },
      { question: 'Is xTuple the same as PostBooks?', answer: 'PostBooks was the original xTuple community edition name. The product is now branded as xTuple. Same heritage; current product line is unified under xTuple naming.' },
      { question: 'What is total 5-year cost for an xTuple commercial + RMDB shop?', answer: 'xTuple commercial ~$30K/year × 5 = $150K. RMDB $20K one-time + $3K/year support × 5 = $35K. Combined ~$185K with substantially better scheduling. Free xTuple community edition + RMDB combined is even cheaper but requires internal IT support.' }
    ]
  },
  {
    slug: 'rmdb-vs-genius-erp',
    competitor: 'Genius ERP',
    competitorDescription: 'ERP focused on custom manufacturers and ETO (engineer-to-order) operations',
    h1: 'RMDB vs Genius ERP: ETO-Focused ERP vs Finite-Capacity Scheduling',
    subtitle: 'Genius ERP targets custom manufacturers and ETO operations with engineering-aware workflows. RMDB is finite-capacity scheduling. Different scope; complementary for ETO shops with serious scheduling needs.',
    tldr: 'Genius ERP is a fit for ETO and custom manufacturers needing engineering-integrated ERP. RMDB adds scheduling depth Genius does not match. Combination works for ETO shops where scheduling complexity exceeds Genius\'s built-in capability.',
    introParagraphs: [
      'Genius ERP has built a specific position in custom manufacturing and engineer-to-order operations. Where most ERPs treat ETO as an afterthought, Genius is designed around engineering workflows — drawing management, engineering change orders flowing through production, project-style work order structures. For custom industrial machinery, made-to-order fabrication, and similar ETO operations, Genius offers more ETO-specific depth than general-purpose ERPs.',
      'Genius scheduling handles work order sequencing and capacity loading. It is not finite-capacity APS depth — sequence-dependent setup and constraint-aware automatic optimization are not its core. For ETO shops where each job is unique and scheduling complexity is high, the bundled scheduler often hits its limits.',
      'RMDB adds finite-capacity depth and integrates with Genius via standard data exchange. For ETO shops happy with Genius ERP generally but constrained by its scheduling, the combination is targeted. RMDB handles the scheduling complexity; Genius continues handling the engineering-integrated ERP workflow.'
    ],
    features: [
      { name: 'Finite-capacity scheduling', rmdb: true, competitor: 'partial' },
      { name: 'Drag-and-drop Gantt', rmdb: true, competitor: 'partial' },
      { name: 'Sequence-dependent setup modeling', rmdb: true, competitor: false },
      { name: 'ETO and engineer-to-order workflow', rmdb: 'partial', competitor: true },
      { name: 'Engineering change management', rmdb: 'partial', competitor: true },
      { name: 'Drawing/document management', rmdb: false, competitor: true },
      { name: 'Multi-level BOM and routings', rmdb: true, competitor: true },
      { name: 'What-if scheduling scenarios', rmdb: true, competitor: false },
      { name: 'Alternate work center routing', rmdb: true, competitor: 'partial' },
      { name: 'Cloud / on-premise options', rmdb: true, competitor: true },
      { name: 'Integrates with existing ERP', rmdb: true, competitor: false },
      { name: 'Pricing model', rmdb: 'One-time license', competitor: 'Per-user subscription' },
      { name: 'Implementation time (typical)', rmdb: '5 days–4 weeks', competitor: '4–9 months' },
      { name: 'Best for company size', rmdb: '10–500+ employees', competitor: '20–200 employees' },
      { name: 'Industry focus', rmdb: 'Discrete manufacturing (broad)', competitor: 'Custom mfg / ETO' }
    ],
    pricing: {
      rmdbPrice: 'From $5,000',
      rmdbModel: 'One-time license + optional support',
      competitorPrice: 'Custom (typically $40K–$150K first year)',
      competitorModel: 'Per-user subscription with implementation services',
      summary: 'Genius ERP pricing is custom; typical ETO shop deployments run $40K–$150K first year. Subscription continues annually. RMDB at $5K–$30K one-time covers the scheduling depth. Combined Genius + RMDB approach delivers ETO ERP + finite-capacity scheduling at competitive total cost.'
    },
    rmdbWinsAt: [
      'Genius shops where scheduling depth has become the constraint',
      'Operations with sequence-dependent setup complexity',
      'Manufacturers needing what-if scheduling capability',
      'Shops preferring one-time scheduling license',
      'Operations needing alternate routing logic'
    ],
    competitorWinsAt: [
      'Custom manufacturers needing engineering-integrated ERP',
      'ETO operations with significant drawing and document management needs',
      'Shops with extensive engineering change management workflows',
      'Manufacturers where each project is essentially unique',
      'Companies valuing Genius\'s ETO-specific UI and workflow patterns'
    ],
    rmdbBestFor: 'Genius shops where scheduling complexity exceeds the built-in scheduler. Also for ETO and custom manufacturers $10M–$100M needing finite-capacity scheduling depth.',
    competitorBestFor: 'Custom manufacturers and ETO operations $5M–$50M needing engineering-integrated ERP with drawing management, ECO workflows, and project-style operations.',
    migrationSteps: [
      { title: 'Keep Genius for ERP', description: 'Genius continues handling estimating, engineering, work orders, costing, and ETO-specific workflows. Only scheduling moves to RMDB.' },
      { title: 'Configure Genius → RMDB integration', description: 'Standard data exchange. Work orders, routings, and BOMs flow into RMDB; completion data flows back.' },
      { title: 'Define RMDB scheduling rules', description: 'Map work centers, shift calendars, setup time logic. Genius routing data populates the constraints.' },
      { title: 'Parallel run for 2–3 weeks', description: 'Validate RMDB schedule against Genius output and shop floor reality. ETO operations often need longer validation due to job variability.' },
      { title: 'Transition fully', description: 'Move scheduling to RMDB. Genius scheduling unused; Genius continues for ERP value.' }
    ],
    faqs: [
      { question: 'How is Genius different from general ERPs for ETO?', answer: 'Genius is purpose-built for engineering-integrated workflows: drawing management, engineering changes flowing through production, project-style work orders. General ERPs treat ETO as a configuration; Genius treats it as a core architecture. For shops where ETO is the primary workflow, the depth difference is meaningful.' },
      { question: 'Can RMDB handle ETO scheduling complexity?', answer: 'Yes — RMDB scheduling logic handles unique routings, project-style work orders, and complex multi-step operations. The ETO-specific ERP workflows (drawing management, ECOs) stay in Genius; the scheduling complexity flows to RMDB.' },
      { question: 'How does engineering change management work across both systems?', answer: 'Genius manages the engineering change workflow — drawing revisions, BOM changes, approval routing. When changes affect active work orders, the updated data flows from Genius to RMDB and the schedule reflects the new requirements. The boundary is clean: Genius owns engineering data; RMDB owns scheduling decisions.' },
      { question: 'Is Genius being actively developed?', answer: 'Yes — ongoing development with focus on the ETO niche. As with smaller-vendor ERPs, verify roadmap and customer base before fresh deployment.' },
      { question: 'What is the total 5-year cost for a 30-user ETO shop?', answer: 'Genius for 30 users: typically $60K–$100K/year × 5 = $300K–$500K. RMDB $20K one-time + $3K/year support × 5 = $35K. Combined ~$335K–$535K — competitive against higher-end alternatives for ETO operations needing both engineering integration and scheduling depth.' }
    ]
  },
  {
    slug: 'rmdb-vs-visual-mrp',
    competitor: 'Visual MRP / Visual EnterpriseOne',
    competitorDescription: 'Long-running discrete manufacturing ERP (Visual Manufacturing, now Infor VISUAL)',
    h1: 'RMDB vs Visual MRP: Legacy Manufacturing ERP vs Modern Scheduling',
    subtitle: 'Visual Manufacturing (now Infor VISUAL) has served discrete manufacturers for 30+ years. RMDB is finite-capacity scheduling. Visual has scheduling depth; RMDB has modern UX and integration flexibility.',
    tldr: 'Infor VISUAL is a mature ERP with serious manufacturing depth for shops that already run it. RMDB is a fit for shops where VISUAL scheduling has become legacy-feeling or where the broader ERP no longer fits the business. Comparison usually appears when VISUAL shops evaluate alternatives.',
    introParagraphs: [
      'Visual Manufacturing (rebranded as Infor VISUAL after the Infor acquisition) has served discrete manufacturers since the early 1990s. It is genuinely deep — covering estimating, work orders, scheduling, costing, MRP, and financials with extensive customization capability built up over three decades. For shops that have run Visual for 10+ years, it is often deeply integrated into the way the business works.',
      'Visual scheduling includes a finite-capacity scheduler that is competitive with modern APS systems in capability — Visual was an early pioneer in finite-capacity manufacturing scheduling. The challenge for many Visual shops is UX age and integration flexibility — both reflecting Visual\'s long heritage. For new buyers, the UX feels dated compared to modern alternatives.',
      'RMDB serves Visual shops in two scenarios: (1) shops upgrading from Visual to a newer ERP who want to keep scheduling depth without the rest of Visual, and (2) shops evaluating Visual against alternatives who want focused scheduling capability without the full ERP project. For shops happy with Visual generally, RMDB rarely makes sense — Visual\'s scheduling is already serious.'
    ],
    features: [
      { name: 'Finite-capacity scheduling', rmdb: true, competitor: true },
      { name: 'Drag-and-drop Gantt', rmdb: true, competitor: true },
      { name: 'Sequence-dependent setup modeling', rmdb: true, competitor: true },
      { name: 'Modern UX', rmdb: 'partial', competitor: false },
      { name: 'Full ERP (financials, AP/AR, GL)', rmdb: false, competitor: true },
      { name: 'Multi-level BOM and routings', rmdb: true, competitor: true },
      { name: 'What-if scheduling scenarios', rmdb: true, competitor: true },
      { name: 'Alternate work center routing', rmdb: true, competitor: true },
      { name: 'Integrates with non-Visual ERP', rmdb: true, competitor: 'partial' },
      { name: 'Cloud / on-premise options', rmdb: true, competitor: 'partial', note: 'Visual is primarily on-premise; cloud options expanding under Infor.' },
      { name: 'Pricing model', rmdb: 'One-time license', competitor: 'Per-user subscription or perpetual' },
      { name: 'Implementation time (typical)', rmdb: '5 days–4 weeks', competitor: '4–12 months' },
      { name: 'Best for company size', rmdb: '10–500+ employees', competitor: '25–500 employees' }
    ],
    pricing: {
      rmdbPrice: 'From $5,000',
      rmdbModel: 'One-time license + optional support',
      competitorPrice: 'Custom (varies widely; legacy perpetual deals exist)',
      competitorModel: 'Subscription (newer) or perpetual (legacy)',
      summary: 'Visual / Infor VISUAL pricing varies significantly based on whether deployment is legacy perpetual licensing or modern Infor cloud subscription. New deployments under Infor pricing typically run $80K–$300K first year. RMDB at $5K–$50K one-time is focused on scheduling depth rather than full platform.'
    },
    rmdbWinsAt: [
      'Visual shops migrating off the platform but wanting to preserve scheduling capability',
      'Manufacturers evaluating Visual where the scheduling-only need would not justify full Visual cost',
      'Operations needing modern UX in their scheduling tool',
      'Shops where Visual customization burden has become unsustainable',
      'Faster scheduling deployment than full Visual implementation'
    ],
    competitorWinsAt: [
      'Shops already running Visual successfully with significant customization investment',
      'Operations needing full ERP including financials in a single mature platform',
      'Manufacturers wanting deep manufacturing-specific ERP capability',
      'Companies committed to Infor ecosystem and roadmap',
      'Shops that value Visual\'s historical depth and stability'
    ],
    rmdbBestFor: 'Manufacturers evaluating Visual where scope mismatch suggests scheduling-only is the right answer. Also for shops migrating from Visual who want to preserve scheduling capability with modern UX.',
    competitorBestFor: 'Shops already running Visual successfully with significant customizations, or new buyers needing full mature ERP with manufacturing depth and committed to Infor ecosystem.',
    migrationSteps: [
      { title: 'Identify your scenario', description: 'Are you migrating off Visual entirely, or evaluating Visual as a new buy? The answer shapes the migration path.' },
      { title: 'If migrating off Visual', description: 'Export work orders, routings, BOMs from Visual. Plan ERP replacement (Cetec, JobBOSS², M1, Acumatica are common destinations for sub-$100M shops). RMDB handles scheduling regardless of replacement ERP.' },
      { title: 'If new buyer evaluating Visual', description: 'Consider whether full Visual is needed or whether smaller ERP + RMDB delivers the actual capability needed at lower total cost. For shops where scheduling is the primary need, the latter is often more proportionate.' },
      { title: 'Configure RMDB scheduling', description: 'Define work centers, shift calendars, setup time logic. Routing data populates the configuration.' },
      { title: 'Parallel run and validate', description: 'Compare RMDB schedule against Visual output (if migrating) or against current process. Standard 2-week validation.' }
    ],
    faqs: [
      { question: 'Is Visual / Infor VISUAL still being actively developed?', answer: 'Yes — Infor continues investing in VISUAL. Direction has shifted toward cloud and Infor ecosystem integration. Long-term roadmap is shaped by Infor priorities; verify with Infor for current development plans.' },
      { question: 'How does Visual scheduling compare to RMDB?', answer: 'Both are credible finite-capacity APS systems. Visual was an early pioneer and has deep capability. RMDB has more modern UX and easier integration with non-Infor systems. For capability depth alone, they are similar; the difference is UX, integration flexibility, and pricing model.' },
      { question: 'Why would I leave Visual for RMDB?', answer: 'Usually because the broader Visual ERP no longer fits — UX age, customization burden, cost, or business changes have pushed the shop toward replacement. RMDB lets the shop replace Visual incrementally: scheduling first with RMDB, then full ERP replacement separately.' },
      { question: 'Can RMDB handle Visual-level scheduling complexity?', answer: 'Yes — RMDB is full finite-capacity APS with sequence-dependent setup, alternate routing, what-if branching, and constraint-aware optimization. Shops migrating from Visual scheduling typically find RMDB matches or exceeds the previous capability with better UX.' },
      { question: 'What if I am happy with Visual generally?', answer: 'Then keep it. RMDB is most useful for shops where Visual no longer fits, not for shops where it works. The comparison is asymmetric — Visual users are usually satisfied with the scheduling specifically; the issues are usually elsewhere in the platform.' }
    ]
  },
  {
    slug: 'rmdb-vs-aptean-industrial-mfg',
    competitor: 'Aptean Industrial Manufacturing',
    competitorDescription: 'Aptean\'s industrial manufacturing ERP portfolio (consolidates Made2Manage, Ross, JustFood, and others)',
    h1: 'RMDB vs Aptean Industrial Manufacturing: Vertical ERP vs Pure Scheduling',
    subtitle: 'Aptean operates an industrial manufacturing ERP portfolio including Made2Manage, Ross, JustFood, and others. RMDB is finite-capacity scheduling. Different scope; common in shops with Aptean ERP needing better scheduling.',
    tldr: 'Aptean offers vertical industrial manufacturing ERPs aimed at specific niches (process, food, discrete). RMDB adds finite-capacity scheduling depth across any Aptean product. For Aptean shops where scheduling has become the bottleneck, RMDB is the targeted upgrade.',
    introParagraphs: [
      'Aptean has built a portfolio of vertical-specific manufacturing ERPs through acquisitions over the past decade. Made2Manage (discrete manufacturing), Ross Systems (process manufacturing), JustFood (food and beverage), and others all sit within Aptean. Each retains its vertical specialization while operating under Aptean\'s unified support and infrastructure.',
      'Across the Aptean portfolio, scheduling depth varies. Generally the scheduling modules handle capacity loading and work order sequencing without finite-capacity APS depth. Sequence-dependent setup, what-if scheduling, and constraint-aware optimization are not the core of these systems — vertical-specific functionality is.',
      'RMDB serves as a scheduling layer that adds finite-capacity depth across any Aptean product. The integration patterns vary by Aptean ERP but are generally well-supported. For Aptean shops where the vertical ERP works for the rest of the business but scheduling has become the constraint, RMDB is a focused add-on without disrupting Aptean\'s vertical strengths.'
    ],
    features: [
      { name: 'Finite-capacity scheduling', rmdb: true, competitor: 'partial' },
      { name: 'Drag-and-drop Gantt', rmdb: true, competitor: 'partial' },
      { name: 'Sequence-dependent setup modeling', rmdb: true, competitor: false },
      { name: 'Vertical-specific workflows', rmdb: 'partial', competitor: true },
      { name: 'Full ERP (financials, AP/AR, GL)', rmdb: false, competitor: true },
      { name: 'Multi-level BOM and routings', rmdb: true, competitor: true },
      { name: 'What-if scheduling scenarios', rmdb: true, competitor: false },
      { name: 'Alternate work center routing', rmdb: true, competitor: 'partial' },
      { name: 'Cloud / on-premise options', rmdb: true, competitor: true },
      { name: 'Integrates with existing ERP', rmdb: true, competitor: false },
      { name: 'Pricing model', rmdb: 'One-time license', competitor: 'Per-user subscription' },
      { name: 'Implementation time (typical)', rmdb: '5 days–4 weeks', competitor: '4–12 months' },
      { name: 'Best for company size', rmdb: '10–500+ employees', competitor: '25–500 employees' }
    ],
    pricing: {
      rmdbPrice: 'From $5,000',
      rmdbModel: 'One-time license + optional support',
      competitorPrice: 'Custom (typically $50K–$300K first year)',
      competitorModel: 'Per-user subscription with implementation services',
      summary: 'Aptean pricing varies by vertical ERP and deployment size. Typical mid-market deployments run $50K–$300K first year. RMDB at $5K–$40K one-time covers the scheduling depth. Combined Aptean + RMDB approach delivers vertical ERP + scheduling at competitive total cost.'
    },
    rmdbWinsAt: [
      'Aptean shops where scheduling depth has become the constraint',
      'Operations with sequence-dependent setup complexity across any Aptean vertical',
      'Manufacturers needing what-if scheduling capability',
      'Shops preferring one-time scheduling license',
      'Operations needing alternate routing logic'
    ],
    competitorWinsAt: [
      'Manufacturers needing vertical-specific ERP depth (process, food, discrete)',
      'Operations valuing Aptean\'s industry-focused workflows',
      'Shops new to vertical ERP wanting a vertical-specialist vendor',
      'Companies preferring single-vendor relationship across vertical needs',
      'Manufacturers in regulated industries (food safety, pharma) where Aptean vertical depth matters'
    ],
    rmdbBestFor: 'Aptean shops where scheduling depth has become the bottleneck. Also for manufacturers $10M–$200M needing finite-capacity scheduling alongside any vertical ERP.',
    competitorBestFor: 'Manufacturers $10M–$300M needing vertical-specific ERP — process manufacturing (Ross), food and beverage (JustFood), discrete job shop (Made2Manage), or other Aptean vertical specializations.',
    migrationSteps: [
      { title: 'Identify your Aptean product', description: 'Different Aptean products have different integration patterns. Made2Manage, Ross, JustFood, and others each have specific integration approaches with RMDB.' },
      { title: 'Keep Aptean for ERP', description: 'Aptean continues handling vertical-specific workflows, financials, and core ERP. Only scheduling moves to RMDB.' },
      { title: 'Configure Aptean → RMDB integration', description: 'Direct database or API integration depending on the Aptean product. Work orders, routings, BOMs flow into RMDB; completion data flows back.' },
      { title: 'Define RMDB scheduling rules', description: 'Map work centers, shift calendars, setup time logic. Aptean routing data populates the configuration.' },
      { title: 'Parallel run and cut over', description: '2–4 weeks parallel running, then transition fully. Aptean scheduling unused; Aptean ERP continues for vertical value.' }
    ],
    faqs: [
      { question: 'Are all Aptean products similar?', answer: 'No — Aptean operates them as distinct vertical products. Made2Manage targets discrete manufacturing; Ross targets process; JustFood targets food and beverage. Each retains its specific workflow and customer base. Aptean\'s value is portfolio breadth across verticals, not platform unification.' },
      { question: 'How does the RMDB integration work across different Aptean products?', answer: 'Per-product integration patterns. Made2Manage integration is well-established. Ross and JustFood integrations work via standard data exchange. Specific implementation varies by Aptean product; RMDB has worked with most of them at one customer or another.' },
      { question: 'Is Aptean still investing in these acquired products?', answer: 'Mostly yes — Aptean has continued maintenance and incremental development on acquired products. Customers occasionally express concern about long-term direction; verify roadmap directly with Aptean for the specific product before fresh deployment.' },
      { question: 'Why would I leave an Aptean product entirely?', answer: 'Most shops do not — Aptean products retain their vertical strengths. RMDB serves shops where the Aptean product works for ERP but scheduling has become a constraint. The pattern is "add RMDB" not "replace Aptean."' },
      { question: 'What is the total cost for an Aptean Made2Manage + RMDB shop?', answer: 'Made2Manage for 20-user shop: typically $30K–$60K/year × 5 = $150K–$300K. RMDB $15K one-time + $2K/year support × 5 = $25K. Combined $175K–$325K with substantially better scheduling than Made2Manage alone.' }
    ]
  }
];

export function getCompetitorBySlug(slug: string): ComparisonPageData | undefined {
  return COMPETITORS.find((c) => c.slug === slug);
}

export const COMPETITOR_SLUGS = COMPETITORS.map((c) => c.slug);
