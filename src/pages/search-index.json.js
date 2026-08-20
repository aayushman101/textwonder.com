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
      'Content-Type': 'application/json; charset=utf-8',
      // Changes only when the tool catalogue changes. Serve stale while
      // revalidating so a rebuild propagates without ever blocking a search.
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=604800',
    },
  });
}
