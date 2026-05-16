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
    <div className="flex min-h-7 flex-row items-start">
      <span className="flex h-7 w-36 shrink-0 flex-row items-center gap-2 pr-3 text-muted-foreground">
        {icon}
        <span className="truncate">{term}</span>
      </span>
      <span className="flex min-h-7 w-full max-w-[196px] flex-col justify-center">
        {details ? (
          details
        ) : (
          <p className="text-muted-foreground opacity-65">{placeholder}</p>
        )}
      </span>
    </div>
  );
}
