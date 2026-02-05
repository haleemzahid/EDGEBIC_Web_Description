import * as React from 'react';

import { Badge } from '@/components/ui/badge';

export type SiteHeadingProps = {
  badge?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
};

export function SiteHeading({
  badge,
  title,
  description
}: SiteHeadingProps): React.JSX.Element {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 text-center">
      {badge && (
        <Badge
          variant="outline"
          className="h-8 rounded-full px-3 text-sm font-medium shadow-sm"
        >
          {badge}
        </Badge>
      )}
      {title && (
        <h1 className="text-pretty text-3xl font-bold leading-tight lg:text-4xl lg:leading-tight">
          {title}
        </h1>
      )}
      {description && (
        <p className="text-muted-foreground" style={{ fontSize: '18px' }}>
          {description}
        </p>
      )}
    </div>
  );
}
