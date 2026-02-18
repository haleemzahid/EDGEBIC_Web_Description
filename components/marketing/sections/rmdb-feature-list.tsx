import { CheckCircle } from 'lucide-react';

const features = [
  'Finite Capacity Planning & Scheduling',
  'Advanced Planning and Scheduling',
  'MRP and Inventory Management',
  'Routings and Priority Scheduling',
  'Easy "what-if" Analysis',
  'Purchasing and Receiving',
  'Downtime Analysis and Reporting',
  'Simple Maintenance and Updating',
  'Costing and Estimating',
  'Integrating with All Systems',
  'Running Stand Alone or Networked',
  'Production Planning',
  'Dragging and Dropping Adjustments',
  'Concurrent Resource Scheduling',
  'Optional LP Optimization Integration',
  'Customized Reports'
];

export function RMDBFeatureList() {
  return (
    <section className="py-6" aria-labelledby="features-heading">
      <div className="container mx-auto max-w-7xl px-4">
        <h2 id="features-heading" className="mb-4 text-xl font-bold text-slate-900">Features</h2>
        <ul className="grid gap-3 md:grid-cols-2" role="list" aria-label="Resource Manager DB features">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 size-4 shrink-0 text-green-600" aria-hidden="true" />
              <span className="text-base text-slate-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
