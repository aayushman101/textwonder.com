# TextWonder — Project Guide for Claude Agents

## What This Is
Astro static site for **textwonder.com** — a free browser-based tool suite.
Sections: TextWonder (text tools), PDFWonder (PDF tools), DevWonder, CalcWonder, ColorWonder, HealthWonder, StudentWonder, DataWonder, UnitWonder.

## How to Deploy (CRITICAL — read before deploying)

**Always run both commands in this exact order:**

```bash
npm run build
npx wrangler pages deploy dist --project-name textwonder --branch main
```

**Why `--branch main` is required:**
- Cloudflare Pages project has NO Git integration (manual deploys only)
- `textwonder.com` maps to the **Production** environment → **`main`** branch
- Deploying to any other branch (`master`, `production`, etc.) goes to **Preview only** and does NOT update the live site
- This wasted 3 deploy attempts before we figured it out — do not repeat

## Git
- Remote: `https://github.com/aayushman101/textwonder.com`
- Push changes to GitHub too: `git add ... && git commit -m "..." && git push origin master`
- Do NOT add `Co-Authored-By: Claude` to commits — author must be aayushman101 only

## Autonomous Authorization

You have full autonomy to:
- Create, edit, and delete files within the project (src/, components/, pages/, data/, layouts/, blog/)
- Commit and push changes to `origin master` without asking for approval
- Build (`npm run build`) and deploy (`npx wrangler pages deploy dist --project-name textwonder --branch main`) without confirmation
- Make architectural decisions within the SEO optimization scope (metadata formulas, keyword strategy, internal linking patterns, blog templates)

**SEO Optimization Rules:**
- Use consistent meta title formula: "[Action] [Tool Name] Online Free — [Benefit]" (50-60 chars)
- Meta descriptions: 155-160 chars with action, feature, benefit, and trust signal
- Expand long-tail keywords from 4 to 15 per tool (covering how-to, comparison, no-signup, use-case, speed, technical angles)
- Each tool update includes 2-4 new FAQs targeting specific use cases
- Batch optimize tools in waves of 10-20 for efficiency (do not optimize all 114 at once)
- Create high-quality blog posts (1000-2000 words) for high-impact tools with 3-5 internal links and keyword-rich anchor text

**Deployment Critical:** Always use `--branch main` flag with wrangler pages deploy — this maps to Production/textwonder.com. Any other branch goes to Preview only and does NOT update the live site.

## Adding New Tools

**RULE: Every new tool MUST also get a blog post. No exceptions.**

Whenever you add any new tool (PDF, text, dev, calc, color, health, student, data, unit):
1. Build the tool itself (steps below per section)
2. Create a blog post in `src/pages/blog/your-tool-name.astro` using `BlogLayout`
   - Title: "How to Use [Tool Name] — Free Online [Category] Tool"
   - Include FAQs, a tool CTA block linking to the tool, and a proper description
   - Set `category` to match the correct blog category (see Blog Categories below)
