/**
 * Shared tool-search engine.
 *
 * Used in two places:
 *   - at BUILD time, `buildTokens()` produces the compact token blob that ships
 *     with each page's search index;
 *   - at RUN time in the browser, `searchTools()` ranks that index against a
 *     query.
 *
 * Design notes
 * ------------
 * The previous implementation matched `name.includes(query)` only, so any
 * natural phrasing ("combine two pdfs") returned nothing at all.
 *
 * Two rules make this work:
 *   1. COVERAGE BEFORE SCORE. A tool that matches every meaningful word in the
 *      query always outranks one that matched a single incidental word. Ranking
 *      on a summed score alone puts noise on top — "what is my bmi" returned
 *      Speed Converter before this rule existed.
 *   2. Only name + tagline + curated keywords are indexed. Long descriptions
 *      were tried and dropped: ~37k words is too much to ship to every page and
 *      they mostly added false matches.
 */

// Words that carry no search intent. Without this list they match prose
// everywhere and every tool looks like a hit.
const STOP = new Set(
  ('a an and am are as at be been by can could do does for from get got has have ' +
   'help here how i in into is it its make making me my need of on or please some ' +
   'that the there these this those to two want was what which will with would you ' +
   'your online free tool tools best')
    .split(' '),
);

/** Split text into meaningful lowercase terms. */
export function tokenize(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .split(' ')
    .filter((w) => w.length > 1 && !STOP.has(w));
}

/** Crude suffix stripping so "colours"/"color" and "resizing"/"resize" unify. */
export function stem(w) {
  return w
    .replace(/ours$/, 'or')
    .replace(/our$/, 'or')
    .replace(/ies$/, 'y')
    .replace(/ing$/, '')
    .replace(/est$/, '')
    .replace(/er$/, '')
    .replace(/([^s])s$/, '$1');
}

const terms = (text) => [...new Set(tokenize(text).map(stem))];

/**
 * Build-time: the searchable token blob for one tool.
 * Name is deliberately excluded — it ships already and is tokenized at runtime,
 * which keeps the payload down.
 */
export function buildTokens(tool) {
  const keywords = Array.isArray(tool.longTailKeywords) ? tool.longTailKeywords.join(' ') : '';
  const nameTerms = new Set(terms(tool.name));
  // Drop anything already present in the name so the blob stays small.
  return terms(`${tool.tagline || ''} ${keywords}`)
    .filter((t) => !nameTerms.has(t))
    .join(' ');
}

// Tokenizing is cached per entry. A WeakMap is used rather than writing the
// cache onto the entry itself — the index objects belong to the caller and are
// serialized elsewhere, so mutating them would leak internals into the payload.
const CACHE = new WeakMap();

const matches = (list, term) => {
  for (const w of list) {
    if (w === term || w.startsWith(term) || term.startsWith(w)) return true;
  }
  return false;
};

/**
 * Rank `index` against `query`.
 * Each entry needs `name`; `k` (the blob from buildTokens) is optional.
 * Returns entries unchanged, best first.
 */
export function searchTools(index, query, limit = 8) {
  const q = terms(query);
  if (!q.length) return [];

  const scored = [];
  for (const entry of index) {
    let cached = CACHE.get(entry);
    if (!cached) {
      cached = { n: terms(entry.name), k: entry.k ? entry.k.split(' ') : [], c: terms(entry.category || '') };
      CACHE.set(entry, cached);
    }
    const nameTerms = cached.n;
    const strong = cached.k;

    let matched = 0;
    let nameHits = 0;
    let score = 0;

    for (const term of q) {
      if (matches(nameTerms, term)) {
        matched++; nameHits++; score += 12;
      } else if (matches(strong, term)) {
        matched++; score += 6;
      } else if (cached.c.length && matches(cached.c, term)) {
        matched++; score += 3;
      }
    }

    if (matched) scored.push({ entry, matched, nameHits, score });
  }

  if (!scored.length) return [];

  // Rule 1: keep only the tools that covered the most query terms.
  let best = 0;
  for (const s of scored) if (s.matched > best) best = s.matched;

  return scored
    .filter((s) => s.matched === best)
    .sort((a, b) => b.nameHits - a.nameHits || b.score - a.score || a.entry.name.length - b.entry.name.length)
    .slice(0, limit)
    .map((s) => s.entry);
}


// ── Lazy index loading (browser only) ──────────────────────────────────────
// The index is a standalone file rather than inline page markup, so it is
// fetched once on first search interaction and then cached by the browser for
// every subsequent page. Callers should fire this on focus/open so the request
// overlaps with the user still typing.

let cached = null;
let inflight = null;

/** URL of the index for the current page's language. */
export function searchIndexUrl() {
  const lang = (document.documentElement.lang || 'en').toLowerCase();
  return lang === 'en' ? '/search-index.json' : `/${lang}/search-index.json`;
}

/** Resolve the search index, fetching it at most once per page. */
export function loadSearchIndex() {
  if (cached) return Promise.resolve(cached);
  if (inflight) return inflight;
  inflight = fetch(searchIndexUrl())
    .then((r) => (r.ok ? r.json() : []))
    .then((data) => { cached = Array.isArray(data) ? data : []; return cached; })
    .catch(() => { cached = []; return cached; });
  return inflight;
}
