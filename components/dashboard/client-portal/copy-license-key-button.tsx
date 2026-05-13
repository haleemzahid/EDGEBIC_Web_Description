'use client';

import * as React from 'react';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

export type CopyLicenseKeyButtonProps = {
  value: string;
};

export function CopyLicenseKeyButton({
  value
}: CopyLicenseKeyButtonProps): React.JSX.Element {
  const [copied, setCopied] = React.useState(false);

  const handleClick = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success('License key copied');
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy. Select the key manually.");
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleClick}
      className="gap-1.5"
      title="Copy license key"
    >
      {copied ? (
        <CheckIcon className="size-3.5 text-emerald-600" />
      ) : (
        <CopyIcon className="size-3.5" />
      )}
      <span>{copied ? 'Copied' : 'Copy'}</span>
    </Button>
  );
}
