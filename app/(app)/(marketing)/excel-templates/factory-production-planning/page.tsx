import * as React from 'react';

import {
  ExcelTemplatePage,
  type ExcelTemplatePageData
} from '@/components/marketing/templates/excel-template-page';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Free Factory Production Planning Excel Template (2026): Weekly Plan by Product and Line',
  description:
    'Download a free factory production planning Excel template. Weekly factory plan by product and line, demand vs capacity, material availability check, labour hours, and planned vs actual tracking. Formulas explained with a worked example.',
  path: '/excel-templates/factory-production-planning',
  keywords:
    'factory production planning excel, production planning template excel factory, factory planning spreadsheet, factory production plan template, weekly production plan excel, production planning excel template manufacturing, factory capacity planning excel, planned vs actual production excel',
  modifiedTime: '2026-08-28'
});

const data: ExcelTemplatePageData = {
  slug: 'factory-production-planning',
  h1: 'Free Factory Production Planning Excel Template',
  subtitle:
    'A weekly factory plan in one workbook: what each line builds each week, whether demand fits capacity, whether the material will be there, how many labour hours it takes, and how the plan compared with what actually shipped.',
  tldr:
    'A working factory production planning spreadsheet (weekly plan by product and line, demand vs capacity, material availability check, labour hours, planned vs actual) plus a free 30-day trial of Resource Manager for Excel (RMX), the finite-capacity tool factories move to when the weekly plan has to survive contact with the shop floor.',
  introParagraphs: [
    'A factory production plan answers five questions every week: what are we building, on which line, do we have the capacity, do we have the material, and how did last week go against plan. Most small and mid-sized factories answer those questions in a spreadsheet, and there is nothing wrong with that as long as the spreadsheet actually connects the five answers. The usual failure is five separate tabs maintained by five people: sales keeps a demand sheet, the planner keeps a line schedule, purchasing keeps a shortage list, HR keeps a headcount sheet, and the operations manager builds a planned vs actual chart on Friday afternoon from whatever numbers people remember. This template puts all five on one set of linked sheets so a change to the demand column changes the capacity check, the material check and the labour hours on the same recalc.',
    'The formulas are deliberately plain. Planned hours per product per week = planned quantity x standard hours per unit, so in the Plan sheet =D5*VLOOKUP(A5,Products!A:C,3,FALSE). Line load per week = the SUMIFS of planned hours for every product assigned to that line, =SUMIFS(Plan!H:H,Plan!C:C,$A12,Plan!B:B,B$11). Line capacity = shifts x hours per shift x days x efficiency, entered once per line on the Lines sheet. The capacity flag is =IF(Load>Capacity,"OVER",IF(Load>Capacity*0.9,"TIGHT","OK")). The material check multiplies planned quantity by the bill of materials per-unit usage and compares it with on-hand plus scheduled receipts for that week: =IF(Required>OnHand+Receipts,"SHORT","OK"). Labour hours = planned hours divided by the line crew size, compared with the rostered hours for the week. Planned vs actual is the simplest column of all: actual quantity entered on Friday, attainment = actual / planned.',
    'A worked example: a factory with two lines. Line A (assembly) runs 2 shifts x 8 hours x 5 days at 85% efficiency = 68 hours per week; Line B (packing) runs 1 shift, 34 hours. Week 36 demand: product P100, 400 units at 0.10 h each on Line A (40 h); P200, 250 units at 0.12 h on Line A (30 h); both then pack on Line B at 0.04 h each (26 h). Line A load is 70 h against 68 h capacity, so the flag reads OVER by 2 hours; Line B is OK at 76%. The material check shows P200 needs 250 housings, stock is 180 and the delivery of 200 arrives in week 37, so P200 is SHORT by 70 in week 36. The plan that comes out of the sheet is obvious once the flags are side by side: build 180 of P200 in week 36 (21.6 h, bringing Line A to 61.6 h and clearing the OVER flag) and carry 70 into week 37 when the housings land. Without the linked sheets, the planner sees the capacity problem and purchasing sees the material problem, and neither sees that one fix solves both.',
    'Excel carries this model comfortably for a factory with a handful of lines and a few dozen products planned in weekly buckets. It stops being trustworthy when the buckets need to be days or shifts, when products share lines and the sequence matters (changeovers, allergen or colour sequences, tooling), or when a late material delivery has to push a job and every downstream job with it. That is finite-capacity scheduling rather than production planning, and the handoff is described at the end of this page.'
  ],
  whatsInside: [
    {
      title: 'Products sheet',
      description:
        'One row per product or SKU: product code, description, default line, standard hours per unit, crew size, and per-unit material usage for the constrained components. Standard hours are the single most important input in the workbook; if they are guesses, every downstream flag is a guess too.'
    },
    {
      title: 'Lines sheet (capacity by line by week)',
      description:
        'Each production line with shifts per day, hours per shift, days per week, efficiency and a 13-week calendar of exceptions (shutdown, maintenance, reduced shifts). Weekly capacity in hours is calculated here and referenced by the capacity check.'
    },
    {
      title: 'Weekly Plan grid (product by week)',
      description:
        'The heart of the template: planned quantity for each product in each of 13 weeks, with the assigned line. Planned hours, line load and labour hours are all derived from this grid, so the planner only ever types quantities.'
    },
    {
      title: 'Demand vs Capacity check',
      description:
        'Line load in hours versus line capacity per week, with a three-state flag (OK, TIGHT above 90%, OVER above 100%) and conditional formatting. Reads across the plan grid so moving quantity between weeks updates the flags instantly.'
    },
    {
      title: 'Material Availability check',
      description:
        'For each constrained component: required quantity from the plan, on-hand stock, scheduled receipts by week, projected balance and a SHORT flag where the plan consumes more than will be available. Not a full MRP run; it covers the ten or twenty components that actually stop a line.'
    },
    {
      title: 'Labour Hours sheet',
      description:
        'Planned hours per line divided by crew size, compared with rostered operator hours per week. Shows where the plan needs overtime or agency labour before the week starts, and where a line is rostered for more hours than the plan needs.'
    },
    {
      title: 'Planned vs Actual tracker',
      description:
        'Actual quantity per product per week entered at week end; attainment percentage, cumulative variance and a 13-week trend line. This is the sheet management asks for, and it only works if the planned column is frozen when the week starts rather than edited to match.'
    }
  ],
  howToUseSteps: [
    {
      title: 'Load the product master with real standard hours',
      description:
        'Enter every product you expect to plan in the next quarter with its default line, standard hours per unit and crew size. Take standard hours from routings if you have them, otherwise from timed observation of a normal run. If a product runs on more than one line at different rates, list it twice with a suffix. This step is where the plan is won or lost.'
    },
    {
      title: 'Set line capacity and the 13-week calendar',
      description:
        'On the Lines sheet, enter the shift pattern for each line and a realistic efficiency (80 to 85% for most assembly and packing lines). Then mark the calendar: shutdown weeks at zero, maintenance weeks reduced, and any week where a line runs an extra shift. UK and EU factories should mark bank holidays and public holidays per site here.'
    },
    {
      title: 'Type demand into the Weekly Plan grid',
      description:
        'Enter the quantity of each product you intend to build in each week, using firm orders plus forecast. Start from customer due dates and place quantity in the week before the ship week. The grid calculates planned hours per product and rolls them up to line load automatically.'
    },
    {
      title: 'Clear the capacity flags',
      description:
        'Open the Demand vs Capacity sheet. Any OVER cell means that line cannot build what is planned in that week. Move quantity earlier (build ahead if material and storage allow), later (if the customer date allows), or to an alternate line. Aim for TIGHT rather than OVER in peak weeks and OK elsewhere; a plan that is OVER in three weeks out of thirteen is not a plan, it is a wish.'
    },
    {
      title: 'Run the material check and reconcile with purchasing',
      description:
        'Enter on-hand stock and scheduled receipts for the constrained components. Any SHORT flag is a week where the plan consumes material that will not have arrived. Either pull the delivery in, push the build out, or split the build across two weeks as in the worked example. Share the SHORT list with purchasing on the same day; this is the conversation the template exists to make easy.'
    },
    {
      title: 'Freeze the plan, then record actuals at week end',
      description:
        'Once the flags are clear, copy the planned quantities for the coming week into the Planned vs Actual sheet as values so they cannot drift. On Friday, enter actual quantities built. Attainment below 90% for two consecutive weeks on the same line usually means the standard hours or the efficiency factor are wrong, not that the operators are slow; fix the input rather than the plan.'
    }
  ],
  whenToUpgrade: [
    'The weekly bucket is too coarse: customers want day-level promise dates, and a plan that says "week 36" cannot tell them Tuesday or Thursday',
    'Products share lines and the sequence matters (colour, allergen, tooling or size changeovers) so the same 70 hours of load can fit or not fit depending on the order it runs in, which a bucket total cannot express',
    'A late material delivery has to push one job and every job behind it on that line, and the template only tells you the week is SHORT, not which orders move and by how much',
    'You have more than about 5 lines or 50 active products and the 13-week grid has become too wide and too tall for anyone to review in a meeting',
    'Two planners each maintain their own copy and the factory no longer has one plan',
    'The ERP already holds orders, routings and stock, and re-typing them into the Plan and Material sheets every Monday is the step that gets skipped when the week is busy',
    'Planned vs actual attainment sits below 85% for a month and nobody can say whether capacity, material or sequencing caused it because the spreadsheet treats them as separate flags',
    'Management asks "what if we take this new contract" and the honest answer needs the whole plan re-sequenced rather than a few hours added to a load total'
  ],
  faqs: [
    {
      question: 'Is this factory production planning Excel template free?',
      answer:
        'Yes. The template comes with the free 30-day trial of Resource Manager for Excel (RMX) from User Solutions: no credit card and no obligation. RMX takes the same products, lines, plan and material inputs and adds finite-capacity sequencing, so a material delay or a capacity overload re-plans the affected orders rather than only raising a flag.'
    },
    {
      question: 'What is the difference between a factory production plan and a production schedule?',
      answer:
        'A production plan sets quantities by product, line and week and checks them against capacity and material; it answers "what and how much". A production schedule sequences individual jobs on individual machines with start and finish times; it answers "in what order and when". This template is a production plan. When you need the sequence, use the production schedule template or a finite-capacity scheduler.'
    },
    {
      question: 'How does the demand vs capacity check work?',
      answer:
        'Planned quantity times standard hours per unit gives planned hours per product; a SUMIFS totals those hours by line and week; line capacity is shifts times hours per shift times days times efficiency. The flag is =IF(Load>Capacity,"OVER",IF(Load>Capacity*0.9,"TIGHT","OK")). In the worked example on this page Line A shows 70 hours of load against 68 hours of capacity, so it is flagged OVER by 2 hours.'
    },
    {
      question: 'Is the material availability check a full MRP?',
      answer:
        'No. It is a single-level check on the components you choose to track: required quantity from the plan against on-hand stock plus scheduled receipts by week. It deliberately covers the ten or twenty parts that stop lines rather than the full bill of materials. For a full time-phased MRP explosion use the MRP Excel template, and for MRP integrated with finite scheduling use RMX or RMDB.'
    },
    {
      question: 'How do I use the planned vs actual sheet properly?',
      answer:
        'Freeze the planned quantities as values before the week starts, then enter actuals at week end and let attainment calculate. Never edit the planned column after Monday; if the plan changes mid-week, record it as a replan in the notes column. Attainment consistently below 90% on one line almost always points to wrong standard hours or efficiency, which you fix on the Products or Lines sheet.'
    },
    {
      question: 'Can I plan in days instead of weeks?',
      answer:
        'The grid can be relabelled to days, but daily buckets across 13 weeks means 65 columns and the capacity and material checks become hard to read. More importantly, at day level the order jobs run in starts to matter, and a bucket total cannot represent sequence. If you need daily plans, that is the signal to move to finite-capacity scheduling.'
    }
  ],
  relatedTemplates: [
    {
      href: '/excel-templates/production-schedule',
      title: 'Free Production Schedule Excel Template',
      description:
        'Turn the weekly factory plan into a sequenced schedule of jobs against work centres with a daily Gantt view.'
    },
    {
      href: '/excel-templates/mrp',
      title: 'Free MRP Excel Template',
      description:
        'The full time-phased material requirements calculation when the single-level material check in this template is no longer enough.'
    },
    {
      href: '/finite-capacity-scheduling-software',
      title: 'Finite Capacity Scheduling Software',
      description:
        'When the plan needs to be sequenced at day and shift level and re-planned when material slips, this is the tool the template hands off to.'
    }
  ]
};

export default function Page(): React.JSX.Element {
  return <ExcelTemplatePage data={data} />;
}
