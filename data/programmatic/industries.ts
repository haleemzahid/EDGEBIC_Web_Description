/**
 * Industry profiles for programmatic SEO matrix pages.
 *
 * Each industry profile is one "axis" of the Industry × Feature matrix.
 * Combined with `features.ts` to generate /[feature]-for-[industry] pages.
 *
 * DO NOT use these profiles to replace the curated root-level industry pages
 * (e.g. /machine-shop-scheduling-software). Those are intentionally more
 * substantive. These profiles are the "intersection" copy that combines with
 * a feature to form a narrower long-tail target page.
 *
 * Source-of-truth: this file. When adding industries, also update
 * scripts/seo/programmatic/status.mjs and re-run the matrix generator.
 */

export interface IndustryProfile {
  /** URL-safe slug. Used in /[feature]-for-[slug] pattern. */
  slug: string;
  /** Display name in H1, titles, and JSON-LD. */
  name: string;
  /** Short noun phrase for inline use ("for machine shops"). */
  shortLabel: string;
  /** Plural form for headings ("machine shops"). */
  plural: string;
  /** Reference to the canonical curated industry page (if exists). */
  canonicalPagePath?: string;
  /** 3–5 industry-specific challenges. Used to anchor unique intersection copy. */
  challenges: string[];
  /** 3–5 typical customer types in this industry. */
  customerTypes: string[];
  /** 2–3 named or anonymized success-story references for credibility. */
  proofPoints: string[];
  /** Industry-specific terminology that should appear in copy for relevance. */
  terminology: string[];
  /** Keywords/phrases that should appear in metadata for this industry. */
  keywordSeeds: string[];
  /** Relevance grade per feature (0 = skip, 1 = thin, 2 = decent, 3 = strong). Keys = feature slug. */
  featureRelevance: Record<string, 0 | 1 | 2 | 3>;
}

// Feature relevance grades — used by the matrix generator to skip dud combos.
// 0 = skip entirely (no real intersection)
// 1 = thin (only generate if other patterns saturated)
// 2 = decent (generate)
// 3 = strong (generate first)
//
// Feature slugs match `features.ts` `slug` field.

