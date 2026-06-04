/**
 * Feature profiles for programmatic SEO matrix pages.
 *
 * Each feature profile is the "other axis" of the Industry × Feature matrix.
 * Combined with `industries.ts` to generate /[feature]-for-[industry] pages.
 *
 * Feature slugs MUST match the keys in `IndustryProfile.featureRelevance`.
 * When adding a feature, update industries.ts featureRelevance maps too.
 */

export interface FeatureProfile {
  /** URL-safe slug used in /[slug]-for-[industry] pattern. */
  slug: string;
  /** Display name in H1 and titles. */
  name: string;
  /** Short verb phrase ("schedule with finite capacity"). */
  shortLabel: string;
  /** Reference to the canonical curated feature page. */
  canonicalPagePath?: string;
  /** 3–5 core capabilities of this feature. Used for intersection copy. */
  capabilities: string[];
  /** Why this feature matters (benefits framed as outcomes). */
  benefits: string[];
  /** 3–5 typical objections / FAQ seeds. */
  faqSeeds: string[];
  /** Keywords that should appear in metadata. */
  keywordSeeds: string[];
  /** Which RMDB/EDGEBI product carries this feature primarily. */
  primaryProduct: 'RMDB' | 'EDGEBI' | 'RMX' | 'JSL';
}

