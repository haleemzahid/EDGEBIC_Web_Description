import { CheckCircle } from 'lucide-react';

const features = [
  'Finite Capacity Planning & Scheduling',
  'MRP and Inventory Management',
  'Easy "what-if" Analysis',
  'Downtime Analysis and Reporting',
  'Costing and Estimating',
  'Running Stand Alone or Networked',
  'Dragging and Dropping Adjustments',
  'Optional LP Optimization Integration',
  'Advanced Planning and Scheduling',
  'Routings and Priority Scheduling',
  'Purchasing and Receiving',
  'Simple Maintenance and Updating',
  'Integrating with All Systems',
  'Production Planning',
  'Concurrent Resource Scheduling',
  'Customized Reports'
];

export function RMDBFeatureList() {
  return (
    <section
      className="py-6"
      aria-labelledby="features-heading"
    >
      <div className="container mx-auto max-w-7xl px-4">
        <h2
          id="features-heading"
          className="mb-4 text-xl font-bold text-slate-900"
        >
          Features
        </h2>
        <ul
          className="grid gap-3 md:grid-cols-2"
          role="list"
          aria-label="Resource Manager DB features"
        >
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center gap-2"
            >
              <CheckCircle
                className="mt-0.5 size-4 shrink-0 text-green-600"
                aria-hidden="true"
              />
              <span className="text-base text-slate-700">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
