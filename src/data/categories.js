import { TOOLS } from './tools.js';
import { PDF_TOOLS } from './pdftools.js';
import { DEV_TOOLS } from './devtools.js';
import { CALC_TOOLS } from './calctools.js';
import { UNIT_TOOLS } from './unittools.js';
import { HEALTH_TOOLS } from './healthtools.js';
import { STUDENT_TOOLS } from './studenttools.js';
import { COLOR_TOOLS } from './colortools.js';
import { DATA_TOOLS } from './datatools.js';
import { IMAGE_TOOLS } from './imagetools.js';
import { buildTokens } from '../lib/search.js';

export const SECTIONS = [
  // Row 1: Text, PDF, Doc, Image
  {
    prefix: 'Text', suffix: 'Wonder',
    path: '/tools/',
    color: '#F04E23', accentRgb: '240,78,35',
    tagline: 'Case converters, word counters, text cleaners, diff checker, encoders, and more.',
    count: TOOLS.length,
    icon: '✍️',
    featured: [
      { name: 'Word Counter', path: '/tools/word-counter/' },
      { name: 'Title Case Converter', path: '/tools/title-case-converter/' },
      { name: 'Remove Duplicate Lines', path: '/tools/remove-duplicate-lines/' },
      { name: 'Sort Lines', path: '/tools/sort-lines/' },
      { name: 'Reading Time Calculator', path: '/tools/reading-time-calculator/' },
      { name: 'Text Diff Checker', path: '/tools/text-diff-checker/' },
    ],
    toolsList: TOOLS.map(t => ({ name: t.name, path: `/tools/${t.slug}/` }))
  },
  {
    prefix: 'PDF', suffix: 'Wonder',
    path: '/pdfwonder/',
    color: '#f97316', accentRgb: '249,115,22',
    tagline: 'Merge, split, compress, rotate, and watermark PDFs — no upload, no signup.',
    count: PDF_TOOLS.length,
    icon: '📄',
    featured: PDF_TOOLS.slice(0, 6).map((t) => ({ name: t.name, path: `/pdfwonder/${t.slug}/` })),
    toolsList: PDF_TOOLS.map((t) => ({ name: t.name, path: `/pdfwonder/${t.slug}/` }))
  },
  {
    prefix: 'Doc', suffix: 'Wonder',
    // Points at the section's own hub now, not the generic category listing.
    path: '/docwonder/',
    color: '#0d9488', accentRgb: '13,148,136',
    tagline: 'Rent receipts, salary slips, experience and relieving letters, NOCs, and proforma invoices.',
    // Was 5 while the section actually had 7 — leave-application-generator and
    // noc-generator were never added here, so the nav and homepage undercounted.
    count: 7,
    icon: '📁',
    featured: [
      { name: 'Rent Receipt Generator', path: '/tools/rent-receipt-generator/' },
      { name: 'Salary Slip Generator', path: '/tools/salary-slip-generator/' },
      { name: 'Experience Letter Generator', path: '/tools/experience-letter-generator/' },
      { name: 'Relieving Letter Generator', path: '/tools/relieving-letter-generator/' },
      { name: 'NOC Generator', path: '/tools/noc-generator/' },
    ],
    toolsList: [
      { name: 'Rent Receipt Generator', path: '/tools/rent-receipt-generator/' },
      { name: 'Salary Slip Generator', path: '/tools/salary-slip-generator/' },
      { name: 'Leave Application Generator', path: '/tools/leave-application-generator/' },
      { name: 'NOC Generator', path: '/tools/noc-generator/' },
      { name: 'Experience Letter Generator', path: '/tools/experience-letter-generator/' },
      { name: 'Relieving Letter Generator', path: '/tools/relieving-letter-generator/' },
      { name: 'Proforma Invoice Generator', path: '/tools/proforma-invoice-generator/' },
    ]
  },
  {
    prefix: 'Image', suffix: 'Wonder',
    path: '/imagewonder/',
    color: '#f43f5e', accentRgb: '244,63,94',
    tagline: 'Resize, compress, convert, crop, watermark, and analyse images — all in your browser.',
    count: IMAGE_TOOLS.length,
    icon: '🖼️',
    featured: IMAGE_TOOLS.slice(0, 6).map((t) => ({ name: t.name, path: `/imagewonder/${t.slug}/` })),
    toolsList: IMAGE_TOOLS.map((t) => ({ name: t.name, path: `/imagewonder/${t.slug}/` }))
  },
  // Row 2: Dev, Student, Calc, Health
  {
    prefix: 'Dev', suffix: 'Wonder',
    path: '/devwonder/',
    color: '#06b6d4', accentRgb: '6,182,212',
    tagline: 'JSON formatter, regex tester, JWT decoder, hash generator, UUID, cron parser — all in browser.',
    count: DEV_TOOLS.length,
    icon: '🛠️',
    featured: DEV_TOOLS.slice(0, 6).map((t) => ({ name: t.name, path: `/devwonder/${t.slug}/` })),
    toolsList: DEV_TOOLS.map((t) => ({ name: t.name, path: `/devwonder/${t.slug}/` }))
  },
  {
    prefix: 'Student', suffix: 'Wonder',
    path: '/student/',
    color: '#3b82f6', accentRgb: '59,130,246',
    tagline: 'CGPA, GPA, attendance tracker, exam countdown, Pomodoro timer — built for students.',
    count: STUDENT_TOOLS.length,
    icon: '🎓',
    featured: STUDENT_TOOLS.slice(0, 6).map((t) => ({ name: t.name, path: `/student/${t.slug}/` })),
    toolsList: STUDENT_TOOLS.map((t) => ({ name: t.name, path: `/student/${t.slug}/` }))
  },
  {
    prefix: 'Calc', suffix: 'Wonder',
    path: '/calc/',
    color: '#10b981', accentRgb: '16,185,129',
    tagline: 'EMI, SIP, GST, compound interest, discount, percentage — all financial calculators.',
    count: CALC_TOOLS.length,
    icon: '🧮',
    featured: CALC_TOOLS.slice(0, 6).map((t) => ({ name: t.name, path: `/calc/${t.slug}/` })),
    toolsList: CALC_TOOLS.map((t) => ({ name: t.name, path: `/calc/${t.slug}/` }))
  },
  {
    prefix: 'Health', suffix: 'Wonder',
    path: '/health/',
    color: '#22c55e', accentRgb: '34,197,94',
    tagline: 'BMI, BMR, calorie calculator, body fat, macro calculator, water intake — free health tools.',
    count: HEALTH_TOOLS.length,
    icon: '🩺',
    featured: HEALTH_TOOLS.slice(0, 6).map((t) => ({ name: t.name, path: `/health/${t.slug}/` })),
    toolsList: HEALTH_TOOLS.map((t) => ({ name: t.name, path: `/health/${t.slug}/` }))
  },
  // Row 3: Color, Data, Unit
  {
    prefix: 'Color', suffix: 'Wonder',
    path: '/color/',
    color: '#ec4899', accentRgb: '236,72,153',
    tagline: 'HEX/RGB/HSL converter, contrast checker, gradient builder, palette generator — for designers.',
    count: COLOR_TOOLS.length,
    icon: '🎨',
    featured: COLOR_TOOLS.slice(0, 6).map((t) => ({ name: t.name, path: `/color/${t.slug}/` })),
    toolsList: COLOR_TOOLS.map((t) => ({ name: t.name, path: `/color/${t.slug}/` }))
  },
  {
    prefix: 'Data', suffix: 'Wonder',
    path: '/data/',
    color: '#f59e0b', accentRgb: '245,158,11',
    tagline: 'CSV↔JSON, JSON↔YAML, XML→JSON, TSV↔CSV converters and data formatters.',
    count: DATA_TOOLS.length,
    icon: '💾',
    featured: DATA_TOOLS.slice(0, 6).map((t) => ({ name: t.name, path: `/data/${t.slug}/` })),
    toolsList: DATA_TOOLS.map((t) => ({ name: t.name, path: `/data/${t.slug}/` }))
  },
  {
    prefix: 'Unit', suffix: 'Wonder',
    path: '/unit/',
    color: '#6366f1', accentRgb: '99,102,241',
    tagline: 'Length, weight, temperature, speed, volume, time, area, data — instant unit conversions.',
    count: UNIT_TOOLS.length,
    icon: '📐',
    featured: UNIT_TOOLS.slice(0, 6).map((t) => ({ name: t.name, path: `/unit/${t.slug}/` })),
    toolsList: UNIT_TOOLS.map((t) => ({ name: t.name, path: `/unit/${t.slug}/` }))
  },
];

