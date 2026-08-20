import { TRANSLATED_LOCALES, localizedSearchIndex } from '../../i18n/index.js';

/** One search index per locale, e.g. /es/search-index.json. */
export function getStaticPaths() {
  return TRANSLATED_LOCALES.map((locale) => ({ params: { locale }, props: { locale } }));
}

export function GET({ props }) {
  return new Response(JSON.stringify(localizedSearchIndex(props.locale)), {
    headers: {
      // NOTE: with static output these headers are discarded — the endpoint
      // only writes a file at build time. Caching is set in public/_headers.
      'Content-Type': 'application/json; charset=utf-8',
    },
  });
}
