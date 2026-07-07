/**
 * Diagnostic « Ai-je besoin d'un CRM ? » — données de l'auto-diagnostic.
 *
 * Ce n'est PAS un quiz de connaissances : c'est un outil d'auto-évaluation.
 * 8 questions Oui/Non (Oui = 1 point), score sur 8, trois paliers de résultat.
 * Pas de bonne ni de mauvaise réponse → aucun schéma Quiz/Question (voir le brief).
 */

export const QUESTIONS: string[] = [
  'Suivez-vous plus d’une dizaine de prospects ou clients actifs en même temps ?',
  'Vous arrive-t-il d’oublier de relancer un prospect ou un devis en attente ?',
  'Plus d’une personne intervient-elle dans la relation avec vos clients ?',
  'Une vente demande-t-elle généralement plusieurs échanges avant d’aboutir ?',
  'Vos informations clients sont-elles éparpillées entre mails, tableurs et carnets ?',
  'Une partie de votre chiffre repose-t-elle sur des clients qui reviennent ?',
  'Faites-vous de la prospection ou des campagnes pour trouver de nouveaux clients ?',
  'Seriez-vous incapable de dire en dix secondes combien d’affaires sont en cours et à quel stade ?',
];

export interface Cta {
  label: string;
  href: string;
  variant: 'primary' | 'ghost';
}

export interface Tier {
  min: number;
  max: number;
  /** Couleur de charte du palier (teal → orange → blue). */
  tone: 'teal' | 'orange' | 'blue';
  badge: string;
  title: string;
  text: string;
  ctas: Cta[];
}

export const TIERS: Tier[] = [
  {
    min: 0,
    max: 2,
    tone: 'teal',
    badge: '0 à 2 sur 8',
    title: 'Un CRM n’est pas nécessaire aujourd’hui.',
    text: 'Votre organisation actuelle suffit à votre volume. Un tableur bien tenu fait le travail, et vous pourrez y revenir quand l’activité grossira.',
    ctas: [{ label: 'Structurer mes débuts sur un tableur', href: '/crm-excel/', variant: 'primary' }],
  },
  {
    min: 3,
    max: 5,
    tone: 'orange',
    badge: '3 à 5 sur 8',
    title: 'Un CRM commence à se justifier.',
    text: 'Vous laissez probablement déjà filer quelques opportunités faute d’organisation. Le bon réflexe est de tester sans risque avant de vous engager.',
    ctas: [{ label: 'Tester un CRM gratuit', href: '/crm-gratuit/', variant: 'primary' }],
  },
  {
    min: 6,
    max: 8,
    tone: 'blue',
    badge: '6 à 8 sur 8',
    title: 'Un CRM vous ferait clairement gagner du temps et du chiffre.',
    text: 'L’absence d’outil vous coûte déjà des ventes. Équipez-vous, mais visez juste pour ne pas surdimensionner.',
    ctas: [
      { label: 'Choisir le bon outil', href: '/comment-choisir-crm/', variant: 'primary' },
      { label: 'Commencer avec une offre gratuite', href: '/crm-gratuit/', variant: 'ghost' },
    ],
  },
];

export function tierFor(score: number): Tier {
  return TIERS.find((t) => score >= t.min && score <= t.max) ?? TIERS[TIERS.length - 1];
}
