/**
 * Constantes globales du site : crm-logiciel.fr
 * Source unique de vérité pour l'identité, l'URL et les mentions de transparence.
 *
 * Règle éditoriale : aucune affirmation invérifiable sur le site lui-même
 * (« n°1 », « référence », « indépendant », « testé », ancienneté de l'éditeur).
 * Le nom de domaine a hébergé un autre site dès 2007, mais l'enregistrement
 * actuel date de juin 2026 (registre AFNIC) : on ne revendique pas cet historique.
 */

export const SITE = {
  /** Nom de marque (titres, JSON-LD Organization/WebSite). */
  name: 'crm-logiciel.fr',
  /** Nom long pour les contextes éditoriaux. */
  longName: 'crm-logiciel.fr : guides et classements pour choisir son CRM',
  /** URL de production, sans slash final (l'helpers ajoute les slashs). */
  url: 'https://crm-logiciel.fr',
  /** Langue unique au lancement. */
  locale: 'fr_FR',
  lang: 'fr',
  /** Description par défaut (fallback meta description / OpenGraph). */
  description:
    'Comprendre, choisir et utiliser un logiciel CRM : guides pratiques, méthodes et classements des CRM par profil d’entreprise, avec sources et tarifs datés.',
  /** Image OpenGraph par défaut. */
  defaultOgImage: '/images/og-default.png',
  /** Compte Twitter/X de la marque (laisser vide tant qu'inexistant). */
  twitter: '',
  /** Adresse de contact publique (questions, demandes de correction). */
  contactEmail: 'contact@crm-logiciel.fr',
} as const;

/**
 * Liens d'intérêts de l'éditeur, en formulation générique (choix de l'éditeur) :
 * - DISCLOSURE_CLASSEMENTS : encadré en tête de chaque page qui déclare un
 *   classement (frontmatter `classement`), avant l'encart « En bref » ;
 * - DISCLOSURE_SITE : pied de page de toutes les pages.
 * Le détail figure sur /a-propos/#transparence et dans les mentions légales.
 */
export const DISCLOSURE_CLASSEMENTS =
  "Classement établi selon les critères décrits dans cet article. L'éditeur du site entretient des liens professionnels avec l'un des éditeurs de logiciels présentés.";

export const DISCLOSURE_SITE =
  "L'éditeur du site entretient des liens professionnels avec l'un des éditeurs de logiciels présentés dans nos classements.";

/** Ancre de la section « Liens d'intérêts » de la page À propos. */
export const TRANSPARENCE_HREF = '/a-propos/#transparence';

/**
 * Interrupteur d'indexation global. Tant que le site est en phase de chauffe,
 * toutes les pages éditoriales restent en `noindex`. Passer à `true` au moment
 * du lancement (Phase 5) pour ouvrir l'indexation d'un coup. Les pages purement
 * techniques pourraient rester en noindex en dur, indépendamment de ce flag.
 */
export const INDEXABLE = true;

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
