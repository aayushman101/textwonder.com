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

**RULE: a new tool gets a blog post only if there is a real article to write —
and a blog post means 800+ words of substance. No stubs.**

This rule used to read "every new tool MUST also get a blog post, no
exceptions", and that is how the site ended up with 183 posts under 400 words
(36 of them under 150) — pages that restated the tool page and added nothing.
All 183 were deleted in August 2026 and 301'd to their tool (see
`public/_redirects`) after AdSense flagged the site for **Low value content**.

A post earns its URL only if it says something the tool page does not: real
comparisons, alternative methods (Acrobat/Word/Mac as well as the browser
tool), worked examples, edge cases, troubleshooting. If all you have is "what
it does, how to use it, three FAQs" — that belongs on the tool page, which
already has those sections. Ship the tool without a post.

Whenever you add any new tool (PDF, text, dev, calc, color, health, student, data, unit):
1. Build the tool itself (steps below per section)
2. Fill in `descriptionLong`, `useCases`, `howItWorks` and FAQs on the tool
   record — this is the tool's own content and it is not optional
3. *If* you have 800+ words of genuinely additional material, create
   `src/pages/blog/your-tool-name.astro` using `BlogLayout`
   - Include FAQs, a tool CTA block linking to the tool, and a proper description
   - Set `category` to match the correct blog category (see Blog Categories below)
4. Add that post to the `manualPosts` array in `src/pages/blog/index.astro`
   - Add it under the correct category section comment
   - Include: slug, title, description, date (today's date), readTime, category

**Never** mass-generate posts from a data file, and never print a list of
target keywords onto a page — both were live on this site and both are
policy violations.

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
1. **A locale publishes only what has been translated for it.** A tool with no
   translation yet gets NO localized page at all. `toolsForLocale()` filters
   untranslated tools out for every non-English locale, and that one filter
   cascades to nav, search, related links, hreflang and every `getStaticPaths`.
   **Never grow a locale by cloning English copy under a localized URL.**

   This replaced the original design, which built all 226 tools in all 10
   locales and used `noindex` to stop the English-copy fallbacks competing with
   the originals. It protected Search rankings but left 1,890 of 2,638 built
   pages (72%) as machine-multiplied English — and in August 2026 Google
   AdSense flagged the site for **Low value content**. `noindex` keeps a page
   out of Search; it does not stop a policy reviewer seeing that most of the
   site is duplicated filler. Fewer real pages beat many thin ones.
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
Wave 1 translates 20 tools × 9 languages, so each locale publishes 20 tool
pages plus its section indexes and home — 27 pages per locale. Untranslated
tools are simply absent from that locale; visitors reach the English page
through the language switcher. `toolCountForLocale(locale)` and
`translatedCountForLocale(locale)` now return the same number by definition.

Grow a locale by adding records to `src/i18n/tools/<locale>.js`. Every new
record adds a real page automatically.

A section index is indexable only when the section has translated copy AND at
least one translated tool (`isSectionIndexable`). Locale home pages are always
indexable — their chrome is fully translated.

### Known gap
Tool **UI** components (`src/components/*/`) still hardcode English labels
("Your Text", "Words", "Clear"). All SEO-bearing copy is translated; the
in-widget labels are not. Translating them means threading a `locale` prop
through ~223 components.
