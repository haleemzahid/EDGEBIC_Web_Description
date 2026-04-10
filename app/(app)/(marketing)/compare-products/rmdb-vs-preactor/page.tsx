import * as React from 'react';

import {
  ComparisonPage,
  type ComparisonPageData
} from '@/components/marketing/compare/comparison-page';
import { createPageMetadata } from '@/lib/seo/metadata';

export const metadata = createPageMetadata({
  title: 'RMDB vs Preactor: APS Comparison for Manufacturers (2026)',
  description:
    'Honest RMDB vs Preactor (Siemens Opcenter APS) comparison. Mid-market scheduling vs enterprise APS — features, pricing, implementation, and migration paths.',
  path: '/compare-products/rmdb-vs-preactor',
  keywords:
    'rmdb vs preactor, preactor alternative, preactor alternatives, alternatives to preactor, preactor competitors, preactor APS comparison, advanced planning and scheduling preactor, siemens opcenter APS alternative'
});

const data: ComparisonPageData = {
  slug: 'rmdb-vs-preactor',
  competitor: 'Preactor',
  competitorDescription:
    'Enterprise advanced planning and scheduling (APS) software, now part of Siemens Opcenter',
  h1: 'RMDB vs Preactor: Which APS Fits Your Manufacturing Operation?',
  subtitle:
    'Preactor is a powerful enterprise APS now bundled inside Siemens Opcenter. RMDB is a focused finite-capacity scheduler built for mid-market manufacturers. Honest comparison.',
  tldr:
    'Preactor is the right call for enterprise manufacturers running Siemens Opcenter or needing tight Tecnomatix integration. RMDB is the right call for mid-market manufacturers who need real finite-capacity scheduling without enterprise complexity, multi-month implementations, or per-user subscription pricing.',
  introParagraphs: [
    'Preactor has been one of the most respected APS engines in manufacturing for decades. Originally a standalone product, it was acquired by Siemens in 2013 and is now bundled inside the Siemens Opcenter manufacturing operations management suite. For enterprise manufacturers running the full Siemens stack — Tecnomatix, NX CAD, Teamcenter PLM — Preactor is the natural scheduling layer.',
    'But Preactor has always carried enterprise weight. Implementation projects routinely run 3–9 months, integration with non-Siemens ERPs adds significant complexity, and the licensing model assumes a deep IT services relationship. For a 50–500-employee manufacturer that just needs to fix their schedule, Preactor is overkill.',
    'Resource Manager DB (RMDB) is what mid-market manufacturers move to instead. It has been deployed for 35+ years in real production environments, supports any ERP backend (not just Siemens), implements in five days using the standard 5-Day Implementation Framework, and uses one-time licensing instead of subscriptions. This page is the head-to-head for buyers evaluating both.'
  ],
  features: [
    { name: 'Finite-capacity scheduling', rmdb: true, competitor: true },
    { name: 'Multi-step routings with setup time', rmdb: true, competitor: true },
    { name: 'Drag-and-drop Gantt', rmdb: true, competitor: true },
    { name: 'What-if scenario analysis', rmdb: true, competitor: true },
    {
      name: 'Bundled inside enterprise MES suite',
      rmdb: false,
      competitor: true,
      note: 'Preactor is part of Siemens Opcenter; RMDB is a standalone scheduler.'
    },
    {
      name: 'Tight Siemens Tecnomatix integration',
      rmdb: false,
      competitor: true,
      note: 'If you run Siemens digital manufacturing, Preactor is the native fit.'
    },
    {
      name: 'ERP-agnostic integration (Sage, Epicor, Dynamics, QuickBooks, JobBOSS)',
      rmdb: true,
      competitor: 'partial',
      note: 'Preactor integrates with non-Siemens ERPs but the integration story is significantly more complex.'
    },
    {
      name: '5-day implementation',
      rmdb: true,
      competitor: false,
      note: 'Preactor implementations typically run 3–9 months.'
    },
    {
      name: 'On-premise deployment',
      rmdb: true,
      competitor: true
    },
    {
      name: 'Cloud / SaaS deployment',
      rmdb: true,
      competitor: true
    },
    {
      name: 'Pricing model',
      rmdb: 'One-time license',
      competitor: 'Per-user subscription via Siemens'
    },
    {
      name: 'Best for company size',
      rmdb: '10–500+ employees',
      competitor: '500+ employees / enterprise'
    }
  ],
  pricing: {
    rmdbPrice: 'From $5,000',
    rmdbModel: 'One-time license · no per-user fees · optional support contract',
    competitorPrice: 'Enterprise quote',
    competitorModel: 'Bundled with Siemens Opcenter · per-user subscription · enterprise services contract',
    summary:
      'Preactor (Siemens Opcenter) pricing is enterprise-tier — typically $50,000–$250,000+ for license plus annual support, plus a multi-month services engagement to implement. RMDB starts at $5,000 as a one-time license with optional support, and the standard 5-Day Implementation Framework keeps services costs predictable. For mid-market manufacturers, RMDB is typically 80–95% cheaper over a 5-year horizon.'
  },
  rmdbWinsAt: [
    'Mid-market manufacturers (50–500 employees) who need real finite-capacity scheduling without enterprise complexity',
    'Standalone scheduling that integrates with whatever ERP you already run',
    'One-week implementation vs months of enterprise services',
    'One-time licensing instead of per-user Siemens subscriptions',
    'Manufacturers who do not run the Siemens digital-manufacturing stack',
    'Total cost of ownership at any reasonable team size'
  ],
  competitorWinsAt: [
    'Enterprise manufacturers already running Siemens Tecnomatix, NX, or Teamcenter',
    'Multi-plant global operations with deeply integrated MES requirements',
    'Buyers who specifically need the Preactor scheduling engine inside the Siemens Opcenter suite',
    'Organizations with dedicated IT services teams to manage long enterprise rollouts'
  ],
  rmdbBestFor:
    'You are a mid-market manufacturer who needs finite-capacity scheduling, you run an ERP that is not Siemens, and you would rather get to a working schedule in a week than a multi-month enterprise rollout. You also do not want to pay enterprise APS license fees.',
  competitorBestFor:
    'You are an enterprise manufacturer already running Siemens Tecnomatix, NX, or Teamcenter, and you want the scheduling layer to live inside the same vendor stack as the rest of your digital manufacturing infrastructure. Budget and implementation timeline are not constraints.',
  migrationSteps: [
    {
      title: 'Export Preactor / Opcenter data',
      description:
        'Export work centers, routings, BOMs, and open orders from Preactor or Siemens Opcenter as CSV. Most enterprise installations support standard CSV export of all schedule entities.'
    },
    {
      title: 'Map Preactor entities to RMDB',
      description:
        'Our team converts Preactor work centers, calendars, and routings into RMDB equivalents. The data models are similar enough that mapping is mostly mechanical.'
    },
    {
      title: 'Connect to your ERP backend',
      description:
        'If you are migrating off Siemens Opcenter to a different ERP, RMDB integrates with Sage, Epicor, Microsoft Dynamics, QuickBooks, and many others. If you are keeping Opcenter for MES, RMDB can sit alongside it.'
    },
    {
      title: 'Run finite-capacity solve on real data',
      description:
        'Day three of the standard 5-Day Implementation Framework: load your open orders into RMDB and produce a working finite-capacity schedule. Compare against the Preactor schedule for validation.'
    },
    {
      title: 'Train and go live',
      description:
        'Days four and five: scheduler and shop-floor lead training, dashboard setup, and live cutover. Most mid-market manufacturers complete the full migration inside one business week.'
    }
  ],
  faqs: [
    {
      question: 'Is RMDB really an alternative to Preactor?',
      answer:
        'For mid-market manufacturers, yes. RMDB delivers the core finite-capacity scheduling capability that drives Preactor adoption, without the enterprise weight. For Fortune 500 manufacturers running the full Siemens stack, Preactor remains the better fit because of its native integration with Tecnomatix and NX.'
    },
    {
      question: 'Why would a Preactor user move to RMDB?',
      answer:
        'The two most common reasons: (1) the company is changing ERPs and the existing Preactor implementation does not map cleanly to the new system; (2) the company has been acquired or spun off and needs to detach from a Siemens enterprise license without losing scheduling capability.'
    },
    {
      question: 'Does RMDB integrate with Siemens Opcenter or Tecnomatix?',
      answer:
        'RMDB can coexist with Siemens Opcenter and pull production data via standard interfaces, but it is not a native integration the way Preactor is. If your strategy is "stay inside Siemens digital manufacturing," Preactor is the better fit. If your strategy is "decouple scheduling from a single vendor," RMDB is.'
    },
    {
      question: 'How much faster is RMDB to implement vs Preactor?',
      answer:
        'RMDB uses a standard 5-Day Implementation Framework. Preactor enterprise implementations typically run 3–9 months. The difference comes from RMDB being scoped for mid-market use cases (no MES integration, no PLM integration, no multi-plant global rollout) while Preactor is built for enterprise scope.'
    },
    {
      question: 'Is RMDB cheaper than Preactor?',
      answer:
        'Substantially. Preactor pricing is enterprise-tier (typically $50K–$250K+ for license plus annual support, plus services). RMDB starts at $5,000 as a one-time license. For mid-market manufacturers, RMDB is typically 80–95% cheaper over a 5-year horizon.'
    },
    {
      question: 'Can I keep Siemens Opcenter and add RMDB just for scheduling?',
      answer:
        'Technically yes, but if you are paying for the full Opcenter suite you are already paying for Preactor inside it. The RMDB-alongside-Opcenter pattern only makes sense if you are planning to detach from Opcenter or if Preactor specifically is failing for your use case.'
    }
  ]
};

export default function Page(): React.JSX.Element {
  return <ComparisonPage data={data} />;
}
