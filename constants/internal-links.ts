/**
 * Central internal linking configuration for SEO.
 * Maps relationships between products, success stories, and content.
 */

export type Product = {
  name: string;
  slug: string;
  shortDescription: string;
  tier: 'entry' | 'mid' | 'enterprise';
};

export type SuccessStory = {
  title: string;
  slug: string;
  company: string;
  productUsed: string[];
  industry: string;
  industryTags?: string[];
};

// ─── Product Catalog ─────────────────────────────────────────────
export const PRODUCTS: Record<string, Product> = {
  rmdb: {
    name: 'Resource Manager DB (RMDB)',
    slug: '/resource-manager-db-2',
    shortDescription:
      'Full-featured production planning, scheduling, and tracking with finite capacity, MRP, and Excel integration.',
    tier: 'enterprise'
  },
  edgebi: {
    name: 'EDGEBI',
    slug: '/edgebi',
    shortDescription:
      'Advanced graphical extension for RMDB with interactive Gantt charts and drag-and-drop scheduling.',
    tier: 'enterprise'
  },
  rmx: {
    name: 'Resource Manager for Excel (RMX)',
    slug: '/resource-manager-for-excel-2',
    shortDescription:
      'Excel-based production planning and scheduling using familiar spreadsheet interface.',
    tier: 'mid'
  },
  jsl: {
    name: 'Job Scheduler Lite (JSL)',
    slug: '/jsl-job-scheduler-lite',
    shortDescription:
      'Entry-level production scheduling for job shops and small manufacturers.',
    tier: 'entry'
  },
  ss: {
    name: 'Spreadsheet Scheduler',
    slug: '/spreadsheet-scheduler',
    shortDescription:
      'Excel-based scheduling tool with powerful scheduling templates.',
    tier: 'entry'
  },
  sqc: {
    name: 'Spreadsheet QC',
    slug: '/spreadsheet-qc',
    shortDescription:
      'Excel-based quality control with SPC charts and statistical monitoring.',
    tier: 'entry'
  },
  wp: {
    name: 'Workcell Planner',
    slug: '/workcell-planner',
    shortDescription:
      'Capacity planning tool for machine and manpower requirements.',
    tier: 'entry'
  },
  om: {
    name: 'Operations Manager',
    slug: '/operations-manager',
    shortDescription:
      'Production and operations management templates for forecasting, inventory, MRP, and quality control.',
    tier: 'mid'
  }
};

