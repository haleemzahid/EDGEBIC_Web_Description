'use client';

import * as React from 'react';

export interface Tab<T extends string = string> {
  id: T;
  label: string;
}

interface ProductTabsProps<T extends string> {
  tabs: Tab<T>[];
  activeTab: T;
  onTabChange: (tab: T) => void;
  ariaLabel?: string;
}

export function ProductTabs<T extends string>({
  tabs,
  activeTab,
  onTabChange,
  ariaLabel = 'Product information tabs',
}: ProductTabsProps<T>) {
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
    onTabChange(tabs[newIndex].id);
    // Focus the new tab button
    const tabButtons = document.querySelectorAll('[role="tab"]');
    (tabButtons[newIndex] as HTMLElement)?.focus();
  };

  return (
    <nav className="pt-6" aria-label={ariaLabel}>
      <div className="container mx-auto max-w-7xl px-4">
        <div
          className="flex flex-wrap justify-start gap-2 text-[18px]"
          role="tablist"
          aria-label={ariaLabel}
        >
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              type="button"
              id={`tab-${tab.id}`}
              role="tab"
              aria-selected={activeTab === tab.id ? 'true' : 'false'}
              aria-controls={`tabpanel-${tab.id}`}
              tabIndex={activeTab === tab.id ? 0 : -1}
              onClick={() => onTabChange(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`transition-all duration-200 focus:outline-none px-4 py-3 border-b-2 ${
                activeTab === tab.id
                  ? 'font-semibold text-blue-600 border-blue-600 bg-blue-50'
                  : 'text-slate-600 hover:text-blue-600 border-transparent hover:border-blue-600 hover:bg-blue-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
