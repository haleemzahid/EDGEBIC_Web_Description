import * as React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

type FaqQuestion = {
  question: string;
  answer: string;
};

type FaqSectionProps = {
  questions: FaqQuestion[];
};

export function FaqSection({ questions }: FaqSectionProps): React.JSX.Element {
  return (
    <section className="max-w-none py-8">
      <h2 className="mb-6 text-2xl font-bold text-slate-900">
        Frequently Asked Questions
      </h2>
      <Accordion
        type="single"
        collapsible
        className="w-full"
      >
        {questions.map((faq, index) => (
          <AccordionItem
            key={index}
            value={`faq-${index}`}
          >
            <AccordionTrigger className="text-left text-base font-medium">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-base leading-relaxed text-slate-600">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
