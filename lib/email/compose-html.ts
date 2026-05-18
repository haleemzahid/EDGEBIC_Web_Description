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

/**
 * Print a compose/reply draft via a hidden iframe.
 *
 * Why an iframe and not `window.open`: passing `noopener` to
 * `window.open(..., features)` makes browsers return `null`, so the old
 * `if (!w) return;` path silently swallowed every print. The iframe also
 * dodges popup blockers, waits for load before printing, and cleans itself
 * up afterwards.
 *
 * Shared by all four Gmail-style composers (admin compose + reply, client
 * compose + reply) so the behaviour stays identical.
 */
export function printComposeDraft(args: {
  subject?: string;
  body: string;
  /** Optional header rows rendered above the body (To/Cc/Subject/…). */
  headers?: { label: string; value: string }[];
}): void {
  if (typeof document === 'undefined') return;

  const title = (args.subject ?? '').trim() || 'Draft';
  const headerRows = (args.headers ?? [])
    .filter((h) => h.value.trim().length > 0)
    .map(
      (h) =>
        `<tr><td style="padding:2px 12px 2px 0;color:#6b7280;white-space:nowrap;vertical-align:top;">${escapeHtml(
          h.label
        )}</td><td style="padding:2px 0;">${escapeHtml(h.value)}</td></tr>`
    )
    .join('');

  const html =
    `<!doctype html><html><head><meta charset="utf-8" />` +
    `<title>${escapeHtml(title)}</title></head>` +
    `<body style="font-family:system-ui,-apple-system,sans-serif;padding:24px;color:#111827;">` +
    (headerRows
      ? `<table style="font-size:13px;border-collapse:collapse;margin-bottom:16px;">${headerRows}</table>` +
        `<hr style="border:none;border-top:1px solid #e5e7eb;margin:0 0 16px;" />`
      : '') +
    `<div>${args.body || ''}</div>` +
    `</body></html>`;

  const iframe = document.createElement('iframe');
  iframe.setAttribute('aria-hidden', 'true');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  document.body.appendChild(iframe);

  let cleaned = false;
  const cleanup = (): void => {
    if (cleaned) return;
    cleaned = true;
    window.setTimeout(() => iframe.remove(), 500);
  };

  iframe.onload = (): void => {
    const win = iframe.contentWindow;
    if (!win) {
      iframe.remove();
      return;
    }
    win.onafterprint = cleanup;
    win.focus();
    win.print();
    // Fallback in case onafterprint never fires (some browsers).
    window.setTimeout(cleanup, 60_000);
  };

  const doc = iframe.contentWindow?.document;
  if (!doc) {
    iframe.remove();
    return;
  }
  doc.open();
  doc.write(html);
  doc.close();
}
