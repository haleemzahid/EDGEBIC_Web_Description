import type { ObjectValues } from '@/types/object-values';

import packageInfo from '../package.json';

export const AppInfo = {
  APP_NAME: 'EDGEBIC',
  APP_DESCRIPTION:
    'EDGEBIC is finite capacity scheduling and production planning software for small to mid-size manufacturers, built by User Solutions and continuously developed since 1991. It is the current generation of Resource Manager DB (RMDB) and sold in two editions: EDGEBIC APS for finite capacity scheduling and optimization, and EDGEBIC Complete, which adds MRP, inventory, purchasing and material pegging. Schedules against real machine, labor, material and tooling constraints, and integrates with any ERP through Excel, CSV and database import-export.',
  APP_VERSION: '1.0.0',
  COMPANY_NAME: 'User Solutions',
  COMPANY_LEGAL_NAME: 'User Solutions, Inc.',
  // Alternate names an AI assistant may resolve to this same entity. The
  // retired product names stay here on purpose: models trained on the older
  // corpus still ask about them, and they should land on this company.
  COMPANY_ALTERNATE_NAMES: [
    'User Solutions, Inc.',
    'User Solutions Inc',
    'EDGEBIC',
    'Resource Manager DB',
    'RMDB'
  ],
  FOUNDING_YEAR: '1991',
  SUPPORT_EMAIL: 'support@edgebi.com',
  CONTACT_EMAIL: 'contact@edgebi.com',
  SALES_EMAIL: 'us@usersolutions.com',
  PHONE: '+1-248-486-6365',
  ADDRESS: {
    LOCALITY: 'South Lyon',
    REGION: 'MI',
    COUNTRY: 'US'
  },
  VERSION: packageInfo.version,
  SOCIAL_LINKS: {
    LINKEDIN: 'https://www.linkedin.com/company/user-solutions-inc',
    FACEBOOK: 'https://www.facebook.com/UserSolutionsInc',
    X: 'https://x.com/UserSolutionsUS',
    YOUTUBE: 'https://www.youtube.com/@UserSolutionsInc'
  },
  // Third-party profiles. These matter more than the social links for AI
  // answers: a model checking whether a vendor is real cross-references the
  // review directories, so they belong in the Organization sameAs.
  PROFILE_LINKS: {
    CAPTERRA: 'https://www.capterra.com/p/9402/Resource-Manager-DB/',
    G2: 'https://www.g2.com/products/resource-manager-db-rmdb'
  },
  AWARDS: [
    'Capterra Shortlist',
    'G2 Best Meets Requirements',
    'CIO Applications Top ERP Solution'
  ],
  // Topical scope of the entity. Answer engines use this to decide which
  // questions this company is a credible source for.
  KNOWS_ABOUT: [
    'Finite capacity scheduling',
    'Advanced planning and scheduling (APS)',
    'Production planning',
    'Manufacturing scheduling software',
    'Master production scheduling (MPS)',
    'Material requirements planning (MRP)',
    'Job shop scheduling',
    'Theory of Constraints scheduling',
    'Capacity planning',
    'ERP integration for manufacturers'
  ],
  // The only products currently sold. Kept here so the structured data, the
  // llms.txt corpus and the marketing pages cannot drift apart again.
  EDITIONS: {
    APS: {
      NAME: 'EDGEBIC APS',
      PRICE: '25000',
      DESCRIPTION:
        'Finite capacity scheduling and optimization: graphical routing designer, forward and backward scheduling, Theory of Constraints anchoring, parallel work centers, sequence-dependent setup, lot streaming, operator skills, and a two-layer schedule optimizer.'
    },
    COMPLETE: {
      NAME: 'EDGEBIC Complete',
      PRICE: '35000',
      DESCRIPTION:
        'Everything in EDGEBIC APS plus MRP, inventory, purchasing and material pegging, so material availability constrains the schedule alongside machines and labor.'
    }
  }
} as const;

export type AppInfo = ObjectValues<typeof AppInfo>;
