/**
 * Carte d'architecture éditoriale — crm-logiciel.fr (arborescence de lancement)
 *
 * 27 URLs plates en /slug/ (slash final), accueil = '/'.
 * Les clusters (Comprendre / Choisir / Utiliser) servent au MENU et au FIL
 * D'ARIANE uniquement : ce ne sont PAS des segments d'URL.
 *
 * Chaque cluster a un PILIER (page d'entrée de l'univers). Faute de page « hub »
 * par cluster, c'est le pilier qui sert de niveau intermédiaire dans le fil
 * d'Ariane (ex. : Accueil > Mettre en place un CRM > Le pipeline commercial).
 *
 * Les libellés ci-dessous servent au menu et aux ancres internes ; le <title>
 * et le H1 de chaque page viennent du frontmatter (collection `pages`, Phase 3).
 *
 * Structure plate volontaire : avis, comparatifs et secteurs s'ajouteront plus
 * tard sans rien casser.
 */

import { path } from './site';

export type ClusterId = 'comprendre' | 'choisir' | 'utiliser' | 'transverse';

export interface PageNode {
  /** Slug = nom de fichier Markdown, sans slash. '' pour l'accueil. */
  slug: string;
  /** Libellé court pour le menu et les ancres internes. */
  label: string;
  /** Libellé encore plus court pour le fil d'Ariane (défaut : label). */
  breadcrumbLabel?: string;
  cluster: ClusterId;
  /** Pilier = page d'entrée du cluster (niveau intermédiaire du fil d'Ariane). */
  pillar?: boolean;
}

export type Palette = 'blue' | 'teal' | 'orange' | 'green';

export interface Cluster {
  id: ClusterId;
  /** Libellé affiché en tête de menu. */
  label: string;
  /** Slug du pilier (cible du libellé de tête + niveau de fil d'Ariane). */
  pillarSlug: string;
  /** Libellé du lien « pilier » en tête du déroulant (question concrète). */
  pillarLabel: string;
  /** Apparaît dans le menu principal au lancement ? */
  inNav: boolean;
  /** Couleur de la charte propre au cluster (segmentation visuelle du menu). */
  palette: Palette;
}

/* -------------------------------------------------------------------------- */
/* Clusters                                                                    */
/* -------------------------------------------------------------------------- */

export const CLUSTERS: Cluster[] = [
  {
    id: 'comprendre',
    label: 'Comprendre',
    pillarSlug: 'qu-est-ce-qu-un-crm',
    pillarLabel: "Qu'est-ce qu'un CRM ?",
    inNav: true,
    palette: 'blue',
  },
  {
    id: 'choisir',
    label: 'Choisir',
    pillarSlug: 'comment-choisir-crm',
    pillarLabel: 'Quel CRM choisir ?',
    inNav: true,
    palette: 'teal',
  },
  {
    id: 'utiliser',
    label: 'Utiliser',
    pillarSlug: 'mise-en-place-crm',
    pillarLabel: 'Comment mettre en place un CRM ?',
    inNav: true,
    palette: 'orange',
  },
  // Transverse : pas un cluster de menu déroulant.
  {
    id: 'transverse',
    label: 'Transverse',
    pillarSlug: 'methodologie',
    pillarLabel: 'Notre méthodologie de test',
    inNav: false,
    palette: 'green',
  },
];

/* -------------------------------------------------------------------------- */
/* Les 27 pages de lancement                                                   */
/* -------------------------------------------------------------------------- */

