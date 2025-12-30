'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';

// Lazy load tab content components
const RMDBInDepthContent = dynamic(
  () => import('./rmdb-in-depth-content').then((mod) => ({ default: mod.RMDBInDepthContent })),
  { loading: () => <div className="min-h-[400px] animate-pulse bg-slate-100 rounded-lg" /> }
);

const EDGEBIContent = dynamic(
  () => import('./edgebi-content').then((mod) => ({ default: mod.EDGEBIContent })),
  { loading: () => <div className="min-h-[400px] animate-pulse bg-slate-100 rounded-lg" /> }
);

type TabType = 'summary' | 'in-depth' | 'quick-start' | 'edgebi' | 'live-demo';

interface RMDBTabsClientProps {
  summaryContent: React.ReactNode;
  quickStartContent: React.ReactNode;
  liveDemoContent: React.ReactNode;
}

export function RMDBTabsClient({
  summaryContent,
  quickStartContent,
  liveDemoContent,
}: RMDBTabsClientProps) {
  const [activeTab, setActiveTab] = React.useState<TabType>('summary');

  const tabs = [
    { id: 'summary' as TabType, label: 'Summary' },
    { id: 'in-depth' as TabType, label: 'In Depth' },
    { id: 'quick-start' as TabType, label: 'Quick Start' },
    { id: 'edgebi' as TabType, label: 'EDGEBI' },
    { id: 'live-demo' as TabType, label: 'Live Demo' },
  ];

  return (
    <>
      {/* Navigation Tabs */}
      <section className="pt-6">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap justify-center gap-6 text-[18px]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`transition-colors ${
                  activeTab === tab.id
                    ? 'font-semibold text-cyan-500'
                    : 'text-slate-700 hover:text-cyan-500'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="pt-6">
        <div className="container mx-auto max-w-7xl px-4">
          {activeTab === 'summary' && summaryContent}
          {activeTab === 'in-depth' && <RMDBInDepthContent />}
          {activeTab === 'quick-start' && quickStartContent}
          {activeTab === 'edgebi' && <EDGEBIContent />}
          {activeTab === 'live-demo' && liveDemoContent}
        </div>
      </section>
    </>
  );
}
