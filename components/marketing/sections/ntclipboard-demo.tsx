'use client';

import * as React from 'react';
import { CheckIcon } from 'lucide-react';

import { GridSection } from '@/components/marketing/fragments/grid-section';

const steps = [
  {
    number: '1',
    title: 'Copy from PDF',
    description:
      'Select and copy data from any PDF document containing structured information'
  },
  {
    number: '2',
    title: 'Paste into NTClipboard',
    description:
      'Paste the copied data into Edgebi for intelligent parsing and organization'
  },
  {
    number: '3',
    title: 'Select & Merge',
    description:
      'Choose specific items, merge multiple entries, and customize the output format'
  },
  {
    number: '4',
    title: 'Send to Clipboard',
    description:
      'One click sends formatted data to Windows clipboard, ready to paste anywhere'
  }
];

export function NTClipboardDemo(): React.JSX.Element {
  return (
    <GridSection hideVerticalGridLines>
      <div
        id="HIW"
        className="bg-gradient-to-br from-slate-50 to-slate-100"
      >
        <div className="container py-24 md:py-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="mb-6 text-3xl font-bold md:text-5xl">
                How Edgebi Works
              </h2>
              <p className="mb-6 text-xl text-muted-foreground">
                Transform complex PDF data extraction into a simple 4-step
                process
              </p>
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4"
                  >
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-500 font-bold text-white">
                      {step.number}
                    </div>
                    <div>
                      <h3 className="mb-1 text-lg font-semibold">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-white p-8 shadow-2xl">
              <h3 className="mb-6 flex items-center gap-2 text-xl font-semibold">
                <CheckIcon className="size-5 text-green-500" />
                Live Preview
              </h3>
              <div className="space-y-4 font-mono text-sm">
                <div className="rounded bg-slate-100 p-3">
                  <div className="text-blue-600">Part Numbers:</div>
                  <div>100-12345, 100-67890, 100-54321</div>
                </div>
                <div className="rounded bg-slate-100 p-3">
                  <div className="text-green-600">Descriptions:</div>
                  <div>
                    Steel Bracket Assembly, Aluminum Housing, Connector Kit
                  </div>
                </div>
                <div className="rounded bg-slate-100 p-3">
                  <div className="text-purple-600">Job Numbers:</div>
                  <div>JOB-2024-001, JOB-2024-002, JOB-2024-003</div>
                </div>
                <div className="rounded bg-slate-100 p-3">
                  <div className="text-orange-600">Quantities:</div>
                  <div>25 pieces, 12 pieces, 8 pieces</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GridSection>
  );
}