export const PAGES: PageNode[] = [
  // Accueil (racine)
  { slug: '', label: 'Accueil', cluster: 'transverse' },

  // Transverse
  { slug: 'methodologie', label: 'Notre méthodologie de test', cluster: 'transverse' },
  {
    slug: 'modele-email-relance',
    label: "Modèles d'email de relance",
    breadcrumbLabel: 'Modèles de relance',
    cluster: 'transverse',
  },

  // Comprendre (8)
  {
    slug: 'qu-est-ce-qu-un-crm',
    label: "Qu'est-ce qu'un CRM ?",
    cluster: 'comprendre',
    pillar: true,
  },
  { slug: 'fonctionnalites-crm', label: "Les fonctionnalités d'un CRM", cluster: 'comprendre' },
  { slug: 'types-de-crm', label: 'Les types de CRM', cluster: 'comprendre' },
  {
    slug: 'crm-vs-erp',
    label: 'CRM vs ERP : quelles différences ?',
    breadcrumbLabel: 'CRM vs ERP',
    cluster: 'comprendre',
  },
  {
    slug: 'crm-excel',
    label: 'CRM sur Excel : modèle gratuit et limites',
    breadcrumbLabel: 'CRM sur Excel',
    cluster: 'comprendre',
  },
  {
    slug: 'gestion-relation-client',
    label: 'La gestion de la relation client (GRC)',
    breadcrumbLabel: 'Gestion de la relation client',
    cluster: 'comprendre',
  },
  {
    slug: 'avantages-inconvenients-crm',
    label: "Avantages et inconvénients d'un CRM",
    breadcrumbLabel: 'Avantages et inconvénients',
    cluster: 'comprendre',
  },
  {
    slug: 'ai-je-besoin-d-un-crm',
    label: "Ai-je besoin d'un CRM ?",
    cluster: 'comprendre',
  },
  {
    slug: 'notion-ou-crm',
    label: 'CRM ou Notion / Airtable ?',
    breadcrumbLabel: 'CRM ou Notion',
    cluster: 'comprendre',
  },
  {
    slug: 'crm-ou-logiciel-de-facturation',
    label: 'CRM ou logiciel de facturation ?',
    breadcrumbLabel: 'CRM ou facturation',
    cluster: 'comprendre',
  },
  {
    slug: 'ou-sont-stockees-donnees-crm',
    label: 'Où sont stockées les données ?',
    breadcrumbLabel: 'Stockage des données',
    cluster: 'comprendre',
  },
  { slug: 'lexique-crm', label: 'Lexique du CRM', cluster: 'comprendre' },

  // Choisir (6)
  {
    slug: 'comment-choisir-crm',
    label: 'Comment choisir son CRM',
    cluster: 'choisir',
    pillar: true,
  },
  {
    slug: 'prix-crm',
    label: 'Prix d’un CRM : combien ça coûte vraiment',
    breadcrumbLabel: "Prix d'un CRM",
    cluster: 'choisir',
  },
  {
    slug: 'crm-rentable',
    label: 'Un CRM est-il rentable ?',
    breadcrumbLabel: 'Rentabilité d’un CRM',
    cluster: 'choisir',
  },
  {
    slug: 'cahier-des-charges-crm',
    label: 'Cahier des charges CRM : méthode et modèle',
    breadcrumbLabel: 'Cahier des charges CRM',
    cluster: 'choisir',
  },
  {
    slug: 'migration-crm',
    label: 'Changer de CRM : réussir sa migration',
    breadcrumbLabel: 'Migration de CRM',
    cluster: 'choisir',
  },
  {
    slug: 'questions-demo-crm',
    label: 'Les questions à poser avant de signer',
    breadcrumbLabel: 'Questions avant la démo',
    cluster: 'choisir',
  },
  {
    slug: 'crm-sur-mesure',
    label: 'CRM sur mesure : développer ou acheter ?',
    breadcrumbLabel: 'CRM sur mesure',
    cluster: 'choisir',
  },
  {
    slug: 'crm-gratuit',
    label: 'Les meilleurs CRM gratuits',
    breadcrumbLabel: 'CRM gratuits',
    cluster: 'choisir',
  },

  // Utiliser (10)
  {
    slug: 'mise-en-place-crm',
    label: 'Mettre en place un CRM : la méthode',
    breadcrumbLabel: 'Mettre en place un CRM',
    cluster: 'utiliser',
    pillar: true,
  },
  { slug: 'pipeline-commercial', label: 'Le pipeline commercial', cluster: 'utiliser' },
  { slug: 'fichier-client', label: 'Le fichier client', cluster: 'utiliser' },
  { slug: 'lead-scoring', label: 'Le lead scoring', cluster: 'utiliser' },
  { slug: 'segmentation-client', label: 'La segmentation client', cluster: 'utiliser' },
  {
    slug: 'automatisation-commerciale',
    label: "L'automatisation commerciale",
    cluster: 'utiliser',
  },
  {
    slug: 'tableau-de-bord-commercial',
    label: 'KPI et tableau de bord commercial',
    breadcrumbLabel: 'Tableau de bord commercial',
    cluster: 'utiliser',
  },
  {
    slug: 'suivi-commercial',
    label: 'Le suivi commercial au quotidien',
    breadcrumbLabel: 'Suivi commercial',
    cluster: 'utiliser',
  },
  {
    slug: 'crm-rgpd',
    label: 'CRM et RGPD : être conforme',
    breadcrumbLabel: 'CRM et RGPD',
    cluster: 'utiliser',
  },
  {
    slug: 'echec-projet-crm',
    label: 'Pourquoi les projets CRM échouent',
    breadcrumbLabel: 'Échecs de projet CRM',
    cluster: 'utiliser',
  },
  {
    slug: 'adoption-crm-commerciaux',
    label: 'Faire adopter le CRM',
    breadcrumbLabel: 'Adoption du CRM',
    cluster: 'utiliser',
  },
];

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

