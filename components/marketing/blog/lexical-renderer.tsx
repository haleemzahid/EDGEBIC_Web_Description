'use client';

import * as React from 'react';

interface LexicalNode {
  type: string;
  text?: string;
  format?: number;
  children?: LexicalNode[];
  version?: number;
  direction?: string | null;
  indent?: number;
  tag?: string;
  [key: string]: any;
}

interface LexicalContent {
  root: {
    children: LexicalNode[];
    direction: string | null;
    format: string;
    indent: number;
    type: string;
    version: number;
  };
}

interface LexicalRendererProps {
  content: LexicalContent;
}

function renderNode(node: LexicalNode, index: number): React.ReactNode {
  if (!node) return null;

  // Handle text nodes
  if (node.text !== undefined) {
    let textElement: React.ReactNode = node.text;

    // Apply formatting
    if (node.format && node.format > 0) {
      if (node.format & 1)
        textElement = <strong key={index}>{textElement}</strong>;
      if (node.format & 2) textElement = <em key={index}>{textElement}</em>;
      if (node.format & 8)
        textElement = (
          <code
            key={index}
            className="bg-muted px-1.5 py-0.5 rounded text-sm"
          >
            {textElement}
          </code>
        );
    }

    return textElement;
  }

  const children = node.children?.map((child, i) => renderNode(child, i));

  // Handle different node types
  switch (node.type) {
    case 'paragraph':
      return (
        <p
          key={index}
          className="mb-4 leading-7"
        >
          {children}
        </p>
      );

    case 'heading':
      const tag = (node.tag || 'h2') as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
      const Tag = tag as React.ElementType;
      const headingClasses: Record<string, string> = {
        h1: 'text-4xl font-bold mb-6 mt-8',
        h2: 'text-3xl font-semibold mb-4 mt-6',
        h3: 'text-2xl font-semibold mb-3 mt-5',
        h4: 'text-xl font-semibold mb-2 mt-4',
        h5: 'text-lg font-semibold mb-2 mt-3',
        h6: 'text-base font-semibold mb-2 mt-3'
      };
      return (
        <Tag
          key={index}
          className={headingClasses[tag] || headingClasses.h2}
        >
          {children}
        </Tag>
      );

    case 'list':
      const ListTag = node.listType === 'number' ? 'ol' : 'ul';
      const listClass =
        node.listType === 'number'
          ? 'list-decimal list-inside mb-4 space-y-2'
          : 'list-disc list-inside mb-4 space-y-2';
      return (
        <ListTag
          key={index}
          className={listClass}
        >
          {children}
        </ListTag>
      );

    case 'listitem':
      return (
        <li
          key={index}
          className="leading-7"
        >
          {children}
        </li>
      );

    case 'quote':
      return (
        <blockquote
          key={index}
          className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground"
        >
          {children}
        </blockquote>
      );

    case 'code':
      return (
        <pre
          key={index}
          className="bg-muted p-4 rounded-lg overflow-x-auto my-4"
        >
          <code className="text-sm">{children}</code>
        </pre>
      );

    case 'link':
      return (
        <a
          key={index}
          href={node.url}
          target={node.newTab ? '_blank' : undefined}
          rel={node.newTab ? 'noopener noreferrer' : undefined}
          className="text-primary hover:underline"
        >
          {children}
        </a>
      );

    case 'linebreak':
      return <br key={index} />;

    default:
      // For unknown types, just render children
      return <React.Fragment key={index}>{children}</React.Fragment>;
  }
}

export function LexicalRenderer({
  content
}: LexicalRendererProps): React.JSX.Element {
  if (!content?.root?.children) {
    return <p className="text-muted-foreground">No content available.</p>;
  }

  return (
    <div className="prose prose-neutral max-w-none">
      {content.root.children.map((node, index) => renderNode(node, index))}
    </div>
  );
}
