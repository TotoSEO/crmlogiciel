/**
 * Builders de données structurées (JSON-LD) — crm-logiciel.fr
 *
 * Chaque fonction renvoie un objet schema.org pur. Les pages composent un
 * graphe (tableau d'objets) et le passent au composant <JsonLd>. Le JSON-LD est
 * toujours rendu dans le HTML source, jamais via un gestionnaire de balises.
 *
 * Conventions @id (pour relier les entités sans dupliquer) :
 *   Organization : `${SITE.url}/#organization`
 *   WebSite      : `${SITE.url}/#website`
 */

import { SITE, DEFAULT_AUTHOR, absoluteUrl } from '../config/site';
import type { Crumb } from '../config/content-map';

const ORG_ID = `${SITE.url}/#organization`;
const WEBSITE_ID = `${SITE.url}/#website`;

type Json = Record<string, unknown>;

/** Organization — entité de marque (réutilisée comme publisher). */
export function organization(): Json {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE.name,
    url: `${SITE.url}/`,
    description: SITE.description,
    logo: new URL('/images/logo.png', SITE.url).href,
  };
}

/** WebSite — pour l'accueil. */
export function website(): Json {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE.name,
    url: `${SITE.url}/`,
    inLanguage: SITE.lang,
    publisher: { '@id': ORG_ID },
  };
}

/** Person — auteur éditorial (E-E-A-T : bio + rattachement à la marque). */
export function person(name: string = DEFAULT_AUTHOR.name): Json {
  return {
    '@type': 'Person',
    name,
    url: DEFAULT_AUTHOR.url,
    jobTitle: DEFAULT_AUTHOR.jobTitle,
    description: DEFAULT_AUTHOR.bio,
    worksFor: { '@id': ORG_ID },
    image: new URL(DEFAULT_AUTHOR.photo, SITE.url).href,
  };
}

export interface ArticleInput {
  headline: string;
  description: string;
  /** Slug de la page (canonical auto-référent). */
  slug: string;
  datePublished: string; // ISO 8601
  dateModified: string; // ISO 8601
  authorName?: string;
  /** Chemin ou URL de l'image à la une. */
  image?: string;
}

/** Article — pages de guides (clusters). */
export function article(input: ArticleInput): Json {
  const url = absoluteUrl(input.slug);
  const obj: Json = {
    '@type': 'Article',
    headline: input.headline,
    description: input.description,
    inLanguage: SITE.lang,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    author: person(input.authorName),
    publisher: { '@id': ORG_ID },
  };
  if (input.image) obj.image = new URL(input.image, SITE.url).href;
  return obj;
}

export interface FaqItem {
  question: string;
  answer: string;
}

/** FAQPage — pages comportant une FAQ. */
export function faqPage(items: FaqItem[]): Json {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.answer },
    })),
  };
}

/**
 * BreadcrumbList — à partir du fil d'Ariane (helper content-map).
 * `currentUrl` est l'URL absolue de la page courante (dernier élément sans href).
 */
export function breadcrumbList(crumbs: Crumb[], currentUrl: string): Json {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: c.href ? new URL(c.href, SITE.url).href : currentUrl,
    })),
  };
}

/**
 * Enveloppe un ou plusieurs objets dans un graphe @context unique.
 * À passer tel quel au composant <JsonLd>.
 */
export function graph(...nodes: Json[]): Json {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}
