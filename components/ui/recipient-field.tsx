'use client';

import * as React from 'react';

import {
  searchContacts,
  type ContactSuggestion
} from '@/actions/contacts/search-contacts';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import { TagInput, type TagType } from '@/components/ui/tag-input';
import { cn } from '@/lib/utils';

const toTags = (emails: string[]): TagType[] =>
  emails.map((e) => ({ id: e, text: e }));
const fromTags = (tags: TagType[]): string[] => tags.map((t) => t.text);

export type RecipientFieldProps = {
  value: string[];
  onChange: (emails: string[]) => void;
  validate: (email: string) => boolean;
  placeholder?: string;
  disabled?: boolean;
};

// Composes the existing TagInput (chips) with the existing Command list for
// CRM-contact autocomplete — same compose-from-primitives approach as
// components/ui/combobox.tsx. Suggestions come from the searchContacts
// server action (debounced).
export function RecipientField({
  value,
  onChange,
  validate,
  placeholder,
  disabled
}: RecipientFieldProps): React.JSX.Element {
  const [query, setQuery] = React.useState('');
  const [suggestions, setSuggestions] = React.useState<ContactSuggestion[]>(
    []
  );
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    let active = true;
    const timer = setTimeout(async () => {
      const result = await searchContacts({ query: q });
      if (!active) return;
      const found = (result?.data?.suggestions ?? []).filter(
        (s) => !value.includes(s.email)
      );
      setSuggestions(found);
      setOpen(found.length > 0);
    }, 250);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [query, value]);

  const addEmail = (email: string): void => {
    if (!value.includes(email)) onChange([...value, email]);
    setSuggestions([]);
    setOpen(false);
  };

  return (
    <div className="relative">
      <TagInput
        tags={toTags(value)}
        onTagsChange={(t) => onChange(fromTags(t))}
        onInputChange={setQuery}
        validateTag={validate}
        allowDuplicates={false}
        delimiterList={['Enter', ',', ' ']}
        inputFieldPosition="inline"
        direction="row"
        size="sm"
        variant="default"
        shape="pill"
        placeholder={placeholder}
        disabled={disabled}
      />
      {open && suggestions.length > 0 && (
        <div
          className={cn(
            'absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden',
            'rounded-md border bg-popover shadow-md'
          )}
        >
          <Command shouldFilter={false}>
            <CommandList>
              <CommandEmpty>No contacts found.</CommandEmpty>
              <CommandGroup>
                {suggestions.map((s) => (
                  <CommandItem
                    key={s.email}
                    value={s.email}
                    onSelect={() => addEmail(s.email)}
                  >
                    <span className="flex flex-col">
                      <span className="text-sm">{s.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {s.email}
                      </span>
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
}