export const INDUSTRIES: IndustryProfile[] = [
  {
    slug: 'machine-shops',
    name: 'Machine Shops',
    shortLabel: 'machine shops',
    plural: 'machine shops',
    canonicalPagePath: '/machine-shop-scheduling-software',
    challenges: [
      'Every job has unique routings, setup times, and material requirements',
      'Sequence-dependent changeovers blow up theoretical schedules',
      'Customer expedites force daily reschedules of the entire floor',
      'Skilled operators are the constraint, not the machines',
      'Alternate work centers are critical when primary machines are loaded'
    ],
    customerTypes: [
      'High-mix precision machining shops',
      'Automotive parts subcontractors',
      'Repair and rework shops',
      'Tier 2 and Tier 3 OEM suppliers'
    ],
    proofPoints: [
      'Cook Compression — finite capacity scheduling for repair work',
      'INCON Incorporated — accurate labor scheduling with MRP add-on',
      'Instruments For Industry — lean manufacturing without losing MRP purchasing benefits'
    ],
    terminology: ['routing', 'setup time', 'changeover', 'work order', 'operator skill', 'alternate work center', 'CNC', 'mill', 'lathe'],
    keywordSeeds: ['machine shop', 'job shop', 'CNC shop', 'precision machining'],
    featureRelevance: {
      'finite-capacity-scheduling': 3,
      'production-scheduling': 3,
      'manufacturing-scheduling': 3,
      'mrp-software': 3,
      'erp-scheduling': 3,
      'what-if-analysis': 3,
      'multi-location-scheduling': 2,
      'bom-software': 2,
      'master-production-schedule': 2,
      'labor-scheduling': 3,
      'excel-to-scheduling': 3,
      'on-time-delivery': 3,
      'erp-integration': 3
    }
  },
  {
    slug: 'cnc-shops',
    name: 'CNC Shops',
    shortLabel: 'CNC shops',
    plural: 'CNC shops',
    canonicalPagePath: '/cnc-shop-scheduling-software',
    challenges: [
      'CNC programs and tooling drive setup times that are routing-specific',
      'Multi-axis machines and mill-turn centers require alternate routing logic',
      'Tool life and tooling availability constrain throughput as much as machine capacity',
      'Material certifications and traceability requirements per part'
    ],
    customerTypes: ['Multi-axis machining shops', 'Mill-turn job shops', 'Tooling-constrained precision shops'],
    proofPoints: ['Cook Compression', 'Instruments For Industry'],
    terminology: ['CNC program', 'tooling', 'mill-turn', 'multi-axis', 'fixture', 'material certification'],
    keywordSeeds: ['CNC shop', 'CNC scheduling', 'CNC machining'],
    featureRelevance: {
      'finite-capacity-scheduling': 3,
      'production-scheduling': 3,
      'manufacturing-scheduling': 3,
      'mrp-software': 2,
      'erp-scheduling': 3,
      'what-if-analysis': 3,
      'multi-location-scheduling': 1,
      'bom-software': 2,
      'master-production-schedule': 2,
      'labor-scheduling': 2,
      'excel-to-scheduling': 3,
      'on-time-delivery': 3,
      'erp-integration': 3
    }
  },
  {
    slug: 'metal-fabrication',
    name: 'Metal Fabrication',
    shortLabel: 'metal fabrication',
    plural: 'metal fabrication shops',
    canonicalPagePath: '/metal-fabrication-scheduling-software',
    challenges: [
      'Cut, form, weld, and finish are sequential constraints with different cycle times',
      'Nesting drives material yield — but adds upstream scheduling complexity',
      'Welding capacity is operator-skill-limited, not machine-limited',
      'Powder coat and paint queues create downstream bottlenecks'
    ],
    customerTypes: ['Sheet metal fabricators', 'Structural steel shops', 'Custom fab job shops'],
    proofPoints: ['Custom metal fabrication shops'],
    terminology: ['laser cut', 'press brake', 'weld', 'powder coat', 'nesting', 'sheet metal'],
    keywordSeeds: ['metal fabrication', 'sheet metal', 'fabrication shop'],
    featureRelevance: {
      'finite-capacity-scheduling': 3,
      'production-scheduling': 3,
      'manufacturing-scheduling': 3,
      'mrp-software': 2,
      'erp-scheduling': 3,
      'what-if-analysis': 2,
      'multi-location-scheduling': 2,
      'bom-software': 2,
      'master-production-schedule': 3,
      'labor-scheduling': 3,
      'excel-to-scheduling': 3,
      'on-time-delivery': 3,
      'erp-integration': 3
    }
  },
  {
    slug: 'food-manufacturing',
    name: 'Food Manufacturing',
    shortLabel: 'food manufacturing',
    plural: 'food manufacturers',
    canonicalPagePath: '/food-manufacturing-scheduling-software',
    challenges: [
      'Batch scheduling with shelf life and freshness constraints',
      'Allergen changeover and cleaning rules between products',
      'Cold chain and packaging line synchronization',
      'Regulatory traceability (FSMA, lot tracking)'
    ],
    customerTypes: ['Specialty food producers', 'Bakery operations', 'Beverage manufacturers', 'Dairy processors'],
    proofPoints: ['Custom food manufacturers'],
    terminology: ['batch', 'allergen', 'shelf life', 'lot', 'FSMA', 'cold chain', 'packaging line'],
    keywordSeeds: ['food manufacturing', 'food production', 'bakery', 'beverage'],
    featureRelevance: {
      'finite-capacity-scheduling': 3,
      'production-scheduling': 3,
      'manufacturing-scheduling': 3,
      'mrp-software': 3,
      'erp-scheduling': 2,
      'what-if-analysis': 2,
      'multi-location-scheduling': 3,
      'bom-software': 3,
      'master-production-schedule': 3,
      'labor-scheduling': 2,
      'excel-to-scheduling': 2,
      'on-time-delivery': 3,
      'erp-integration': 3
    }
  },
  {
    slug: 'medical-device-manufacturing',
    name: 'Medical Device Manufacturing',
    shortLabel: 'medical device manufacturing',
    plural: 'medical device manufacturers',
    canonicalPagePath: '/medical-device-manufacturing-software',
    challenges: [
      'FDA traceability requirements drive scheduling logic',
      'DHF and DHR documentation must align with production records',
      'Validated process steps cannot be reshuffled freely',
      'Lot genealogy and serialization at every step'
    ],
    customerTypes: ['Class I and Class II device manufacturers', 'Implant manufacturers', 'Diagnostic device producers'],
    proofPoints: ['Custom medical device manufacturers'],
    terminology: ['FDA', '21 CFR', 'DHF', 'DHR', 'lot genealogy', 'validated process', 'cleanroom'],
    keywordSeeds: ['medical device', 'medical manufacturing', 'FDA scheduling'],
    featureRelevance: {
      'finite-capacity-scheduling': 3,
      'production-scheduling': 3,
      'manufacturing-scheduling': 3,
      'mrp-software': 3,
      'erp-scheduling': 3,
      'what-if-analysis': 2,
      'multi-location-scheduling': 2,
      'bom-software': 3,
      'master-production-schedule': 3,
      'labor-scheduling': 2,
      'excel-to-scheduling': 2,
      'on-time-delivery': 3,
      'erp-integration': 3
    }
  },
  {
    slug: 'plastic-manufacturing',
    name: 'Plastic Manufacturing',
    shortLabel: 'plastic manufacturing',
    plural: 'plastic manufacturers',
    canonicalPagePath: '/plastic-manufacturing-software',
    challenges: [
      'Mold capacity and tonnage constraints drive scheduling',
      'Resin changeovers create sequence-dependent setup times',
      'Color and material moisture management at the press',
      'Secondary operations (assembly, decoration) layered downstream'
    ],
    customerTypes: ['Injection molders', 'Blow molders', 'Custom plastic part producers'],
    proofPoints: ['Custom plastic manufacturers'],
    terminology: ['mold', 'tonnage', 'resin changeover', 'injection molding', 'blow molding', 'cavitation'],
    keywordSeeds: ['plastic manufacturing', 'injection molding', 'plastic production'],
    featureRelevance: {
      'finite-capacity-scheduling': 3,
      'production-scheduling': 3,
      'manufacturing-scheduling': 3,
      'mrp-software': 2,
      'erp-scheduling': 2,
      'what-if-analysis': 2,
      'multi-location-scheduling': 2,
      'bom-software': 2,
      'master-production-schedule': 3,
      'labor-scheduling': 2,
      'excel-to-scheduling': 2,
      'on-time-delivery': 3,
      'erp-integration': 3
    }
  },
  {
    slug: 'electronics-manufacturing',
    name: 'Electronics Manufacturing',
    shortLabel: 'electronics manufacturing',
    plural: 'electronics manufacturers',
    canonicalPagePath: '/electronics-manufacturing-scheduling-software',
    challenges: [
      'Multi-level sub-assembly BOMs with deep component nesting',
      'Component supply variability drives constant rescheduling',
      'SMT vs through-hole vs hand-build different capacity models',
      'Lean cell scheduling alongside batch operations'
    ],
    customerTypes: ['Contract electronics manufacturers (EMS)', 'PCB assembly shops', 'Box-build assemblers'],
    proofPoints: ['Custom electronics manufacturers'],
    terminology: ['SMT', 'PCB', 'box-build', 'EMS', 'BOM explosion', 'component'],
    keywordSeeds: ['electronics manufacturing', 'EMS', 'PCB assembly', 'electronics scheduling'],
    featureRelevance: {
      'finite-capacity-scheduling': 3,
      'production-scheduling': 3,
      'manufacturing-scheduling': 3,
      'mrp-software': 3,
      'erp-scheduling': 3,
      'what-if-analysis': 2,
      'multi-location-scheduling': 2,
      'bom-software': 3,
      'master-production-schedule': 3,
      'labor-scheduling': 2,
      'excel-to-scheduling': 2,
      'on-time-delivery': 3,
      'erp-integration': 3
    }
  },
  {
    slug: 'defense-aerospace',
    name: 'Defense & Aerospace',
    shortLabel: 'defense and aerospace',
    plural: 'defense and aerospace manufacturers',
    canonicalPagePath: '/defense-aerospace-manufacturing-scheduling',
    challenges: [
      'AS9100 traceability tied to every production step',
      'ITAR and export-controlled materials drive workflow restrictions',
      'Long lead-time forgings and castings dominate planning horizons',
      'First Article Inspection (FAI) milestones gate production progress'
    ],
    customerTypes: ['Tier 1 aerospace suppliers', 'DoD prime contractors', 'Defense electronics shops'],
    proofPoints: ['Custom defense and aerospace manufacturers'],
    terminology: ['AS9100', 'ITAR', 'FAI', 'forging', 'casting', 'export control', 'cage code'],
    keywordSeeds: ['defense manufacturing', 'aerospace', 'AS9100', 'DoD'],
    featureRelevance: {
      'finite-capacity-scheduling': 3,
      'production-scheduling': 3,
      'manufacturing-scheduling': 3,
      'mrp-software': 3,
      'erp-scheduling': 3,
      'what-if-analysis': 3,
      'multi-location-scheduling': 3,
      'bom-software': 3,
      'master-production-schedule': 3,
      'labor-scheduling': 3,
      'excel-to-scheduling': 1,
      'on-time-delivery': 3,
      'erp-integration': 3
    }
  },
  {
    slug: 'heavy-equipment',
    name: 'Heavy Equipment Manufacturing',
    shortLabel: 'heavy equipment',
    plural: 'heavy equipment manufacturers',
    canonicalPagePath: '/heavy-equipment-manufacturing-scheduling',
    challenges: [
      'Multi-location plants with shared subassembly operations',
      'Long-cycle assembly lines with hundreds of components',
      'Engineer-to-order and configure-to-order mixed with standard models',
      'Heavy logistics constraints around finished goods'
    ],
    customerTypes: ['Earthmoving equipment manufacturers', 'Industrial machinery OEMs', 'Material handling producers'],
    proofPoints: ['Multi-location heavy equipment manufacturers'],
    terminology: ['ETO', 'CTO', 'subassembly', 'multi-plant', 'long-cycle'],
    keywordSeeds: ['heavy equipment', 'industrial machinery', 'ETO manufacturing'],
    featureRelevance: {
      'finite-capacity-scheduling': 3,
      'production-scheduling': 3,
      'manufacturing-scheduling': 3,
      'mrp-software': 3,
      'erp-scheduling': 3,
      'what-if-analysis': 3,
      'multi-location-scheduling': 3,
      'bom-software': 3,
      'master-production-schedule': 3,
      'labor-scheduling': 3,
      'excel-to-scheduling': 1,
      'on-time-delivery': 3,
      'erp-integration': 3
    }
  },
  {
    slug: 'consumer-goods',
    name: 'Consumer Goods Manufacturing',
    shortLabel: 'consumer goods',
    plural: 'consumer goods manufacturers',
    canonicalPagePath: '/consumer-goods-production-planning-software',
    challenges: [
      'Promotional spikes drive forecast-vs-actual gaps',
      'SKU proliferation across colorways, sizes, and variants',
      'Co-packing partners as additional planning constraints',
      'Retail mandates on delivery windows and labeling'
    ],
    customerTypes: ['Packaged goods producers', 'Personal care manufacturers', 'Household products makers'],
    proofPoints: ['Custom consumer goods manufacturers'],
    terminology: ['SKU', 'co-pack', 'retail mandate', 'promo', 'CPG'],
    keywordSeeds: ['consumer goods', 'CPG manufacturing', 'consumer products'],
    featureRelevance: {
      'finite-capacity-scheduling': 3,
      'production-scheduling': 3,
      'manufacturing-scheduling': 3,
      'mrp-software': 3,
      'erp-scheduling': 2,
      'what-if-analysis': 2,
      'multi-location-scheduling': 3,
      'bom-software': 2,
      'master-production-schedule': 3,
      'labor-scheduling': 2,
      'excel-to-scheduling': 2,
      'on-time-delivery': 3,
      'erp-integration': 3
    }
  },
  {
    slug: 'job-shops',
    name: 'Job Shops',
    shortLabel: 'job shops',
    plural: 'job shops',
    canonicalPagePath: '/scheduling-software-for-job-shops',
    challenges: [
      'High mix and low volume — every job is essentially custom',
      'Customer expedites override planned sequence daily',
      'Profitability per job hidden until completed',
      'Capacity commitments made before complete routings exist'
    ],
    customerTypes: ['General job shops', 'Custom manufacturers', 'Contract producers'],
    proofPoints: ['Custom job shops'],
    terminology: ['job shop', 'high mix', 'expedite', 'custom routing'],
    keywordSeeds: ['job shop', 'custom manufacturing', 'high-mix low-volume'],
    featureRelevance: {
      'finite-capacity-scheduling': 3,
      'production-scheduling': 3,
      'manufacturing-scheduling': 3,
      'mrp-software': 2,
      'erp-scheduling': 3,
      'what-if-analysis': 3,
      'multi-location-scheduling': 1,
      'bom-software': 2,
      'master-production-schedule': 2,
      'labor-scheduling': 3,
      'excel-to-scheduling': 3,
      'on-time-delivery': 3,
      'erp-integration': 3
    }
  },
  {
    slug: 'print-shops',
    name: 'Print Shops',
    shortLabel: 'print shops',
    plural: 'print shops',
    canonicalPagePath: '/print-shop-scheduling-software',
    challenges: [
      'Press capacity vs bindery vs finishing creates sequential bottlenecks',
      'Job ticket changes mid-run break downstream plans',
      'Ink and substrate inventory constrains short-notice jobs',
      'Multi-shift operator coverage on press lines'
    ],
    customerTypes: ['Commercial printers', 'Packaging print shops', 'Wide-format printers'],
    proofPoints: ['Custom print shops'],
    terminology: ['press', 'bindery', 'finishing', 'job ticket', 'substrate', 'ink'],
    keywordSeeds: ['print shop', 'commercial printing', 'print production'],
    featureRelevance: {
      'finite-capacity-scheduling': 3,
      'production-scheduling': 3,
      'manufacturing-scheduling': 3,
      'mrp-software': 2,
      'erp-scheduling': 2,
      'what-if-analysis': 2,
      'multi-location-scheduling': 1,
      'bom-software': 1,
      'master-production-schedule': 2,
      'labor-scheduling': 3,
      'excel-to-scheduling': 3,
      'on-time-delivery': 3,
      'erp-integration': 2
    }
  },
  {
    slug: 'furniture-manufacturing',
    name: 'Furniture Manufacturing',
    shortLabel: 'furniture manufacturing',
    plural: 'furniture manufacturers',
    canonicalPagePath: '/furniture-manufacturing-software',
    challenges: [
      'Cut, assemble, finish stages with very different cycle times',
      'Wood, foam, and upholstery as parallel material streams',
      'Custom configuration with thousands of fabric and finish options',
      'Showroom and dealer order timing pressure'
    ],
    customerTypes: ['Residential furniture makers', 'Commercial furniture manufacturers', 'Custom upholstery shops'],
    proofPoints: ['Custom furniture manufacturers'],
    terminology: ['cut', 'assemble', 'finish', 'upholstery', 'wood shop', 'fabric'],
    keywordSeeds: ['furniture manufacturing', 'furniture production', 'cabinet shop'],
    featureRelevance: {
      'finite-capacity-scheduling': 3,
      'production-scheduling': 3,
      'manufacturing-scheduling': 3,
      'mrp-software': 2,
      'erp-scheduling': 2,
      'what-if-analysis': 2,
      'multi-location-scheduling': 1,
      'bom-software': 2,
      'master-production-schedule': 3,
      'labor-scheduling': 3,
      'excel-to-scheduling': 2,
      'on-time-delivery': 3,
      'erp-integration': 2
    }
  },
  {
    slug: 'textile-garment-manufacturing',
    name: 'Textile & Garment Manufacturing',
    shortLabel: 'textile and garment manufacturing',
    plural: 'textile and garment manufacturers',
    canonicalPagePath: '/textile-garment-manufacturing-software',
    challenges: [
      'Cut, sew, and finish stages dominated by labor capacity',
      'Sample-vs-production schedule conflicts',
      'Seasonal collection cycles compress production windows',
      'Style-color-size matrix explodes SKU count'
    ],
    customerTypes: ['Apparel manufacturers', 'Textile mills', 'Cut-and-sew contractors'],
    proofPoints: ['Custom textile manufacturers'],
    terminology: ['cut', 'sew', 'finish', 'sample', 'season', 'colorway'],
    keywordSeeds: ['textile manufacturing', 'garment manufacturing', 'apparel production'],
    featureRelevance: {
      'finite-capacity-scheduling': 3,
      'production-scheduling': 3,
      'manufacturing-scheduling': 3,
      'mrp-software': 2,
      'erp-scheduling': 2,
      'what-if-analysis': 2,
      'multi-location-scheduling': 1,
      'bom-software': 1,
      'master-production-schedule': 3,
      'labor-scheduling': 3,
      'excel-to-scheduling': 2,
      'on-time-delivery': 3,
      'erp-integration': 2
    }
  },
  {
    slug: 'packaging-manufacturing',
    name: 'Packaging Manufacturing',
    shortLabel: 'packaging manufacturing',
    plural: 'packaging manufacturers',
    canonicalPagePath: '/packaging-manufacturing-software',
    challenges: [
      'Converting, printing, and finishing form parallel constraint chains',
      'Run-length economics force scheduling tradeoffs',
      'Customer artwork approval cycles delay production starts',
      'Inventory of corrugate, film, and ink as upstream constraints'
    ],
    customerTypes: ['Corrugated packaging producers', 'Flexible packaging manufacturers', 'Folding carton converters'],
    proofPoints: ['Custom packaging manufacturers'],
    terminology: ['converting', 'finishing', 'corrugate', 'flexible packaging', 'folding carton', 'run length'],
    keywordSeeds: ['packaging manufacturing', 'corrugated', 'flexible packaging'],
    featureRelevance: {
      'finite-capacity-scheduling': 3,
      'production-scheduling': 3,
      'manufacturing-scheduling': 3,
      'mrp-software': 2,
      'erp-scheduling': 2,
      'what-if-analysis': 2,
      'multi-location-scheduling': 2,
      'bom-software': 2,
      'master-production-schedule': 3,
      'labor-scheduling': 2,
      'excel-to-scheduling': 2,
      'on-time-delivery': 3,
      'erp-integration': 3
    }
  }
];

export function getIndustryBySlug(slug: string): IndustryProfile | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}

export const INDUSTRY_SLUGS = INDUSTRIES.map((i) => i.slug);
