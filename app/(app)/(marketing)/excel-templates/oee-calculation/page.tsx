import * as React from 'react';

import {
  ExcelTemplatePage,
  type ExcelTemplatePageData
} from '@/components/marketing/templates/excel-template-page';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Free OEE Calculation Excel Template (2026) — Overall Equipment Effectiveness',
  description:
    'Download a free OEE calculation Excel template with Availability × Performance × Quality formulas pre-built — plus real-world interpretation guidance for manufacturing engineers.',
  path: '/excel-templates/oee-calculation',
  keywords:
    'OEE calculation excel template, overall equipment effectiveness excel, OEE spreadsheet template, OEE calculator excel free, machine OEE tracking excel, OEE dashboard excel template, equipment effectiveness calculator excel'
});

const data: ExcelTemplatePageData = {
  slug: 'oee-calculation',
  h1: 'Free OEE Calculation Excel Template',
  subtitle:
    'A structured Excel workbook with Availability × Performance × Quality formulas pre-built — collect shift data, calculate OEE per machine, and pinpoint which loss category is stealing the most throughput.',
  tldr:
    'A working OEE calculation Excel template plus a free 30-day trial of Resource Manager for Excel (RMX) — the tool manufacturers use when manual shift-data entry can no longer keep pace with real-time equipment performance demands.',
  introParagraphs: [
    'Overall Equipment Effectiveness (OEE) is the single most widely cited metric in manufacturing improvement programs — and also one of the most frequently miscalculated. Most shops track uptime. Fewer track performance rate against ideal cycle time. Almost none consistently track first-pass quality yield at the machine level on a per-shift basis. The result is an OEE number that flatters the operation because two of the three factors are either ignored or estimated. A shop that believes its OEE is 82% when the real figure is 61% is making investment, staffing, and scheduling decisions on bad data.',
    'The formula is deceptively simple: OEE = Availability × Performance × Quality. Availability is the percentage of scheduled time the machine was actually running (planned stops excluded, unplanned stops counted). Performance is actual output versus theoretical maximum output at ideal cycle time — this is where most shops bleed. Quality is first-pass-yield: good parts as a percentage of total parts started, with no rework credit. Multiply all three and you get a number that tells you how efficiently your most critical assets are converting scheduled time into good product.',
    'A world-class OEE benchmark is 85%. Most discrete manufacturers operate in the 55–75% range. The gap between where you are and 85% is not a mystery to be solved — it is three specific loss categories (availability loss, speed loss, quality loss) each with identifiable root causes. This template structures your data collection to make that breakdown visible, shift by shift, machine by machine.'
  ],
  whatsInside: [
    {
      title: 'Shift data entry form',
      description:
        'Per-shift input for scheduled time, planned downtime, unplanned downtime, ideal cycle time, actual output, and rejected/rework parts — the six raw numbers that drive every OEE calculation.'
    },
    {
      title: 'Availability calculator',
      description:
        'Automatically computes run time as scheduled time minus all stops, then divides by scheduled time. Distinguishes planned stops (changeovers, PM) from unplanned stops (breakdowns, waiting for material) so you can allocate improvement effort correctly.'
    },
    {
      title: 'Performance rate calculator',
      description:
        'Compares actual parts produced against theoretical maximum at ideal (nameplate) cycle time. A performance rate below 95% almost always indicates hidden micro-stoppages or speed losses that operators do not log because each event is too short to feel like downtime.'
    },
    {
      title: 'Quality yield calculator',
      description:
        'First-pass yield computed from total parts run versus confirmed good parts. Rework is counted as a loss even if the part eventually ships — rework consumes machine time that could have produced good product.'
    },
    {
      title: 'OEE summary dashboard',
      description:
        'Rolls Availability × Performance × Quality into a single OEE score per machine per shift, with a 4-week trend chart and a benchmark line at 85% so deviation is visually obvious without additional formatting work.'
    },
    {
      title: 'Loss category breakdown',
      description:
        'Six-big-loss waterfall chart: breakdowns, setups and adjustments, idling and minor stoppages, reduced speed, process defects, and reduced yield at startup. Sizes each loss in equivalent minutes per shift so you know which one to attack first.'
    },
    {
      title: 'Multi-machine comparison tab',
      description:
        'Summarizes OEE across all tracked machines in a single ranked view. Useful for monthly management reviews, capital justification, and identifying which asset needs the next PM interval shortened.'
    }
  ],
  howToUseSteps: [
    {
      title: 'Define your machines and ideal cycle times',
      description:
        'On the Machine Master tab, list every asset you want to track. For each one, enter the nameplate cycle time — the rate the machine is designed to run, not the rate it actually runs. If you do not know the nameplate rate, use the engineering estimate or the rate from the last time the machine ran without any constraints. This is your performance baseline and it must be honest; padding it produces a flattering OEE that hides real speed loss.'
    },
    {
      title: 'Set your shift calendar and planned downtime',
      description:
        'On the Shift Calendar tab, enter your scheduled production hours per shift per machine. Then list planned downtime events — changeovers, preventive maintenance windows, scheduled breaks. These are excluded from the availability denominator because you cannot be faulted for time you did not plan to run. Unplanned stops (breakdowns, waiting for material, operator absence) stay in the loss column.'
    },
    {
      title: 'Collect shift data and enter it daily',
      description:
        'At the end of each shift, the operator or supervisor fills in: actual run start/stop time, each unplanned stop event with duration and reason code, actual parts produced, and parts rejected or sent to rework. Five minutes per shift per machine. If this feels like too much, that is a sign the data collection is not being owned — which is the most common OEE implementation failure.'
    },
    {
      title: 'Review the OEE dashboard weekly',
      description:
        'The dashboard tab automatically calculates Availability, Performance, Quality, and OEE for each machine for the current week. Look at the trend lines, not just today\'s number. A machine with 72% OEE and a declining trend needs a different response than a machine with 72% OEE and an improving trend. The six-big-loss waterfall tells you which category is driving the number.'
    },
    {
      title: 'Prioritize improvement using the loss breakdown',
      description:
        'Sort the loss waterfall by minutes lost per week per machine. The largest bar is your first improvement target. If it is breakdown losses, open a corrective maintenance initiative. If it is speed loss (performance rate below 90%), investigate micro-stoppages and operator-controlled speed reductions. If it is quality loss, audit the setup procedure and first-article inspection process. Each category has a different improvement toolkit.'
    },
    {
      title: 'Set improvement targets and track progress monthly',
      description:
        'After your first four weeks of data, you have a baseline. Set a 90-day OEE target for each machine — typically 3–5 percentage points above baseline for a first improvement cycle. Use the multi-machine comparison tab for monthly leadership reviews. A rising OEE trend is the evidence that your improvement program is working; a flat or declining trend means the root cause has not been addressed.'
    }
  ],
  whenToUpgrade: [
    'You are tracking more than 6 machines and manual shift-data entry is creating a one-day data lag that makes the OEE number historical rather than actionable',
    'Your operators are filling in the shift form inconsistently — different reason codes for the same event, estimated rather than actual times — and the resulting OEE data is too noisy to drive decisions',
    'You need OEE data in real time (within minutes of a downtime event) to trigger immediate maintenance response rather than end-of-shift review',
    'You want to feed OEE data automatically into your production schedule so that machines with degraded availability are not over-committed to customer orders',
    'You manage multiple shifts and need supervisors to enter data simultaneously rather than one at a time in a single workbook',
    'Your ERP or MES requires OEE data in a structured format that cannot be maintained by copying from Excel manually',
    'You want to correlate OEE losses with specific work orders, operators, or material lots to identify systemic quality or performance root causes',
    'You are building a capital justification for new equipment and need auditable historical OEE data to quantify the cost of your current asset\'s underperformance'
  ],
  faqs: [
    {
      question: 'Is this OEE calculation Excel template really free?',
      answer:
        'Yes. The template is included with the free 30-day trial of Resource Manager for Excel (RMX) from User Solutions — no credit card required, no obligation. The trial gives you access to all scheduling and capacity planning templates in the library, including this OEE workbook.'
    },
    {
      question: 'What is a good OEE score for a discrete manufacturer?',
      answer:
        'World-class OEE is typically cited as 85% (Availability ~90%, Performance ~95%, Quality ~99.7%). Most discrete manufacturers operate in the 55–75% range. If your OEE comes in above 85% on your first measurement, double-check your ideal cycle time — it is often understated, which inflates the Performance factor artificially.'
    },
    {
      question: 'Should I include planned downtime in my OEE calculation?',
      answer:
        'Standard OEE (as defined by SEMI E10 and the OEE industry standard) excludes planned downtime from the Availability denominator. You are measuring effectiveness during scheduled production time. However, some manufacturers track a separate metric called TEEP (Total Effective Equipment Performance) that includes planned downtime — this gives a true ceiling utilization view. This template calculates standard OEE by default and includes a TEEP column for reference.'
    },
    {
      question: 'How do I handle changeovers in the OEE calculation?',
      answer:
        'Changeovers are planned downtime if they appear in the shift schedule, and unplanned availability losses if they exceed the planned window. In practice: enter the planned changeover duration as scheduled downtime and count any overrun as an availability loss. Many manufacturers also track changeover time separately as a SMED (Single-Minute Exchange of Die) metric because reducing changeover is often the highest-ROI availability improvement available.'
    },
    {
      question: 'Can I use this template for a job shop with highly variable cycle times?',
      answer:
        'Yes, with a modification. For job shops where each work order runs at a different cycle time, use the work-order average cycle time as your ideal cycle time for the Performance calculation on that shift. The template supports a per-shift ideal cycle time override field for exactly this scenario. The OEE number becomes less comparable across shifts but remains valid as an efficiency signal within each shift.'
    },
    {
      question: 'When does it make sense to move from this Excel template to EDGEBI?',
      answer:
        'When you need live OEE dashboards fed from machine data (PLC, MES, or sensor feeds) rather than manual entry, and when you need OEE trends to be visible to multiple stakeholders simultaneously without emailing spreadsheets. EDGEBI from User Solutions connects directly to production data sources and renders OEE dashboards, trend charts, and loss breakdowns in a browser — no manual data entry, no version-control problems, and no data lag.'
    }
  ],
  relatedTemplates: [
    {
      href: '/excel-templates/work-order',
      title: 'Free Work Order Excel Template',
      description:
        'The operational input to OEE tracking — structured work orders give you the job-level routing and cycle time data that makes OEE calculations accurate.'
    },
    {
      href: '/excel-templates/capacity-planning',
      title: 'Free Capacity Planning Excel Template',
      description:
        'OEE-adjusted available hours feed directly into capacity planning — use this template to translate equipment effectiveness into committed production capacity.'
    },
    {
      href: '/excel-templates',
      title: 'All free Excel tools for manufacturers',
      description:
        'Browse the full library of Excel-based scheduling, planning, quality, and operations templates from User Solutions.'
    }
  ]
};

export default function Page(): React.JSX.Element {
  return <ExcelTemplatePage data={data} />;
}
