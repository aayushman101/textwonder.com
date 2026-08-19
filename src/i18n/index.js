// ── i18n registry ──────────────────────────────────────────────────────────
// Single source of truth for: which tools exist in which language, what their
// localized URL is, and which hreflang alternates each page should declare.
//
// Design rule: a localized page is ONLY generated when a real translation
// exists. We never emit English content under a locale prefix — that would be
// duplicate thin content and can suppress the whole locale in search.

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

/** Translate a chrome string, interpolating {placeholders}. */
export function t(locale, key, vars = {}) {
  const raw = UI[locale]?.[key] ?? UI[DEFAULT_LOCALE][key] ?? key;
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
 * `slug` stays the English slug so component maps keep resolving; the
 * localized URL segment is exposed separately as `localizedSlug`.
 */
export function resolveTool(locale, sectionKey, slug) {
  const source = getSourceTool(sectionKey, slug);
  if (!source) return null;
  if (locale === DEFAULT_LOCALE) {
    return { ...source, locale, sectionKey, localizedSlug: source.slug };
  }
  const tr = rawTranslation(locale, sectionKey, slug);
  if (!tr) return null;
  return {
    ...source,
    ...tr,
    slug: source.slug,
    localizedSlug: tr.slug || source.slug,
    locale,
    sectionKey,
  };
}

/** Every translated tool in a section for a locale, in source order. */
export function toolsForLocale(locale, sectionKey) {
  return (SOURCE_TOOLS[sectionKey] || [])
    .map((s) => resolveTool(locale, sectionKey, s.slug))
    .filter(Boolean);
}

/** Total translated tool count for a locale across all sections. */
export function toolCountForLocale(locale) {
  return SECTION_KEYS.reduce((n, key) => n + toolsForLocale(locale, key).length, 0);
}

/** Sections that have at least one translated tool in this locale. */
export const sectionsForLocale = (locale) =>
  SECTION_KEYS.filter((key) => toolsForLocale(locale, key).length > 0);

// ── Section metadata ───────────────────────────────────────────────────────

/** Localized section index copy, falling back to a generated English default. */
export function sectionMeta(locale, sectionKey) {
  const tr = locale === DEFAULT_LOCALE ? null : TRANSLATIONS[locale]?.sections?.[sectionKey];
  const brand = SECTION_BRANDS[sectionKey];
  const count = toolsForLocale(locale, sectionKey).length;
  const fallbackName = `${brand.prefix}${brand.suffix}`;
  return {
    name: tr?.name || fallbackName,
    h1: tr?.h1 || fallbackName,
    metaTitle: tr?.metaTitle || `${fallbackName} — Free Online Tools`,
    metaDescription: tr?.metaDescription || `Browse ${count} free browser-based tools. No signup required.`,
    subtitle: tr?.subtitle || t(locale, 'section.subtitle', { count }),
    count,
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

export const alternatesForTool = (sectionKey, slug) =>
  buildAlternates((code) => toolPath(code, sectionKey, slug));

export const alternatesForSection = (sectionKey) =>
  buildAlternates((code) =>
    code === DEFAULT_LOCALE || toolsForLocale(code, sectionKey).length > 0
      ? sectionPath(code, sectionKey)
      : null,
  );

export const alternatesForHome = () =>
  buildAlternates((code) => (code === DEFAULT_LOCALE || toolCountForLocale(code) > 0 ? homePath(code) : null));

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

/** Every localized section index to build — only where tools exist. */
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
  TRANSLATED_LOCALES.filter((locale) => toolCountForLocale(locale) > 0)
    .map((locale) => ({ params: { locale }, props: { locale } }));

/** Related tools for a locale, dropping any that aren't translated yet. */
export function relatedForLocale(locale, sectionKey, slugs = []) {
  return slugs
    .map((slug) => resolveTool(locale, sectionKey, slug))
    .filter(Boolean)
    .map((tool) => ({ ...tool, path: toolPath(locale, sectionKey, tool.slug) }));
}

export { LOCALES, LOCALE_CODES, TRANSLATED_LOCALES, DEFAULT_LOCALE, SECTION_KEYS, sectionSegment };
