import Link from 'next/link';
import { ArrowRightIcon } from 'lucide-react';

import { Routes } from '@/constants/routes';

type RelatedLink = {
  title: string;
  description: string;
  href: string;
};

const ALL_SOLUTIONS: Record<string, RelatedLink> = {
  // Industry pages
  [Routes.JobShopScheduling]: {
    title: 'Job Shop Scheduling',
    description: 'High-mix, low-volume finite capacity planning',
    href: Routes.JobShopScheduling
  },
  [Routes.DefenseAerospace]: {
    title: 'Defense & Aerospace',
    description: 'Mission-critical scheduling at scale',
    href: Routes.DefenseAerospace
  },
  [Routes.ElectronicsManufacturing]: {
    title: 'Electronics & Hi-Tech',
    description: 'Multi-level sub-assembly and lean scheduling',
    href: Routes.ElectronicsManufacturing
  },
  [Routes.HeavyEquipment]: {
    title: 'Heavy Equipment',
    description: 'Multi-location industrial production planning',
    href: Routes.HeavyEquipment
  },
  [Routes.ConsumerGoods]: {
    title: 'Consumer Goods',
    description: 'Assembly and packaging production planning',
    href: Routes.ConsumerGoods
  },
  // Feature pages
  [Routes.ProductionSchedulingSoftware]: {
    title: 'Production Scheduling',
    description: 'Finite capacity planning, MRP, and ERP integration',
    href: Routes.ProductionSchedulingSoftware
  },
  [Routes.FiniteCapacityScheduling]: {
    title: 'Finite Capacity Scheduling',
    description: 'Schedule to real machine, labor, and material limits',
    href: Routes.FiniteCapacityScheduling
  },
  [Routes.ManufacturingSchedulingSoftware]: {
    title: 'Manufacturing Scheduling',
    description: 'Shop floor scheduling across all resource types',
    href: Routes.ManufacturingSchedulingSoftware
  },
  [Routes.MrpSoftwareSmallManufacturers]: {
    title: 'MRP for Small Manufacturers',
    description: 'Material requirements planning without ERP complexity',
    href: Routes.MrpSoftwareSmallManufacturers
  },
  [Routes.ErpSchedulingAddOn]: {
    title: 'ERP Scheduling Add-On',
    description: 'Add finite capacity scheduling to any ERP system',
    href: Routes.ErpSchedulingAddOn
  },
  [Routes.WhatIfAnalysis]: {
    title: 'What-If Analysis',
    description: 'Simulate scenarios before committing to production',
    href: Routes.WhatIfAnalysis
  },
  [Routes.MultiLocationScheduling]: {
    title: 'Multi-Location Scheduling',
    description: 'Unified scheduling across multiple plants and sites',
    href: Routes.MultiLocationScheduling
  },
  [Routes.BomSoftware]: {
    title: 'Bill of Materials (BOM)',
    description: 'Multi-level BOM management tied to scheduling',
    href: Routes.BomSoftware
  },
  [Routes.MasterProductionSchedule]: {
    title: 'Master Production Schedule',
    description: 'Long-horizon capacity planning and MPS generation',
    href: Routes.MasterProductionSchedule
  },
  [Routes.LaborScheduling]: {
    title: 'Labor Scheduling',
    description: 'Workforce capacity planning alongside machines',
    href: Routes.LaborScheduling
  },
  [Routes.ExcelToScheduling]: {
    title: 'Excel to Scheduling Software',
    description: 'Upgrade from spreadsheets without losing familiarity',
    href: Routes.ExcelToScheduling
  },
  [Routes.OnTimeDelivery]: {
    title: 'On-Time Delivery',
    description: 'Improve OTD with realistic capacity-based dates',
    href: Routes.OnTimeDelivery
  },
  [Routes.ErpIntegration]: {
    title: 'ERP Integration',
    description: 'Bi-directional data sync with SAP, Oracle, Epicor, and more',
    href: Routes.ErpIntegration
  }
};

