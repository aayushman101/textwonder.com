import { TRANSLATED_LOCALES, localizedSearchIndex } from '../../i18n/index.js';

/** One search index per locale, e.g. /es/search-index.json. */
export function getStaticPaths() {
  return TRANSLATED_LOCALES.map((locale) => ({ params: { locale }, props: { locale } }));
}

export function GET({ props }) {
  return new Response(JSON.stringify(localizedSearchIndex(props.locale)), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=604800',
    },
  });
}