export const FEATURES: FeatureProfile[] = [
  {
    slug: 'finite-capacity-scheduling',
    name: 'Finite Capacity Scheduling',
    shortLabel: 'finite capacity scheduling',
    canonicalPagePath: '/finite-capacity-scheduling-software',
    capabilities: [
      'Schedule against real machine, labor, and material constraints',
      'Sequence-dependent setup time modeling',
      'Alternate work center support for load balancing',
      'Honors shift calendars, planned downtime, and holidays',
      'What-if scenario branching without disturbing the live schedule'
    ],
    benefits: [
      'Promise dates customers can actually count on',
      'Bottleneck visibility before they cost you a shipment',
      'No more "schedule looks great, shop floor disagrees" disconnects'
    ],
    faqSeeds: [
      'How does finite capacity differ from infinite/MRP scheduling',
      'Does this honor operator skill constraints',
      'Can the schedule be rerun mid-shift when an expedite arrives',
      'How does it model sequence-dependent changeovers'
    ],
    keywordSeeds: ['finite capacity scheduling', 'finite capacity planning', 'constrained scheduling'],
    primaryProduct: 'RMDB'
  },
  {
    slug: 'production-scheduling',
    name: 'Production Scheduling',
    shortLabel: 'production scheduling',
    canonicalPagePath: '/production-scheduling-software',
    capabilities: [
      'Drag-and-drop Gantt chart for visual scheduling',
      'Multi-work-center load balancing',
      'Real-time schedule recalculation after shop floor updates',
      'Operator-friendly dispatch list views',
      'Schedule attainment and missed-promise tracking'
    ],
    benefits: [
      'Single source of truth for what runs next',
      'Schedule confidence across planning, production, and customer service',
      'Faster reaction to expedites and breakdowns'
    ],
    faqSeeds: [
      'What is production scheduling software',
      'How fast can the schedule be regenerated',
      'Does it integrate with our existing ERP'
    ],
    keywordSeeds: ['production scheduling', 'production scheduler', 'manufacturing scheduling'],
    primaryProduct: 'RMDB'
  },
  {
    slug: 'manufacturing-scheduling',
    name: 'Manufacturing Scheduling',
    shortLabel: 'manufacturing scheduling',
    canonicalPagePath: '/manufacturing-scheduling-software',
    capabilities: [
      'Shop floor scheduling across all resource types',
      'Machines, labor, and material as parallel constraints',
      'Multi-level routings with subassembly synchronization',
      'Configurable scheduling rules per work center'
    ],
    benefits: [
      'Schedules every constraint, not just the loudest one',
      'Material availability and labor availability honored together',
      'Adaptable to plant-specific scheduling logic'
    ],
    faqSeeds: [
      'What makes manufacturing scheduling different from generic scheduling',
      'Can it handle subassembly synchronization',
      'How does it model material as a constraint'
    ],
    keywordSeeds: ['manufacturing scheduling', 'shop floor scheduling', 'plant scheduling'],
    primaryProduct: 'RMDB'
  },
  {
    slug: 'mrp-software',
    name: 'MRP Software',
    shortLabel: 'MRP',
    canonicalPagePath: '/mrp-software-small-manufacturers',
    capabilities: [
      'Material requirements planning from forecast + open orders',
      'Multi-level BOM explosion with lead time offsetting',
      'Purchase requisition generation with vendor preferences',
      'Safety stock and reorder point management'
    ],
    benefits: [
      'Right materials at the right time without over-ordering',
      'MRP outputs that tie back to live finite-capacity scheduling',
      'No more spreadsheet-driven material planning'
    ],
    faqSeeds: [
      'How is MRP different from finite capacity scheduling',
      'Does this work for small manufacturers without an ERP',
      'How is it different from MRPeasy or Katana'
    ],
    keywordSeeds: ['MRP software', 'material requirements planning', 'MRP system'],
    primaryProduct: 'RMDB'
  },
  {
    slug: 'erp-scheduling',
    name: 'ERP Scheduling Add-On',
    shortLabel: 'ERP scheduling',
    canonicalPagePath: '/erp-scheduling-add-on',
    capabilities: [
      'Adds finite capacity scheduling to any ERP system',
      'Bi-directional sync with QuickBooks, Sage, Epicor, JobBOSS, Dynamics, E2',
      'No rip-and-replace — preserves existing ERP investment',
      'Single source of truth for work orders, routings, and capacity'
    ],
    benefits: [
      'Get real scheduling without the cost of a new ERP',
      'Keep your accounting and inventory data where it is',
      'Implementation measured in weeks, not quarters'
    ],
    faqSeeds: [
      'Which ERPs does this integrate with',
      'How does the bi-directional sync work',
      'Does it require us to change our ERP'
    ],
    keywordSeeds: ['ERP scheduling', 'ERP add-on', 'ERP integration scheduling'],
    primaryProduct: 'RMDB'
  },
  {
    slug: 'what-if-analysis',
    name: 'What-If Analysis',
    shortLabel: 'what-if analysis',
    canonicalPagePath: '/what-if-analysis-manufacturing',
    capabilities: [
      'Branch the live schedule into a scenario without affecting production',
      'Compare scenarios side-by-side on key metrics',
      'Test capacity changes, customer expedites, and machine outages',
      'Promote a scenario to the live schedule with one click'
    ],
    benefits: [
      'Make scheduling decisions with data, not intuition',
      'Show customers the cost of an expedite before committing',
      'Test capacity investments before signing the PO'
    ],
    faqSeeds: [
      'How is this different from running multiple Excel scenarios',
      'Can multiple planners build scenarios in parallel',
      'How fast does a scenario rerun'
    ],
    keywordSeeds: ['what-if analysis', 'scheduling scenarios', 'production simulation'],
    primaryProduct: 'RMDB'
  },
  {
    slug: 'multi-location-scheduling',
    name: 'Multi-Location Scheduling',
    shortLabel: 'multi-location scheduling',
    canonicalPagePath: '/multi-location-manufacturing-scheduling',
    capabilities: [
      'Unified scheduling across multiple plants and sites',
      'Cross-plant work transfer logic with logistics lead time',
      'Plant-specific calendars, shifts, and capacity profiles',
      'Consolidated load and bottleneck visibility across all sites'
    ],
    benefits: [
      'Stop scheduling each plant as an island',
      'Balance load across plants automatically',
      'Single dashboard for multi-site operations'
    ],
    faqSeeds: [
      'How does it handle cross-plant work transfer',
      'Can each plant have its own scheduling rules',
      'How does it scale across 5+ plants'
    ],
    keywordSeeds: ['multi-location scheduling', 'multi-plant scheduling', 'multi-site manufacturing'],
    primaryProduct: 'RMDB'
  },
  {
    slug: 'bom-software',
    name: 'Bill of Materials Software',
    shortLabel: 'BOM management',
    canonicalPagePath: '/bill-of-materials-bom-software',
    capabilities: [
      'Multi-level BOM management with unlimited depth',
      'Engineering change order (ECO) workflow',
      'BOM revision history and effective-dates',
      'BOM-to-routing linkage for end-to-end traceability'
    ],
    benefits: [
      'Single source of truth for product structure',
      'Engineering changes propagate cleanly to production',
      'Lot genealogy from raw material to shipped product'
    ],
    faqSeeds: [
      'How does BOM management tie to scheduling',
      'Does this handle engineering change orders',
      'How are BOM revisions managed across active work orders'
    ],
    keywordSeeds: ['BOM software', 'bill of materials', 'BOM management'],
    primaryProduct: 'RMDB'
  },
  {
    slug: 'master-production-schedule',
    name: 'Master Production Schedule',
    shortLabel: 'master production scheduling',
    canonicalPagePath: '/master-production-schedule-software',
    capabilities: [
      'Long-horizon capacity planning (8–52 weeks)',
      'Demand-driven MPS generation from forecast + firm orders',
      'Resource-rough-cut capacity check at MPS level',
      'Roll-up from MPS to detailed finite-capacity schedule'
    ],
    benefits: [
      'Planning horizon longer than next week',
      'Hire-and-buy decisions made before capacity becomes critical',
      'Sales and operations planning (S&OP) anchored in real capacity'
    ],
    faqSeeds: [
      'How long a horizon does MPS plan over',
      'How does it tie back to finite capacity scheduling',
      'Can it incorporate forecast and firm orders together'
    ],
    keywordSeeds: ['master production schedule', 'MPS software', 'S&OP'],
    primaryProduct: 'RMDB'
  },
  {
    slug: 'labor-scheduling',
    name: 'Labor Scheduling',
    shortLabel: 'labor scheduling',
    canonicalPagePath: '/labor-scheduling-manufacturing',
    capabilities: [
      'Workforce capacity planning alongside machines',
      'Operator skill matrix integration',
      'Shift-pattern modeling per work center',
      'Cross-trained operator flexibility planning'
    ],
    benefits: [
      'Labor as a real constraint, not an afterthought',
      'Match operators to work centers based on skill',
      'Cross-training ROI visibility'
    ],
    faqSeeds: [
      'Does this handle operator skill constraints',
      'How does it model multi-shift operations',
      'Can it plan cross-training requirements'
    ],
    keywordSeeds: ['labor scheduling', 'workforce scheduling', 'operator scheduling'],
    primaryProduct: 'RMDB'
  },
  {
    slug: 'excel-to-scheduling',
    name: 'Excel to Scheduling Software',
    shortLabel: 'Excel-to-scheduling migration',
    canonicalPagePath: '/excel-to-scheduling-software',
    capabilities: [
      'Drop-in upgrade from spreadsheet-based scheduling',
      'Familiar Excel-style interface in RMX bridges the gap',
      'Import existing schedule and routing data from Excel',
      'Keep using Excel for ad-hoc reporting while scheduling moves to software'
    ],
    benefits: [
      'No retraining shock — planners stay productive day one',
      'Preserves years of Excel-based scheduling tribal knowledge',
      'Bridges legacy spreadsheet workflow to real scheduling logic'
    ],
    faqSeeds: [
      'How does it handle existing Excel schedules',
      'Do planners need to abandon Excel completely',
      'How long is the migration from spreadsheets'
    ],
    keywordSeeds: ['excel to scheduling', 'replace excel scheduling', 'spreadsheet upgrade'],
    primaryProduct: 'RMX'
  },
  {
    slug: 'on-time-delivery',
    name: 'On-Time Delivery Software',
    shortLabel: 'on-time delivery',
    canonicalPagePath: '/on-time-delivery-manufacturing',
    capabilities: [
      'Realistic promise dates anchored in finite-capacity reality',
      'OTD tracking and root-cause analysis on missed shipments',
      'Customer commit dates synchronized with shop floor schedule',
      'Forward-looking OTD risk dashboards'
    ],
    benefits: [
      'Stop overpromising and underdelivering',
      'OTD percentage that drives customer retention',
      'Earlier warning when a shipment is at risk'
    ],
    faqSeeds: [
      'How does it improve OTD',
      'Can we see at-risk shipments before they slip',
      'What is the typical OTD improvement after deployment'
    ],
    keywordSeeds: ['on time delivery', 'OTD software', 'delivery performance'],
    primaryProduct: 'RMDB'
  },
  {
    slug: 'erp-integration',
    name: 'ERP Integration for Production Scheduling',
    shortLabel: 'ERP integration',
    canonicalPagePath: '/erp-integration-production-scheduling',
    capabilities: [
      'Bi-directional sync with SAP, Oracle, NetSuite, Epicor, and 20+ others',
      'Work orders, routings, BOMs, and inventory flow into scheduling',
      'Completed quantity, scrap, and labor data flow back to ERP',
      'No rip-and-replace required'
    ],
    benefits: [
      'Keep ERP as system of record',
      'Add real scheduling without ERP migration',
      'Bi-directional sync prevents data drift'
    ],
    faqSeeds: [
      'Which ERPs are supported',
      'How does data flow back to the ERP',
      'How long does ERP integration take'
    ],
    keywordSeeds: ['ERP integration', 'ERP scheduling integration', 'manufacturing ERP integration'],
    primaryProduct: 'RMDB'
  }
];

export function getFeatureBySlug(slug: string): FeatureProfile | undefined {
  return FEATURES.find((f) => f.slug === slug);
}

export const FEATURE_SLUGS = FEATURES.map((f) => f.slug);
