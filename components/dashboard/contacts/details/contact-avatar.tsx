import * as React from 'react';
import { ContactRecord } from '@prisma/client';
import { BuildingIcon, UserIcon } from 'lucide-react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  type AvatarProps
} from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export type ContactAvatarProps = AvatarProps & {
  record: ContactRecord;
  src?: string;
  alt?: string;
  /**
   * What to render when there's no image. Defaults to the person/company
   * icon. Pass e.g. initials to show those instead.
   */
  fallback?: React.ReactNode;
};

export function ContactAvatar({
  record,
  src,
  alt,
  fallback,
  className,
  ...other
}: ContactAvatarProps): React.JSX.Element {
  return (
    <Avatar
      className={cn(
        'size-4 flex-none shrink-0',
        record === ContactRecord.PERSON && 'rounded-full',
        record === ContactRecord.COMPANY && 'rounded-md',
        className
      )}
      {...other}
    >
      <AvatarImage
        src={src}
        alt={alt ?? 'avatar'}
      />
      <AvatarFallback>
        {fallback ??
          (record === ContactRecord.COMPANY ? (
            <BuildingIcon className="size-4 shrink-0 text-muted-foreground" />
          ) : (
            <UserIcon className="size-4 shrink-0 text-muted-foreground" />
          ))}
      </AvatarFallback>
    </Avatar>
  );
}
