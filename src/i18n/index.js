// ── i18n registry ──────────────────────────────────────────────────────────
// Single source of truth for: which tools exist in which language, what their
// localized URL is, and which hreflang alternates each page should declare.
//
// Design rule: a locale publishes exactly what has been translated for it.
// A tool with no translation yet gets NO localized page — not an English-copy
// page under a localized URL. The earlier design built the full catalogue in
// every language and leaned on `noindex` to stop the fallbacks competing with
// the English originals. That protected Search rankings but left ~72% of the
// built site as machine-multiplied English, which is what a publisher-policy
// review reads as scaled, low-value content. Fewer real pages beat many thin
// ones; grow a locale by adding translations, never by cloning English.

import { TOOLS } from '../data/tools.js';
import { PDF_TOOLS } from '../data/pdftools.js';
import { DEV_TOOLS } from '../data/devtools.js';
import { IMAGE_TOOLS } from '../data/imagetools.js';
import { CALC_TOOLS } from '../data/calctools.js';
import { UNIT_TOOLS } from '../data/unittools.js';
import { HEALTH_TOOLS } from '../data/healthtools.js';
import { STUDENT_TOOLS } from '../data/studenttools.js';
import { COLOR_TOOLS } from '../data/colortools.js';
import { DATA_TOOLS } from '../data/datatools.js';

import {
  LOCALES, LOCALE_CODES, TRANSLATED_LOCALES, DEFAULT_LOCALE,
  SECTION_KEYS, sectionSegment,
} from './config.js';
import { UI } from './ui.js';
import { buildTokens } from '../lib/search.js';
import { HOME_UI } from './ui-home.js';

import es from './tools/es.js';
import pt from './tools/pt.js';
import fr from './tools/fr.js';
import de from './tools/de.js';
import id from './tools/id.js';
import hi from './tools/hi.js';
import ja from './tools/ja.js';
import ar from './tools/ar.js';
import ru from './tools/ru.js';

const TRANSLATIONS = { es, pt, fr, de, id, hi, ja, ar, ru };

export const SITE_URL = 'https://textwonder.com';

/** Source (English) tool arrays, by section key. */
export const SOURCE_TOOLS = {
  tools: TOOLS,
  pdfwonder: PDF_TOOLS,
  devwonder: DEV_TOOLS,
  imagewonder: IMAGE_TOOLS,
  calc: CALC_TOOLS,
  unit: UNIT_TOOLS,
  health: HEALTH_TOOLS,
  student: STUDENT_TOOLS,
  color: COLOR_TOOLS,
  data: DATA_TOOLS,
};

/** Brand identity per section — drives accent colour and the wordmark. */
export const SECTION_BRANDS = {
  tools:       { prefix: 'Text',   suffix: 'Wonder', color: '#7c3aed', accentRgb: '124,58,237', icon: '✍️' },
  pdfwonder:   { prefix: 'PDF',    suffix: 'Wonder', color: '#f97316', accentRgb: '249,115,22', icon: '📄' },
  devwonder:   { prefix: 'Dev',    suffix: 'Wonder', color: '#06b6d4', accentRgb: '6,182,212',  icon: '💻' },
  imagewonder: { prefix: 'Image',  suffix: 'Wonder', color: '#8b5cf6', accentRgb: '139,92,246', icon: '🖼️' },
  calc:        { prefix: 'Calc',   suffix: 'Wonder', color: '#10b981', accentRgb: '16,185,129', icon: '🧮' },
  unit:        { prefix: 'Unit',   suffix: 'Wonder', color: '#6366f1', accentRgb: '99,102,241', icon: '📐' },
  health:      { prefix: 'Health', suffix: 'Wonder', color: '#22c55e', accentRgb: '34,197,94',  icon: '❤️' },
  student:     { prefix: 'Student',suffix: 'Wonder', color: '#3b82f6', accentRgb: '59,130,246', icon: '🎓' },
  color:       { prefix: 'Color',  suffix: 'Wonder', color: '#ec4899', accentRgb: '236,72,153', icon: '🎨' },
  data:        { prefix: 'Data',   suffix: 'Wonder', color: '#f59e0b', accentRgb: '245,158,11', icon: '🗂️' },
};

