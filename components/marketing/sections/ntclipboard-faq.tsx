import * as React from 'react';

import { GridSection } from '@/components/marketing/fragments/grid-section';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { getNTClipboardPricing } from '@/lib/billing/get-ntclipboard-pricing';

async function getFaqs(price: string) {
  return [
    {
      question: 'What types of PDFs does Edgebicwork with?',
      answer:
        'Edgebi works with any PDF containing structured data like parts lists, inventory documents, job sheets, and technical specifications. It uses intelligent pattern recognition to identify part numbers, descriptions, quantities, weights, and job numbers.'
    },
    {
      question: 'How secure is my data?',
      answer:
        'Your data never leaves your computer. Edgebi processes everything locally on your Windows machine, ensuring complete privacy and security. No internet connection is required for the core functionality.'
    },
    {
      question: 'What keyboard shortcuts are available?',
      answer:
        'Edgebi includes several time-saving shortcuts: ESC to clear, TAB to send selected items to clipboard, and ` (backtick) to view current clipboard contents. The app also minimizes to system tray for quick access.'
    },
    // {
    //   question: 'Can I customize the output format?',
    //   answer:
    //     'Yes! You can select specific items from parsed data, merge multiple entries, and the output is formatted perfectly for pasting into spreadsheets, databases, or any application that accepts text input.'
    // },
    {
      question: 'Do I get updates with the one-time purchase?',
      answer: `Absolutely! Your ${price} one-time purchase includes all future updates and improvements to NTClipboard. No subscription fees, no additional costs.`
    },
    // {
    //   question: "What if Edgebicdoesn't work for my PDFs?",
    //   answer:
    //     "We offer a 30-day money-back guarantee. If Edgebicdoesn't meet your needs or work with your specific PDF format, we'll provide a full refund, no questions asked."
    // },
    {
      question: 'How does the intelligent parsing work?',
      answer:
        'Edgebicuses advanced pattern recognition to identify structured data in PDFs. It looks for common patterns like part numbers (100-xxxxx), quantities, weights, descriptions, and job numbers, then organizes them into a clean, selectable format.'
    },
    {
      question: 'Can I use Edgebicon multiple computers?',
      answer:
        "Yes! Each individual user will need to download and install Edgebicon their own system. The software works offline and doesn't require online activation after initial setup."
    }
  ];
}

export async function NTClipboardFAQ(): Promise<React.JSX.Element> {
  const pricing = await getNTClipboardPricing();
  const displayPrice = pricing?.formattedPrice || '$49';
  const faqs = await getFaqs(displayPrice);

  return (
    <GridSection hideVerticalGridLines>
      <div className="container py-24 md:py-32">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="text-center lg:text-left">
            <h2 className="mb-2.5 text-3xl font-semibold md:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-6 hidden text-muted-foreground md:block lg:max-w-[75%]">
              Got questions about NTClipboard? We've got answers. If you need
              additional help, our support team is ready to assist.
            </p>
          </div>
          <Accordion
            type="single"
            collapsible
            className="w-full"
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
              >
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </GridSection>
  );
}
