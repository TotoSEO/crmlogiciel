// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';

/**
 * Enveloppe chaque <table> Markdown dans <div class="table-scroll"> pour le
 * rendre défilable horizontalement sur petits écrans (les tableaux comparatifs
 * larges débordent sinon, et sont rognés par overflow-x:clip du body).
 * Plugin rehype maison, sans dépendance.
 */
function rehypeWrapTables() {
  /** @param {any} node */
  const walk = (node) => {
    if (!node.children) return;
    node.children = node.children.map((child) => {
      walk(child);
      if (child.type === 'element' && child.tagName === 'table') {
        return {
          type: 'element',
          tagName: 'div',
          properties: { className: ['table-scroll'] },
          children: [child],
        };
      }
      return child;
    });
  };
  /** @param {any} tree */
  return (tree) => walk(tree);
}

// https://astro.build/config
export default defineConfig({
  // MDX : insère les blocs validés dans le corps des articles (build-time, sans JS).
  // Le sitemap n'utilise PAS @astrojs/sitemap (qui imposait un index + sitemap-0.xml
  // sans priorités) : il est généré sur mesure par src/pages/sitemap.xml.ts
  // (sitemap unique avec priorités explicites).
  integrations: [mdx()],

  // Tableaux Markdown défilables horizontalement (cf. rehypeWrapTables + .table-scroll).
  // S'applique aussi aux .mdx (@astrojs/mdx étend la config Markdown par défaut).
  markdown: {
    rehypePlugins: [rehypeWrapTables],
  },

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
