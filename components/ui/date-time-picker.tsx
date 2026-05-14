'use client';

import * as React from 'react';
import { format, setHours, setMinutes } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Button, type ButtonProps } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export type DateTimePickerProps = ButtonProps & {
  date?: Date;
  onDateChange?: (date?: Date) => void;
  placeholder?: string;
};

export function DateTimePicker({
  date,
  onDateChange,
  placeholder = 'Pick a date and time',
  className,
  variant,
  ...other
}: DateTimePickerProps): React.JSX.Element {
  const timeValue = date ? format(date, 'HH:mm') : '';

  const handleCalendarSelect = (selected?: Date): void => {
    if (!selected) {
      onDateChange?.(undefined);
      return;
    }
    // Preserve the time portion the user already chose (default to current
    // time if none was selected yet).
    const base = date ?? new Date();
    const next = setMinutes(
      setHours(selected, base.getHours()),
      base.getMinutes()
    );
    onDateChange?.(next);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (!value) return;
    const [h, m] = value.split(':').map(Number);
    if (Number.isNaN(h) || Number.isNaN(m)) return;
    const base = date ?? new Date();
    const next = setMinutes(setHours(base, h), m);
    onDateChange?.(next);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={variant || 'outline'}
          className={cn(
            'justify-start whitespace-nowrap text-left font-normal',
            !date && 'text-muted-foreground',
            className
          )}
          {...other}
        >
          <CalendarIcon className="mr-2 size-4 shrink-0" />
          {date ? format(date, 'PPP · HH:mm') : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="center"
        className="flex w-auto flex-col gap-2 p-2"
      >
        <Calendar
          mode="single"
          selected={date}
          defaultMonth={date}
          onSelect={handleCalendarSelect}
        />
        <div className="flex items-center gap-2 border-t pt-2">
          <span className="text-xs text-muted-foreground">Time</span>
          <Input
            type="time"
            value={timeValue}
            onChange={handleTimeChange}
            className="h-8 w-full"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
