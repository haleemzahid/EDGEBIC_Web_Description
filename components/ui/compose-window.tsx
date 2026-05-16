'use client';

import * as React from 'react';
import { Maximize2Icon, Minimize2Icon, MinusIcon, XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const headerBtn =
  'size-7 shrink-0 text-neutral-300 hover:bg-white/10 hover:text-white';

export type ComposeWindowProps = {
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  children: React.ReactNode;
  /** Pinned bottom bar — typically the Send button + a small toolbar. */
  footer?: React.ReactNode;
  /** Disable the close control (e.g. while sending). */
  closeDisabled?: boolean;
  /** Files dropped anywhere on the (non-minimized) window. */
  onFilesDropped?: (files: File[]) => void;
};

// Gmail-style compose surface: a non-modal panel docked to the bottom-right
// of the viewport. It is intentionally NOT a Radix Dialog so the rest of the
// page stays interactive while composing. Three states, like Gmail:
//   - docked  : default ~500px window pinned bottom-right
//   - minimized: collapsed to just the header bar
//   - expanded : large centered window
// On small screens it always goes full-screen.
export function ComposeWindow({
  open,
  onClose,
  title,
  children,
  footer,
  closeDisabled,
  onFilesDropped
}: ComposeWindowProps): React.JSX.Element | null {
  const [minimized, setMinimized] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [dragOver, setDragOver] = React.useState(false);

  // Reset chrome state each time the window is (re)opened.
  React.useEffect(() => {
    if (open) {
      setMinimized(false);
      setExpanded(false);
    }
  }, [open]);

  if (!open) return null;

  const header = (
    <div
      className="flex h-10 shrink-0 cursor-pointer items-center justify-between bg-[#404040] px-4 text-sm font-medium text-neutral-50"
      onClick={() => setMinimized((m) => !m)}
    >
      <span className="truncate pr-2">{title}</span>
      <div className="flex items-center gap-0.5">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={minimized ? 'Restore' : 'Minimize'}
          className={headerBtn}
          onClick={(e) => {
            e.stopPropagation();
            setMinimized((m) => !m);
          }}
        >
          <MinusIcon className="size-4 shrink-0" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={expanded ? 'Collapse' : 'Expand'}
          className={cn(headerBtn, 'hidden sm:inline-flex')}
          onClick={(e) => {
            e.stopPropagation();
            setMinimized(false);
            setExpanded((x) => !x);
          }}
        >
          {expanded ? (
            <Minimize2Icon className="size-4 shrink-0" />
          ) : (
            <Maximize2Icon className="size-4 shrink-0" />
          )}
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Close"
          disabled={closeDisabled}
          className={headerBtn}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <XIcon className="size-4 shrink-0" />
        </Button>
      </div>
    </div>
  );

  // Minimized is its own compact render: a fixed-height title bar docked
  // bottom-right. It deliberately does NOT mount the body/footer, so it can
  // never blow up into a tall empty panel.
  if (minimized) {
    return (
      <div
        role="dialog"
        aria-label={typeof title === 'string' ? title : 'Compose'}
        className="fixed bottom-0 right-4 z-50 w-[min(100vw,360px)] overflow-hidden rounded-t-lg border shadow-2xl md:right-6"
      >
        {header}
      </div>
    );
  }

  return (
    <div
      role="dialog"
      aria-label={typeof title === 'string' ? title : 'Compose'}
      className={cn(
        'fixed z-50 flex flex-col overflow-hidden border bg-background shadow-2xl',
        // Mobile: always full-screen.
        'inset-0 rounded-none',
        expanded
          ? // Expanded: large, centered.
            'sm:inset-0 sm:m-auto sm:h-[min(92vh,820px)] sm:w-[min(96vw,900px)] sm:rounded-lg'
          : // Docked: default compose window, bottom-right.
            'sm:inset-auto sm:bottom-0 sm:right-4 sm:h-[min(90vh,560px)] sm:w-[min(100vw,500px)] sm:rounded-t-lg md:right-6'
      )}
    >
      {header}
      <div
        className="relative flex min-h-0 flex-1 flex-col overflow-y-auto"
        onDragOver={
          onFilesDropped
            ? (e) => {
                e.preventDefault();
                setDragOver(true);
              }
            : undefined
        }
        onDragLeave={
          onFilesDropped
            ? (e) => {
                e.preventDefault();
                setDragOver(false);
              }
            : undefined
        }
        onDrop={
          onFilesDropped
            ? (e) => {
                e.preventDefault();
                setDragOver(false);
                const files = Array.from(e.dataTransfer.files ?? []);
                if (files.length > 0) onFilesDropped(files);
              }
            : undefined
        }
      >
        {dragOver && (
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center border-2 border-dashed border-primary bg-primary/10 text-sm font-medium text-primary">
            Drop files to attach
          </div>
        )}
        {children}
      </div>
      {footer && (
        <div className="flex shrink-0 items-center gap-2 border-t bg-background px-3 py-2">
          {footer}
        </div>
      )}
    </div>
  );
}
