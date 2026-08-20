import { getGlobalSearchIndex } from '../data/categories.js';

/**
 * The English tool search index, served as a standalone cacheable file.
 *
 * It used to be inlined into every page, which cost ~9 KB gzipped on every
 * single page load — roughly half a tool page's transferred bytes — even
 * though most visitors never open search. Now it is fetched once, on first
 * search interaction, and cached across the whole site.
 */
export function GET() {
  return new Response(JSON.stringify(getGlobalSearchIndex()), {
    headers: {
      // NOTE: with static output these headers are discarded — the endpoint
      // only writes a file at build time. Caching is set in public/_headers.
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}
