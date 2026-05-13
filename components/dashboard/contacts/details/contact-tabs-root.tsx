'use client';

import * as React from 'react';
import { parseAsString, useQueryState } from 'nuqs';

import { Tabs } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

export type ContactTabsRootProps = {
  defaultValue: string;
  allowedValues: string[];
  className?: string;
  children: React.ReactNode;
};

export function ContactTabsRoot({
  defaultValue,
  allowedValues,
  className,
  children
}: ContactTabsRootProps): React.JSX.Element {
  const [tab, setTab] = useQueryState(
    'tab',
    parseAsString.withDefault(defaultValue).withOptions({ history: 'replace' })
  );
  const safeTab = allowedValues.includes(tab) ? tab : defaultValue;
  return (
    <Tabs
      value={safeTab}
      onValueChange={(next) => {
        // Drop the ?tab= param when it equals the default so the URL stays
        // clean on the initial tab.
        void setTab(next === defaultValue ? null : next);
      }}
      orientation="vertical"
      className={cn('flex size-full flex-row overflow-hidden', className)}
    >
      {children}
    </Tabs>
  );
}