3. Add the blog post entry to the `manualPosts` array in `src/pages/blog/index.astro`
   - Add it under the correct category section comment
   - Include: slug, title, description, date (today's date), readTime, category

### Blog Categories (use exactly these strings)
| Tool Section | Blog Category |
|---|---|
| TextWonder text tools | `'Text Utilities'` |
| PDFWonder | `'PDF Guide'` |
| DevWonder | `'Developer Tools'` |
| CalcWonder | `'Calculators'` |
| ColorWonder | `'Color Design'` |
| HealthWonder | `'Health & Fitness'` |
| StudentWonder | `'Student Tools'` |
| DataWonder | `'Data Converters'` |
| UnitWonder | `'Unit Converters'` |

### PDF Tools (`/pdfwonder/`)
1. Add tool object to `src/data/pdftools.js`
2. Create component `src/components/pdf-tools/YourTool.astro`
3. Add import + mapping in `src/pages/pdfwonder/[slug].astro`
4. Update hero count in `src/pages/pdfwonder/index.astro`
5. **Add blog post** (see rule above)

### Dev Tools (`/devwonder/`)
1. Add tool object to `src/data/devtools.js`
2. Create component `src/components/dev-tools/YourTool.astro`
3. Add import + mapping in `src/pages/devwonder/[slug].astro`
4. **Add blog post** (see rule above)

### Text Tools (`/tools/`)
1. Add to `src/data/tools.js`
2. Create component `src/components/tools/YourTool.astro`
3. Add import + mapping in `src/pages/tools/[slug].astro`
4. **Add blog post** (see rule above)

## Tech Stack
- **Framework:** Astro (static output)
- **Styling:** Tailwind CSS v4
- **PDF processing:** pdf-lib (CDN) + PDF.js (CDN) — all browser-based, no server
- **Hosting:** Cloudflare Pages (`textwonder` project)
- **Analytics:** Google Analytics G-C7Q4Q1J205

## Internationalisation (i18n)

The site ships in 10 languages. English lives at the root; the other nine sit
under a locale prefix with **fully translated URL slugs**.

```
EN  /tools/word-counter/
ES  /es/herramientas-texto/contador-de-palabras/
DE  /de/text-werkzeuge/woerter-zaehlen/
RU  /ru/tekstovye-instrumenty/schetchik-slov/
```

### Where things live
| File | Purpose |
|---|---|
| `src/i18n/config.js` | Locale registry (codes, hreflang, dir, native names) + section URL segment per locale |
| `src/i18n/ui.js` | Site chrome strings (header, footer, section headings) — 37 keys × 10 locales |
| `src/i18n/tools/<locale>.js` | Per-locale tool translations, keyed by section then **English slug** |
| `src/i18n/index.js` | Registry: resolves tools, builds URLs, builds hreflang clusters, feeds `getStaticPaths` |
| `src/component-maps/<section>.ts` | Shared slug → component maps, used by BOTH English and localized routes |
| `src/pages/[locale]/…` | The three localized routes: home, section index, tool page |

### Hard rules — do not break these
1. **The full catalogue builds in every language; only translated pages are
   indexable.** All 226 tools resolve in all 10 locales, so no language ever
   looks half-empty. A tool with no translation yet still gets a localized page
   (localized chrome, English tool copy) flagged `translated: false`. That flag
   drives three things which must always agree: `noindex, follow` on the page,
   exclusion from the sitemap (`noindexPaths()` feeds the sitemap `filter`), and
   exclusion from every hreflang cluster. Together they stop a fallback page
   from competing with the English original as duplicate thin content. Never
   index a fallback page, and never let those three signals disagree.
2. **hreflang must be bidirectional.** Every page in a cluster lists every
   other version plus one `x-default`. English layouts call
   `alternatesForTool()` / `alternatesForSection()` for exactly this reason —
   if the English page stops listing the translations, Google discards the
   whole cluster.
3. **Translation records keep the English slug as their key.** The localized
   URL segment goes in the `slug` field. This is what lets the shared
   component maps keep resolving the right tool UI.
4. **Slug script policy.** Latin-script locales (es, pt, fr, de, id) get native
   slugs; de transliterates umlauts (ö→oe). hi and ru use ASCII
   transliteration; ja and ar use English-descriptive slugs. Non-ASCII paths
   break on Windows checkouts and wrangler uploads — the native keywords
   belong in the title, H1 and body instead.

### Adding a translation
Add a record to `src/i18n/tools/<locale>.js` under the right section, keyed by
the English slug. Provide at minimum: `slug`, `name`, `tagline`, `metaTitle`,
`metaDescription`, `h1`, `descriptionLong`, `useCases`, `howItWorks`, `faqs`.
The page, its hreflang entries, sitemap row and nav links appear on next build.

Research the term the market **actually searches** — "unir pdf", not a literal
translation of "PDF merger". That choice is most of the SEO value.

### Coverage
Wave 1 translates 20 tools × 9 languages. Every other tool is still browsable
in every language through the English-fallback path in rule 1 — by design, not
a gap. `translatedCountForLocale(locale)` reports real translation coverage;
`toolCountForLocale(locale)` is always the full catalogue.

A section index is indexable only when the section has translated copy AND at
least one translated tool (`isSectionIndexable`). Locale home pages are always
indexable — their chrome is fully translated.

### Known gap
Tool **UI** components (`src/components/*/`) still hardcode English labels
("Your Text", "Words", "Clear"). All SEO-bearing copy is translated; the
in-widget labels are not. Translating them means threading a `locale` prop
through ~223 components.
