import * as React from 'react';

import {
  ShortlistPage,
  type ShortlistPageData
} from '@/components/marketing/compare/shortlist-page';
import { Routes } from '@/constants/routes';
import { createPageMetadata } from '@/lib/seo/metadata';

const PATH = '/what-if-scenario-planning-tools-manufacturing';

export const metadata = createPageMetadata({
  title:
    'Manufacturing What-If Scenario Planning Tools Compared: 8 Options (2026)',
  description:
    'Manufacturing what-if scenario planning tools compared: EDGEBIC, PlanetTogether, Siemens Opcenter APS (Preactor), Asprova, Epicor Kinetic, ProModel, MRPeasy and Katana. Scenario types, ERP integration, deployment, pricing model and fit for US, UK and European manufacturers.',
  path: PATH,
  modifiedTime: '2026-08-28',
  keywords:
    'manufacturing what-if scenario planning tools compared, what-if scenario planning software manufacturing, manufacturing scenario planning tools, capacity scenario planning software, production what-if analysis tools, what-if scheduling software, scenario planning software UK manufacturing, scenario planning software Europe manufacturing, discrete event simulation vs APS, quote scenario software, capacity planning what-if'
});

const data: ShortlistPageData = {
  path: PATH,
  h1: 'Manufacturing What-If Scenario Planning Tools Compared',
  directAnswer:
    'For manufacturing what-if scenario planning, the leading tools are EDGEBIC (quote scenarios with per-step overrides and side-by-side comparison, one-time license), PlanetTogether and Siemens Opcenter APS (enterprise APS with multi-scenario planning), and Asprova for high-mix plants. ProModel covers discrete-event simulation when the question is about layout or process design rather than the current order book. MRPeasy and Katana offer lighter scenario capability inside cloud MRP. This page compares eight tools for manufacturers in North America, the UK and Europe.',
  articleTitle: 'Manufacturing What-If Scenario Planning Tools Compared',
  articleDescription:
    'Eight what-if scenario planning tools for manufacturers compared on scenario types, ERP integration, deployment, pricing model, company-size fit and region.',
  datePublished: '2026-08-28',
  dateModified: '2026-08-28',
  introParagraphs: [
    'A what-if scenario in manufacturing answers a specific question before you commit: can we take this order and still hit existing promises? What happens if we add a second shift on the bottleneck? Which deliveries slip if the press is down for a week? Should we outsource the machining or buy a machine? The best tools answer with a fully scheduled plan built on real orders, routings and calendars, not a spreadsheet estimate.',
    'There are two families. Scheduling-based scenario tools (EDGEBIC, PlanetTogether, Opcenter APS, Asprova, Epicor) copy the live schedule, apply the change, and show the difference in dates, load and cost. Simulation tools (ProModel and its peers) model the process itself with statistical variability and are the right choice for layout, staffing-policy and new-line questions. Most plants need the first family weekly and the second a few times a year.',
    'User Solutions builds EDGEBIC and also resells ProModel, so two entries on this list are ours. Competitor descriptions are deliberately conservative and no prices are quoted unless the vendor publishes them.'
  ],
  criteria: [
    'Scenarios run on the real order book, routings and calendars, not on a copy of aggregate numbers',
    'Two or more scenarios can be compared side by side before one is committed',
    'Capacity, shift, material and outsourcing changes can all be modelled',
    'Results feed back into the production schedule or the ERP',
    'Vendor supports manufacturers in the US, Canada, the UK and the EU'
  ],
  tools: [
    {
      name: 'EDGEBIC',
      vendor: 'User Solutions, Inc. (USA)',
      summary:
        'Quote scenarios are first-class objects: copy the live schedule, add a prospective order, override capacity or priority on individual steps, enable parallel processing, then compare two scenarios side by side and promote the winner. Turner Bicycles used the RMDB engine behind EDGEBIC to quote the largest order in its history in a single afternoon.',
      companySize: '10 to 500+ employees',
      erpIntegration:
        'Excel, CSV or database exchange with JobBOSS, Epicor, Fourth Shift, SAP, Sage, Dynamics 365 Business Central and others; promise dates exported back',
      deployment:
        'Windows desktop on .NET 8; SQLite single-user or SQL Server multi-user; on-premise or customer-hosted',
      pricingModel:
        'One-time perpetual license, published: $25,000 APS edition, $35,000 Complete edition',
      region:
        'North America, UK and Europe (Germany, Netherlands, Ireland); remote implementation',
      href: Routes.WhatIfAnalysis,
      hrefLabel: 'See what-if analysis in EDGEBIC and RMDB',
      isOurs: true
    },
    {
      name: 'PlanetTogether APS',
      vendor: 'PlanetTogether (USA)',
      summary:
        'Multi-scenario planning is a headline feature: planners can branch the schedule, compare KPIs across scenarios and publish one. Strong for multi-plant capacity questions and S&OP-style reviews. Sized for mid-market and enterprise.',
      companySize: 'Mid-market to enterprise; multi-plant',
      erpIntegration: 'Packaged connectors for SAP, Dynamics, Oracle, Epicor and others',
      deployment: 'Cloud or on-premise',
      pricingModel: 'Subscription; quote-based',
      region: 'Global',
      href: '/blog/rmdb-vs-planettogether',
      hrefLabel: 'RMDB vs PlanetTogether comparison'
    },
    {
      name: 'Siemens Opcenter APS (Preactor)',
      vendor: 'Siemens Digital Industries Software',
      summary:
        'Long-standing what-if capability from the Preactor lineage: multiple schedule versions, rule changes and capacity edits compared in the Gantt. Fits plants already in the Siemens ecosystem or with a Siemens partner nearby.',
      companySize: 'Mid-market to enterprise',
      erpIntegration: 'Siemens Opcenter native; SAP and others via partners',
      deployment: 'On-premise or cloud',
      pricingModel: 'Quote-based through Siemens and partners',
      region: 'Global; UK origin, strong European partner base',
      href: '/blog/rmdb-vs-siemens-opcenter',
      hrefLabel: 'RMDB vs Siemens Opcenter comparison'
    },
    {
      name: 'Asprova APS',
      vendor: 'Asprova Corporation (Japan)',
      summary:
        'Very fast rescheduling engine, so re-running a scenario with changed constraints takes seconds even on large high-mix datasets. Scenario comparison is configured by a certified partner. Widely used in Japan and continental Europe.',
      companySize: 'Mid-market to enterprise',
      erpIntegration: 'Standard interfaces to SAP and other ERPs via partners',
      deployment: 'On-premise; hosted through partners',
      pricingModel: 'Quote-based license through partners',
      region: 'Japan and Asia; distributors in Germany and Europe; limited North American presence',
      href: '/blog/rmdb-vs-asprova',
      hrefLabel: 'RMDB vs Asprova comparison'
    },
    {
      name: 'Epicor Kinetic Scheduling',
      vendor: 'Epicor Software (USA)',
      summary:
        'Epicor Kinetic supports what-if scheduling against a copy of the live schedule for existing Epicor customers. Useful for order-acceptance questions inside the ERP; plants with detailed constraints often add a dedicated scheduler on top.',
      companySize: 'Mid-market to enterprise Epicor customers',
      erpIntegration: 'Native to Epicor Kinetic only',
      deployment: 'Epicor cloud or on-premise',
      pricingModel: 'Subscription modules; quote-based',
      region: 'Global; UK and European operations',
      href: '/blog/rmdb-vs-epicor-aps',
      hrefLabel: 'RMDB vs Epicor APS comparison'
    },
    {
      name: 'ProModel',
      vendor: 'ProModel (resold by User Solutions in North America)',
      summary:
        'Discrete-event simulation rather than scheduling: models variability, queues, staffing and layout so you can test a new line, a cell redesign or a staffing policy statistically. The right tool when the question is about the process, not about this week\'s orders.',
      companySize: 'Any size; engineering and continuous-improvement teams',
      erpIntegration: 'Imports data from ERP or MES extracts; not a live schedule integration',
      deployment: 'Windows desktop',
      pricingModel: 'Quote-based license',
      region: 'North America directly; Europe via partners',
      href: '/promodel',
      hrefLabel: 'Learn about ProModel'
    },
    {
      name: 'MRPeasy',
      vendor: 'MRPeasy (Estonia)',
      summary:
        'Cloud MRP with a production planner; scenario testing is done by editing the plan and observing the result rather than through named scenarios. Adequate for small shops with simple routings.',
      companySize: '10 to 200 employees',
      erpIntegration: 'Scheduler is internal; QuickBooks, Xero, Shopify integrations',
      deployment: 'Cloud SaaS',
      pricingModel: 'Published per-user monthly subscription',
      region: 'Global; EU-based vendor',
      href: '/blog/rmdb-vs-mrpeasy',
      hrefLabel: 'RMDB vs MRPeasy comparison'
    },
    {
      name: 'Katana Cloud Inventory',
      vendor: 'Katana (Estonia)',
      summary:
        'Visual planner and inventory in one cloud tool; what-if is limited to re-prioritising orders and seeing material availability shift. Good for small product companies, not for capacity scenarios.',
      companySize: '5 to 100 employees',
      erpIntegration: 'Shopify, WooCommerce, QuickBooks Online, Xero; open API',
      deployment: 'Cloud SaaS',
      pricingModel: 'Published tiered subscription',
      region: 'Global; EU-based vendor',
      href: '/blog/rmdb-vs-katana',
      hrefLabel: 'RMDB vs Katana comparison'
    }
  ],
  howToChoose: [
    {
      title: 'Name the question first',
      body:
        '"Can we take this order?" and "what if we add a shift?" are scheduling scenarios: pick EDGEBIC, PlanetTogether, Opcenter or Asprova. "Should we re-lay the cell?" and "how many operators do we need at 20% more volume?" are simulation questions: pick ProModel or a peer.'
    },
    {
      title: 'Insist on the real order book',
      body:
        'A scenario built on aggregate hours per work centre hides the sequencing problems that make orders late. Ask each vendor to run a scenario on your actual open orders during the demo.'
    },
    {
      title: 'Check step-level overrides',
      body:
        'Useful scenarios change one thing: extra capacity on one work centre, a higher priority on one job, parallel processing on one step. Tools that only allow global changes produce answers that are hard to act on.'
    },
    {
      title: 'Compare, then promote',
      body:
        'The workflow should be copy, change, compare, promote. If promoting the winning scenario to the live schedule is a manual re-entry job, the feature will not get used.'
    },
    {
      title: 'Match cost to frequency',
      body:
        'If planners run scenarios daily for quoting, a one-time license (EDGEBIC) or a subscription APS pays for itself quickly. If you need a handful of studies a year, a simulation license or a consulting engagement may be the better spend.'
    },
    {
      title: 'Confirm regional availability',
      body:
        'Siemens, Asprova and the Estonian vendors have European bases; PlanetTogether and Epicor sell in Europe. User Solutions supports UK and EU manufacturers remotely from the US, with GBP or EUR equivalents on request.'
    }
  ],
  faqs: [
    {
      question: 'What are the best what-if scenario planning tools for manufacturing?',
      answer:
        'For schedule-based scenarios, EDGEBIC, PlanetTogether APS, Siemens Opcenter APS (Preactor) and Asprova are the most commonly shortlisted, with Epicor Kinetic for existing Epicor sites. For process and layout simulation, ProModel. MRPeasy and Katana offer lighter what-if capability inside cloud MRP for small shops.'
    },
    {
      question: 'What is the difference between what-if scheduling and simulation?',
      answer:
        'What-if scheduling copies the live schedule, applies a change (new order, extra shift, machine down) and produces a new dated plan. Simulation models the process with statistical variability to test design decisions such as layout, buffer sizes and staffing policy. APS tools do the first; ProModel and peers do the second.'
    },
    {
      question: 'Can what-if tools evaluate whether to accept a new order?',
      answer:
        'Yes, that is the most common use. In EDGEBIC a quote scenario adds the prospective order to a copy of the live schedule, shows the achievable date and the effect on existing commitments, and can be promoted to the live schedule if the customer accepts. Enterprise APS tools follow a similar branch-and-compare pattern.'
    },
    {
      question: 'How fast can a scenario run?',
      answer:
        'Minutes for scheduling-based tools on typical mid-market datasets, and seconds on high-speed engines such as Asprova. Turner Bicycles quoted its largest ever order the same afternoon using the RMDB engine behind EDGEBIC. Simulation runs take longer because they execute many statistical replications.'
    },
    {
      question: 'Do these tools integrate with my ERP?',
      answer:
        'EDGEBIC exchanges data with any ERP through Excel, CSV or database tables. PlanetTogether and Opcenter use packaged connectors; Asprova uses partner-scoped interfaces; Epicor Kinetic scenarios are native. ProModel imports extracts rather than integrating live.'
    },
    {
      question: 'Are these tools available in the UK and Europe?',
      answer:
        'Yes. Siemens Opcenter APS began as Preactor in the UK; Asprova has German and European distributors; MRPeasy and Katana are Estonian; PlanetTogether and Epicor sell across Europe. User Solutions serves UK and EU manufacturers, including Germany, the Netherlands and Ireland, remotely from the US.'
    },
    {
      question: 'What do scenario planning tools cost?',
      answer:
        'EDGEBIC publishes one-time perpetual pricing: $25,000 (APS) and $35,000 (Complete). MRPeasy and Katana publish monthly subscriptions. PlanetTogether, Siemens Opcenter, Asprova, Epicor and ProModel are quote-based; expect implementation or modelling services on top of the license.'
    }
  ],
  relatedLinks: [
    {
      href: Routes.WhatIfAnalysis,
      label: 'What-if analysis for manufacturing',
      description: 'Customer stories and the questions a scenario should answer.'
    },
    {
      href: '/blog/edgebic-what-if-scenarios-explained',
      label: 'What-If Scenarios in EDGEBIC, Explained',
      description: 'Testing the answer before you give it to the customer.'
    },
    {
      href: '/blog/comparing-two-what-if-scenarios-for-a-capacity-decision-edgebic',
      label: 'Comparing two scenarios for a capacity decision',
      description: 'A worked example: add a shift or outsource.'
    },
    {
      href: '/blog/what-is-a-quote-scenario',
      label: 'What is a quote scenario?',
      description: 'Glossary entry with the workflow from copy to promote.'
    },
    {
      href: '/promodel',
      label: 'ProModel simulation',
      description: 'When the question is about process design, not this week\'s orders.'
    },
    {
      href: Routes.CompareProducts,
      label: 'Compare products hub',
      description: 'Head-to-head comparisons with APS vendors and ERPs.'
    }
  ],
  cta: {
    heading: 'Run a what-if on your own order book',
    body:
      'Bring one real question to the demo (a new order, a second shift, a machine outage). We will build the scenario in EDGEBIC live and compare it with your current plan. Free for US, UK and European manufacturers.',
    primaryLabel: 'Request a Free Demo',
    primaryHref: Routes.Contact,
    secondaryLabel: 'See EDGEBIC pricing',
    secondaryHref: Routes.Pricing
  }
};

export default function WhatIfScenarioPlanningToolsManufacturingPage(): React.JSX.Element {
  return <ShortlistPage data={data} />;
}
