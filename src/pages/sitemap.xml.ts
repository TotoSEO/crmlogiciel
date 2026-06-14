/**
 * /sitemap.xml — sitemap UNIQUE (pas d'index), avec priorités explicites :
 *   - Accueil : 1.0
 *   - Test de connaissances, CRM gratuit et piliers : 0.9
 *   - Autres articles : 0.8 (un cran en dessous)
 * Les pages techniques (/demo/) et utilitaires (mentions légales, politique de
 * confidentialité) sont exclues. Remplace @astrojs/sitemap, qui imposait un
 * sitemap-index.xml + sitemap-0.xml sans priorités utiles.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { absoluteUrl } from '../config/site';

const iso = (d: Date) => d.toISOString().slice(0, 10);

export const GET: APIRoute = async () => {
  const pages = await getCollection('pages', (e) => e.id !== '' && !e.data.draft);

  // Date de fraîcheur la plus récente du corpus (pour l'accueil et le test).
  const latest = pages.reduce((acc, p) => {
    const d = p.data.dateModified ?? p.data.datePublished;
    return d > acc ? d : acc;
  }, new Date(0));

  // Satellites promus au niveau de priorité des piliers.
  const HIGH = new Set(['crm-gratuit']);

  type Url = { loc: string; lastmod: string; changefreq: string; priority: string };
  const urls: Url[] = [
    { loc: absoluteUrl(''), lastmod: iso(latest), changefreq: 'weekly', priority: '1.0' },
    {
      loc: absoluteUrl('test-connaissance-crm'),
      lastmod: iso(latest),
      changefreq: 'monthly',
      priority: '0.9',
    },
  ];

  for (const p of pages) {
    const d = p.data.dateModified ?? p.data.datePublished;
    const high = p.data.type === 'pilier' || HIGH.has(p.id);
    urls.push({
      loc: absoluteUrl(p.id),
      lastmod: iso(d),
      changefreq: 'monthly',
      priority: high ? '0.9' : '0.8',
    });
  }

  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        (u) =>
          `  <url>\n` +
          `    <loc>${u.loc}</loc>\n` +
          `    <lastmod>${u.lastmod}</lastmod>\n` +
          `    <changefreq>${u.changefreq}</changefreq>\n` +
          `    <priority>${u.priority}</priority>\n` +
          `  </url>`,
      )
      .join('\n') +
    `\n</urlset>\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
