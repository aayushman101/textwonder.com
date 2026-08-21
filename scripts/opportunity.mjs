// Rank all 231 tools by how much traffic they could realistically gain.
//
//   node scripts/opportunity.mjs path/to/Pages.csv
//
// Feed it the Pages.csv from a Google Search Console Performance export
// (Performance -> Export -> CSV, then unzip). Prints a ranked shortlist.
//
// The idea is "striking distance": a page already ranking 11-30 has Google's
// tentative approval and needs a push, not a rebuild. Moving it into the top 3
// is far cheaper than ranking a page that has never surfaced at all. Pages
// already in the top 5 are done; pages past 40 are not close enough to be
// worth this pass.
//
// Everything here is a FLOOR, not a forecast. Impressions at position 25 are
// suppressed because you are on page 3 — real demand is higher than what GSC
// shows you. That is deliberate: the output is a shortlist to verify, not an
// answer to act on blindly. See the notes printed at the end.

import fs from 'node:fs';
import { TOOLS } from '../src/data/tools.js';
import { PDF_TOOLS } from '../src/data/pdftools.js';
import { DEV_TOOLS } from '../src/data/devtools.js';
import { IMAGE_TOOLS } from '../src/data/imagetools.js';
import { CALC_TOOLS } from '../src/data/calctools.js';
import { UNIT_TOOLS } from '../src/data/unittools.js';
import { HEALTH_TOOLS } from '../src/data/healthtools.js';
import { STUDENT_TOOLS } from '../src/data/studenttools.js';
import { COLOR_TOOLS } from '../src/data/colortools.js';
import { DATA_TOOLS } from '../src/data/datatools.js';

const SECTIONS = [
  ['tools', TOOLS], ['pdfwonder', PDF_TOOLS], ['devwonder', DEV_TOOLS],
  ['imagewonder', IMAGE_TOOLS], ['calc', CALC_TOOLS], ['unit', UNIT_TOOLS],
  ['health', HEALTH_TOOLS], ['student', STUDENT_TOOLS], ['color', COLOR_TOOLS],
  ['data', DATA_TOOLS],
];

// Organic CTR by position. Rough industry averages — good enough to rank
// options against each other, not precise enough to promise anyone a number.
const CTR = { 1: 0.28, 2: 0.15, 3: 0.11, 4: 0.08, 5: 0.06, 6: 0.05, 7: 0.04, 8: 0.03, 9: 0.028, 10: 0.025 };
const ctrAt = (p) => CTR[Math.round(p)] ?? (p <= 20 ? 0.01 : 0.004);

// Target we assume a focused rewrite can reach. Position 3 is optimistic but
// not fantasy for a page already on page 2 of a low-competition query.
const TARGET_POSITION = 3;

function parseCsv(text) {
  const rows = [];
  let row = [], field = '', quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (c !== '\r') field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.some((c) => c.trim() !== ''));
}

const num = (s) => Number(String(s).replace(/[%,\s]/g, '')) || 0;

const csvPath = process.argv[2];
if (!csvPath) {
  console.error('usage: node scripts/opportunity.mjs <Pages.csv from GSC export>');
  process.exit(1);
}

const rows = parseCsv(fs.readFileSync(csvPath, 'utf8'));
const header = rows[0].map((h) => h.toLowerCase().trim());
const col = (...names) => header.findIndex((h) => names.some((n) => h.includes(n)));
const iUrl = col('page', 'url', 'address');
const iClicks = col('click');
const iImpr = col('impression');
const iPos = col('position');

if (iUrl < 0 || iImpr < 0 || iPos < 0) {
  console.error('Could not find the expected columns. Found:', header.join(' | '));
  console.error('Expected a GSC Pages export with Page / Clicks / Impressions / Position.');
  process.exit(1);
}

// url path -> gsc metrics
const gsc = new Map();
for (const r of rows.slice(1)) {
  const path = (r[iUrl] || '').replace(/^https?:\/\/[^/]+/, '').split(/[?#]/)[0];
  if (!path) continue;
  gsc.set(path.endsWith('/') ? path : path + '/', {
    clicks: num(r[iClicks]), impressions: num(r[iImpr]), position: num(r[iPos]),
  });
}

const scored = [];
for (const [section, list] of SECTIONS) {
  for (const tool of list) {
    const path = `/${section}/${tool.slug}/`;
    const g = gsc.get(path);
    if (!g || !g.impressions) {
      scored.push({ name: tool.name, path, section, status: 'no impressions', gain: 0 });
      continue;
    }
    const potential = g.impressions * ctrAt(TARGET_POSITION);
    const gain = Math.max(0, potential - g.clicks);
    // Position band decides whether the gain is realistically reachable.
    let band, weight;
    if (g.position <= 5)       { band = 'already winning'; weight = 0.15; }
    else if (g.position <= 10) { band = 'page 1, low';     weight = 0.7; }
    else if (g.position <= 20) { band = 'STRIKING';        weight = 1.0; }
    else if (g.position <= 40) { band = 'page 3-4';        weight = 0.6; }
    else                       { band = 'far';             weight = 0.2; }
    scored.push({
      name: tool.name, path, section, band,
      clicks: g.clicks, impressions: g.impressions, position: g.position,
      gain: gain * weight, status: 'ranked',
    });
  }
}

const ranked = scored.filter((s) => s.status === 'ranked').sort((a, b) => b.gain - a.gain);
const dark = scored.filter((s) => s.status !== 'ranked');

console.log(`\nTools: ${scored.length}   with impressions: ${ranked.length}   invisible: ${dark.length}\n`);

if (!ranked.length) {
  console.log('No tool page has any impressions yet.');
  console.log('That is itself the finding: the problem is demand and authority,');
  console.log('not which page to optimise. Skip to the manual method.\n');
} else {
  console.log('TOP 15 BY REALISTIC GAIN'.padEnd(46), 'pos'.padStart(6), 'impr'.padStart(8), 'clicks'.padStart(7), 'gain/mo'.padStart(8), '  band');
  console.log('-'.repeat(100));
  for (const s of ranked.slice(0, 15)) {
    console.log(
      (s.name + '  ' + s.path).slice(0, 45).padEnd(46),
      s.position.toFixed(1).padStart(6),
      String(s.impressions).padStart(8),
      String(s.clicks).padStart(7),
      s.gain.toFixed(0).padStart(8),
      '  ' + s.band,
    );
  }
  const striking = ranked.filter((s) => s.band === 'STRIKING');
  console.log(`\n${striking.length} tools sit in striking distance (position 11-20) — these are the cheapest wins.`);
}

console.log(`\n${dark.length} tools have never received a single impression.`);
console.log('Those are not optimisation candidates. They are either zero-demand');
console.log('keywords or not indexed — check a sample in GSC URL Inspection.\n');

console.log('BEFORE ACTING, verify each shortlisted tool manually:');
console.log('  1. Keyword Planner — is monthly volume >= 500? If not, drop it.');
console.log('  2. Open the SERP — does ANY small/unknown site rank top 10?');
console.log('     If every result is a major brand, drop it regardless of score.');
console.log('  3. Only then invest in the page.\n');
