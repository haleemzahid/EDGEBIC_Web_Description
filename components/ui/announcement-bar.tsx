'use client';

import * as React from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Megaphone, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Routes } from '@/constants/routes';

interface AnnouncementBarProps {
  message?: string;
  linkText?: string;
  linkHref?: string;
  dismissible?: boolean;
}

export function AnnouncementBar({
  message = '🎉 Special Offer: Get 20% off EDGEBI - Limited Time!',
  linkText = 'Learn More',
  linkHref = Routes.JobSchedulerLite,
  dismissible = true
}: AnnouncementBarProps): React.JSX.Element | null {
  const [isVisible, setIsVisible] = React.useState(true);
  const [isDismissed, setIsDismissed] = React.useState(false);

  React.useEffect(() => {
    // Check if user has dismissed the announcement
    const dismissed = localStorage.getItem('announcement-dismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    if (dismissible) {
      localStorage.setItem('announcement-dismissed', 'true');
      setIsDismissed(true);
    }
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white"
        >
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-center gap-4 text-sm font-medium">
              <Megaphone className="hidden size-5 shrink-0 sm:block" />
              <span className="text-center">{message}</span>
              <Link
                href={linkHref}
                className="shrink-0 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-orange-600 transition-transform hover:scale-105"
              >
                {linkText}
              </Link>
              {dismissible && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDismiss}
                  className="ml-auto shrink-0 text-white hover:bg-white/20 hover:text-white sm:ml-0"
                  aria-label="Dismiss announcement"
                >
                  <X className="size-4" />
                </Button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
