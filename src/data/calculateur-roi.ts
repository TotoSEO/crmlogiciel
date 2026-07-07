/**
 * Calculateur de ROI d'un CRM — champs + calculs (modes simple et avancé).
 *
 * Hypothèses par défaut = ordres de grandeur prudents, tous modifiables. Aucune
 * donnée collectée. Le résultat est une estimation, pas une garantie. Les mêmes
 * fonctions servent au rendu serveur (état par défaut) et au calcul temps réel côté client.
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
}

export const SIMPLE: Field[] = [
  { key: 'ventes', label: 'Ventes conclues par mois', def: 5, unit: 'num', min: 0, step: 1 },
  { key: 'marge', label: 'Marge moyenne par vente', def: 1000, unit: 'eur', min: 0, step: 50 },
  { key: 'users', label: "Nombre d'utilisateurs du CRM", def: 1, unit: 'num', min: 1, step: 1 },
  { key: 'budget', label: 'Budget CRM par utilisateur / mois', def: 25, unit: 'eur', min: 0, step: 5 },
];

export const ADVANCED: Field[] = [
  { key: 'commerciaux', label: 'Nombre de commerciaux', def: 1, unit: 'num', min: 1, step: 1 },
  { key: 'oppMois', label: 'Opportunités traitées / mois / commercial', def: 20, unit: 'num', min: 0, step: 1 },
  { key: 'winRate', label: 'Taux de conversion actuel', def: 25, unit: 'pct', min: 0, step: 1 },
  {
    key: 'ameliorationPts',
    label: 'Amélioration du taux de conversion avec un CRM',
    def: 3,
    unit: 'pct',
    min: 0,
    step: 1,
    hint: 'En points de pourcentage',
  },
  { key: 'marge', label: 'Marge moyenne par affaire', def: 1000, unit: 'eur', min: 0, step: 50 },
  { key: 'partPerdue', label: 'Affaires perdues par oubli de relance', def: 15, unit: 'pct', min: 0, step: 1 },
  { key: 'partRecuperable', label: 'Part récupérable avec un CRM', def: 40, unit: 'pct', min: 0, step: 1 },
  { key: 'heuresAdmin', label: 'Heures / semaine / commercial en admin et recherche', def: 5, unit: 'h', min: 0, step: 1 },
  { key: 'partEconomisee', label: 'Part de ce temps économisée avec un CRM', def: 30, unit: 'pct', min: 0, step: 1 },
  { key: 'coutHoraire', label: 'Coût horaire chargé', def: 30, unit: 'eur', min: 0, step: 5 },
  { key: 'budget', label: 'Budget CRM par utilisateur / mois', def: 25, unit: 'eur', min: 0, step: 5 },
  { key: 'fraisSetup', label: 'Frais de mise en place (uniques)', def: 0, unit: 'eur', min: 0, step: 50 },
];

export interface Result {
  ca: number; // CA additionnel annuel
  cout: number; // coût annuel du CRM
  net: number; // gain net
  roi: number | null; // multiple (ca / cout)
  delai: number | null; // mois
  /** Détail par levier (mode avancé). */
  recuperees?: number;
  conversion?: number;
  temps?: number;
}

export function defaults(fields: Field[]): Record<string, number> {
  return Object.fromEntries(fields.map((f) => [f.key, f.def]));
}

export function compute(mode: 'simple' | 'avance', v: Record<string, number>): Result {
  const num = (k: string) => (Number.isFinite(v[k]) ? v[k] : 0);
  let ca = 0;
  let cout = 0;
  let recuperees: number | undefined;
  let conversion: number | undefined;
  let temps: number | undefined;

  if (mode === 'simple') {
    const caActuel = num('ventes') * 12 * num('marge');
    ca = caActuel * 0.1;
    cout = num('users') * num('budget') * 12;
  } else {
    const oppAnnuelles = num('commerciaux') * num('oppMois') * 12;
    recuperees = oppAnnuelles * (num('partPerdue') / 100) * (num('partRecuperable') / 100) * num('marge');
    conversion = oppAnnuelles * (num('ameliorationPts') / 100) * num('marge');
    temps = num('commerciaux') * num('heuresAdmin') * 45 * (num('partEconomisee') / 100) * num('coutHoraire');
    ca = recuperees + conversion + temps;
    cout = num('commerciaux') * num('budget') * 12 + num('fraisSetup');
  }

  const net = ca - cout;
  const roi = cout > 0 ? ca / cout : null;
  const delai = ca > 0 ? cout / (ca / 12) : null;
  return { ca, cout, net, roi, delai, recuperees, conversion, temps };
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
  const m = Math.round(delai);
  return `${m} mois`;
}
