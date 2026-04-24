'use client';

import * as React from 'react';

import type { ContactDto } from '@/types/dtos/contact-dto';

export type ContactDescriptionSectionProps =
  React.HtmlHTMLAttributes<HTMLDivElement> & {
    contact: ContactDto;
  };

export function ContactDescriptionSection({
  contact,
  ...others
}: ContactDescriptionSectionProps): React.JSX.Element {
  return (
    <section {...others}>
      <div className="flex h-16 flex-row items-center p-6">
        <h3 className="text-sm font-semibold tracking-tight">Description</h3>
      </div>
      <div className="p-6 pt-0">
        {contact.description ? (
          <p className="whitespace-pre-wrap break-words text-sm">
            {contact.description}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground opacity-65">
            No description available
          </p>
        )}
      </div>
    </section>
  );
}
