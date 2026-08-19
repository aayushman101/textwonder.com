// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { SECTION_PATHS } from './src/i18n/config.js';

// Every URL segment that identifies a tool section, in every language.
const SECTION_SEGMENTS = [...new Set(Object.values(SECTION_PATHS).flatMap(Object.values))];

export default defineConfig({
  site: 'https://textwonder.com',
  output: 'static',
  integrations: [
    sitemap({
      changefreq: 'weekly',
      lastmod: new Date(),
      serialize(item) {
        const path = item.url.replace('https://textwonder.com', '');

        // Strip any locale prefix so a translated page is scored on the same
        // scale as its English counterpart, one notch lower.
        const localeMatch = path.match(/^\/(es|pt|fr|de|id|hi|ja|ar|ru)(\/.*)?$/);
        const rest = localeMatch ? (localeMatch[2] || '/') : path;
        const drop = localeMatch ? 0.1 : 0;
        const score = (n) => ({ ...item, priority: Math.round((n - drop) * 10) / 10 });

        if (rest === '/') return score(1.0);

        // A section segment in ANY locale — English keys plus every
        // translated segment from src/i18n/config.js.
        const seg = SECTION_SEGMENTS.join('|');
        if (new RegExp(`^/(${seg})/?$`).test(rest)) return score(0.9);
        if (new RegExp(`^/(${seg})/.+`).test(rest)) return score(0.8);

        return score(0.6);
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
