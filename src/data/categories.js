import { TOOLS } from './tools.js';
import { PDF_TOOLS } from './pdftools.js';
import { DEV_TOOLS } from './devtools.js';
import { CALC_TOOLS } from './calctools.js';
import { UNIT_TOOLS } from './unittools.js';
import { HEALTH_TOOLS } from './healthtools.js';
import { STUDENT_TOOLS } from './studenttools.js';
import { COLOR_TOOLS } from './colortools.js';
import { DATA_TOOLS } from './datatools.js';

export const SECTIONS = [
  {
    prefix: 'Text', suffix: 'Wonder',
    path: '/tools',
    color: '#7c3aed', accentRgb: '124,58,237',
    tagline: 'Case converters, word counters, text cleaners, diff checker, encoders, and more.',
    count: TOOLS.length,
    icon: '✍️',
    featured: [
      { name: 'Word Counter', path: '/tools/word-counter' },
      { name: 'Title Case Converter', path: '/tools/title-case-converter' },
      { name: 'Remove Duplicate Lines', path: '/tools/remove-duplicate-lines' },
      { name: 'Sort Lines', path: '/tools/sort-lines' },
      { name: 'Reading Time Calculator', path: '/tools/reading-time-calculator' },
      { name: 'Text Diff Checker', path: '/tools/text-diff-checker' },
    ],
    toolsList: TOOLS.map(t => ({ name: t.name, path: `/tools/${t.slug}` }))
  },
  {
    prefix: 'PDF', suffix: 'Wonder',
    path: '/pdfwonder',
    color: '#f97316', accentRgb: '249,115,22',
    tagline: 'Merge, split, compress, rotate, and watermark PDFs — no upload, no signup.',
    count: PDF_TOOLS.length,
    icon: '📄',
    featured: PDF_TOOLS.slice(0, 6).map((t) => ({ name: t.name, path: `/pdfwonder/${t.slug}` })),
    toolsList: PDF_TOOLS.map((t) => ({ name: t.name, path: `/pdfwonder/${t.slug}` }))
  },
  {
    prefix: 'Dev', suffix: 'Wonder',
    path: '/devwonder',
    color: '#06b6d4', accentRgb: '6,182,212',
    tagline: 'JSON formatter, regex tester, JWT decoder, hash generator, UUID, cron parser — all in browser.',
    count: DEV_TOOLS.length,
    icon: '🛠️',
    featured: DEV_TOOLS.slice(0, 6).map((t) => ({ name: t.name, path: `/devwonder/${t.slug}` })),
    toolsList: DEV_TOOLS.map((t) => ({ name: t.name, path: `/devwonder/${t.slug}` }))
  },
  {
    prefix: 'Calc', suffix: 'Wonder',
    path: '/calc',
    color: '#10b981', accentRgb: '16,185,129',
    tagline: 'EMI, SIP, GST, compound interest, discount, percentage — all financial calculators.',
    count: CALC_TOOLS.length,
    icon: '🧮',
    featured: CALC_TOOLS.slice(0, 6).map((t) => ({ name: t.name, path: `/calc/${t.slug}` })),
    toolsList: CALC_TOOLS.map((t) => ({ name: t.name, path: `/calc/${t.slug}` }))
  },
  {
    prefix: 'Unit', suffix: 'Wonder',
    path: '/unit',
    color: '#6366f1', accentRgb: '99,102,241',
    tagline: 'Length, weight, temperature, speed, volume, time, area, data — instant unit conversions.',
    count: UNIT_TOOLS.length,
    icon: '📐',
    featured: UNIT_TOOLS.slice(0, 6).map((t) => ({ name: t.name, path: `/unit/${t.slug}` })),
    toolsList: UNIT_TOOLS.map((t) => ({ name: t.name, path: `/unit/${t.slug}` }))
  },
  {
    prefix: 'Health', suffix: 'Wonder',
    path: '/health',
    color: '#22c55e', accentRgb: '34,197,94',
    tagline: 'BMI, BMR, calorie calculator, body fat, macro calculator, water intake — free health tools.',
    count: HEALTH_TOOLS.length,
    icon: '🩺',
    featured: HEALTH_TOOLS.slice(0, 6).map((t) => ({ name: t.name, path: `/health/${t.slug}` })),
    toolsList: HEALTH_TOOLS.map((t) => ({ name: t.name, path: `/health/${t.slug}` }))
  },
  {
    prefix: 'Student', suffix: 'Wonder',
    path: '/student',
    color: '#3b82f6', accentRgb: '59,130,246',
    tagline: 'CGPA, GPA, attendance tracker, exam countdown, Pomodoro timer — built for students.',
    count: STUDENT_TOOLS.length,
    icon: '🎓',
    featured: STUDENT_TOOLS.slice(0, 6).map((t) => ({ name: t.name, path: `/student/${t.slug}` })),
    toolsList: STUDENT_TOOLS.map((t) => ({ name: t.name, path: `/student/${t.slug}` }))
  },
  {
    prefix: 'Color', suffix: 'Wonder',
    path: '/color',
    color: '#ec4899', accentRgb: '236,72,153',
    tagline: 'HEX/RGB/HSL converter, contrast checker, gradient builder, palette generator — for designers.',
    count: COLOR_TOOLS.length,
    icon: '🎨',
    featured: COLOR_TOOLS.slice(0, 6).map((t) => ({ name: t.name, path: `/color/${t.slug}` })),
    toolsList: COLOR_TOOLS.map((t) => ({ name: t.name, path: `/color/${t.slug}` }))
  },
  {
    prefix: 'Data', suffix: 'Wonder',
    path: '/data',
    color: '#f59e0b', accentRgb: '245,158,11',
    tagline: 'CSV↔JSON, JSON↔YAML, XML→JSON, TSV↔CSV converters and data formatters.',
    count: DATA_TOOLS.length,
    icon: '💾',
    featured: DATA_TOOLS.slice(0, 6).map((t) => ({ name: t.name, path: `/data/${t.slug}` })),
    toolsList: DATA_TOOLS.map((t) => ({ name: t.name, path: `/data/${t.slug}` }))
  },
  {
    prefix: 'Doc', suffix: 'Wonder',
    path: '/categories/document-generators',
    color: '#0d9488', accentRgb: '13,148,136',
    tagline: 'Rent receipts, salary slips, experience letters, relieving letters, and proforma invoices.',
    count: 5,
    icon: '📁',
    featured: [
      { name: 'Rent Receipt Generator', path: '/tools/rent-receipt-generator' },
      { name: 'Salary Slip Generator', path: '/tools/salary-slip-generator' },
      { name: 'Experience Letter Generator', path: '/tools/experience-letter-generator' },
      { name: 'Relieving Letter Generator', path: '/tools/relieving-letter-generator' },
      { name: 'Proforma Invoice Generator', path: '/tools/proforma-invoice-generator' },
    ],
    toolsList: [
      { name: 'Rent Receipt Generator', path: '/tools/rent-receipt-generator' },
      { name: 'Salary Slip Generator', path: '/tools/salary-slip-generator' },
      { name: 'Experience Letter Generator', path: '/tools/experience-letter-generator' },
      { name: 'Relieving Letter Generator', path: '/tools/relieving-letter-generator' },
      { name: 'Proforma Invoice Generator', path: '/tools/proforma-invoice-generator' },
    ]
  },
];

// Helper to construct a global search index across all categories
export const getGlobalSearchIndex = () => {
  const searchIndex = [];
  SECTIONS.forEach(section => {
    section.toolsList.forEach(tool => {
      searchIndex.push({
        name: tool.name,
        path: tool.path,
        category: `${section.prefix}${section.suffix}`,
        color: section.color,
        icon: section.icon
      });
    });
  });
  return searchIndex;
};
