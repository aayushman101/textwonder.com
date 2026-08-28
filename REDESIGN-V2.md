# TextWonder — V2 Redesign: Implementation Handoff

**Status:** Stages 0–1 complete. Stage 2 (chrome) is next.
**Branch:** `redesign-v2` · **Rollback tag:** `pre-redesign-v2` → `7aa29af`
**Started:** 2026-08-28

This document is the single source of truth for the redesign. If you are an
agent picking this up cold, read it top to bottom before touching anything.
Update the [Progress log](#progress-log) as you complete each stage.

---

## 1. What we are building

The **V2 "bold-block" theme** — a light, editorial, paper-first design inspired
by buysellads.com. Heavy display type, mono labels, cream banding, one orange
accent, and the suite colours used as accents.

**The reference implementation already exists and works:**

| File | What it is |
|---|---|
| `src/pages/preview/landing-v2.astro` | The approved V2 landing page. Self-contained (own `<html>`, own `<style>`, no BaseLayout). **This is the design spec.** View at `/preview/landing-v2/`. |
| `design-preview/landing-v3/` | A rejected-for-now conservative alternative (plain HTML/CSS/JS). Keep for reference — its category-card treatment was adopted into V2. |

Do not redesign anything. Port what is in `landing-v2.astro` onto the real site.

### Design tokens (from `landing-v2.astro`)

```css
--ink:#101014;  --ink-2:#3B3B46;  --ink-3:#6E6E7C;
--paper:#FFFFFF;  --paper-2:#F6F2E9;  --paper-3:#EFEAE0;
--line:#E3DED2;
--orange:#F04E23;   /* the single accent */
/* bold-block set, used for the stat panels: */
--wine:#6B1235; --amber:#FFB400; --lime:#B8E020; --indigo:#4B4BF7;
--teal:#0E7C6B; --lilac:#C9B6F7; --sky:#7FD4E8;  --rose:#E2456B;

--display:"Bricolage Grotesque", "Inter", system-ui, sans-serif;
--body:"Inter", system-ui, -apple-system, sans-serif;
--mono:"JetBrains Mono", ui-monospace, monospace;
```

Google Fonts URL (already in the preview's `<head>`):
```
https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap
```

### Section order on the landing page

`announcement → masthead → hero → marquee band → stats → suites → privacy
explainer → popular → faq → closing cta → footer`

### Suite card treatment (decided 2026-08-28)

The catalogue grid does **not** use full-bleed colour blocks. It uses white
cards where the suite colour appears as a 3px top rule, the count numeral, and
the hover state. 4-column grid, 11 suites + a 12th dashed "234 tools in total"
catalogue card filling the last cell.

Colours come from `src/data/categories.js` (`s.color`) — **not** the bold-block
palette. The bold-block colours were designed as fills; as accents, cream,
lilac and lime are illegible on white.

---

## 2. Why this is cheap: the Tailwind v4 lever

**This is the most important technical fact in this document.**

The site is on Tailwind v4, whose utilities compile to theme variables:

```css
.text-slate-400 { color: var(--color-slate-400) }
```

And **82% of all colour usage is two families** — `slate` (4,833 occurrences)
and `violet` (907) out of ~7,000 across 349 files.

Therefore: **redefining ~22 variables in the `@theme` block of
`src/styles/global.css` repaints all 570 pages with zero component edits.**

Verified on 2026-08-28 by patching three variables and rebuilding:

```
--color-slate-400: #74747f;   (was oklch(70.4% .04 256.788))
--color-slate-800: #e4dfd4;
--color-violet-600: #f04e23;
```

All three appeared in the emitted CSS. The patch was reverted.

### Do NOT remap these

Semantic colours must keep meaning. Leave alone:
`emerald` (186 uses — success states), `red` (156 — errors),
`green` (100), `amber` (60), `rose` (154 — used for warnings in places).

Verify each before assuming; some are decorative and some are semantic.

---

## 3. Codebase facts you will need

Measured 2026-08-28.

| | |
|---|---|
| `.astro` files in `src/` | 356 (349 carry theme classes) |
| Colour-utility occurrences | ~7,000 |
| Tool widget components | 220 (`src/components/*-tools/` + `tools/`) |
| Layouts | 8 |
| **Header variants** | **6** — `Header`, `PDFHeader`, `DevHeader`, `ImageHeader`, `WonderHeader`, `I18nHeader` |
| Footers | 2 — `Footer`, `I18nFooter` |
| Built pages | 570 |
| Locales | 10 (en + 9), Arabic is RTL |
| Tools / suites | 234 / 11 |

### Gotchas discovered so far

1. **`/categories/` does not exist.** It is a dynamic `[category].astro` route
   with no index page — `/categories/` returns 404. Only
   `/categories/text-analysis/` etc. exist. Use **`/tools/`** for "browse all".
   *(Already fixed in the v2 preview.)*
2. **The old light-mode override layer must be deleted.** `global.css` lines
   ~37–90 hardcode literal hexes (`.text-white{color:#0f172a}`). These will
   fight the new palette. Remove them as part of Stage 1.
3. **`.hero-grid` shares its element with `.shell`.** Using the `padding`
   shorthand there zeroes the shell's inline padding and breaks mobile. Use
   `padding-block`. (Bug already hit and fixed once.)
4. **A class that sets `display` outranks `[hidden]`.** Anything toggled via
   the `hidden` attribute needs an explicit `[hidden]{display:none!important}`.
5. **Returning visitors carry `tw-theme: dark` in localStorage**, set by the
   inline script at the top of `BaseLayout.astro`. Flipping the default is not
   enough — needs a migration.

---

## 4. Ads — deliberately deferred

**The user asked for ad boxes to be REMOVED for now** (2026-08-28): *"currently
dont keep these advertisement boxes, as its not looking good and later if we
need we can add"*.

They have been stripped from the v2 preview. Do not re-add them without being
asked.

When ads do come back, this is what was learned and must be honoured:

- **All five ad slot IDs in the codebase are placeholders** — `1234567890`,
  `2345678901`, `3456789012`, `4567890123`, `5678901234`. Sequential dummies.
  They are not serving. Real IDs must come from the user's AdSense dashboard.
- **4 of 8 layouts have zero ad slots**: `PDFToolLayout`, `DevToolLayout`,
  `ImageToolLayout`, `WonderToolLayout` — that is 117 of 234 tools.
- **`AdSlot.astro` reserves `min-height: 60px` for 250px units.** This is a
  live CLS penalty and a real Core Web Vitals issue. Fix it whenever ads
  return, independent of the redesign.
- **`src/pages/index.astro` line ~268 claims "No ad pixels or behaviour
  tracking"** while `BaseLayout.astro` line ~85 loads the AdSense script. This
  contradiction is live right now. It must be removed before ads are
  re-enabled, and arguably before the AdSense review either way.
- Design rules if re-added: reserve height, label the unit, never place on a
  colour block or adjacent to a CTA, cap at 3 per page.

---

## 5. Implementation stages

Each stage = one commit. Verify, commit, then move on.

- [x] **Stage 0 — Safety net.** Branch `redesign-v2`, tag `pre-redesign-v2`,
      16 baseline screenshots captured (see [Verification](#7-verification)).
- [x] **Stage 1 — Design tokens.** Done in `48413b6`. See §2 and §11.
- [ ] **Stage 2 — Chrome.** 6 headers, 2 footers, 9 mega-menus, search bar,
      breadcrumb, mobile sheet, language switcher.
- [ ] **Stage 3 — Homepage.** Port `landing-v2.astro` into `index.astro`,
      rewiring BaseLayout, JSON-LD (WebSite/Organization/FAQPage), hreflang
      via `alternatesForHome()`, search index, locale alternates.
- [ ] **Stage 4 — The 8 layouts.** The tool-page shell. Repaints 500+ pages.
      → Preview deploy #2.
- [ ] **Stage 5 — Section indexes.** 11 suite indexes, `[category].astro`,
      `/compare/`, `/blog/` index, `BlogLayout`.
- [ ] **Stage 6 — (ads — SKIPPED, see §4)**
- [ ] **Stage 7 — i18n + RTL.** 9 locales, `I18nHeader`/`I18nFooter`, Arabic
      RTL, hreflang bidirectionality check. → Preview deploy #3.
- [ ] **Stage 8 — Tool widgets (optional, deferrable).** The 220 widget
      interiors, one suite per commit. 20–35 h. Can happen after production.
- [ ] **Stage 9 — Production.** Screenshot diff vs baseline, verify
      sitemap/hreflang/schema, deploy, push `master`.

**Estimate to production (stages 0–5, 7, 9): ~23–34 h ≈ 4–5 working days.**

### The half-done window

Between Stage 4 and Stage 8 the site is bold-block shells wrapping
violet-and-slate widgets. Stage 1's palette swap softens this considerably. In
Stage 4, make the widget container visually neutral so the seam stays quiet.
This is expected, not a bug.

---

## 6. Deploy procedure

**Read `CLAUDE.md` first — the `--branch main` rule is non-negotiable.**

```bash
npm run build
npx wrangler pages deploy dist --project-name textwonder --branch main
```

- `--branch main` → **Production** → textwonder.com
- Any other `--branch` value → **Preview only**, does not touch the live site

Use a preview branch name for milestone deploys:

```bash
npx wrangler pages deploy dist --project-name textwonder --branch redesign-v2
```

**Do not deploy to production without explicit user approval.**

Git: push to `origin master` when merged. **Never add a `Co-Authored-By:
Claude` trailer** — the author must be `aayushman101` only.

---

## 7. Verification

### Baseline screenshots

16 full-page captures of the pre-redesign site, at 1440×900, taken from the
dev server on 2026-08-28:

```
home, tools-index, section-pdf, blog-index, locale-es, locale-ar,
tool-text (word-counter), tool-pdf (pdf-merger), tool-dev (json-formatter),
tool-image (image-compressor), tool-calc (emi-calculator),
tool-health (bmi-calculator), tool-student (cgpa-calculator),
tool-color (hex-rgb-converter), tool-data (csv-to-json),
tool-unit (length-converter)
```

Stored in the session scratchpad. **If you are a fresh agent and they are
gone, regenerate them from the `pre-redesign-v2` tag before starting.** The
capture script is reproduced in §8.

### After every stage

```bash
npm run build          # must complete with no errors
```

Then check, at 390px / 820px / 1440px:
- no horizontal overflow (`document.documentElement.scrollWidth > clientWidth`)
- no console errors
- sitemap unchanged in page count (`dist/sitemap-0.xml`)
- `/preview/*` still excluded from the sitemap (guard in `astro.config.mjs`)

---

## 8. Reproducible scripts

### Baseline / regression screenshots

Run from the project root (playwright resolves from `node_modules` there),
with `npm run dev` running:

```js
// _baseline.mjs — node ./_baseline.mjs <output-dir>
import { chromium } from 'playwright';
import fs from 'fs';
const dir = process.argv[2];
fs.mkdirSync(dir, { recursive: true });
const URLS = [
  ['home','/'], ['tool-text','/tools/word-counter/'],
  ['tool-pdf','/pdfwonder/pdf-merger/'], ['tool-dev','/devwonder/json-formatter/'],
  ['tool-image','/imagewonder/image-compressor/'], ['tool-calc','/calc/emi-calculator/'],
  ['tool-health','/health/bmi-calculator/'], ['tool-student','/student/cgpa-calculator/'],
  ['tool-color','/color/hex-rgb-converter/'], ['tool-data','/data/csv-to-json/'],
  ['tool-unit','/unit/length-converter/'], ['section-pdf','/pdfwonder/'],
  ['tools-index','/tools/'], ['blog-index','/blog/'],
  ['locale-es','/es/'], ['locale-ar','/ar/'],
];
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
for (const [name, path] of URLS) {
  const r = await p.goto('http://localhost:4321' + path, { waitUntil: 'domcontentloaded' }).catch(() => null);
  if (!r || r.status() >= 400) { console.log('FAIL', path); continue; }
  await p.waitForTimeout(700);
  await p.screenshot({ path: `${dir}/${name}.png`, fullPage: true });
}
await b.close();
```

Delete the script from the project root when done — it is scratch, not source.

### Colour-usage audit

```bash
grep -rhoE "(bg|text|border|from|to|via|ring|divide|placeholder)-(slate|violet|blue|indigo|purple|gray|zinc|emerald|green|amber|orange|rose|pink|cyan|teal|red|yellow)-[0-9]{2,3}" src --include=*.astro \
  | sed -E 's/^[a-z]+-//; s/-[0-9]+$//' | sort | uniq -c | sort -rn
```

---

## 9. Context the user has established

- **Search Console (3 months to 2026-08-21):** 84 clicks, 33,437 impressions,
  CTR 0.25%. **0.0% of impressions rank in positions 1–3**; 96% sit at
  position 21+. 344 of 389 pages get zero clicks.
  **The redesign is not expected to increase traffic** — the user was told
  this plainly and chose to proceed for brand, AdSense standing and CLS.
  Do not claim otherwise.
- Highest-opportunity pages (high impressions, near-miss rank) if content work
  is ever prioritised: `/tools/syllable-counter/` (5,779 imp, pos 25.7),
  `/tools/numbers-to-words/` (1,046, pos 28.7),
  `/tools/reading-time-calculator/` (1,104, pos 44.3).
- **AdSense flagged the site for "Low value content" in August 2026.** See
  `CLAUDE.md` for the resulting hard rules on blog posts and i18n pages. Those
  rules still apply — do not mass-generate anything.
- There is a discrepancy the user should confirm: `AD_PLACEMENT_STRATEGY.md`
  claims 10K pageviews/month, but Search Console shows ~28 clicks/month from
  Google. Unverified.

---

## 10. Open questions

**Answered 2026-08-28:**

1. **Dark mode** — light is the default opening; dark stays available via the
   header toggle. Both palettes are implemented in `global.css`. No
   localStorage migration was needed: a returning visitor with `tw-theme:dark`
   simply gets the new dark V2 theme, which is correct behaviour.
2. **Widget sweep** — ship at Stage 7, sweep the 220 widgets later. See §11:
   this may barely be needed.

**Still open:**

3. Real AdSense slot IDs — only needed if/when ads return (see §4).
4. The homepage `AD_PLACEMENT_STRATEGY.md` traffic figure (10K pageviews/mo)
   contradicts Search Console (~28 clicks/mo). Unverified.

### Known issues not caused by the redesign

- The homepage throws a JS error (`Y`) on load. Confirmed present with the
  redesign changes stashed, so it predates this work. Worth a separate fix.
- The homepage H1 still uses a `from-blue-600 via-indigo-600 to-purple-600`
  gradient. `blue`/`indigo`/`purple` were deliberately NOT remapped (89 uses,
  mostly data-driven suite colours). Stage 3 deletes this hero entirely, so it
  is expected to look off until then.

---

## Progress log

| Date | Stage | What happened |
|---|---|---|
| 2026-08-28 | 1 | `48413b6` — token layer. All 570 pages repainted with zero component edits. Light default + dark toggle both verified. Build clean. |
| 2026-08-28 | 0 | Branch `redesign-v2` created, `pre-redesign-v2` tag at `7aa29af`, 16 baselines captured. Ad zones stripped from the v2 preview per user request. Fixed 5 links pointing at the non-existent `/categories/` → `/tools/`. Suite grid switched to the v3 card treatment. |


---

## 11. Stage 1 outcome — the half-done window is smaller than feared

The plan warned that between Stage 4 and Stage 8 the site would be V2 shells
wrapping violet-and-slate widgets, and budgeted 20–35 h to sweep 220 widget
interiors.

**After Stage 1, that looks largely unnecessary.** The Word Counter widget —
entirely untouched — already renders as the new theme: orange stat numerals,
cream panel, warm borders, ink text. This is because every widget was built
from the same `slate`/`violet` vocabulary that the token layer remaps.

Re-evaluate Stage 8 once Stage 4 lands. The remaining work is likely a short
list of specific widgets rather than a sweep of all 220. Check the ones with
unusual colour usage first:

```bash
grep -rlE "(bg|text|border)-(emerald|red|green|amber|cyan|teal|pink)-[0-9]" src/components/*-tools src/components/tools | head -30
```
