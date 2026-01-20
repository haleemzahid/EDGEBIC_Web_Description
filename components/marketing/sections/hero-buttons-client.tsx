'use client';

import * as React from 'react';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';

interface HeroButtonsProps {
  price: string;
}

export function HeroButtons({ price }: HeroButtonsProps): React.JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.4 }}
      className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
    >
      <Button
        size="lg"
        asChild
        className="bg-gradient-to-r from-orange-500 to-red-500 px-8 py-3 text-lg font-bold text-white hover:from-orange-600 hover:to-red-600"
      >
        <a href="#EDGEBICPricing">Get EDGEBI - {price}</a>
      </Button>
      <Button
        size="lg"
        variant="outline"
        asChild
        className="border-2 px-8 py-3 text-lg"
      >
        <a href="#demo">Schedule Live Demo</a>
      </Button>
    </motion.div>
  );
}