// ─── Success Stories ─────────────────────────────────────────────
export const SUCCESS_STORIES: SuccessStory[] = [
  {
    title: 'Repair Shops Triple On-Time Shipping from 30% to 90%',
    slug: '/success_stories/repair-shops-triple-on-time-shipping-percentage-from-30-to-90',
    company: 'GE Railcar Services',
    productUsed: ['rmdb'],
    industry: 'Transportation',
    industryTags: ['Heavy Industry']
  },
  {
    title: 'Finite Capacity Scheduling of USS Nimitz Aircraft Carrier',
    slug: '/success_stories/finite-capacity-scheduling-of-worlds-largest-aircraft-carrier-nimitz',
    company: 'US Navy',
    productUsed: ['rmdb'],
    industry: 'Defense',
    industryTags: ['Defense', 'Aerospace']
  },
  {
    title: 'Li-Ion Battery Production Scheduling for Enevate',
    slug: '/success_stories/resource-manager-db-innovates-li-ion-battery-production-scheduling-for-enevate',
    company: 'Enevate Corporation',
    productUsed: ['rmdb', 'edgebi'],
    industry: 'Electronics',
    industryTags: ['Electronics', 'Hi-Tech']
  },
  {
    title: 'Affordable MRP for Smaller Manufacturer',
    slug: '/success_stories/affordable-easy-to-implement-mrp-for-smaller-manufacturer',
    company: 'Sleepmaster Ltd',
    productUsed: ['rmdb'],
    industry: 'Consumer Products',
    industryTags: ['Consumer Goods']
  },
  {
    title: 'Amish Manufacturer Rapidly Amortizes Scheduling System',
    slug: '/success_stories/amish-easily-adopt-rapidly-amortize-new-production-scheduling-system',
    company: 'Homestead Furniture',
    productUsed: ['rmdb'],
    industry: 'Woodworking',
    industryTags: ['Job Shop']
  },
  {
    title: 'Job Shop Increases Throughput and On-Time Shipping',
    slug: '/success_stories/job-shop-increases-throughput-while-improving-shipping-on-time',
    company: 'Technical Glass Products',
    productUsed: ['rmdb'],
    industry: 'Glass Manufacturing',
    industryTags: ['Job Shop']
  },
  {
    title: 'ERP Vendor and Manufacturer Turn to RMDB',
    slug: '/success_stories/erp-vendor-and-manufacturer-both-turn-to-rm-db-for-flexible-scheduling',
    company: 'ERP Partners',
    productUsed: ['rmdb'],
    industry: 'Software / Manufacturing',
    industryTags: ['Consumer Goods']
  },
  {
    title: 'Capacity and Production Planning Add-On for ERP',
    slug: '/success_stories/capacity-and-production-planning-add-on-for-erp',
    company: 'BAE Systems',
    productUsed: ['rmdb'],
    industry: 'Defense',
    industryTags: ['Defense', 'Aerospace']
  },
  {
    title: 'Production What-If Scenario Secures Largest Customer Order',
    slug: '/success_stories/production-what-if-scenario-gantt-chart-secures-largest-customer-order',
    company: 'Turner Suspension Bicycles',
    productUsed: ['rmdb', 'edgebi'],
    industry: 'Consumer Products',
    industryTags: ['Job Shop', 'Consumer Goods']
  },
  {
    title: 'Quick Scheduling Replaces Complex Custom Excel Program',
    slug: '/success_stories/quick-and-easy-production-scheduling-replaces-complex-custom-excel-program',
    company: 'Kyocera Industrial Ceramics',
    productUsed: ['rmdb'],
    industry: 'Electronics',
    industryTags: ['Electronics', 'Hi-Tech']
  },
  {
    title: 'Hi-Tech Connector Mfr Schedules Labor with MRP Add-On',
    slug: '/success_stories/hi-tech-connector-mfr-accurately-schedules-labor-with-mrp-add-on',
    company: 'INCON Incorporated',
    productUsed: ['rmdb'],
    industry: 'Electronics',
    industryTags: ['Electronics', 'Hi-Tech']
  },
  {
    title: 'Scheduling Labor Increases Customer Satisfaction',
    slug: '/success_stories/scheduling-labor-out-several-months-increases-customer-satisfaction',
    company: 'Cummins Engine',
    productUsed: ['rmdb'],
    industry: 'Automotive',
    industryTags: ['Heavy Industry']
  },
  {
    title: 'Finite Capacity Scheduling for Consulting Projects',
    slug: '/success_stories/finite-capacity-resource-scheduling-for-consulting-projects',
    company: 'GEMS Healthcare Solutions',
    productUsed: ['rmdb'],
    industry: 'Healthcare'
  },
  {
    title: 'Lean Manufacturing for Hi-Tech Amplifier Manufacturer',
    slug: '/success_stories/lean-manufacturing-realized-by-hi-tech-amplifier-manufacturer',
    company: 'Instruments For Industry',
    productUsed: ['rmdb'],
    industry: 'Electronics',
    industryTags: ['Electronics', 'Hi-Tech']
  },
  {
    title: 'NIST MEP Improves On-Time Delivery',
    slug: '/success_stories/nist-mep-and-industrial-damping-leader-improve-on-time-delivery',
    company: 'ACE Controls',
    productUsed: ['rmdb'],
    industry: 'Industrial',
    industryTags: ['Job Shop']
  },
  {
    title: 'Simplified Scheduling for Large Sawmills',
    slug: '/success_stories/simplifying-complexities-increased-on-time-deliveries-user-adoption-for-large-sawmills',
    company: 'Large Sawmill',
    productUsed: ['rmdb'],
    industry: 'Woodworking',
    industryTags: ['Heavy Industry']
  },
  {
    title: 'Smart Coffee Machines Get Smarter Purchasing',
    slug: '/success_stories/smart-coffee-machines-get-smarter-purchasing-with-erp-add-on',
    company: 'Smart Coffee',
    productUsed: ['rmdb'],
    industry: 'Consumer Products',
    industryTags: ['Consumer Goods']
  },
  {
    title: 'Job Shop Gains Control of Volatile Schedule',
    slug: '/success_stories/job-shop-gains-control-of-highly-volatile-schedule-and-inventory-needs',
    company: 'Job Shop',
    productUsed: ['rmdb'],
    industry: 'General Manufacturing',
    industryTags: ['Job Shop']
  },
  {
    title: 'Complements Traditional MRP and Shop Control',
    slug: '/success_stories/complements-traditional-mrp-and-shop-control-systems',
    company: 'Manufacturing Enterprise',
    productUsed: ['rmdb'],
    industry: 'General Manufacturing'
  }
];

