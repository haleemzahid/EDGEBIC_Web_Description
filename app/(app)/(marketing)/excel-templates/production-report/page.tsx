import * as React from 'react';

import {
  ExcelTemplatePage,
  type ExcelTemplatePageData
} from '@/components/marketing/templates/excel-template-page';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Free Production Report Excel Template (2026) — Daily & Weekly for Manufacturers',
  description:
    'Download a free production report Excel template for daily output tracking, shift performance, and KPI reporting — built for real manufacturing floors, not generic dashboards.',
  path: '/excel-templates/production-report',
  keywords:
    'production report excel template, daily production report excel, manufacturing production report template, factory daily report excel, production output report excel, shift production report template, weekly production report excel'
});

const data: ExcelTemplatePageData = {
  slug: 'production-report',
  h1: 'Free Production Report Excel Template — Daily & Weekly',
  subtitle:
    'A manufacturing production report workbook covering daily output, shift performance, downtime logging, and weekly KPI roll-ups — structured so a production manager can complete it in under 10 minutes per shift.',
  tldr:
    'A working production report Excel template plus a 30-day trial of Resource Manager for Excel (RMX) — the scheduling and production tracking tool manufacturers use when daily reporting becomes too slow or too stale to drive real decisions.',
  introParagraphs: [
    'A production report is the pulse check of your manufacturing floor. It tells management what actually happened versus what was planned: how many units each line or workcenter produced, how many hours were lost to downtime, whether the shift met its on-time delivery commitments, and where the biggest gaps between actual and target performance are accumulating. Without a consistent reporting discipline, the same problems repeat week after week because nobody has clean data showing the pattern.',
    'Most small manufacturers start production reporting in Excel because the cost of entry is zero and the flexibility is unlimited. A well-structured Excel production report captures everything that matters at the shift level: planned output, actual output, scrap count, downtime events with reason codes, and OTD performance. The weekly roll-up tab aggregates shift data into the KPI summary that goes to ownership or the production meeting. This template gives you that structure without having to build it from scratch.',
    'The challenge with Excel-based production reporting is the data collection step. Someone has to fill in the form on the floor — either a supervisor at end of shift, or an operator during a lull. If the form is cumbersome, it will not get filled out consistently. If it is not filled out consistently, the data cannot be trusted. This template is designed to be fast to complete: each daily report tab has fewer than 20 input cells per line or workcenter. The formulas do the rest. If reporting still takes more than 10 minutes per shift, it is a signal that the form is not the right tool anymore — real-time production tracking software is.'
  ],
  whatsInside: [
    {
      title: 'Daily shift report tab',
      description:
        'Per workcenter or production line: planned units, actual units produced, good units (net of scrap), scrap count, scrap rate percentage, planned hours, actual hours worked, and efficiency percentage. One row per workcenter per shift, auto-dated.'
    },
    {
      title: 'Downtime log',
      description:
        'Structured downtime capture with start time, end time, total minutes lost, affected workcenter, and reason code (breakdown, changeover, material shortage, quality hold, operator absence, planned maintenance). Reason codes feed the Pareto chart automatically.'
    },
    {
      title: 'Downtime Pareto chart',
      description:
        'Auto-generated Pareto of downtime minutes by reason code, updated daily. This single chart typically identifies 80% of production losses within two weeks of consistent use — the pattern it reveals is what drives targeted improvement decisions.'
    },
    {
      title: 'On-time delivery tracker',
      description:
        'Per job or order number: promised ship date, actual ship date, on-time or late flag, and days early or late. Weekly OTD percentage calculated automatically and trended month-to-date.'
    },
    {
      title: 'Weekly KPI roll-up dashboard',
      description:
        'Aggregates all daily shift data into a weekly summary: total units produced, overall equipment effectiveness (OEE) proxy, scrap rate, downtime hours, and OTD percentage. Includes week-over-week comparison and a traffic-light status column against each KPI target.'
    },
    {
      title: 'Monthly trend charts',
      description:
        'Line charts showing 12-week trends for output, scrap rate, downtime, and OTD. Updated automatically as daily data accumulates. Designed to be screenshot-ready for monthly management reporting without additional formatting.'
    }
  ],
  howToUseSteps: [
    {
      title: 'Configure your workcenter list',
      description:
        'On the Setup tab, list your production lines, cells, or workcenters and assign each a capacity (units per hour or units per shift). This populates the dropdown on the daily report tab and drives the planned output calculation automatically.'
    },
    {
      title: 'Set your KPI targets',
      description:
        'Also on the Setup tab, enter your targets: OTD percentage (e.g. 95%), scrap rate ceiling (e.g. 2%), OEE target (e.g. 75%), and minimum daily output per line. These feed the traffic-light status indicators on the weekly dashboard.'
    },
    {
      title: 'Complete the daily shift report at end of each shift',
      description:
        'After each shift, the supervisor fills in actual units produced, scrap count, and downtime events. The form is intentionally minimal — 15-20 cells per shift. Actual hours and efficiency percentage calculate automatically. The downtime Pareto updates as soon as you save.'
    },
    {
      title: 'Record OTD outcomes as orders ship',
      description:
        'When an order ships, log the promised date and actual ship date in the OTD Tracker tab. One row per shipment. The weekly OTD percentage recalculates automatically and feeds the dashboard.'
    },
    {
      title: 'Review the weekly roll-up in your production meeting',
      description:
        'Open the Weekly Dashboard tab on Monday morning before the production meeting. It summarizes the prior week\'s performance across all KPIs with week-over-week change highlighted. Use the Pareto and trend charts to guide the improvement discussion — not anecdote.'
    }
  ],
  whenToUpgrade: [
    'Shift supervisors are spending more than 15 minutes per shift filling in the report — the overhead of manual data entry is consuming the time that should go to floor supervision',
    'Reports are completed hours after the shift ends because the supervisor is too busy during the shift, meaning the data is already stale when management sees it',
    'You have more than 3 production lines or workcenter groups and the single workbook becomes unwieldy to navigate',
    'The weekly KPI roll-up requires manual copy-paste from multiple department files — one workbook per cell or department that must be consolidated by hand',
    'You need real-time visibility into output counts during the shift, not just an end-of-shift summary — so floor supervisors can intervene while there is still time to recover',
    'Downtime root-cause analysis requires cross-referencing three or more separate spreadsheets (maintenance log, production log, quality hold log) to piece together a complete picture',
    'Management is asking for production data ad-hoc during the day, not just in the weekly report, and there is no live view to point them to',
    'Your production scheduling system (if you have one) is separate from your reporting system, so planned vs. actual comparisons require manual work every time'
  ],
  faqs: [
    {
      question: 'Is this production report template really free?',
      answer:
        'Yes. The template ships with the free 30-day trial of Resource Manager for Excel (RMX). No credit card or sign-up required. RMX adds real-time scheduling and capacity planning on top of the reporting structure in the template.'
    },
    {
      question: 'What is OEE and does this template calculate it?',
      answer:
        'OEE (Overall Equipment Effectiveness) is the product of Availability × Performance × Quality. It is the single most widely used metric for manufacturing productivity. The template calculates an OEE proxy using the data you enter: availability from downtime vs. planned hours, performance from actual vs. planned output rate, and quality from good units vs. total units produced. The proxy is accurate if your data is accurate.'
    },
    {
      question: 'Can I customize the downtime reason codes?',
      answer:
        'Yes. The reason code list on the Setup tab is fully editable. The standard template ships with 8 common codes (breakdown, changeover, material shortage, quality hold, operator absence, planned maintenance, trial run, no demand). Add, remove, or rename codes to match your floor\'s language. The Pareto chart updates automatically when codes change.'
    },
    {
      question: 'How many shifts per day does the template support?',
      answer:
        'The template supports up to 3 shifts per day (day, evening, night). Each shift gets its own row per workcenter on the daily report tab. The weekly roll-up aggregates all shifts automatically. If you run a single-shift operation, the extra rows simply stay blank and do not affect calculations.'
    },
    {
      question: 'Can I share this template with multiple supervisors who fill it in simultaneously?',
      answer:
        'Shared Excel files can be edited by multiple users using Excel\'s shared workbook feature or via SharePoint/OneDrive with co-authoring enabled. However, simultaneous editing by multiple users on the same daily tab frequently causes save conflicts and formula corruption. For more than 2 concurrent users, the template becomes unreliable — that is the point to look at dedicated production tracking software.'
    },
    {
      question: 'What is the difference between a production report and a production schedule?',
      answer:
        'A production schedule is forward-looking: it plans what will be produced, on which workcenter, on which day, to meet which customer orders. A production report is backward-looking: it records what was actually produced, how much downtime occurred, and how actual performance compared to the plan. The two complement each other — you need the schedule to set the "planned" column in the report, and you need the report data to improve future schedule accuracy.'
    }
  ],
  relatedTemplates: [
    {
      href: '/excel-templates/production-schedule',
      title: 'Free Production Schedule Excel Template',
      description:
        'The forward-looking counterpart to your production report — plan what to build on each workcenter so the planned column in the report means something.'
    },
    {
      href: '/excel-templates/gantt-chart',
      title: 'Free Manufacturing Gantt Chart Excel Template',
      description:
        'Visualize your production schedule by job and workcenter on a timeline — useful for communicating the plan before the daily report captures actuals.'
    },
    {
      href: '/excel-templates',
      title: 'All free Excel tools for manufacturers',
      description:
        'Browse the full library of Excel-based scheduling, planning, quality, and operations templates for small manufacturers.'
    }
  ]
};

export default function Page(): React.JSX.Element {
  return <ExcelTemplatePage data={data} />;
}
