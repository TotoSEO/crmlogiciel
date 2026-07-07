/**
 * Calculateur de ROI d'un CRM — champs + calculs (modes simple et avancé).
 *
 * Principe : on met en balance ce qu'un CRM peut vous faire GAGNER (ventes
 * récupérées, meilleure conversion, temps gagné) et ce qu'il vous COÛTE
 * (abonnement + temps passé à l'alimenter + mise en place). Le résultat clé est
 * le gain NET annuel et le délai d'amortissement.
 *
 * Hypothèses par défaut = ordres de grandeur prudents, tous modifiables. Aucune
 * donnée collectée. Le résultat est une estimation, pas une garantie. Les mêmes
 * fonctions servent au rendu serveur (état par défaut) et au calcul temps réel.
 */

export type Unit = 'eur' | 'pct' | 'num' | 'h';

export interface Field {
  key: string;
  label: string;
  def: number;
  unit: Unit;
  min: number;
  step: number;
  /** Aide courte affichée sous le champ. */
  hint?: string;
  /** Explication détaillée (bulle « ? »). */
  help?: string;
  /** Champ facultatif : peut rester vide (compté comme 0 dans le calcul). */
  optional?: boolean;
}

/** Base de facturation du CRM (tous les éditeurs ne facturent pas par siège). */
export type Billing = 'user-month' | 'user-year' | 'flat-month' | 'flat-year';

export const BILLING_OPTIONS: { value: Billing; label: string }[] = [
  { value: 'user-month', label: 'par utilisateur / mois' },
  { value: 'user-year', label: 'par utilisateur / an' },
  { value: 'flat-month', label: 'forfait / mois' },
  { value: 'flat-year', label: 'forfait / an' },
];

/** Coût annuel de l'abonnement selon la base de facturation choisie. */
function annualSubscription(budget: number, billing: Billing, users: number): number {
  const u = Math.max(1, users);
  switch (billing) {
    case 'user-year':
      return budget * u;
    case 'flat-month':
      return budget * 12;
    case 'flat-year':
      return budget;
    case 'user-month':
    default:
      return budget * u * 12;
  }
}

/** Semaines travaillées par an (hypothèse pour valoriser le temps). */
const WEEKS = 45;

export const SIMPLE: Field[] = [
  {
    key: 'ventes',
    label: 'Ventes conclues par mois',
    def: 5,
    unit: 'num',
    min: 0,
    step: 1,
    help: "Le nombre d'affaires que vous signez en moyenne chaque mois aujourd'hui, avant CRM.",
  },
  {
    key: 'marge',
    label: 'Marge moyenne par vente',
    def: 1000,
    unit: 'eur',
    min: 0,
    step: 50,
    help: 'Ce qu\'une vente vous rapporte réellement (chiffre d\'affaires moins les coûts directs), pas le prix affiché.',
  },
  {
    key: 'users',
    label: "Nombre d'utilisateurs du CRM",
    def: 1,
    unit: 'num',
    min: 1,
    step: 1,
    help: "Combien de personnes utiliseront l'outil. Sert au calcul du coût si l'abonnement est facturé par utilisateur.",
  },
  {
    key: 'budget',
    label: 'Budget CRM',
    def: 25,
    unit: 'eur',
    min: 0,
    step: 5,
    help: "Le prix de l'abonnement. Choisissez à droite s'il est facturé par utilisateur ou en forfait, au mois ou à l'année.",
  },
];

