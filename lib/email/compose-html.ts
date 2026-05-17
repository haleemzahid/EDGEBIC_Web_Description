/**
 * Client-safe rich-text/HTML helpers shared by the Gmail-style composers
 * (admin contact inbox + client portal compose & reply).
 *
 * Pure string functions only — NO server deps (don't import `sanitize-html`
 * here). Bodies are sanitized server-side in the actions before storage; this
 * module just builds/inspects markup on the client.
 */

/** Escape user text for safe interpolation into an HTML string. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Lightweight "is this stored body HTML or legacy plain text?" check.
 * Same heuristic as `looksLikeHtml` in lib/email/sanitize-email-html.ts, kept
 * here so client bundles don't pull in the server sanitizer.
 */
export function isHtmlBody(value: string): boolean {
  return /<\/?[a-z][\s\S]*>/i.test(value);
}

/**
 * Append an emoji into the rich-text HTML body. The compose editor is
 * seed-once, so callers re-seed (remount) after calling this.
 */
export function appendEmojiToHtml(html: string, emoji: string): string {
  if (/<\/p>\s*$/i.test(html)) {
    return html.replace(/<\/p>\s*$/i, `${emoji}</p>`);
  }
  return (html ?? '') + emoji;
}

/**
 * Append an HTML snippet (link / image) into the body. Same seed-once
 * constraint as {@link appendEmojiToHtml} — caller re-seeds after.
 */
export function appendHtmlToBody(html: string, snippet: string): string {
  if (/<\/p>\s*$/i.test(html)) {
    return html.replace(/<\/p>\s*$/i, `${snippet}</p>`);
  }
  return `${html ?? ''}<p>${snippet}</p>`;
}

/** Strip all markup so the body becomes Gmail-style "plain text mode". */
export function htmlToPlainParagraphs(html: string): string {
  const text = html
    .replace(/<\/(p|div|h[1-6]|li|blockquote)>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');
  const lines = text.split('\n').map((l) => l.trim());
  return lines.map((l) => `<p>${escapeHtml(l) || '<br>'}</p>`).join('');
}

/** Collapse an HTML body to its visible text (for previews / de-dupe). */
export function htmlToText(html: string): string {
  return html
    .replace(/<\/(p|div|h[1-6]|li|blockquote)>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * True if the rich-text body has actual content (an empty Lexical editor
 * still emits markup like "<p><br></p>").
 */
export function htmlHasContent(html: string): boolean {
  return (
    html
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/gi, ' ')
      .replace(/\s+/g, '')
      .trim().length > 0
  );
}
