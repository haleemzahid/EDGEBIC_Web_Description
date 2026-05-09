'use client';

import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';

export function ClarityAnalytics() {
  useEffect(() => {
    Clarity.init('w9x1j8owo7');
  }, []);

  return null;
}
