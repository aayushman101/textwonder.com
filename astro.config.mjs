// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://textwonder.com',
  output: 'static',
  integrations: [
    sitemap({
      changefreq: 'weekly',
      lastmod: new Date(),
      serialize(item) {
        const url = item.url;
        if (url === 'https://textwonder.com/') {
          return { ...item, priority: 1.0 };
        }
        if (/\/(tools|calc|unit|health|student|color|data|pdfwonder|devwonder)\/?$/.test(url)) {
          return { ...item, priority: 0.9 };
        }
        if (/\/(tools|calc|unit|health|student|color|data|pdfwonder|devwonder)\/.+/.test(url)) {
          return { ...item, priority: 0.8 };
        }
        return { ...item, priority: 0.6 };
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
