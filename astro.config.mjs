// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // MDX : insère les blocs validés dans le corps des articles (build-time, sans JS).
  // Le sitemap n'utilise PAS @astrojs/sitemap (qui imposait un index + sitemap-0.xml
  // sans priorités) : il est généré sur mesure par src/pages/sitemap.xml.ts
  // (sitemap unique avec priorités explicites).
  integrations: [mdx()],

  // URL de production (canonicals, sitemap, OpenGraph).
  site: 'https://crm-logiciel.fr',

  // Politique de slash final : URLs en /slug/ partout (cohérence SEO).
  trailingSlash: 'always',

  build: {
    // Génère /slug/index.html → servi en /slug/ (cohérent avec trailingSlash:'always').
    format: 'directory',
  },

  // i18n mono-langue au lancement. Architecture prête pour ajouter 'en' plus tard
  // sans restructurer les routes ni les URLs existantes.
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
