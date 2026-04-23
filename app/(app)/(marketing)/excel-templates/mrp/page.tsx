import * as React from 'react';

import {
  ExcelTemplatePage,
  type ExcelTemplatePageData
} from '@/components/marketing/templates/excel-template-page';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Free MRP Excel Template (2026) — Material Requirements Planning',
  description:
    'Download a free MRP Excel template for material requirements planning. Time-phased demand explosion, net requirements, planned orders, and lot sizing — built for real manufacturers.',
  path: '/excel-templates/mrp',
  keywords:
    'MRP excel template, material requirements planning template, MRP spreadsheet, free MRP template, MRP calculation excel, MRP manufacturing template, time phased MRP template, MRP run excel'
});

const data: ExcelTemplatePageData = {
  slug: 'mrp',
  h1: 'Free MRP (Material Requirements Planning) Excel Template',
  subtitle:
    'A practical MRP Excel template that runs a real time-phased material requirements calculation — demand explosion, net requirements, planned orders, and lot sizing in one workbook.',
  tldr:
    'A working MRP Excel template plus a 30-day trial of Resource Manager for Excel (RMX) — the Excel-based MRP engine that manufacturers move to when their spreadsheet MRP starts missing reorder points.',
  introParagraphs: [
    'Material Requirements Planning (MRP) is the process that turns an MPS (master production schedule) into a concrete purchasing and production plan for every component. It answers the question every planner faces: "given what we are going to build, what do we need to buy or make, and when do we need it?" Done well, MRP eliminates stockouts and reduces inventory carrying cost simultaneously. Done badly, it is the single biggest driver of manufacturing chaos.',
    'For small manufacturers without a full ERP, MRP often lives in Excel. This works surprisingly well — MRP is fundamentally a tabular calculation, and Excel was designed for tabular calculations. The limits show up when your part count grows past 200 items, your BOMs go past 3 levels, or your demand changes daily. At that point the manual updates consume more time than the MRP run saves.',
    'This page gives you a free MRP Excel template that handles the core MRP logic correctly: gross-to-net calculations, time-phased demand explosion, scheduled receipts, lot sizing rules, and planned order release. It is the starting point. Resource Manager for Excel (RMX) is where most manufacturers move when Excel MRP becomes a bottleneck.'
  ],
  whatsInside: [
    {
      title: 'Item master with planning attributes',
      description:
        'Part number, lead time, lot sizing rule, safety stock, and planner code for every item in the plan.'
    },
    {
      title: 'BOM explosion table',
      description:
        'Multi-level BOM that drives gross requirements from parent to child components automatically.'
    },
    {
      title: 'Time-phased MRP grid',
      description:
        'Per item, per week: gross requirements, scheduled receipts, on-hand projected, net requirements, and planned order release.'
    },
    {
      title: 'Lot-sizing rules',
      description:
        'Lot-for-lot, fixed lot size, period order quantity, and minimum batch — the same rules every real MRP system supports.'
    },
    {
      title: 'Planned order output',
      description:
        'Ready-to-release list of planned production and purchase orders, sorted by release date and item.'
    },
    {
      title: 'MRP exception report',
      description:
        'Flags items with negative projected balance, past-due orders, or reorder-point breaches — the exceptions a planner actually needs to see.'
    }
  ],
  howToUseSteps: [
    {
      title: 'Set up your item master',
      description:
        'On the Items tab, list every part in your plan with its lead time, lot sizing rule, and safety stock. This is the foundation MRP calculations run against.'
    },
    {
      title: 'Build your BOMs',
      description:
        'On the BOM tab, define parent-child relationships with quantities. Each finished good needs a complete BOM down to the raw material level for MRP to explode correctly.'
    },
    {
      title: 'Enter demand',
      description:
        'On the Demand tab, enter forecast and firm sales orders by week for each finished good. This drives the gross requirements explosion.'
    },
    {
      title: 'Run the MRP calculation',
      description:
        'The MRP grid auto-calculates: gross requirements (from demand), net requirements (gross minus on-hand minus scheduled receipts), and planned orders (net offset by lead time).'
    },
    {
      title: 'Review exceptions and release orders',
      description:
        'Check the Exceptions tab for negative balances or past-due items. Release planned orders from the Output tab to procurement or production.'
    }
  ],
  whenToUpgrade: [
    'Your item master has more than 200 active parts',
    'BOMs are more than 3 levels deep and re-explosion takes longer than the MRP run itself',
    'Demand changes daily and the spreadsheet cannot keep up',
    'Multiple planners need to edit MRP concurrently',
    'You need MRP integration with purchasing, inventory, and shop floor data',
    'You cannot answer "when can we promise 100 of SKU X?" in under 5 minutes',
    'You manage multiple plants or warehouses with shared inventory',
    'Compliance or audit requirements need MRP run history and change tracking'
  ],
  faqs: [
    {
      question: 'Is this MRP template really free?',
      answer:
        'Yes. The template ships with the free 30-day trial of Resource Manager for Excel (RMX). No credit card required.'
    },
    {
      question: 'What is the difference between MRP and MPS?',
      answer:
        'MPS (master production schedule) plans what finished goods to build at the end-item level. MRP (material requirements planning) plans what components and raw materials are needed to support the MPS. MPS comes first; MRP explodes it through the BOM.'
    },
    {
      question: 'Does the template support different lot sizing rules?',
      answer:
        'Yes. The template supports lot-for-lot (most common), fixed lot size (for items with high setup cost), period order quantity (fixed weeks of coverage), and minimum order quantity. Each item in the master can have its own rule.'
    },
    {
      question: 'How many levels of BOM does the MRP template handle?',
      answer:
        'The default template handles up to 5 levels of BOM, which covers most small manufacturing products. For deeper BOMs, the template can be extended, but you should consider dedicated MRP software like RMX or RMDB which supports 10+ levels natively.'
    },
    {
      question: 'Can the template run a full MRP calculation across my entire item master?',
      answer:
        'The template is designed for a single MRP run on demand. For continuous MRP (where changes flow through the system in real time), you need a dedicated MRP tool. The template is most useful for planning cycles — weekly or bi-weekly MRP runs.'
    },
    {
      question: 'What happens when my demand changes after I run MRP?',
      answer:
        'In the template, you re-run MRP manually — update the demand tab and the calculation re-explodes. In a real MRP system, changes are incremental and the system maintains a rolling plan. This is the biggest difference between spreadsheet MRP and software MRP.'
    }
  ],
  relatedTemplates: [
    {
      href: '/excel-templates/master-production-schedule',
      title: 'Free Master Production Schedule (MPS) Template',
      description:
        'The upstream input to MRP — plan what finished goods to build on a 12-week rolling horizon.'
    },
    {
      href: '/excel-templates/bill-of-materials',
      title: 'Free Bill of Materials (BOM) Excel Template',
      description:
        'The multi-level BOM that MRP explodes through to calculate component requirements.'
    },
    {
      href: '/excel-templates',
      title: 'All free Excel tools for manufacturers',
      description:
        'Browse the full library of Excel-based scheduling, planning, quality, and operations apps.'
    }
  ]
};

export default function Page(): React.JSX.Element {
  return <ExcelTemplatePage data={data} />;
}