// ── String lookup ──────────────────────────────────────────────────────────

const STRINGS = Object.fromEntries(
  Object.keys(UI).map((code) => [code, { ...UI[code], ...(HOME_UI[code] || {}) }]),
);

/** Translate a chrome string, interpolating {placeholders}. */
export function t(locale, key, vars = {}) {
  const raw = STRINGS[locale]?.[key] ?? STRINGS[DEFAULT_LOCALE][key] ?? key;
  return raw.replace(/\{(\w+)\}/g, (m, name) => (name in vars ? String(vars[name]) : m));
}

// ── Tool resolution ────────────────────────────────────────────────────────

const sourceIndex = new Map();
for (const key of SECTION_KEYS) {
  for (const tool of SOURCE_TOOLS[key] || []) sourceIndex.set(`${key}:${tool.slug}`, tool);
}

export const getSourceTool = (sectionKey, slug) => sourceIndex.get(`${sectionKey}:${slug}`) || null;

/** Raw translation record for one tool, or null. */
function rawTranslation(locale, sectionKey, slug) {
  if (locale === DEFAULT_LOCALE) return null;
  return TRANSLATIONS[locale]?.[sectionKey]?.[slug] || null;
}

export const hasTranslation = (locale, sectionKey, slug) =>
  locale === DEFAULT_LOCALE
    ? Boolean(getSourceTool(sectionKey, slug))
    : Boolean(rawTranslation(locale, sectionKey, slug));

/**
 * Merge English source data with its translation.
 *
 * Resolution still succeeds for an untranslated tool, flagged
 * `translated: false`, because callers need to ask "does this exist here?"
 * — but `toolsForLocale` filters those out, so no page is ever built from one.
 *
 * `slug` stays the English slug so component maps keep resolving; the
 * localized URL segment is exposed separately as `localizedSlug`.
 */
export function resolveTool(locale, sectionKey, slug) {
  const source = getSourceTool(sectionKey, slug);
  if (!source) return null;
  if (locale === DEFAULT_LOCALE) {
    return { ...source, locale, sectionKey, localizedSlug: source.slug, translated: true };
  }
  const tr = rawTranslation(locale, sectionKey, slug);
  if (!tr) {
    return { ...source, locale, sectionKey, localizedSlug: source.slug, translated: false };
  }
  return {
    ...source,
    ...tr,
    slug: source.slug,
    localizedSlug: tr.slug || source.slug,
    locale,
    sectionKey,
    translated: true,
  };
}

/**
 * Every tool a locale can actually show, in source order.
 *
 * English gets the full catalogue. A localized locale gets only the tools that
 * carry real translated copy. Publishing English copy under a Spanish URL is
 * duplicate filler, and a site built mostly of those pages reads as scaled
 * low-value content to a policy reviewer no matter how the pages are tagged —
 * `noindex` keeps them out of Search, but it does not keep a crawler from
 * seeing that most of the site is machine-multiplied English.
 *
 * Filtering here is what stops that content being generated at all, and it
 * cascades from this one place to nav, search, related links and every
 * getStaticPaths.
 */
export function toolsForLocale(locale, sectionKey) {
  const all = (SOURCE_TOOLS[sectionKey] || [])
    .map((s) => resolveTool(locale, sectionKey, s.slug))
    .filter(Boolean);
  return locale === DEFAULT_LOCALE ? all : all.filter((tool) => tool.translated);
}

/** How many tools this locale actually publishes. */
export function toolCountForLocale(locale) {
  return SECTION_KEYS.reduce((n, key) => n + toolsForLocale(locale, key).length, 0);
}

/** Every published localized tool is translated now, so these two agree. */
export const translatedCountForLocale = toolCountForLocale;

