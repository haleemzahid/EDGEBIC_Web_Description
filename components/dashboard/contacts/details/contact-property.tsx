import * as React from 'react';

export type ContactPropertyProps = {
  icon: React.ReactNode;
  term: string;
  details?: React.ReactNode;
  placeholder: string;
};

export function ContactProperty({
  icon,
  term,
  details,
  placeholder
}: ContactPropertyProps): React.JSX.Element {
  return (
    <div className="flex h-7 flex-row items-center whitespace-nowrap">
      <span className="flex h-7 min-w-24 flex-row items-center gap-2 text-muted-foreground">
        {icon}
        {term}
      </span>
      <span className="flex h-7 w-full max-w-[196px] flex-row items-center overflow-hidden text-ellipsis">
        {details ? (
          details
        ) : (
          <p className="text-muted-foreground opacity-65">{placeholder}</p>
        )}
      </span>
    </div>
  );
}