// ─── Product Relationships (Upgrade Paths) ───────────────────────
export const PRODUCT_UPGRADE_PATHS: Record<string, string[]> = {
  jsl: ['rmx', 'rmdb'],
  ss: ['rmx', 'rmdb'],
  sqc: ['om', 'rmdb'],
  wp: ['rmdb'],
  rmx: ['rmdb', 'edgebi'],
  om: ['rmdb'],
  rmdb: ['edgebi'],
  edgebi: ['rmdb']
};

// ─── Helper Functions ────────────────────────────────────────────

/** Get success stories related to a product */
export function getStoriesForProduct(
  productKey: string,
  limit = 3
): SuccessStory[] {
  return SUCCESS_STORIES.filter((story) =>
    story.productUsed.includes(productKey)
  ).slice(0, limit);
}

/** Get related products for a given product (upgrade/cross-sell) */
export function getRelatedProducts(
  productKey: string,
  limit = 3
): Product[] {
  const relatedKeys = PRODUCT_UPGRADE_PATHS[productKey] || [];
  return relatedKeys
    .map((key) => PRODUCTS[key])
    .filter(Boolean)
    .slice(0, limit);
}

/** Get products used in a success story */
export function getProductsForStory(storySlug: string): Product[] {
  const story = SUCCESS_STORIES.find((s) => s.slug === storySlug);
  if (!story) return [];
  return story.productUsed
    .map((key) => PRODUCTS[key])
    .filter(Boolean);
}

/** Get success stories for a specific industry */
export function getStoriesForIndustry(
  industries: string[],
  limit = 3
): SuccessStory[] {
  return SUCCESS_STORIES.filter((story) => {
    const allTags = [story.industry, ...(story.industryTags || [])];
    return industries.some((ind) =>
      allTags.some((tag) => tag.toLowerCase().includes(ind.toLowerCase()))
    );
  }).slice(0, limit);
}

/** Get related stories (same industry or same product, different story) */
export function getRelatedStories(
  storySlug: string,
  limit = 3
): SuccessStory[] {
  const story = SUCCESS_STORIES.find((s) => s.slug === storySlug);
  if (!story) return [];

  const sameIndustry = SUCCESS_STORIES.filter(
    (s) => s.slug !== storySlug && s.industry === story.industry
  );
  const sameProduct = SUCCESS_STORIES.filter(
    (s) =>
      s.slug !== storySlug &&
      s.productUsed.some((p) => story.productUsed.includes(p))
  );

  // Prioritize same industry, then same product, deduplicate
  const seen = new Set<string>();
  const results: SuccessStory[] = [];
  for (const s of [...sameIndustry, ...sameProduct]) {
    if (!seen.has(s.slug)) {
      seen.add(s.slug);
      results.push(s);
    }
    if (results.length >= limit) break;
  }
  return results;
}
