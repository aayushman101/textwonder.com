// Inline SVG icons for the 28 PDFWonder tools.
//
// The tool records carry emoji (`icon`), but only 23 are distinct across 28
// tools — extract-pages and header-footer both use 📋, splitter and crop both
// use ✂️, to-jpg and to-png both use 🖼️, and so on. Emoji also render as
// flat text glyphs on some Windows configurations, which is where most of
// this site's traffic is.
//
// These are drawn on one grid instead: 24×24, stroke-based, no fills, using
// `currentColor` so the group colour below applies. Inline means no extra
// request and nothing for a CSP to block.
//
// Shared motifs, so the set reads as one family:
//   PAGE  a document outline with a folded corner
//   Arrows point in the direction of the conversion
//   Anything destructive or protective carries a distinct non-page mark

const PAGE = '<path d="M6.5 3h6.5l4.5 4.5V20a1 1 0 0 1-1 1h-10a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/><path d="M13 3v4.5h4.5"/>';

export const PDF_ICON_GROUPS = {
  Organise: '#f97316',
  Convert: '#3b82f6',
  Optimise: '#22c55e',
  Edit: '#a855f7',
  'Secure & inspect': '#ef4444',
};

export const PDF_ICONS = {
  // ── Organise ────────────────────────────────────────────────────────────
  'pdf-merger':
    '<rect x="3" y="4" width="10" height="12" rx="1"/><rect x="11" y="8" width="10" height="12" rx="1"/>',
  'pdf-splitter':
    // Two halves pulling apart from a cut line, rather than two panels sitting
    // side by side — the first version read as an open book.
    '<path d="M9.5 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4.5"/><path d="M14.5 4H19a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4.5"/><path d="M12 2.5v19" stroke-dasharray="2 3"/>',
  'pdf-extract-pages':
    // A page with an arrow leaving it. The previous version offset a sub-path
    // with `transform`, which put the arrowhead through the page edge.
    '<rect x="3" y="5" width="10" height="14" rx="1"/><path d="M16 12h5"/><path d="M18.5 9.5L21 12l-2.5 2.5"/>',
  'pdf-remove-pages':
    PAGE + '<path d="M9.5 12.5l5 5m0-5l-5 5"/>',
  'pdf-reorder-pages':
    '<rect x="4" y="3" width="16" height="6" rx="1"/><rect x="4" y="15" width="16" height="6" rx="1"/><path d="M12 10.5v3"/><path d="M10.5 12l1.5 1.5 1.5-1.5"/>',
  'pdf-rotate-pages':
    '<path d="M20 11a8 8 0 1 0-2.3 5.6"/><path d="M20 5v6h-6"/>',
  'pdf-remove-blank-pages':
    PAGE + '<path d="M9.5 15h5"/>',

  // ── Convert ─────────────────────────────────────────────────────────────
  'jpg-to-pdf':
    // Photo on the left, page on the right, arrow between — the destination
    // was a plain square before, which did not read as a document.
    '<rect x="2.5" y="7" width="8.5" height="8" rx="1"/><circle cx="5.4" cy="9.9" r="0.85"/><path d="M2.5 13.5l2.6-2.6 2.4 2.4"/><path d="M12.5 11h2.5"/><path d="M13.8 9.2l1.8 1.8-1.8 1.8"/><path d="M17.5 4h2.5L22 6v13a1 1 0 0 1-1 1h-3.5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/>',
  'pdf-to-jpg':
    '<path d="M4 5h6v6H4z"/><path d="M11 9h7"/><path d="M15.5 6.5L18 9l-2.5 2.5"/><rect x="13" y="14" width="8" height="7" rx="1"/><circle cx="15.5" cy="16.5" r="0.9"/><path d="M13 20l2.5-2.5L18 20"/>',
  'pdf-to-png':
    '<path d="M4 5h6v6H4z"/><path d="M11 9h7"/><path d="M15.5 6.5L18 9l-2.5 2.5"/><rect x="13" y="14" width="8" height="7" rx="1"/><path d="M15.5 19v-3l3 3v-3"/>',
  'pdf-to-text':
    PAGE + '<path d="M9 12h6M9 15h6M9 18h3"/>',
  'text-to-pdf':
    // Lines, arrow, page — all inside the viewBox instead of nudged into it.
    '<path d="M2.5 7h6M2.5 11h6M2.5 15h4"/><path d="M11 11h3.5"/><path d="M13 9l2 2-2 2"/><path d="M17.5 4h2.5L22 6v13a1 1 0 0 1-1 1h-3.5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"/>',
  'text-to-word':
    PAGE + '<path d="M9 13l1.2 4 1.3-3 1.3 3L14 13"/>',
  'markdown-to-pdf':
    '<rect x="2.5" y="6" width="19" height="12" rx="1.5"/><path d="M6 15V9l2.5 3L11 9v6"/><path d="M15 9v4.5"/><path d="M13 12.5l2 2.5 2-2.5"/>',

  // ── Optimise ────────────────────────────────────────────────────────────
  'pdf-compress':
    '<path d="M4 4h5v5"/><path d="M9 9L4 4"/><path d="M20 4h-5v5"/><path d="M15 9l5-5"/><path d="M4 20h5v-5"/><path d="M9 15l-5 5"/><path d="M20 20h-5v-5"/><path d="M15 15l5 5"/>',
  'pdf-resize':
    // Two corner arrows pushing apart inside a frame. The earlier four-arrow
    // cross collapsed into an unreadable asterisk at menu size.
    '<rect x="3" y="3" width="18" height="18" rx="1.5"/><path d="M8 13V8h5"/><path d="M8 8l3.5 3.5"/><path d="M16 11v5h-5"/><path d="M16 16l-3.5-3.5"/>',
  'pdf-crop':
    '<path d="M6 2v14a1 1 0 0 0 1 1h14"/><path d="M2 6h14a1 1 0 0 1 1 1v14"/>',
  'pdf-grayscale':
    '<circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor" stroke="none"/>',
  'pdf-scan-enhance':
    '<path d="M3 8V5a1 1 0 0 1 1-1h3M21 8V5a1 1 0 0 0-1-1h-3M3 16v3a1 1 0 0 0 1 1h3M21 16v3a1 1 0 0 1-1 1h-3"/><path d="M3.5 12h17"/>',
  'pdf-dark-mode':
    '<path d="M20.5 15.3A8.5 8.5 0 0 1 8.7 3.5a8.5 8.5 0 1 0 11.8 11.8z"/>',

  // ── Edit ────────────────────────────────────────────────────────────────
  'pdf-watermark':
    PAGE + '<path d="M12 11.5c1.4 1.6 2.2 2.8 2.2 3.8a2.2 2.2 0 0 1-4.4 0c0-1 .8-2.2 2.2-3.8z"/>',
  'pdf-page-numbers':
    PAGE + '<path d="M10.5 14.5l1.5-1v4.5M11 18h2"/>',
  'pdf-header-footer':
    '<rect x="3.5" y="3.5" width="17" height="17" rx="1.5"/><path d="M3.5 8h17M3.5 16h17"/>',
  'pdf-sign':
    '<path d="M3 18c3.5 0 3.5-9 6.5-9s2 7 4.5 7 3-4 5-4"/><path d="M3 21h18"/>',

  // ── Secure & inspect ────────────────────────────────────────────────────
  'pdf-password-protect':
    '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  'pdf-unlock':
    '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 7.5-2"/>',
  'pdf-metadata-viewer':
    '<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><path d="M12 8h.01"/>',
  'pdf-word-count':
    '<path d="M4 20V10M9.5 20V4M15 20v-7M20.5 20V7"/>',
};

/** Colour for a tool, resolved through its group. */
export function iconColour(groups, slug) {
  const g = groups.find((x) => x.slugs.includes(slug));
  return g ? PDF_ICON_GROUPS[g.title] : 'currentColor';
}
