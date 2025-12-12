'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { ClipboardIcon, FileTextIcon, ZapIcon } from 'lucide-react';

export function HeroAnimation(): React.JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
      className="relative mx-auto mt-6 max-w-4xl"
    >
      <div className="rounded-2xl border bg-gradient-to-br from-slate-50 to-slate-100 p-8 shadow-2xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 text-center shadow-lg">
            <FileTextIcon className="mx-auto mb-4 size-12 text-blue-500" />
            <h3 className="mb-2 text-lg font-semibold">PDF Input</h3>
            <p className="text-sm text-muted-foreground">
              Copy structured data from any PDF document
            </p>
          </div>
          <div className="rounded-xl bg-white p-6 text-center shadow-lg">
            <ZapIcon className="mx-auto mb-4 size-12 text-yellow-500" />
            <h3 className="mb-2 text-lg font-semibold">Smart Parsing</h3>
            <p className="text-sm text-muted-foreground">
              Intelligent extraction of parts, quantities, descriptions
            </p>
          </div>
          <div className="rounded-xl bg-white p-6 text-center shadow-lg">
            <ClipboardIcon className="mx-auto mb-4 size-12 text-green-500" />
            <h3 className="mb-2 text-lg font-semibold">Clipboard Ready</h3>
            <p className="text-sm text-muted-foreground">
              Perfect formatting for spreadsheets and databases
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
