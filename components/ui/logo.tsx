import * as React from 'react';
import Image from 'next/image';

import { AppInfo } from '@/constants/app-info';
import { cn } from '@/lib/utils';

// The logo size below is 96px x 96px in an 96px x 96px container (size-24).
// Because of the larger size, the components <Sidebar /> and <Mobilesheet /> may need padding adjustments.
// When you update the logo make sure to eventually adjust the pl-0.5 class in those two components if needed.

export type LogoProps = React.HTMLAttributes<HTMLDivElement> & {
  hideSymbol?: boolean;
  hideWordmark?: boolean;
};

export function Logo({
  hideSymbol,
  hideWordmark = true, // Hide wordmark by default, show only logo
  className,
  ...other
}: LogoProps): React.JSX.Element {
  return (
    <div
      className={cn('flex items-center space-x-2', className)}
      {...other}
    >
      {!hideSymbol && (
        <div className="flex h-[50px] w-[120px] items-center justify-center">
          <div className="flex h-[50px] w-[120px] items-center justify-center">
            {/* EDGEBI Logo */}
            <Image
              src="/logos/edgebic-logo.png"
              alt="EDGEBI Logo"
              width={120}
              height={50}
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
      {!hideWordmark && <span className="font-bold">{AppInfo.APP_NAME}</span>}
    </div>
  );
}