/** Does this locale have translated copy for the section itself? */
export const hasSectionTranslation = (locale, sectionKey) =>
  locale === DEFAULT_LOCALE || Boolean(TRANSLATIONS[locale]?.sections?.[sectionKey]);

/**
 * A localized section index is indexable only when its own copy is translated
 * AND it lists at least one translated tool. Otherwise it is a localized shell
 * around English tool names, which does not belong in the index.
 */
export const isSectionIndexable = (locale, sectionKey) =>
  locale === DEFAULT_LOCALE ||
  (hasSectionTranslation(locale, sectionKey) &&
    toolsForLocale(locale, sectionKey).some((t) => t.translated));

/** Sections a locale can actually show — i.e. ones with translated tools. */
export const sectionsForLocale = (locale) =>
  SECTION_KEYS.filter((key) => toolsForLocale(locale, key).length > 0);

// ── Section metadata ───────────────────────────────────────────────────────

/** Localized section index copy, falling back to a generated English default. */
export function sectionMeta(locale, sectionKey) {
  const tr = locale === DEFAULT_LOCALE ? null : TRANSLATIONS[locale]?.sections?.[sectionKey];
  const brand = SECTION_BRANDS[sectionKey];
  const tools = toolsForLocale(locale, sectionKey);
  const count = tools.length;
  const translatedCount = tools.filter((t) => t.translated).length;
  const fallbackName = `${brand.prefix}${brand.suffix}`;
  return {
    name: tr?.name || fallbackName,
    h1: tr?.h1 || fallbackName,
    metaTitle: tr?.metaTitle || `${fallbackName} — Free Online Tools`,
    metaDescription: tr?.metaDescription || `Browse ${count} free browser-based tools. No signup required.`,
    subtitle: tr?.subtitle || t(locale, 'section.subtitle', { count }),
    count,
    translatedCount,
  };
}

// ── URL construction ───────────────────────────────────────────────────────

const prefix = (locale) => (locale === DEFAULT_LOCALE ? '' : `/${locale}`);

/** Locale home: '/' for English, '/es/' otherwise. */
export const homePath = (locale) => `${prefix(locale)}/`;

/** Section index: '/tools/' or '/es/herramientas-texto/'. */
export const sectionPath = (locale, sectionKey) =>
  `${prefix(locale)}/${sectionSegment(sectionKey, locale)}/`;

/** Tool page. `slug` is always the English slug — the localized one is looked up. */
export function toolPath(locale, sectionKey, slug) {
  const tool = resolveTool(locale, sectionKey, slug);
  if (!tool) return null;
  return `${prefix(locale)}/${sectionSegment(sectionKey, locale)}/${tool.localizedSlug}/`;
}

export const absolute = (path) => `${SITE_URL}${path}`;

/** True when this exact page should be indexed and advertised via hreflang. */
export const isToolIndexable = (locale, sectionKey, slug) =>
  hasTranslation(locale, sectionKey, slug);

// ── hreflang ───────────────────────────────────────────────────────────────

/**
 * Build the alternates cluster for a page. Google requires every page in the
 * cluster to list every other page (including itself), plus one x-default.
 * `pathFor(locale)` returns a path or null when that locale has no version.
 */
function buildAlternates(pathFor) {
  const alternates = [];
  for (const code of LOCALE_CODES) {
    const path = pathFor(code);
    if (path) alternates.push({ hreflang: LOCALES[code].hreflang, href: absolute(path), locale: code, path });
  }
  const fallback = pathFor(DEFAULT_LOCALE) || alternates[0]?.path;
  if (fallback) alternates.push({ hreflang: 'x-default', href: absolute(fallback), locale: DEFAULT_LOCALE, path: fallback });
  return alternates;
}

// Only genuinely translated pages join a cluster. An English-fallback page
// carries noindex, so advertising it here would contradict that signal.
export const alternatesForTool = (sectionKey, slug) =>
  buildAlternates((code) =>
    isToolIndexable(code, sectionKey, slug) ? toolPath(code, sectionKey, slug) : null,
  );

