/**
 * /llms.txt — présentation du site en langage naturel pour les moteurs de réponse
 * (format llms.txt). Généré depuis la collection `pages` pour rester synchronisé :
 * H1 (marque) + description en blockquote, puis une section H2 par univers avec un
 * lien et une description (la meta description) par page clé.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE, absoluteUrl } from '../config/site';
import { pagesOf, type ClusterId } from '../config/content-map';

const SECTION_TITLE: Record<ClusterId, string> = {
  comprendre: 'Comprendre le CRM',
  choisir: 'Choisir son CRM',
  utiliser: 'Utiliser son CRM',
  transverse: 'Méthodologie et outils',
};

const ORDER: ClusterId[] = ['comprendre', 'choisir', 'utiliser', 'transverse'];

export const GET: APIRoute = async () => {
  const pages = await getCollection('pages');
  const bySlug = new Map(pages.map((p) => [p.id, p]));

  let out = `# ${SITE.name}\n\n> ${SITE.description}\n`;

  for (const cid of ORDER) {
    const lines: string[] = [];
    for (const node of pagesOf(cid)) {
      const entry = bySlug.get(node.slug);
      if (!entry) continue;
      lines.push(
        `- [${entry.data.title}](${absoluteUrl(node.slug)}): ${entry.data.metaDescription}`,
      );
    }
    if (cid === 'transverse') {
      lines.push(
        `- [Test de connaissances CRM](${absoluteUrl('test-connaissance-crm')}): Quiz gratuit de 42 questions pour évaluer son niveau en CRM, avec un score détaillé par thème.`,
      );
    }
    if (lines.length) out += `\n## ${SECTION_TITLE[cid]}\n${lines.join('\n')}\n`;
  }

  return new Response(out, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
