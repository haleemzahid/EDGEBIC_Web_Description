import * as React from 'react';

import {
  ExcelTemplatePage,
  type ExcelTemplatePageData
} from '@/components/marketing/templates/excel-template-page';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'Free Bill of Materials (BOM) Excel Template (2026) — Multi-Level',
  description:
    'Download a free bill of materials Excel template with multi-level BOM support, cost rollup, where-used analysis, and lot traceability — built for real manufacturing.',
  path: '/excel-templates/bill-of-materials',
  keywords:
    'bill of materials excel template, BOM excel template, multi-level BOM template, BOM template manufacturing, free bill of materials template, indented BOM excel, BOM cost rollup template, BOM tracking spreadsheet'
});

const data: ExcelTemplatePageData = {
  slug: 'bill-of-materials',
  h1: 'Free Bill of Materials (BOM) Excel Template',
  subtitle:
    'A practical multi-level BOM Excel template with cost rollup, where-used analysis, and indented hierarchy — built by manufacturers who understand why BOMs break in spreadsheets.',
  tldr:
    'A working multi-level BOM Excel template plus a 30-day trial of Resource Manager for Excel (RMX) — the Excel-based MRP and scheduling tool that handles BOM depth and complexity spreadsheets alone cannot.',
  introParagraphs: [
    'The bill of materials is the DNA of a manufactured product. It defines what goes into it, how much of each component, and which sub-assemblies roll up into the final good. A single mistake in a BOM propagates through purchasing, inventory, scheduling, and costing — which is why experienced manufacturers treat BOM accuracy as non-negotiable. A "rough" BOM is not a BOM; it is a bet against reality.',
    'For small manufacturers, the BOM almost always starts in Excel. It makes sense — BOMs are tabular, hierarchical data and Excel is built for exactly that. A single-level BOM with 20 components is trivial to manage in a workbook. The problems show up with multi-level BOMs: when Component A is itself made from Components B and C, which are themselves made from Raw Material D, E, F... and a change in D needs to propagate through every finished good that eventually uses it.',
    'This page gives you a free multi-level BOM Excel template that handles indented BOMs correctly, rolls up costs through the hierarchy, and supports where-used analysis. It also explains the warning signs that mean your BOM has outgrown Excel — and what you should do when that happens.'
  ],
  whatsInside: [
    {
      title: 'Multi-level indented BOM structure',
      description:
        'Up to 10 levels deep with automatic indentation and parent-child relationships. Expand or collapse sub-assemblies for easy navigation.'
    },
    {
      title: 'Component master data',
      description:
        'Part number, description, unit of measure, make-vs-buy flag, lead time, and default supplier for every item in the hierarchy.'
    },
    {
      title: 'Cost rollup formulas',
      description:
        'Automatic material cost rollup from raw materials through sub-assemblies to finished good. Update a raw material cost and the whole BOM recalculates.'
    },
    {
      title: 'Where-used (reverse BOM) lookup',
      description:
        'Given any component, find every parent assembly that uses it. Critical for engineering change management.'
    },
    {
      title: 'Quantity and yield adjustments',
      description:
        'Support for fractional quantities, scrap factors, and yield adjustments so the BOM reflects real shop-floor consumption.'
    },
    {
      title: 'Revision and change tracking',
      description:
        'Revision column + change date so you can see which version of the BOM was active when a historical batch was built.'
    }
  ],
  howToUseSteps: [
    {
      title: 'Open the template and study the sample BOM',
      description:
        'The sample shows a multi-level assembly with raw materials, sub-assemblies, and a finished good. Understand the indent structure before replacing it.'
    },
    {
      title: 'Build your component master',
      description:
        'On the Items tab, list every part that appears anywhere in your BOM. Part number, description, cost, unit of measure, make-vs-buy. This is the lookup table the BOM structure will reference.'
    },
    {
      title: 'Build the BOM hierarchy',
      description:
        'On the BOM tab, enter the finished good at level 0, then sub-assemblies at level 1, components at level 2, and so on. The indent column drives visual hierarchy AND the cost rollup logic.'
    },
    {
      title: 'Review the cost rollup',
      description:
        'The Finished Good row shows total material cost rolled up from every component below it. Change any raw material cost and the whole BOM recalculates instantly.'
    },
    {
      title: 'Use the where-used lookup',
      description:
        'Filter or search the BOM tab by component part number to find every parent that uses it. Essential when considering a material substitution or supplier change.'
    }
  ],
  whenToUpgrade: [
    'Your BOMs are more than 3 levels deep and maintaining them is a full-time job',
    'Engineering changes require updating the same component across dozens of BOMs',
    'You need BOM data to feed MRP for material planning',
    'Multiple engineers need to edit BOMs simultaneously and you are emailing copies',
    'You need to track BOM revisions against production batches for compliance',
    'You need where-used analysis faster than "filter the spreadsheet"',
    'You manage more than 100 unique BOMs and find/replace across files has become unmanageable',
    'You need BOM integration with purchasing, inventory, or ERP systems'
  ],
  faqs: [
    {
      question: 'Is this BOM template really free?',
      answer:
        'Yes. The template ships with the free 30-day trial of Resource Manager for Excel (RMX) from User Solutions. No credit card required. Manufacturers have used the trial as a permanent free BOM tool for 35+ years.'
    },
    {
      question: 'How deep can the multi-level BOM go?',
      answer:
        'The template supports up to 10 levels deep by default, which covers nearly every small and mid-size manufacturing product. For deeper BOMs (complex assemblies in electronics, aerospace, or medical devices), the template can be extended — but you should consider dedicated MRP software like RMDB, which has been proven with 10+ level deep BOMs in Li-ion battery production.'
    },
    {
      question: 'Does the template support assembly yield and scrap factors?',
      answer:
        'Yes. Each component row has quantity and scrap factor columns, so a 5% expected scrap is reflected in the rollup cost. This prevents the classic "BOM says 100 but we actually consume 105" accounting error.'
    },
    {
      question: 'Can I use this BOM template with MRP or purchasing software?',
      answer:
        'The template is self-contained — it does not auto-sync with external systems. You can export CSV for one-way handoff to MRP or purchasing. For bi-directional integration, you need a tool like RMX or RMDB that keeps the BOM live in a real database.'
    },
    {
      question: 'How does this differ from the BOMs in my ERP or MRP system?',
      answer:
        'ERP/MRP BOMs are persistent, multi-user, and integrate with purchasing and inventory. This template is a standalone workbook — perfect for prototyping, small-run work, or shops that have not deployed an MRP system yet. Most manufacturers use Excel BOMs during engineering and migrate to ERP/MRP BOMs for production.'
    },
    {
      question: 'Does the template handle configurable items with options?',
      answer:
        'Not natively — configurable BOMs (where a finished good varies based on customer options) are genuinely hard in spreadsheets and almost always justify moving to a real MRP system. If configuration is your primary BOM challenge, reach out for a demo of RMDB which handles this cleanly.'
    }
  ],
  relatedTemplates: [
    {
      href: '/excel-templates/mrp',
      title: 'Free MRP Excel Template',
      description:
        'Run material requirements planning against your BOM to determine what to buy and when.'
    },
    {
      href: '/excel-templates/work-order',
      title: 'Free Work Order Excel Template',
      description:
        'Pair your BOM with work orders to track the actual consumption during production.'
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
