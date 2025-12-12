'use client';

import * as React from 'react';

import { NextButton } from '@/components/ui/onboarding/next-button';
import { cn } from '@/lib/utils';

export type OnboardingThemeStepProps =
  React.HtmlHTMLAttributes<HTMLDivElement> & {
    canSubmit: boolean;
    loading: boolean;
    isLastStep: boolean;
  };

export function OnboardingThemeStep({
  canSubmit,
  loading,
  isLastStep,
  className,
  ...other
}: OnboardingThemeStepProps): React.JSX.Element {
  return (
    <div
      className={cn('flex w-full flex-col gap-4', className)}
      {...other}
    >
      <div className="text-center">
        <p className="text-muted-foreground">Theme selection has been disabled.</p>
      </div>
      <NextButton
        loading={loading}
        disabled={!canSubmit}
        isLastStep={isLastStep}
      />
    </div>
  );
}
