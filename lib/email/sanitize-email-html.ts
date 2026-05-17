import sanitizeHtml from 'sanitize-html';

// Email-safe HTML allowlist. The rich-text compose editor (Lexical) only
// emits a small set of tags (formatting, lists, links, paragraphs), but we
// sanitize server-side anyway so nothing unsafe is ever sent to a recipient
// or stored and rendered back in the inbox.
const EMAIL_SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    'p',
    'br',
    'span',
    'div',
    'b',
    'strong',
    'i',
    'em',
    'u',
    's',
    'a',
    'ul',
    'ol',
    'li',
    'blockquote',
    'h1',
    'h2',
    'h3',
    'pre',
    'code'
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target', 'rel'],
    // Gmail-style rich text sets inline styles (font, size, color,
    // alignment) on these elements — keep them so formatting survives.
    span: ['style'],
    p: ['style'],
    div: ['style'],
    h1: ['style'],
    h2: ['style'],
    h3: ['style'],
    ul: ['style'],
    ol: ['style'],
    li: ['style'],
    blockquote: ['style']
  },
  allowedStyles: {
    '*': {
      'text-align': [/^left$/, /^right$/, /^center$/, /^justify$/],
      'font-weight': [/^bold$/, /^\d{3}$/],
      'font-style': [/^italic$/],
      'text-decoration': [
        /^underline$/,
        /^line-through$/,
        /^underline line-through$/,
        /^line-through underline$/
      ],
      // Hex / rgb(a) / named colours only.
      color: [/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i, /^rgb/i, /^[a-z]+$/i],
      'background-color': [
        /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i,
        /^rgb/i,
        /^[a-z]+$/i
      ],
      'font-family': [/^[\w\s",'-]+$/],
      'font-size': [/^\d{1,3}(?:px|pt|em|%)$/]
    }
  },
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  // Force external links to be safe and not leak the opener.
  transformTags: {
    a: sanitizeHtml.simpleTransform('a', {
      target: '_blank',
      rel: 'noopener noreferrer'
    })
  }
};

/** Sanitize rich-text HTML before it is emailed or persisted. */
export function sanitizeEmailHtml(html: string): string {
  return sanitizeHtml(html ?? '', EMAIL_SANITIZE_OPTIONS).trim();
}

/**
 * Plain-text projection of an HTML body — used for the thread `preview`
 * column and the email's text/plain alternative. Block tags become
 * newlines so the text stays readable.
 */
export function htmlToPlainText(html: string): string {
  return sanitizeHtml(html ?? '', {
    allowedTags: [],
    allowedAttributes: {},
    // Keep paragraph/line breaks as newlines.
    nonTextTags: ['style', 'script', 'textarea', 'option', 'noscript']
  })
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Heuristic: does this stored body contain HTML markup? Legacy messages
 * (and plain-text replies) are stored as raw text and must keep rendering
 * with preserved whitespace, while new rich-text bodies render as HTML.
 */
export function looksLikeHtml(value: string): boolean {
  return /<\/?[a-z][\s\S]*>/i.test(value);
}
