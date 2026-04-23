import * as React from 'react';

import {
  ExcelTemplatePage,
  type ExcelTemplatePageData
} from '@/components/marketing/templates/excel-template-page';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Free Master Production Schedule (MPS) Excel Template — Manufacturer-Built',
  description:
    'Download a free master production schedule Excel template (MPS template) that connects sales forecasts to production runs. Built by manufacturers with 35+ years of MPS experience.',
  path: '/excel-templates/master-production-schedule',
  keywords:
    'master production schedule excel template, MPS excel template, master production schedule template, MPS template excel, manufacturing MPS spreadsheet, master production schedule example, MPS planning excel'
});

const data: ExcelTemplatePageData = {
  slug: 'master-production-schedule',
  h1: 'Free Master Production Schedule (MPS) Excel Template',
  subtitle:
    'A practical Excel template for building a real master production schedule — connecting sales forecasts, on-hand inventory, and production runs into a single rolling plan you can actually execute.',
  tldr:
    'A working MPS Excel template plus a 30-day trial of Resource Manager for Excel (RMX) — the Excel-based MPS and scheduling tool used by manufacturers when their spreadsheet MPS becomes a maintenance burden.',
  introParagraphs: [
    'The master production schedule (MPS) is the bridge between what sales wants to sell and what production can actually build. It lives between sales forecasts on one side and detailed shop-floor scheduling on the other. A good MPS answers three questions for every product family, every week: what are we going to build, how many, and when does it need to be ready?',
    'Most small and mid-size manufacturers do not run a formal MPS process. They run sales orders directly into work orders and hope the math works out. That works fine until demand becomes lumpy, until lead times stretch beyond the customer ordering window, or until you start carrying serious finished-goods inventory. At that point, the absence of an MPS becomes the root cause of every late delivery and every expedited customer call.',
    'This template gives you a real MPS in Excel — not a stripped-down planning grid, but a working sheet that links forecast, on-hand, planned production, and projected available balance the way the textbook describes it. We have been helping manufacturers build and operate MPS processes since 1991. The template is the starting point. Resource Manager for Excel (RMX) is what most teams move to once the spreadsheet starts breaking.'
  ],
  whatsInside: [
    {
      title: 'Time-phased planning grid (12-week rolling)',
      description:
        'Per product, week-by-week columns showing forecast, customer orders, on-hand, scheduled receipts, planned MPS quantities, and projected available balance.'
    },
    {
      title: 'Demand input — forecast and orders',
      description:
        'Separate rows for forecast vs actual customer orders so you can see how much of next month is committed vs predicted.'
    },
    {
      title: 'On-hand and scheduled receipts',
      description:
        'Current inventory plus already-scheduled production, so the MPS quantity calculation only adds what is genuinely needed.'
    },
    {
      title: 'Lot-sizing rules',
      description:
        'Choose lot-for-lot, fixed lot size, period order quantity, or minimum batch — the same rules supported by every real MRP/MPS system.'
    },
    {
      title: 'ATP (available-to-promise) calculator',
      description:
        'Rolling availability of each product so sales can answer "when can we ship 200 of these?" without calling production.'
    },
    {
      title: 'Sample data for two product families',
      description:
        'A working example with realistic demand patterns so you can see every formula in action before swapping in your data.'
    }
  ],
  howToUseSteps: [
    {
      title: 'List your MPS items',
      description:
        'On the MPS Items tab, enter every product (or product family) you want to plan at the master schedule level. Most manufacturers MPS at the finished-good or end-item level; some MPS at a sub-assembly level for highly configurable products.'
    },
    {
      title: 'Enter forecast and on-hand',
      description:
        'For each item, enter the demand forecast by week and your current on-hand inventory. The template handles up to 12 rolling weeks; copy the structure for longer horizons.'
    },
    {
      title: 'Add scheduled receipts',
      description:
        'List any production orders or purchase orders already scheduled to receive inventory. These reduce the calculated MPS quantity for the same week.'
    },
    {
      title: 'Set the lot-sizing rule per item',
      description:
        'Choose how the template suggests batch sizes — lot-for-lot for low-volume custom items, fixed lot size for standard products, period-order-quantity for items with high setup costs.'
    },
    {
      title: 'Review the projected available balance',
      description:
        'The template auto-calculates PAB for each week. Any cell that goes negative is a planning gap — you need to add an MPS quantity, pull in a scheduled receipt, or accept a stockout. Iterate until PAB is positive across all weeks.'
    }
  ],
  whenToUpgrade: [
    'You manage more than 25 MPS items and the spreadsheet takes hours to update each week',
    'Your sales forecast changes daily and the template cannot keep up',
    'You need to roll the MPS into MRP for component-level material planning',
    'Multiple planners need to edit the same MPS at the same time',
    'You need configurable lot-sizing rules per item, per period',
    'You need to integrate MPS output with your ERP or shop floor systems',
    'You manage multi-plant or multi-warehouse MPS with inter-facility transfers',
    'Customers expect MPS-driven ATP responses faster than your spreadsheet can provide'
  ],
  faqs: [
    {
      question: 'What is a master production schedule?',
      answer:
        'A master production schedule (MPS) is a time-phased plan that says what end items a manufacturer will produce, in what quantities, and in which periods (usually weeks). It sits between sales forecasting (what customers want) and MRP (what materials are needed) and is the foundation of any production planning process.'
    },
    {
      question: 'How is an MPS different from a production schedule?',
      answer:
        'A master production schedule plans WHAT to build at the end-item level, usually weekly, on a 4–18 week horizon. A production schedule sequences HOW to build it on the shop floor — which jobs run on which machines, in which order, with which setups — usually daily or by shift. The MPS feeds the production schedule; the production schedule executes the MPS.'
    },
    {
      question: 'Do I need an MPS if I run an MRP system?',
      answer:
        'Yes. MRP processes assume an MPS exists; the MPS is the demand input that drives MRP material calculations. Many small manufacturers skip the formal MPS step and run MRP directly off open sales orders, which works for short lead-time items but breaks down as soon as cumulative lead time exceeds the customer ordering window.'
    },
    {
      question: 'What lot-sizing rule should I use?',
      answer:
        'Lot-for-lot is the simplest and works for low-volume, custom, or expensive items where carrying inventory is costly. Fixed lot size is best for standard products with consistent demand. Period order quantity is best for items with high setup costs where you want to amortize setups over multiple weeks of demand. The template supports all three and lets you switch per item.'
    },
    {
      question: 'How far out should the MPS extend?',
      answer:
        'The MPS should extend at least one cumulative manufacturing lead time into the future. If your longest lead time is 6 weeks, your MPS horizon should be at least 6 weeks. Most discrete manufacturers run a 12-week MPS; process manufacturers often go 26 weeks or more.'
    },
    {
      question: 'Can this template handle multi-level BOMs?',
      answer:
        'No — the template is intentionally end-item only. BOM-level material planning is what MRP does, and that requires a real planning engine. RMX adds MRP-level capability to the same Excel workbook; RMDB adds a full multi-level finite-capacity scheduler if you need to plan components and end items together.'
    }
  ],
  relatedTemplates: [
    {
      href: '/excel-templates/production-schedule',
      title: 'Free Production Schedule Excel Template',
      description:
        'The shop-floor execution layer — turn your MPS into a daily Gantt schedule for actual work centers.'
    },
    {
      href: '/excel-templates/capacity-planning',
      title: 'Free Capacity Planning Excel Template',
      description:
        'Validate that your MPS is feasible against real work-center capacity before you commit to it.'
    },
    {
      href: '/excel-templates',
      title: 'All free Excel tools for manufacturers',
      description:
        'Browse the full library of Excel-based scheduling, planning, quality, and operations apps from User Solutions.'
    }
  ]
};

export default function Page(): React.JSX.Element {
  return <ExcelTemplatePage data={data} />;
}