// The handful of tools people actually arrive for, one per major category.
// Deliberately hand-picked rather than derived: `searchVolume` only exists on
// the text, dev and image datasets, so any filter over it returns a text-heavy
// list and silently ignores PDF, calculator, health, unit, colour and data.
// Keep this at 5-7 entries — it is a shortlist, not a directory.
export const FEATURED_TOOLS = [
  { section: 'tools',       slug: 'word-counter',     path: '/tools/word-counter/' },
  { section: 'pdfwonder',   slug: 'pdf-merger',       path: '/pdfwonder/pdf-merger/' },
  { section: 'imagewonder', slug: 'image-compressor', path: '/imagewonder/image-compressor/' },
  { section: 'devwonder',   slug: 'json-formatter',   path: '/devwonder/json-formatter/' },
  { section: 'calc',        slug: 'emi-calculator',   path: '/calc/emi-calculator/' },
  { section: 'health',      slug: 'bmi-calculator',   path: '/health/bmi-calculator/' },
];

// Path -> source tool, so the search index can pull each tool's tagline and
// curated keywords. SECTIONS.toolsList only carries { name, path }.
const SOURCE_BY_PATH = new Map();
for (const [prefix, list] of [
  ['/tools', TOOLS], ['/pdfwonder', PDF_TOOLS], ['/devwonder', DEV_TOOLS],
  ['/imagewonder', IMAGE_TOOLS], ['/calc', CALC_TOOLS], ['/unit', UNIT_TOOLS],
  ['/health', HEALTH_TOOLS], ['/student', STUDENT_TOOLS], ['/color', COLOR_TOOLS],
  ['/data', DATA_TOOLS],
]) {
  for (const tool of list) SOURCE_BY_PATH.set(`${prefix}/${tool.slug}/`, tool);
}

// Helper to construct a global search index across all categories.
// `k` is the searchable token blob (tagline + curated keywords, minus anything
// already in the name) that src/lib/search.js ranks against at runtime.
export const getGlobalSearchIndex = () => {
  const searchIndex = [];
  SECTIONS.forEach(section => {
    section.toolsList.forEach(tool => {
      const source = SOURCE_BY_PATH.get(tool.path);
      searchIndex.push({
        name: tool.name,
        path: tool.path,
        category: `${section.prefix}${section.suffix}`,
        color: section.color,
        icon: section.icon,
        k: source ? buildTokens(source) : ''
      });
    });
  });
  return searchIndex;
};