// Topically relevant cross-links for each page (5 links each)
const CROSS_LINK_MAP: Record<string, string[]> = {
  // === Industry pages → link to features + other industries ===
  [Routes.JobShopScheduling]: [
    Routes.FiniteCapacityScheduling,
    Routes.WhatIfAnalysis,
    Routes.ExcelToScheduling,
    Routes.OnTimeDelivery,
    Routes.ProductionSchedulingSoftware
  ],
  [Routes.DefenseAerospace]: [
    Routes.MasterProductionSchedule,
    Routes.MultiLocationScheduling,
    Routes.FiniteCapacityScheduling,
    Routes.LaborScheduling,
    Routes.ManufacturingSchedulingSoftware
  ],
  [Routes.ElectronicsManufacturing]: [
    Routes.BomSoftware,
    Routes.FiniteCapacityScheduling,
    Routes.MrpSoftwareSmallManufacturers,
    Routes.ErpIntegration,
    Routes.ProductionSchedulingSoftware
  ],
  [Routes.HeavyEquipment]: [
    Routes.MultiLocationScheduling,
    Routes.LaborScheduling,
    Routes.OnTimeDelivery,
    Routes.MasterProductionSchedule,
    Routes.ErpSchedulingAddOn
  ],
  [Routes.ConsumerGoods]: [
    Routes.MrpSoftwareSmallManufacturers,
    Routes.BomSoftware,
    Routes.ErpIntegration,
    Routes.MultiLocationScheduling,
    Routes.ProductionSchedulingSoftware
  ],

  // === Feature pages → link to features + industries ===
  [Routes.ProductionSchedulingSoftware]: [
    Routes.FiniteCapacityScheduling,
    Routes.OnTimeDelivery,
    Routes.ErpSchedulingAddOn,
    Routes.JobShopScheduling,
    Routes.HeavyEquipment
  ],
  [Routes.FiniteCapacityScheduling]: [
    Routes.ProductionSchedulingSoftware,
    Routes.OnTimeDelivery,
    Routes.LaborScheduling,
    Routes.WhatIfAnalysis,
    Routes.DefenseAerospace
  ],
  [Routes.ManufacturingSchedulingSoftware]: [
    Routes.ProductionSchedulingSoftware,
    Routes.FiniteCapacityScheduling,
    Routes.MasterProductionSchedule,
    Routes.JobShopScheduling,
    Routes.ElectronicsManufacturing
  ],
  [Routes.MrpSoftwareSmallManufacturers]: [
    Routes.BomSoftware,
    Routes.ProductionSchedulingSoftware,
    Routes.ExcelToScheduling,
    Routes.ConsumerGoods,
    Routes.ErpIntegration
  ],
  [Routes.ErpSchedulingAddOn]: [
    Routes.ErpIntegration,
    Routes.ProductionSchedulingSoftware,
    Routes.FiniteCapacityScheduling,
    Routes.OnTimeDelivery,
    Routes.HeavyEquipment
  ],
  [Routes.WhatIfAnalysis]: [
    Routes.FiniteCapacityScheduling,
    Routes.MasterProductionSchedule,
    Routes.OnTimeDelivery,
    Routes.JobShopScheduling,
    Routes.ProductionSchedulingSoftware
  ],
  [Routes.MultiLocationScheduling]: [
    Routes.MasterProductionSchedule,
    Routes.LaborScheduling,
    Routes.ErpIntegration,
    Routes.HeavyEquipment,
    Routes.DefenseAerospace
  ],
  [Routes.BomSoftware]: [
    Routes.MrpSoftwareSmallManufacturers,
    Routes.ProductionSchedulingSoftware,
    Routes.ErpIntegration,
    Routes.ElectronicsManufacturing,
    Routes.ConsumerGoods
  ],
  [Routes.MasterProductionSchedule]: [
    Routes.FiniteCapacityScheduling,
    Routes.MultiLocationScheduling,
    Routes.WhatIfAnalysis,
    Routes.LaborScheduling,
    Routes.HeavyEquipment
  ],
  [Routes.LaborScheduling]: [
    Routes.FiniteCapacityScheduling,
    Routes.OnTimeDelivery,
    Routes.MasterProductionSchedule,
    Routes.MultiLocationScheduling,
    Routes.DefenseAerospace
  ],
  [Routes.ExcelToScheduling]: [
    Routes.ProductionSchedulingSoftware,
    Routes.MrpSoftwareSmallManufacturers,
    Routes.FiniteCapacityScheduling,
    Routes.JobShopScheduling,
    Routes.ErpIntegration
  ],
  [Routes.OnTimeDelivery]: [
    Routes.FiniteCapacityScheduling,
    Routes.LaborScheduling,
    Routes.WhatIfAnalysis,
    Routes.ProductionSchedulingSoftware,
    Routes.JobShopScheduling
  ],
  [Routes.ErpIntegration]: [
    Routes.ErpSchedulingAddOn,
    Routes.ProductionSchedulingSoftware,
    Routes.ExcelToScheduling,
    Routes.MrpSoftwareSmallManufacturers,
    Routes.ConsumerGoods
  ]
};

type RelatedSolutionsProps = {
  currentPath: string;
};

export function RelatedSolutions({ currentPath }: RelatedSolutionsProps) {
  const relatedPaths = CROSS_LINK_MAP[currentPath];
  if (!relatedPaths || relatedPaths.length === 0) return null;

  const links = relatedPaths
    .map((path) => ALL_SOLUTIONS[path])
    .filter(Boolean);

  if (links.length === 0) return null;

  return (
    <section className="border-t bg-white py-12">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 className="mb-2 text-center text-2xl font-bold text-slate-900">
          Explore Related Solutions
        </h2>
        <p className="mb-8 text-center text-slate-600">
          Discover how these capabilities work together to transform your manufacturing operations.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-lg border border-slate-200 bg-slate-50 p-4 transition-all hover:border-cyan-300 hover:bg-cyan-50 hover:shadow-sm"
            >
              <h3 className="mb-1 text-sm font-semibold text-slate-900 group-hover:text-cyan-700">
                {link.title}
              </h3>
              <p className="mb-2 text-xs leading-relaxed text-slate-500">
                {link.description}
              </p>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-cyan-600 group-hover:text-cyan-700">
                Learn more
                <ArrowRightIcon className="size-3" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
