/**
 * Constantes globales du site — crm-logiciel.fr
 * Source unique de vérité pour l'identité, l'URL et l'auteur par défaut.
 */

export const SITE = {
  /** Nom de marque (titres, JSON-LD Organization/WebSite). */
  name: 'crm-logiciel.fr',
  /** Nom long pour les contextes éditoriaux. */
  longName: 'crm-logiciel.fr, le média de référence sur les logiciels CRM',
  /** URL de production, sans slash final (l'helpers ajoute les slashs). */
  url: 'https://crm-logiciel.fr',
  /** Langue unique au lancement. */
  locale: 'fr_FR',
  lang: 'fr',
  /** Description par défaut (fallback meta description / OpenGraph). */
  description:
    'Le média de référence sur les logiciels CRM en France : comprendre, choisir et utiliser un CRM, méthodes et comparatifs indépendants.',
  /** Image OpenGraph par défaut (à fournir ; placeholder pour l'instant). */
  defaultOgImage: '/images/og-default.png',
  /** Compte Twitter/X de la marque (laisser vide tant qu'inexistant). */
  twitter: '',
} as const;

/**
 * Interrupteur d'indexation global. Tant que le site est en phase de chauffe,
 * toutes les pages éditoriales restent en `noindex`. Passer à `true` au moment
 * du lancement (Phase 5) pour ouvrir l'indexation d'un coup. Les pages purement
 * techniques pourraient rester en noindex en dur, indépendamment de ce flag.
 */
export const INDEXABLE = true;

/**
 * Auteur éditorial par défaut (roadmap §4). Réutilisé dans le frontmatter
 * et le JSON-LD Person/Article.
 */
export const DEFAULT_AUTHOR = {
  name: 'Julien Lefèvre',
  /** URL de la page auteur (à créer ultérieurement). */
  url: `${SITE.url}/`,
  jobTitle: 'Expert CRM et logiciels de gestion commerciale',
  /** Initiales (repli si la photo est absente). */
  initials: 'JL',
  /** Photo de l'auteur (portrait carré). */
  photo: '/images/julien-lefevre.webp',
  /** Bio courte affichée dans le bloc auteur de fin d'article (EEAT). */
  bio: "Consultant CRM depuis plus de quinze ans, Julien Lefèvre a déployé des dizaines d'outils pour des entreprises de toutes tailles. Il a relancé crm-logiciel.fr avec une idée simple : aider chacun à trouver le bon logiciel, gratuitement et sans parti pris.",
} as const;

/**
 * Construit une URL de chemin avec slash final (politique de slash du site).
 * '' → '/' (accueil) ; 'pipeline-commercial' → '/pipeline-commercial/'.
 */
export function path(slug: string): string {
  if (!slug || slug === '/') return '/';
  const clean = slug.replace(/^\/+|\/+$/g, '');
  return clean === '' ? '/' : `/${clean}/`;
}

/** URL absolue canonique pour un slug donné. */
export function absoluteUrl(slug: string): string {
  return new URL(path(slug), SITE.url).href;
}
