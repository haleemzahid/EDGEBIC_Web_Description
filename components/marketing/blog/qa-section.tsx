import * as React from 'react';

type QaQuestion = {
  question: string;
  answer: string;
};

type QaSectionProps = {
  questions: QaQuestion[];
};

export function QaSection({ questions }: QaSectionProps): React.JSX.Element {
  return (
    <section className="max-w-none py-8">
      <h2 className="mb-6 text-2xl font-bold text-slate-900">
        Expert Q&A: Deep Dive
      </h2>
      <div className="space-y-6">
        {questions.map((qa, index) => (
          <div
            key={index}
            className={
              index < questions.length - 1
                ? 'border-b border-slate-200 pb-6'
                : ''
            }
          >
            <p className="mb-2 text-lg font-semibold text-slate-900">
              <span className="font-bold">Q:</span> {qa.question}
            </p>
            <p className="text-base leading-relaxed text-slate-700">
              <span className="font-bold">A:</span> {qa.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
