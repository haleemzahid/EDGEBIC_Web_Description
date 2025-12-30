import * as React from 'react';

const modules = [
  'Import Data',
  'Daily Hours',
  'Holidays',
  'Configure',
  'Resources',
  'Orders',
  'FG / RL',
  'Reports',
  'Schedule',
  'InSight',
  'Export Data',
  'Exit'
];

export function JSLModuleList(): React.JSX.Element {
  return (
    <div>
      <h3 className="mb-4 text-xl font-bold text-slate-900">Modules</h3>
      <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
        {modules.map((module) => (
          <div
            key={module}
            className="rounded-lg bg-blue-50 px-4 py-3 text-center text-sm font-medium text-slate-700"
          >
            {module}
          </div>
        ))}
      </div>
    </div>
  );
}
