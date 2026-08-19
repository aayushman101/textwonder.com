// ── Locale registry ────────────────────────────────────────────────────────
// `code`       URL prefix (English lives at the root, with no prefix)
// `hreflang`   value emitted in <link rel="alternate"> and og:locale
// `dir`        'rtl' switches the whole document to right-to-left
// `nativeName` shown in the language switcher — always in the target language
export const DEFAULT_LOCALE = 'en';

export const LOCALES = {
  en: { code: 'en', hreflang: 'en',    ogLocale: 'en_US', dir: 'ltr', nativeName: 'English',    englishName: 'English',    flag: '🇺🇸' },
  es: { code: 'es', hreflang: 'es',    ogLocale: 'es_ES', dir: 'ltr', nativeName: 'Español',    englishName: 'Spanish',    flag: '🇪🇸' },
  pt: { code: 'pt', hreflang: 'pt-BR', ogLocale: 'pt_BR', dir: 'ltr', nativeName: 'Português',  englishName: 'Portuguese', flag: '🇧🇷' },
  fr: { code: 'fr', hreflang: 'fr',    ogLocale: 'fr_FR', dir: 'ltr', nativeName: 'Français',   englishName: 'French',     flag: '🇫🇷' },
  de: { code: 'de', hreflang: 'de',    ogLocale: 'de_DE', dir: 'ltr', nativeName: 'Deutsch',    englishName: 'German',     flag: '🇩🇪' },
  id: { code: 'id', hreflang: 'id',    ogLocale: 'id_ID', dir: 'ltr', nativeName: 'Indonesia',  englishName: 'Indonesian', flag: '🇮🇩' },
  hi: { code: 'hi', hreflang: 'hi',    ogLocale: 'hi_IN', dir: 'ltr', nativeName: 'हिन्दी',       englishName: 'Hindi',      flag: '🇮🇳' },
  ja: { code: 'ja', hreflang: 'ja',    ogLocale: 'ja_JP', dir: 'ltr', nativeName: '日本語',      englishName: 'Japanese',   flag: '🇯🇵' },
  ar: { code: 'ar', hreflang: 'ar',    ogLocale: 'ar_AR', dir: 'rtl', nativeName: 'العربية',      englishName: 'Arabic',     flag: '🇸🇦' },
  ru: { code: 'ru', hreflang: 'ru',    ogLocale: 'ru_RU', dir: 'ltr', nativeName: 'Русский',    englishName: 'Russian',    flag: '🇷🇺' },
};

/** Every locale code, English first. */
export const LOCALE_CODES = Object.keys(LOCALES);

/** Translated locales only — the ones that get a URL prefix. */
export const TRANSLATED_LOCALES = LOCALE_CODES.filter((c) => c !== DEFAULT_LOCALE);

export const isRtl = (locale) => LOCALES[locale]?.dir === 'rtl';

// ── Section path segments ──────────────────────────────────────────────────
// Latin-script locales get natively translated segments. hi/ru use ASCII
// transliteration and ja/ar use English-descriptive segments, because
// non-ASCII paths break on Windows checkouts and in wrangler uploads — the
// native keywords for those locales are carried by the title, H1 and body,
// which is where they actually move rankings.
export const SECTION_PATHS = {
  tools: {
    en: 'tools', es: 'herramientas-texto', pt: 'ferramentas-texto', fr: 'outils-texte',
    de: 'text-werkzeuge', id: 'alat-teks', hi: 'text-tools', ja: 'text-tools',
    ar: 'text-tools', ru: 'tekstovye-instrumenty',
  },
  pdfwonder: {
    en: 'pdfwonder', es: 'herramientas-pdf', pt: 'ferramentas-pdf', fr: 'outils-pdf',
    de: 'pdf-werkzeuge', id: 'alat-pdf', hi: 'pdf-tools', ja: 'pdf-tools',
    ar: 'pdf-tools', ru: 'pdf-instrumenty',
  },
  devwonder: {
    en: 'devwonder', es: 'herramientas-desarrollo', pt: 'ferramentas-dev', fr: 'outils-developpeur',
    de: 'entwickler-werkzeuge', id: 'alat-developer', hi: 'dev-tools', ja: 'dev-tools',
    ar: 'dev-tools', ru: 'instrumenty-razrabotchika',
  },
  imagewonder: {
    en: 'imagewonder', es: 'herramientas-imagen', pt: 'ferramentas-imagem', fr: 'outils-image',
    de: 'bild-werkzeuge', id: 'alat-gambar', hi: 'image-tools', ja: 'image-tools',
    ar: 'image-tools', ru: 'instrumenty-izobrazheniy',
  },
  calc: {
    en: 'calc', es: 'calculadoras', pt: 'calculadoras', fr: 'calculatrices',
    de: 'rechner', id: 'kalkulator', hi: 'calculators', ja: 'calculators',
    ar: 'calculators', ru: 'kalkulyatory',
  },
  unit: {
    en: 'unit', es: 'conversores-unidades', pt: 'conversores-unidades', fr: 'convertisseurs-unites',
    de: 'einheiten-umrechner', id: 'konversi-satuan', hi: 'unit-converters', ja: 'unit-converters',
    ar: 'unit-converters', ru: 'konvertery-edinits',
  },
  health: {
    en: 'health', es: 'salud', pt: 'saude', fr: 'sante',
    de: 'gesundheit', id: 'kesehatan', hi: 'health', ja: 'health',
    ar: 'health', ru: 'zdorovye',
  },
  student: {
    en: 'student', es: 'estudiantes', pt: 'estudantes', fr: 'etudiants',
    de: 'studenten', id: 'pelajar', hi: 'student', ja: 'student',
    ar: 'student', ru: 'studentam',
  },
  color: {
    en: 'color', es: 'colores', pt: 'cores', fr: 'couleurs',
    de: 'farben', id: 'warna', hi: 'color', ja: 'color',
    ar: 'color', ru: 'tsveta',
  },
  data: {
    en: 'data', es: 'datos', pt: 'dados', fr: 'donnees',
    de: 'daten', id: 'data', hi: 'data', ja: 'data',
    ar: 'data', ru: 'dannye',
  },
};

export const SECTION_KEYS = Object.keys(SECTION_PATHS);

/** Resolve a section's URL segment for a locale, falling back to English. */
export function sectionSegment(sectionKey, locale) {
  const row = SECTION_PATHS[sectionKey];
  if (!row) throw new Error(`Unknown section key: ${sectionKey}`);
  return row[locale] || row[DEFAULT_LOCALE];
}

/** Reverse lookup: which section does this URL segment belong to, in this locale? */
export function sectionFromSegment(segment, locale) {
  return SECTION_KEYS.find((key) => sectionSegment(key, locale) === segment) || null;
}
