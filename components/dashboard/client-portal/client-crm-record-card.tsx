import * as React from 'react';
import { BriefcaseIcon, MapPinIcon, TagIcon } from 'lucide-react';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  type CardProps
} from '@/components/ui/card';

export type ClientCrmRecordCardProps = CardProps & {
  record: {
    company?: string;
    jobTitle?: string;
    address?: string;
    leadSource?: string;
  };
};

export function ClientCrmRecordCard({
  record,
  ...other
}: ClientCrmRecordCardProps): React.JSX.Element {
  const items: Array<{
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value?: string;
  }> = [
    { icon: BriefcaseIcon, label: 'Company', value: record.company },
    { icon: BriefcaseIcon, label: 'Job title', value: record.jobTitle },
    { icon: MapPinIcon, label: 'Address', value: record.address },
    { icon: TagIcon, label: 'How we met', value: record.leadSource }
  ].filter((i) => !!i.value);

  return (
    <Card {...other}>
      <CardHeader>
        <CardTitle>Your CRM record</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <p className="text-xs text-muted-foreground">
          What your project team has on file. To update any of these, message
          your project owner.
        </p>
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No additional details on file yet.
          </p>
        ) : (
          <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {items.map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-2"
              >
                <item.icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">
                    {item.label}
                  </dt>
                  <dd className="truncate text-sm font-medium">
                    {item.value}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        )}
      </CardContent>
    </Card>
  );
}