/** Map slug → PageNode pour les accès directs. */
const PAGE_BY_SLUG = new Map(PAGES.map((p) => [p.slug, p]));

export function getPage(slug: string): PageNode | undefined {
  return PAGE_BY_SLUG.get(slug.replace(/^\/+|\/+$/g, ''));
}

export function getCluster(id: ClusterId): Cluster | undefined {
  return CLUSTERS.find((c) => c.id === id);
}

/** Toutes les pages d'un cluster (hors accueil), dans l'ordre de déclaration. */
export function pagesOf(clusterId: ClusterId): PageNode[] {
  return PAGES.filter((p) => p.cluster === clusterId && p.slug !== '');
}

/** Libellé de fil d'Ariane d'une page (court si défini, sinon label). */
export function crumbLabel(page: PageNode): string {
  return page.breadcrumbLabel ?? page.label;
}

export interface Crumb {
  label: string;
  /** URL avec slash final ; undefined pour le dernier élément (page courante). */
  href?: string;
}

/**
 * Construit le fil d'Ariane d'une page.
 * - satellite d'un cluster : Accueil > [pilier] > [page]
 * - pilier d'un cluster    : Accueil > [pilier]
 * - transverse (méthodo)   : Accueil > [page]
 * - accueil                : [] (pas de fil d'Ariane)
 */
export function breadcrumb(slug: string): Crumb[] {
  const page = getPage(slug);
  if (!page || page.slug === '') return [];

  const crumbs: Crumb[] = [{ label: 'Accueil', href: path('') }];
  const cluster = getCluster(page.cluster);

  // Niveau intermédiaire = pilier du cluster, sauf si la page EST le pilier
  // ou si le cluster est transverse (pas de pilier intermédiaire affiché).
  if (cluster && cluster.id !== 'transverse' && !page.pillar) {
    const pillar = getPage(cluster.pillarSlug);
    if (pillar) {
      crumbs.push({ label: crumbLabel(pillar), href: path(pillar.slug) });
    }
  }

  crumbs.push({ label: crumbLabel(page) });
  return crumbs;
}

/** Arbre de navigation principal : clusters de menu + leurs pages. */
export interface NavChild {
  label: string;
  href: string;
  /** Emoji d'icône (variante « boîte à outils »). */
  icon?: string;
  /** Description courte (variante « boîte à outils »). */
  desc?: string;
}