export const ADVANCED: Field[] = [
  {
    key: 'commerciaux',
    label: 'Nombre de commerciaux',
    def: 1,
    unit: 'num',
    min: 1,
    step: 1,
    help: 'Les personnes qui suivent des ventes et utiliseront le CRM au quotidien.',
  },
  {
    key: 'oppMois',
    label: 'Opportunités traitées / mois / commercial',
    def: 20,
    unit: 'num',
    min: 0,
    step: 1,
    optional: true,
    help: 'Le nombre de prospects ou devis qu\'un commercial gère en moyenne sur un mois.',
  },
  {
    key: 'marge',
    label: 'Marge moyenne par affaire',
    def: 1000,
    unit: 'eur',
    min: 0,
    step: 50,
    help: 'Ce qu\'une affaire signée vous rapporte réellement (hors coûts directs).',
  },
  {
    key: 'ameliorationPts',
    label: 'Gain de conversion attendu avec un CRM',
    def: 3,
    unit: 'pct',
    min: 0,
    step: 1,
    optional: true,
    hint: 'En points de pourcentage',
    help: 'De combien de points votre taux de transformation peut progresser grâce à un suivi régulier. 2 à 4 points est un ordre de grandeur prudent. Laissez vide si vous ne savez pas.',
  },
  {
    key: 'partPerdue',
    label: 'Affaires perdues faute de relance',
    def: 15,
    unit: 'pct',
    min: 0,
    step: 1,
    optional: true,
    help: 'La part de vos opportunités qui filent aujourd\'hui par simple oubli de relance ou de suivi. Laissez vide si vous ne savez pas.',
  },
  {
    key: 'partRecuperable',
    label: 'Part de ces affaires récupérable',
    def: 40,
    unit: 'pct',
    min: 0,
    step: 1,
    optional: true,
    help: 'Parmi les affaires perdues par oubli, la proportion qu\'un CRM (relances, rappels) permettrait de rattraper.',
  },
  {
    key: 'heuresAdmin',
    label: 'Heures / semaine perdues en recherche d\'infos',
    def: 5,
    unit: 'h',
    min: 0,
    step: 1,
    optional: true,
    help: 'Le temps qu\'un commercial passe chaque semaine à chercher une info éparpillée (mails, tableurs, notes) avant le CRM.',
  },
  {
    key: 'partEconomisee',
    label: 'Part de ce temps économisée avec un CRM',
    def: 30,
    unit: 'pct',
    min: 0,
    step: 1,
    optional: true,
    help: 'La fraction de ce temps de recherche que la centralisation du CRM vous fait gagner.',
  },
  {
    key: 'heuresCrm',
    label: 'Heures / semaine pour alimenter le CRM',
    def: 2,
    unit: 'h',
    min: 0,
    step: 1,
    optional: true,
    help: 'Le temps qu\'un commercial passera à SAISIR et tenir le CRM à jour chaque semaine. C\'est un coût réel, on le déduit des gains.',
  },
  {
    key: 'coutHoraire',
    label: 'Coût horaire chargé',
    def: 30,
    unit: 'eur',
    min: 0,
    step: 5,
    help: 'Le coût d\'une heure de travail, charges comprises. Sert à valoriser en euros le temps gagné et le temps passé sur le CRM.',
  },
  {
    key: 'budget',
    label: 'Budget CRM',
    def: 25,
    unit: 'eur',
    min: 0,
    step: 5,
    help: "Le prix de l'abonnement. Choisissez à droite s'il est facturé par utilisateur ou en forfait, au mois ou à l'année.",
  },
  {
    key: 'fraisSetup',
    label: 'Frais de mise en place (uniques)',
    def: 0,
    unit: 'eur',
    min: 0,
    step: 50,
    optional: true,
    help: 'Coût ponctuel de démarrage : paramétrage, import des contacts, formation. Compté sur la première année.',
  },
];

export interface Result {
  /** Valeur totale que le CRM aide à créer sur un an. */
  valeur: number;
  /** Coût total du CRM sur un an (abonnement + temps + mise en place). */
  cout: number;
  /** Gain net = valeur − coût. */
  net: number;
  /** Multiple (valeur / coût). */
  roi: number | null;
  /** Délai d'amortissement en mois. */
  delai: number | null;
  /* Détail des GAINS (mode avancé). */
  recuperees?: number;
  conversion?: number;
  temps?: number;
  /* Détail des COÛTS. */
  coutAbo: number;
  coutTemps?: number;
  coutSetup?: number;
}

export function defaults(fields: Field[]): Record<string, number> {
  return Object.fromEntries(fields.map((f) => [f.key, f.def]));
}

export function compute(
  mode: 'simple' | 'avance',
  v: Record<string, number>,
  billing: Billing = 'user-month',
): Result {
  // Champ vide ou non renseigné → compté comme 0 (le levier ne contribue pas).
  const num = (k: string) => (Number.isFinite(v[k]) ? v[k] : 0);

  let valeur = 0;
  let coutAbo = 0;
  let coutTemps: number | undefined;
  let coutSetup: number | undefined;
  let recuperees: number | undefined;
  let conversion: number | undefined;
  let temps: number | undefined;

  if (mode === 'simple') {
    const caActuel = num('ventes') * 12 * num('marge');
    valeur = caActuel * 0.1; // hypothèse prudente : +10 % de valeur créée
    coutAbo = annualSubscription(num('budget'), billing, num('users'));
  } else {
    const oppAnnuelles = num('commerciaux') * num('oppMois') * 12;
    recuperees =
      oppAnnuelles * (num('partPerdue') / 100) * (num('partRecuperable') / 100) * num('marge');
    conversion = oppAnnuelles * (num('ameliorationPts') / 100) * num('marge');
    temps =
      num('commerciaux') * num('heuresAdmin') * WEEKS * (num('partEconomisee') / 100) * num('coutHoraire');
    valeur = recuperees + conversion + temps;

    coutAbo = annualSubscription(num('budget'), billing, num('commerciaux'));
    // Coût du temps passé à alimenter et suivre le CRM (déduit des gains).
    coutTemps = num('commerciaux') * num('heuresCrm') * WEEKS * num('coutHoraire');
    coutSetup = num('fraisSetup');
  }

  const cout = coutAbo + (coutTemps ?? 0) + (coutSetup ?? 0);
  const net = valeur - cout;
  const roi = cout > 0 ? valeur / cout : null;
  const delai = valeur > 0 ? cout / (valeur / 12) : null;

  return { valeur, cout, net, roi, delai, recuperees, conversion, temps, coutAbo, coutTemps, coutSetup };
}

/* --------- Formatage (fr-FR) --------- */
const eur = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

export function fmtEur(n: number): string {
  return eur.format(Math.round(n));
}

export function fmtRoi(roi: number | null): string {
  if (roi == null) return '—';
  return `${roi.toLocaleString('fr-FR', { maximumFractionDigits: roi >= 10 ? 0 : 1 })}×`;
}

export function fmtDelai(delai: number | null): string {
  if (delai == null) return '—';
  if (delai < 1) return 'moins d’1 mois';
  if (delai > 24) return 'plus de 2 ans';
  const m = Math.round(delai);
  return `${m} mois`;
}
