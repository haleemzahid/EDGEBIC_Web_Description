'use client';

import { useState } from 'react';
import { Facebook, Link2, Linkedin, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

type ShareButtonsProps = {
  url: string;
  title: string;
};

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      label: 'Share on X',
      href: `https://x.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: (
        <svg
          viewBox="0 0 24 24"
          className="size-4 fill-current"
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      label: 'Share on LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <Linkedin className="size-4" />,
    },
    {
      label: 'Share on Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <Facebook className="size-4" />,
    },
  ];

  function handleCopyLink() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {shareLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'flex size-9 items-center justify-center rounded-full',
            'bg-slate-100 text-slate-600 transition-colors',
            'hover:bg-cyan-100 hover:text-cyan-700',
            'dark:bg-slate-800 dark:text-slate-400',
            'dark:hover:bg-cyan-900/40 dark:hover:text-cyan-400'
          )}
        >
          {link.icon}
          <span className="sr-only">{link.label}</span>
        </a>
      ))}
      <button
        type="button"
        onClick={handleCopyLink}
        className={cn(
          'flex size-9 items-center justify-center rounded-full',
          'bg-slate-100 text-slate-600 transition-colors',
          'hover:bg-cyan-100 hover:text-cyan-700',
          'dark:bg-slate-800 dark:text-slate-400',
          'dark:hover:bg-cyan-900/40 dark:hover:text-cyan-400',
          copied && 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-400'
        )}
      >
        {copied ? (
          <Check className="size-4" />
        ) : (
          <Link2 className="size-4" />
        )}
        <span className="sr-only">{copied ? 'Copied!' : 'Copy link'}</span>
      </button>
    </div>
  );
}
