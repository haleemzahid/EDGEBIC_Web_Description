import { CheckCircle } from 'lucide-react';

const features = [
  'Finite Planning & Scheduling',
  'MRP and Inventory Management',
  'Routings and Priority Scheduling',
  'Easy "what-if" analysis',
  'Purchasing and Receiving',
  'Forecasting',
  'Costing and Estimating',
  'Integrates with ALL systems',
  'APS and Lean Manufacturing',
  'Ideal for Lean Manufacturing',
  'Run stand alone or networked',
  'Production Planning'
];

export function RMDBFeatureList() {
  return (
    <section className="py-6">
      <div className="container mx-auto max-w-7xl px-4">
        <h3 className='text-xl font-bold mb-4'>Features</h3>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 size-4 shrink-0 text-green-600" />
              <span className="text-[18px] text-slate-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
