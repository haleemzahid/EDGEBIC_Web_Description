import * as React from 'react';

import {
  ExcelTemplatePage,
  type ExcelTemplatePageData
} from '@/components/marketing/templates/excel-template-page';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Free Multi-Shift Capacity Planning Excel Template (2026): 2-Shift and 3-Shift Work Centre Capacity',
  description:
    'Download a free multi-shift capacity planning Excel template. Model 2-shift and 3-shift capacity per work centre, shift calendars, overtime, weekend shifts, weekly capacity vs load, and an automatic bottleneck flag. Worked example and formulas included.',
  path: '/excel-templates/multi-shift-capacity-planning',
  keywords:
    'multi-shift capacity planning excel template, shift capacity planning spreadsheet, 3 shift production schedule template excel, shift capacity planning template UK, 2 shift capacity planning excel, work centre capacity planning spreadsheet, multi shift production planning excel, capacity vs load excel template, three shift capacity model excel',
  modifiedTime: '2026-08-28'
});

const data: ExcelTemplatePageData = {
  slug: 'multi-shift-capacity-planning',
  h1: 'Free Multi-Shift Capacity Planning Excel Template',
  subtitle:
    'A capacity planning workbook built for plants that run two or three shifts: shift calendars per work centre, overtime and weekend shift hours, weekly capacity versus load, and an automatic bottleneck flag. Every formula is explained in plain words.',
  tldr:
    'A working multi-shift capacity planning spreadsheet (2-shift and 3-shift models, shift calendars, overtime, weekend shifts, capacity vs load per week, bottleneck flag) plus a free 30-day trial of Resource Manager for Excel (RMX), the tool UK, EU and US manufacturers move to when a static shift capacity template can no longer answer what-if questions.',
  introParagraphs: [
    'Single-shift capacity planning is easy: 8 hours a day, 5 days a week, 40 hours per work centre. The moment a plant adds a second or third shift the arithmetic stops being uniform. The CNC cell runs three shifts, the paint line runs two, assembly runs one shift plus Saturday overtime, and the shift pattern changes over bank holidays and summer shutdown. A capacity template that assumes the same hours for every work centre every week will overstate capacity where you run one shift and understate it where you run three, and the bottleneck it points to will be the wrong one. This template models capacity per work centre per week from the actual shift calendar, so the number you compare against load is the number the floor can really deliver.',
    'The core formula is simple to state. Weekly capacity for a work centre equals the number of shifts scheduled that week multiplied by hours per shift, minus planned downtime (breaks, changeovers, preventive maintenance), plus any overtime and weekend shift hours, all multiplied by the expected efficiency (OEE or a utilisation factor). In Excel terms, for a row where column C is shifts per week, D is hours per shift, E is planned downtime hours, F is overtime hours, G is weekend shift hours and H is efficiency, the available hours formula is =(C2*D2-E2+F2+G2)*H2. Load for the same week is the sum of routed hours for every job due through that work centre, typically a SUMIFS against the order book: =SUMIFS(Load!F:F,Load!B:B,A2,Load!C:C,B2) where A2 is the work centre and B2 is the week number. The bottleneck flag then compares the two: =IF(Load>Capacity,"BOTTLENECK",IF(Load>Capacity*0.9,"WATCH","OK")).',
    'A worked example makes the mechanics concrete. Three work centres, two shifts each of 7.5 productive hours (8 hours less a 30-minute break), 5 days a week, efficiency 85%. WC-10 Laser: 10 shifts x 7.5 h = 75 h, less 5 h changeovers, times 0.85 = 59.5 h available. WC-20 Press Brake: same calendar, 59.5 h available. WC-30 Weld: same calendar plus a Saturday shift of 7.5 h, so (75 - 5 + 7.5) x 0.85 = 65.9 h available. Now load the week: Laser 48 h, Press Brake 71 h, Weld 60 h. The template flags WC-20 Press Brake as the bottleneck at 119% of capacity, WC-30 Weld as WATCH at 91%, and WC-10 Laser as OK at 81%. The fix is visible in the same sheet: add a Saturday shift to the press brake (+6.4 h effective) and it is still 5 h short, so either move 5 h of bending into the following week or run one extra night shift. That is exactly the decision a planner needs to see on Monday morning rather than discover on Thursday.',
    'Everything above is well within what Excel does reliably, which is why UK, EU and US job shops and fabricators still run shift capacity planning in a spreadsheet. Where Excel stops being reliable is scale and what-if: past roughly 20 work centres with individual shift calendars, or when the question becomes "if we move this order forward and add a night shift on weld, what happens to every other job", the spreadsheet cannot re-sequence work, it can only re-total hours. That boundary, and the handoff to a finite-capacity tool, is covered further down the page.'
  ],
  whatsInside: [
    {
      title: 'Work Centre master (columns A to H)',
      description:
        'One row per work centre: ID, description, default shift pattern (1, 2 or 3 shifts), hours per shift, planned downtime per week, efficiency factor and number of parallel machines or operators. Every capacity formula reads from this sheet, so a change to the shift pattern on WC-20 flows through all 13 weeks automatically.'
    },
    {
      title: 'Shift Calendar grid (work centre by week)',
      description:
        'A 13-week grid where each cell holds the number of shifts scheduled for that work centre in that week. Reduce a cell to 8 for a bank holiday week, set it to 0 for shutdown, raise it to 15 for a 3-shift push. The grid is the single place a shift change is entered, and it is deliberately separate from the formulas so a planner cannot overwrite a calculation by accident.'
    },
    {
      title: 'Overtime and Weekend Shifts sheet',
      description:
        'Two parallel grids, one for planned overtime hours per week and one for Saturday and Sunday shift hours per week. Keeping these separate from the base shift calendar lets you see how much of your capacity is base versus premium-rate, which is the number finance asks for when overtime spend climbs.'
    },
    {
      title: 'Available Capacity sheet',
      description:
        'Calculated per work centre per week: =(Shifts*HoursPerShift-Downtime+Overtime+Weekend)*Efficiency*ParallelUnits. Shown in hours with a units-per-week equivalent if you enter a standard rate. Locked cells; all inputs come from the three sheets above.'
    },
    {
      title: 'Load sheet (order book by routing)',
      description:
        'Columns: order number, part, due week, work centre, routed hours (setup plus run time x quantity). The Capacity vs Load sheet totals this with SUMIFS by work centre and week. Paste an export from your ERP or job list; the sheet only needs those five columns.'
    },
    {
      title: 'Capacity vs Load per week, with bottleneck flag',
      description:
        'The output view: capacity, load, load percentage and a three-state flag (OK under 90%, WATCH 90 to 100%, BOTTLENECK over 100%) for every work centre and week. Conditional formatting colours the grid so the constraint is visible without reading a single number.'
    },
    {
      title: 'Shift scenario switches',
      description:
        'A small control block where you can toggle a third shift on any work centre, add a standing Saturday shift, or change hours per shift for a whole quarter, and watch the bottleneck flags move. This is the simple what-if that Excel handles well: change hours, re-total. It does not re-sequence jobs, which is the limit discussed below.'
    }
  ],
  howToUseSteps: [
    {
      title: 'Enter every work centre and its normal shift pattern',
      description:
        'On the Work Centre master, list each constrained resource: machine group, cell, line or labour pool. For each one enter the default number of shifts per day, hours per shift, weekly planned downtime and a realistic efficiency. Use measured OEE if you have it; 80 to 85% is a defensible default for machining and fabrication, lower for paint and assembly with heavy manual content. If two identical machines share a queue, enter 1 work centre with 2 parallel units rather than 2 separate rows.'
    },
    {
      title: 'Build the 13-week shift calendar',
      description:
        'Fill the Shift Calendar grid with shifts per week for each work centre. Start from the default (2 shifts x 5 days = 10, 3 shifts x 5 days = 15) then adjust for holidays, shutdown, training days and planned maintenance weeks. UK planners: remember Easter, the early and late May bank holidays, August bank holiday and the Christmas week; EU planners: national holidays differ by site, so keep one calendar per plant. This is the sheet to review every Monday.'
    },
    {
      title: 'Add overtime and weekend shifts where they are already committed',
      description:
        'Only enter overtime and weekend hours you have actually agreed with the shift managers, not hours you hope to get. The template treats these as capacity, so optimistic entries hide bottlenecks. If overtime is a lever you want to test rather than a commitment, use the scenario switches in step 6 instead.'
    },
    {
      title: 'Load the order book',
      description:
        'Paste your open orders into the Load sheet with due week, work centre and routed hours. If your routings give setup and run per piece, routed hours = setup + (run per piece x quantity). Orders that touch three work centres get three rows. Load is placed in the week the operation is due, which is a simple backward-scheduling assumption; it is good enough to find bottlenecks, and it is the assumption that breaks first when you need real sequencing.'
    },
    {
      title: 'Read the Capacity vs Load grid',
      description:
        'Any cell flagged BOTTLENECK is a week where routed hours exceed shift capacity on that work centre. Look across the row: a single red week can usually be solved by pulling work into the green week before it. A row that is red for four consecutive weeks is a structural shortfall that needs a shift, a machine or subcontracting, not a reshuffle. WATCH cells at 90 to 100% are where a single machine breakdown turns into a late delivery.'
    },
    {
      title: 'Test shift changes with the scenario switches',
      description:
        'Toggle a third shift on the bottleneck work centre, or a Saturday shift, and check whether the flag clears. Because the template re-totals hours rather than re-sequencing jobs, it will tell you whether the hours exist, not whether the jobs can be sequenced through setups and material arrivals to use them. When the answer you need is the second one, that is the point to move to a finite-capacity scheduler (see the next section).'
    }
  ],
  whenToUpgrade: [
    'You have more than about 20 work centres, each with its own shift calendar, and maintaining the shift grid, overtime grid and load paste every week takes longer than the planning decisions it supports',
    'The question has changed from "do we have enough hours on weld in week 34" to "if we add a night shift on weld and pull order 4471 forward, which other jobs go late": Excel can re-total hours but it cannot re-sequence operations through setups, material dates and shift boundaries',
    'Operations span shift changes and the spreadsheet places all 14 routed hours of a job in one week when in reality it starts on Thursday night shift and finishes Monday day shift, so the week-bucket view is systematically wrong at the edges',
    'You run 3 shifts on some work centres and 1 on others, and jobs that cross from a 3-shift cell into a 1-shift cell keep arriving with nowhere to go, which is a sequencing problem the week bucket cannot see',
    'Shift patterns rotate (4-on-4-off, continental, 6-on-3-off) and the "shifts per week" cell becomes a fraction that nobody trusts',
    'Two or more planners each keep their own copy of the shift capacity template and the plant no longer has a single answer to what capacity is next week',
    'Overtime decisions need to be costed against late delivery, and the spreadsheet has no notion of due-date priority, only total hours',
    'Your ERP holds the routings and the order book, and re-pasting the Load sheet every week is the step that keeps getting skipped'
  ],
  faqs: [
    {
      question: 'Is this multi-shift capacity planning Excel template free?',
      answer:
        'Yes. The template is provided with the free 30-day trial of Resource Manager for Excel (RMX) from User Solutions: no credit card, no obligation. RMX extends the same shift calendar, overtime and capacity vs load model with finite-capacity sequencing, so a shift change re-plans every affected job rather than only re-totalling hours.'
    },
    {
      question: 'How do I calculate capacity for a 3-shift work centre in Excel?',
      answer:
        'Multiply shifts per week by productive hours per shift, subtract planned downtime, add committed overtime and weekend shift hours, then multiply by an efficiency factor. For a 3-shift, 5-day work centre with 7.5 productive hours per shift, 6 hours of weekly changeovers and 85% efficiency: (15 x 7.5 - 6) x 0.85 = 90.5 available hours. In the template that is the formula =(C2*D2-E2+F2+G2)*H2 on the Available Capacity sheet.'
    },
    {
      question: 'Should overtime count as capacity?',
      answer:
        'Only overtime that has already been agreed should be entered as capacity. Treat possible overtime as a scenario, not a plan. The template keeps overtime and weekend shift hours on a separate sheet from the base shift calendar so you can see how much of your weekly capacity depends on premium-rate hours, which is the figure that matters when overtime spend is challenged.'
    },
    {
      question: 'How does the bottleneck flag work?',
      answer:
        'For each work centre and week the template divides routed load hours by available capacity hours. Under 90% shows OK, 90 to 100% shows WATCH, over 100% shows BOTTLENECK. The formula is =IF(Load>Capacity,"BOTTLENECK",IF(Load>Capacity*0.9,"WATCH","OK")). The 90% threshold is editable; plants with unstable equipment often lower it to 85%.'
    },
    {
      question: 'Does the template handle rotating shift patterns like 4-on-4-off?',
      answer:
        'Partially. Because the calendar grid holds shifts per week, a rotating pattern is entered as the average shifts that fall in each week (a 4-on-4-off pattern with two crews on 12-hour shifts averages 14 shifts per fortnight, entered as 7 per week). That is accurate for totals but loses the day-level detail. If day-level shift patterns matter for sequencing, that is one of the signs you have outgrown the spreadsheet.'
    },
    {
      question: 'Is this template suitable for UK and EU manufacturers?',
      answer:
        'Yes. The template is unit-neutral and calendar-neutral: enter hours in the local shift length (7.5, 8, 10 or 12 hour shifts), set bank holidays and shutdown weeks in the shift calendar, and use whichever week numbering your plant follows. The worked example on this page uses a UK-style 2-shift, 7.5-productive-hour pattern; US plants typically use 8 productive hours and 10-hour 4-day weeks, and both drop straight into the same sheet.'
    }
  ],
  relatedTemplates: [
    {
      href: '/excel-templates/capacity-planning',
      title: 'Free Capacity Planning Excel Template',
      description:
        'The single-shift version of this model: work-centre hours against demand over 13 weeks with headcount planning.'
    },
    {
      href: '/excel-templates/shift-schedule',
      title: 'Free Shift Schedule Excel Template',
      description:
        'Plan which operators cover which shifts once this template has told you how many shifts each work centre needs.'
    },
    {
      href: '/multi-shift-manufacturing-scheduling-software',
      title: 'Multi-Shift Manufacturing Scheduling Software',
      description:
        'When the shift calendar needs to drive real job sequencing across 2 and 3 shifts, this is the finite-capacity tool the template hands off to.'
    }
  ]
};

export default function Page(): React.JSX.Element {
  return <ExcelTemplatePage data={data} />;
}
