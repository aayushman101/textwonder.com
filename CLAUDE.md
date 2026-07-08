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
