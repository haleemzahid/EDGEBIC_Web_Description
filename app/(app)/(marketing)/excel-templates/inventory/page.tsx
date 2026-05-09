import * as React from 'react';

import {
  ExcelTemplatePage,
  type ExcelTemplatePageData
} from '@/components/marketing/templates/excel-template-page';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Free Manufacturing Inventory Excel Template (2026) — Built for Small Shops',
  description:
    'Download a free manufacturing inventory Excel template with parts tracking, reorder alerts, and stock-level dashboards — plus a clear path when Excel-based inventory starts breaking.',
  path: '/excel-templates/inventory',
  keywords:
    'inventory excel template manufacturing, manufacturing inventory template excel, free inventory management excel template, inventory tracking excel template, parts inventory excel template, raw material inventory template excel, stock inventory excel template manufacturing'
});

const data: ExcelTemplatePageData = {
  slug: 'inventory',
  h1: 'Free Manufacturing Inventory Excel Template',
  subtitle:
    'A practical inventory tracking workbook covering raw materials, WIP, and finished goods — with reorder point alerts and stock-level dashboards built for small manufacturing shops.',
  tldr:
    'A working manufacturing inventory Excel template plus a 30-day trial of Resource Manager for Excel (RMX) — the Excel-based scheduling and inventory tool that manufacturers move to when spreadsheet inventory tracking starts causing stockouts and over-ordering.',
  introParagraphs: [
    'Inventory is the lifeblood of any manufacturing operation. Too little and you are shutting down production lines waiting on parts. Too much and your cash is locked in raw material sitting on shelves collecting dust. Getting the balance right is the difference between a shop that ships on time and one that is perpetually firefighting. For most small manufacturers, that balance-finding exercise happens in a spreadsheet.',
    'Excel-based inventory tracking works well at the beginning. A single workbook with part numbers, on-hand quantities, reorder points, and supplier lead times is often sufficient for shops running 50 to 150 SKUs with one person managing the stockroom. The template gives you a clean starting structure so you are not building from scratch — tabs for raw materials, WIP, and finished goods, with a consolidated dashboard that shows what needs ordering today.',
    'The limits appear gradually. First, the reorder alerts stop being checked daily because everyone is too busy. Then two people edit the file simultaneously and the quantities are wrong. Then a work order consumes material that was already allocated to another job, and nobody knows until the job hits the floor and the parts are not there. That is the moment when the question changes from "how do I track inventory in Excel?" to "what comes after Excel?" This template covers the first question. Resource Manager for Excel (RMX) and RMDB answer the second.'
  ],
  whatsInside: [
    {
      title: 'Raw materials register',
      description:
        'Part number, description, unit of measure, supplier, lead time, unit cost, safety stock, reorder point, and on-hand quantity for every raw material. Supports up to 500 line items before Excel performance degrades.'
    },
    {
      title: 'WIP tracking tab',
      description:
        'Work-in-process inventory by job number and operation stage. Tracks material issued to floor, quantity complete at each stage, and estimated completion date so you know exactly how much WIP is in the building.'
    },
    {
      title: 'Finished goods ledger',
      description:
        'SKU, warehouse location, quantity on hand, quantity reserved against open sales orders, and available-to-promise quantity. Color-coded to flag negative ATP positions before they become missed shipments.'
    },
    {
      title: 'Reorder alert dashboard',
      description:
        'Single-view dashboard that filters to items below reorder point or below safety stock. Sorted by urgency. Includes a one-click purchase order draft section for the top 10 reorder items.'
    },
    {
      title: 'Inventory valuation summary',
      description:
        'FIFO-based inventory valuation rolled up by category — raw materials, WIP, and finished goods — with month-over-month comparison columns so you can spot inventory bloat trends early.'
    },
    {
      title: 'Supplier lead time tracker',
      description:
        'Actual vs. quoted lead time by supplier and part number, updated with each receipt. Feeds the reorder point calculation automatically so lead time creep triggers earlier alerts.'
    }
  ],
  howToUseSteps: [
    {
      title: 'Load your item master',
      description:
        'On the Raw Materials tab, enter every active part number with its supplier, lead time, unit cost, and current on-hand quantity. Start with the top 50 parts by annual usage — you do not need every part loaded on day one to get value.'
    },
    {
      title: 'Set reorder points and safety stock',
      description:
        'For each item, calculate your reorder point: (average daily usage × supplier lead time in days) + safety stock. The template includes a helper column that calculates reorder point automatically once you fill in usage rate and lead time.'
    },
    {
      title: 'Record receipts and issues',
      description:
        'Every time material comes in from a supplier, add a receipt transaction. Every time material is issued to the floor for a work order, record an issue. The on-hand balance updates automatically. Consistency here is everything — the template is only as accurate as the transactions recorded in it.'
    },
    {
      title: 'Check the reorder dashboard daily',
      description:
        'Each morning, open the Reorder Alert tab. It filters automatically to items at or below their reorder point. Review, confirm the alert is real (not a data entry error), and initiate a purchase order. This single habit prevents most stockouts.'
    },
    {
      title: 'Reconcile monthly',
      description:
        'Once a month, do a physical count of your top 20 items by value and reconcile against the template. Discrepancies larger than 2% indicate either missing transactions or shrinkage. Investigate before the variance compounds over quarters.'
    }
  ],
  whenToUpgrade: [
    'Your item master has grown past 200 active parts and Excel recalculation slows down noticeably when you open the file',
    'Two or more people need to update inventory quantities simultaneously — shared Excel files corrupt or overwrite each other\'s changes',
    'You cannot answer "how many units of part X do we actually have available right now?" in under 60 seconds without opening multiple files',
    'Inventory data is already 24-48 hours stale by the time anyone looks at the reorder dashboard, so alerts are reactive instead of predictive',
    'Work orders are consuming material that was already soft-allocated to another job, causing mid-production shortages',
    'You have more than one warehouse location or stockroom and the single-workbook structure cannot split quantities by location',
    'You need inventory transactions to feed directly into your MRP or production scheduling run instead of being manually reconciled',
    'Cycle count reconciliations consistently show variances above 3% — indicating the manual transaction model has too many gaps to trust'
  ],
  faqs: [
    {
      question: 'Is this inventory template really free?',
      answer:
        'Yes. The template ships with the free 30-day trial of Resource Manager for Excel (RMX). No credit card required. RMX is a full Excel-based production scheduling and inventory tool — the template gives you the starting structure, and RMX gives you the engine if you outgrow it.'
    },
    {
      question: 'What is the difference between this template and a full inventory management system?',
      answer:
        'The template is a structured spreadsheet — you update it manually, it calculates and alerts, but it does not integrate with suppliers, work orders, or shop floor systems automatically. A full inventory management system (like RMX or RMDB) maintains a running transaction ledger, fires replenishment signals automatically, integrates with open work orders, and handles multiple locations. The template is the right starting point; dedicated software is the right tool once volume and complexity grow.'
    },
    {
      question: 'How do I calculate the reorder point for each part?',
      answer:
        'Reorder point = (average daily usage × supplier lead time in days) + safety stock. The template includes a helper column that calculates this for you once you enter average daily usage and lead time. Safety stock is typically 1-2 weeks of average usage for stable-demand parts, higher for long-lead or single-source parts where supply disruption is costly.'
    },
    {
      question: 'Can this template handle both raw materials and finished goods?',
      answer:
        'Yes. The template has separate tabs for raw materials, WIP, and finished goods. Each has its own register and tracking logic. The dashboard consolidates across all three with a total inventory value summary and separate reorder alerts for raw materials (buy signals) and finished goods (production signals).'
    },
    {
      question: 'How do I handle kits or assemblies that draw from multiple raw materials?',
      answer:
        'For kits, use the WIP tab to record material issues against each assembly job. When you issue components to a work order, deduct them from raw material on-hand and record the WIP entry. When the assembly completes, the WIP entry converts to a finished goods receipt. This manual two-step keeps the ledger accurate without a formal BOM explosion engine.'
    },
    {
      question: 'How many SKUs can this template handle before performance degrades?',
      answer:
        'Practically, the template works well up to about 300-400 line items per tab. Beyond that, Excel recalculation on the dashboard formulas becomes noticeably slow, especially on older hardware. At 500+ SKUs across all tabs, you should evaluate RMX or RMDB — both handle thousands of part numbers with no performance impact.'
    }
  ],
  relatedTemplates: [
    {
      href: '/excel-templates/mrp',
      title: 'Free MRP Excel Template',
      description:
        'Material requirements planning that drives replenishment from your production schedule — the next step up from manual reorder-point tracking.'
    },
    {
      href: '/excel-templates/production-schedule',
      title: 'Free Production Schedule Excel Template',
      description:
        'The demand signal that drives your inventory needs — plan what to build and when, then work backward to what to order.'
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
