'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { Routes } from '@/constants/routes';
import { cn } from '@/lib/utils';

export function FloatingCTA(): React.JSX.Element {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling 500px
      setIsVisible(window.pageYOffset > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return <></>;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className="fixed bottom-24 right-8 z-40 hidden flex-col gap-2 lg:flex"
    >
      <Link
        href="tel:248.486.6365"
        className={cn(
          buttonVariants({ variant: 'default', size: 'lg' }),
          'group gap-2 rounded-full bg-blue-600 shadow-lg transition-all hover:scale-105 hover:bg-blue-700'
        )}
      >
        <Phone className="size-5 transition-transform group-hover:rotate-12" />
        <span className="font-semibold">248.486.6365</span>
      </Link>
      <Link
        href={Routes.Contact}
        className={cn(
          buttonVariants({ variant: 'outline', size: 'lg' }),
          'group gap-2 rounded-full shadow-lg transition-all hover:scale-105 hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950'
        )}
      >
        <Mail className="size-5" />
        <span className="font-semibold">Contact Us</span>
      </Link>
    </motion.div>
  );
}