export const alternatesForSection = (sectionKey) =>
  buildAlternates((code) =>
    isSectionIndexable(code, sectionKey) ? sectionPath(code, sectionKey) : null,
  );

// Every locale home page is fully translated chrome, so all of them cluster.
export const alternatesForHome = () => buildAlternates((code) => homePath(code));

/** Language switcher entries for a page, given its alternates cluster. */
export const switcherLinks = (alternates, current) =>
  alternates
    .filter((a) => a.hreflang !== 'x-default')
    .map((a) => ({ ...LOCALES[a.locale], path: a.path, current: a.locale === current }));

// ── Static path generation ─────────────────────────────────────────────────

/** Every localized tool page to build: one entry per (locale, section, tool). */
export function allLocalizedToolRoutes() {
  const routes = [];
  for (const locale of TRANSLATED_LOCALES) {
    for (const sectionKey of SECTION_KEYS) {
      for (const tool of toolsForLocale(locale, sectionKey)) {
        routes.push({
          params: { locale, section: sectionSegment(sectionKey, locale), slug: tool.localizedSlug },
          props: { locale, sectionKey, slug: tool.slug },
        });
      }
    }
  }
  return routes;
}

/**
 * Every localized section index to build. A section with no translated tools
 * would be an empty localized shell, so it is not built at all.
 */
export function allLocalizedSectionRoutes() {
  const routes = [];
  for (const locale of TRANSLATED_LOCALES) {
    for (const sectionKey of sectionsForLocale(locale)) {
      routes.push({
        params: { locale, section: sectionSegment(sectionKey, locale) },
        props: { locale, sectionKey },
      });
    }
  }
  return routes;
}

/** Locale home pages — only for locales that actually have content. */
export const allLocaleHomeRoutes = () =>
  TRANSLATED_LOCALES.map((locale) => ({ params: { locale }, props: { locale } }));

/** Related tools for a locale. Untranslated ones have no page, so they go. */
export function relatedForLocale(locale, sectionKey, slugs = []) {
  return slugs
    .map((slug) => resolveTool(locale, sectionKey, slug))
    .filter((tool) => tool && tool.translated)
    .map((tool) => ({ ...tool, path: toolPath(locale, sectionKey, tool.slug) }));
}

/**
 * Search index for one locale: localized names and URLs, plus the token blob
 * src/lib/search.js ranks against. BaseLayout emits this once per page.
 */
export function localizedSearchIndex(locale) {
  const out = [];
  for (const sectionKey of SECTION_KEYS) {
    const meta = sectionMeta(locale, sectionKey);
    const brand = SECTION_BRANDS[sectionKey];
    for (const tool of toolsForLocale(locale, sectionKey)) {
      out.push({
        name: tool.name,
        path: toolPath(locale, sectionKey, tool.slug),
        category: meta.name,
        color: brand.color,
        icon: brand.icon,
        k: buildTokens(tool),
      });
    }
  }
  return out;
}

/**
 * Locale-prefixed paths that must stay out of the sitemap.
 *
 * Untranslated pages are no longer built, so in normal operation this is
 * empty. It stays as a backstop: if a section ever regains copy-less tools,
 * they are still kept out of the sitemap rather than silently indexed.
 */
export function noindexPaths() {
  const paths = [];
  for (const locale of TRANSLATED_LOCALES) {
    for (const sectionKey of SECTION_KEYS) {
      const tools = toolsForLocale(locale, sectionKey);
      if (tools.length && !isSectionIndexable(locale, sectionKey)) {
        paths.push(sectionPath(locale, sectionKey));
      }
      for (const tool of tools) {
        if (!tool.translated) paths.push(toolPath(locale, sectionKey, tool.slug));
      }
    }
  }
  return new Set(paths);
}

export { LOCALES, LOCALE_CODES, TRANSLATED_LOCALES, DEFAULT_LOCALE, SECTION_KEYS, sectionSegment };
