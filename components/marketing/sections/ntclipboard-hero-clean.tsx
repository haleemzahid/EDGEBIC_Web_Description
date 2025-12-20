import * as React from 'react';
import { motion } from 'framer-motion';
import { ClipboardIcon, FileTextIcon, ZapIcon } from 'lucide-react';

import { GridSection } from '@/components/marketing/fragments/grid-section';
import { Button } from '@/components/ui/button';
import { getNTClipboardPricing } from '@/lib/billing/get-ntclipboard-pricing';

interface HeroButtonsProps {
  price: string;
}

function HeroButtons({ price }: HeroButtonsProps): React.JSX.Element {
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
        <a href="#NTClipboardPricing">Get Edgebic- {price}</a>
      </Button>
      <Button
        size="lg"
        variant="outline"
        asChild
        className="border-2 px-8 py-3 text-lg"
      >
        <a href="#HIW">See How It Works</a>
      </Button>
    </motion.div>
  );
}

function HeroAnimation(): React.JSX.Element {
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

export async function NTClipboardHero(): Promise<React.JSX.Element> {
  const pricing = await getNTClipboardPricing();
  const displayPrice = pricing?.formattedPrice || '$49';

  return (
    <GridSection
      className="overflow-x-hidden"
      hideVerticalGridLines
    >
      <div className="mx-auto mt-6 flex flex-col gap-6 px-2 sm:mt-6 sm:px-1 md:mt-24 lg:mt-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-100 to-red-100 px-4 py-2 text-sm font-medium text-orange-800">
            <ClipboardIcon className="size-4" />
            Revolutionary PDF Workflow Tool
          </div>
          <h1 className="mb-6 bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-4xl font-bold text-transparent md:text-6xl lg:text-7xl">
            Copy PDF Data
            <br />
            Like Never Before
          </h1>
          <p className="mx-auto mb-6 max-w-3xl text-xl text-muted-foreground md:text-2xl">
            Transform your workflow with Edgebic- the ultimate tool for
            extracting and managing data from PDFs with seamless clipboard
            integration.
          </p>
        </motion.div>
        <HeroButtons price={displayPrice} />
        <HeroAnimation />
      </div>
    </GridSection>
  );
}