export interface NavItem {
  label: string;
  href: string;
  palette: Palette;
  /** Libellé du lien pilier en tête du déroulant (clusters uniquement). */
  pillarLabel?: string;
  children?: NavChild[];
  /** Lien mis en avant (page phare hors cluster). */
  featured?: boolean;
  /** Bouton d'appel à l'action (carré, mis en avant). */
  cta?: boolean;
  /** Variante d'affichage du déroulant (« tools » = cartes icône + description). */
  variant?: 'tools';
  /** Emoji d'icône (sur-menu). */
  icon?: string;
}

/** Outils interactifs regroupés dans la « Boîte à outils » du menu. */
export interface Tool {
  slug: string;
  label: string;
  icon: string;
  desc: string;
}

export const TOOLS: Tool[] = [
  {
    slug: 'comparatif-crm',
    label: 'Comparateur de CRM',
    icon: '⚖️',
    desc: 'Comparez 14 CRM côte à côte',
  },
  {
    slug: 'calculateur-roi-crm-gratuit',
    label: 'Calculateur de ROI',
    icon: '📈',
    desc: 'Estimez votre retour en 2 minutes',
  },
  {
    slug: 'modele-email-relance',
    label: "Modèles d'email de relance",
    icon: '✉️',
    desc: '6 modèles prêts à copier',
  },
];

/** Pages mises en avant directement dans la nav (exclues des déroulants). */
const NAV_FEATURED = ['crm-gratuit'];

export function navTree(): NavItem[] {
  // Menu principal = les trois clusters, alignés à gauche après la marque.
  // Le comparateur n'y figure plus : il vit dans la « Boîte à outils » du sur-menu.
  return CLUSTERS.filter((c) => c.inNav).map((c) => ({
    label: c.label,
    href: path(c.pillarSlug),
    palette: c.palette,
    pillarLabel: c.pillarLabel,
    // Le déroulant liste les satellites uniquement (hors pilier et hors pages
    // déjà mises en avant directement dans la nav).
    children: pagesOf(c.id)
      .filter((p) => p.slug !== c.pillarSlug && !NAV_FEATURED.includes(p.slug))
      .map((p) => ({ label: p.label, href: path(p.slug) })),
  }));
}

/**
 * Sur-menu (barre supérieure NON sticky, au-dessus du menu principal) :
 * la boîte à outils, les CRM gratuits et le test de connaissances. En mobile,
 * ces entrées basculent dans le menu hamburger avec le reste.
 */
export function topbarNav(): NavItem[] {
  return [
    {
      label: 'Boîte à outils',
      href: path(TOOLS[0].slug),
      palette: 'blue',
      variant: 'tools',
      icon: '🧰',
      children: TOOLS.map((t) => ({
        label: t.label,
        href: path(t.slug),
        icon: t.icon,
        desc: t.desc,
      })),
    },
    { label: 'CRM gratuits', href: path('crm-gratuit'), palette: 'green', featured: true, icon: '🎁' },
    {
      label: 'Test connaissances CRM',
      href: path('test-connaissance-crm'),
      palette: 'orange',
      cta: true,
      icon: '🎯',
    },
  ];
}

/** Les piliers de cluster (pages d'entrée), pour le footer et les hubs. */
export function pillars(): { label: string; href: string; palette: Palette }[] {
  return CLUSTERS.filter((c) => c.inNav).map((c) => {
    const p = getPage(c.pillarSlug);
    return { label: p?.label ?? c.label, href: path(c.pillarSlug), palette: c.palette };
  });
}

/**
 * Liens utilitaires (footer). `href` final (chemin /slug/ ou mailto).
 * Contact = lien e-mail direct (pas de page dédiée). « À propos » sera ajouté
 * quand son contenu sera fourni.
 */
export const UTILITY_LINKS: { label: string; href: string }[] = [
  { label: 'À propos', href: path('a-propos') },
  { label: 'Contact', href: 'mailto:contact@crm-logiciel.fr' },
  { label: 'Mentions légales', href: path('mentions-legales') },
  { label: 'Politique de confidentialité', href: path('politique-de-confidentialite') },
];
