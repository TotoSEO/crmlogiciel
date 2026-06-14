// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // MDX : permet d'insérer les blocs validés (Callout, ProsCons, tableau…) dans
  // le corps des articles, là où le contenu les appelle. 100 % build-time, aucun
  // JavaScript runtime ajouté (cohérent avec l'exigence « tout dans le HTML »).
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