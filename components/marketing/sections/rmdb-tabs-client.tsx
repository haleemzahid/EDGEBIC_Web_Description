'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';

// Lazy load tab content components
const RMDBInDepthContent = dynamic(
  () => import('./rmdb-in-depth-content').then((mod) => ({ default: mod.RMDBInDepthContent })),
  { loading: () => <div className="min-h-[400px] animate-pulse bg-slate-100 rounded-lg" aria-busy="true" aria-label="Loading content" /> }
);

const EDGEBIContent = dynamic(
  () => import('./edgebi-content').then((mod) => ({ default: mod.EDGEBIContent })),
  { loading: () => <div className="min-h-[400px] animate-pulse bg-slate-100 rounded-lg" aria-busy="true" aria-label="Loading content" /> }
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

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let newIndex = index;

    if (e.key === 'ArrowRight') {
      newIndex = (index + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      newIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      newIndex = 0;
    } else if (e.key === 'End') {
      newIndex = tabs.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    setActiveTab(tabs[newIndex].id);
    // Focus the new tab button
    const tabButtons = document.querySelectorAll('[role="tab"]');
    (tabButtons[newIndex] as HTMLElement)?.focus();
  };

  return (
    <>
      {/* Navigation Tabs */}
      <nav className="pt-6" aria-label="Product information tabs">
        <div className="container mx-auto max-w-7xl px-4">
          <div
            className="flex flex-wrap justify-center gap-6 text-[18px]"
            role="tablist"
            aria-label="Resource Manager DB sections"
          >
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                role="tab"
                aria-selected={activeTab === tab.id ? 'true' : 'false'}
                aria-controls={`tabpanel-${tab.id}`}
                tabIndex={activeTab === tab.id ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 rounded-sm px-2 py-1 ${activeTab === tab.id
                    ? 'font-semibold  '
                    : 'text-slate-700 hover: '
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Tab Content */}
      <section className="pt-6" aria-label="Tab content">
        <div className="container mx-auto max-w-7xl px-4">
          <div
            id={`tabpanel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            tabIndex={0}
          >
            {activeTab === 'summary' && summaryContent}
            {activeTab === 'in-depth' && <RMDBInDepthContent />}
            {activeTab === 'quick-start' && quickStartContent}
            {activeTab === 'edgebi' && <EDGEBIContent />}
            {activeTab === 'live-demo' && liveDemoContent}
          </div>
        </div>
      </section>
    </>
  );
}
