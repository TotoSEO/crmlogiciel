/**
 * Configurateur CRM — données et moteur de recommandation (spécification dédiée).
 *
 * Chaque CRM démarre à 0 point. Chaque réponse ajoute/retire des points (+3 forte
 * adéquation, +1 correcte, -2 inadéquation) ; certaines réponses agissent comme
 * filtre éliminatoire (budget gratuit). On classe par score décroissant et on
 * présente le top 1-3 « nettement positif ». Barème repris de la spec §5.3.
 *
 * NB : les fiches avis et le comparatif n'existent pas encore → les CTA de
 * résultat sont en « à venir » (pas de lien cassé).
 */

export interface Crm {
  id: string;
  name: string;
  monogram: string;
  color: string;
  /** Phrase d'accroche (toujours affichée comme 1re raison). */
  pitch: string;
}

export const CRMS: Crm[] = [
  {
    id: 'hubspot',
    name: 'HubSpot',
    monogram: 'H',
    color: '#ff7a59',
    pitch:
      'Très complet, fort en marketing, automatisation et IA, avec une offre gratuite pour démarrer.',
  },
  {
    id: 'pipedrive',
    name: 'Pipedrive',
    monogram: 'P',
    color: '#1f7a3d',
    pitch: 'CRM de vente pure, simple et efficace, taillé pour le pipeline et les relances.',
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    monogram: 'S',
    color: '#00a1e0',
    pitch:
      "Puissance maximale et personnalisation à l'échelle, pour les structures qui en ont besoin.",
  },
  {
    id: 'monday',
    name: 'monday CRM',
    monogram: 'm',
    color: '#ff3d57',
    pitch: 'Très visuel et flexible, à mi-chemin entre CRM et gestion de projet.',
  },
  {
    id: 'zoho',
    name: 'Zoho / Bigin',
    monogram: 'Z',
    color: '#e0452f',
    pitch:
      'Excellent rapport fonctions-prix et écosystème complet ; Bigin pour les plus petites structures.',
  },
  {
    id: 'sellsy',
    name: 'Sellsy',
    monogram: 'Se',
    color: '#3b5bdb',
    pitch: 'Suite française tout-en-un : CRM, devis, facturation et pré-compta réunis.',
  },
  {
    id: 'axonaut',
    name: 'Axonaut',
    monogram: 'A',
    color: '#6c3ff5',
    pitch: 'Tout-en-un français très simple : CRM, devis/factures et trésorerie pour TPE.',
  },
  {
    id: 'nocrm',
    name: 'noCRM',
    monogram: 'no',
    color: '#0ea5a0',
    pitch: 'Simplicité radicale orientée prospection : la prochaine action avant tout.',
  },
  {
    id: 'brevo',
    name: 'Brevo',
    monogram: 'B',
    color: '#0b996e',
    pitch:
      'ADN emailing, plan gratuit généreux (facturé au contact), idéal marketing + vente légère.',
  },
  {
    id: 'folk',
    name: 'folk',
    monogram: 'f',
    color: '#7c5cff',
    pitch:
      'Carnet d’adresses moderne, simple, branché Gmail/LinkedIn, pour agences et indépendants.',
  },
];

export type Effects = Record<string, number>;

export interface Option {
  id: string;
  label: string;
  icon: string;
  /** Points par CRM (les CRM non cités reçoivent 0). */
  effects?: Effects;
  /** Filtre éliminatoire : seuls ces CRM restent éligibles. */
  filter?: string[];
  /** Raison courte (utilisée si le CRM recommandé a reçu +3 sur cette réponse). */
  why?: string;
}

export interface Step {
  id: string;
  question: string;
  hint?: string;
  multi: boolean;
  optional?: boolean;
  options: Option[];
}

export const STEPS: Step[] = [
  {
    id: 'taille',
    question: 'Quelle est la taille de votre entreprise ?',
    multi: false,
    options: [
      {
        id: 'solo',
        label: 'Solo (1 personne)',
        icon: '🙋',
        why: 'Adapté à une activité solo',
        effects: {
          nocrm: 3,
          folk: 3,
          brevo: 3,
          zoho: 3,
          hubspot: 3,
          pipedrive: 1,
          monday: 1,
          salesforce: -2,
        },
      },
      {
        id: '2-9',
        label: '2 à 9',
        icon: '👥',
        why: 'Bon pour une petite équipe',
        effects: {
          axonaut: 3,
          sellsy: 3,
          nocrm: 3,
          pipedrive: 3,
          brevo: 3,
          zoho: 3,
          folk: 3,
          hubspot: 1,
          monday: 1,
          salesforce: -2,
        },
      },
      {
        id: '10-49',
        label: '10 à 49',
        icon: '🏢',
        why: 'Calibré pour une PME',
        effects: {
          pipedrive: 3,
          hubspot: 3,
          sellsy: 3,
          monday: 3,
          zoho: 3,
          salesforce: 1,
          brevo: 1,
          axonaut: 1,
          nocrm: 1,
          folk: -2,
        },
      },
      {
        id: '50-250',
        label: '50 à 250',
        icon: '🏬',
        why: 'Tient la charge à cette échelle',
        effects: {
          hubspot: 3,
          salesforce: 3,
          pipedrive: 3,
          monday: 3,
          zoho: 3,
          sellsy: 1,
          axonaut: -2,
          nocrm: -2,
          folk: -2,
        },
      },
      {
        id: '250+',
        label: 'Plus de 250',
        icon: '🏛️',
        why: 'Pensé pour les grandes structures',
        effects: {
          salesforce: 3,
          hubspot: 3,
          zoho: 1,
          monday: 1,
          axonaut: -2,
          nocrm: -2,
          folk: -2,
          brevo: -2,
          sellsy: -2,
        },
      },
    ],
  },
  {
    id: 'usage',
    question: 'Que voulez-vous piloter en priorité ?',
    multi: false,
    options: [
      {
        id: 'vente',
        label: 'Prospection et vente',
        icon: '🎯',
        why: 'Excellent pour la vente pure',
        effects: { nocrm: 3, pipedrive: 3, folk: 1, monday: 1, zoho: 1, hubspot: 1, brevo: -2 },
      },
      {
        id: 'vente-marketing',
        label: 'Vente + marketing',
        icon: '📣',
        why: 'Fort sur vente et marketing',
        effects: { hubspot: 3, brevo: 3, zoho: 1, monday: 1, folk: 1, nocrm: -2, axonaut: -2 },
      },
      {
        id: 'service',
        label: 'Service client',
        icon: '🎧',
        why: 'Solide côté service client',
        effects: {
          zoho: 3,
          hubspot: 3,
          salesforce: 3,
          sellsy: 1,
          nocrm: -2,
          folk: -2,
          axonaut: -2,
        },
      },
      {
        id: 'tout-en-un',
        label: 'Tout-en-un (vente + devis/factures/gestion)',
        icon: '🧰',
        why: 'Tout-en-un avec la gestion',
        effects: {
          axonaut: 3,
          sellsy: 3,
          zoho: 1,
          nocrm: -2,
          pipedrive: -2,
          folk: -2,
          hubspot: -2,
          brevo: -2,
        },
      },
    ],
  },
  {
    id: 'besoins',
    question: 'De quoi avez-vous besoin ?',
    hint: 'Plusieurs choix possibles.',
    multi: true,
    options: [
      {
        id: 'suivi-simple',
        label: 'Un suivi simple (contacts, pipeline, relances)',
        icon: '✅',
        why: 'Suivi simple et efficace',
        effects: {
          nocrm: 3,
          pipedrive: 3,
          folk: 1,
          axonaut: 1,
          brevo: 1,
          monday: 1,
          sellsy: 1,
          hubspot: 1,
          zoho: 1,
        },
      },
      {
        id: 'reporting',
        label: 'Du reporting et des tableaux de bord',
        icon: '📊',
        why: 'Reporting riche',
        effects: {
          hubspot: 3,
          salesforce: 3,
          zoho: 3,
          pipedrive: 1,
          monday: 1,
          sellsy: 1,
          nocrm: -2,
          folk: -2,
        },
      },
      {
        id: 'emailing',
        label: 'De l’emailing / des campagnes marketing',
        icon: '✉️',
        why: 'Emailing puissant',
        effects: {
          brevo: 3,
          hubspot: 3,
          zoho: 1,
          sellsy: 1,
          folk: 1,
          nocrm: -2,
          pipedrive: -2,
          axonaut: -2,
        },
      },
      {
        id: 'automatisation',
        label: 'De l’automatisation (workflows, séquences)',
        icon: '⚙️',
        why: 'Automatisation poussée',
        effects: {
          hubspot: 3,
          salesforce: 3,
          zoho: 3,
          brevo: 3,
          pipedrive: 1,
          monday: 1,
          axonaut: -2,
          nocrm: -2,
        },
      },
      {
        id: 'facturation',
        label: 'Des devis et factures intégrés',
        icon: '🧾',
        why: 'Devis et factures intégrés',
        effects: {
          axonaut: 3,
          sellsy: 3,
          zoho: 1,
          nocrm: -2,
          pipedrive: -2,
          folk: -2,
          hubspot: -2,
          brevo: -2,
          monday: -2,
        },
      },
      {
        id: 'scoring',
        label: 'Du lead scoring',
        icon: '🌡️',
        why: 'Lead scoring intégré',
        effects: { hubspot: 3, salesforce: 3, zoho: 3, brevo: 1, pipedrive: 1 },
      },
      {
        id: 'ia',
        label: 'De l’IA (assistant, scoring prédictif, résumés)',
        icon: '🤖',
        why: 'Fonctions IA avancées',
        effects: {
          salesforce: 3,
          hubspot: 3,
          zoho: 3,
          folk: 1,
          pipedrive: 1,
          monday: 1,
          axonaut: -2,
          nocrm: -2,
        },
      },
      {
        id: 'mobile',
        label: 'Une bonne application mobile',
        icon: '📱',
        why: 'Très bonne app mobile',
        effects: {
          pipedrive: 3,
          hubspot: 3,
          zoho: 3,
          monday: 3,
          salesforce: 3,
          nocrm: 3,
          sellsy: 1,
          axonaut: 1,
          brevo: 1,
          folk: 1,
        },
      },
    ],
  },
  {
    id: 'integrations',
    question: 'Quels outils doit-il rejoindre ?',
    hint: 'Plusieurs choix possibles.',
    multi: true,
    options: [
      {
        id: 'gmail',
        label: 'Gmail / Google Workspace',
        icon: '📧',
        why: 'Intégration Gmail soignée',
        effects: { folk: 3, pipedrive: 3, hubspot: 3, zoho: 1, monday: 1, brevo: 1 },
      },
      {
        id: 'outlook',
        label: 'Outlook / Microsoft 365',
        icon: '📨',
        why: 'Intégration Microsoft 365',
        effects: { hubspot: 3, salesforce: 3, pipedrive: 3, zoho: 3, monday: 1 },
      },
      {
        id: 'ecommerce',
        label: 'Une boutique e-commerce (Shopify, Woo, Presta)',
        icon: '🛒',
        why: 'Connecté à l’e-commerce',
        effects: { brevo: 3, hubspot: 3, zoho: 1, nocrm: -2, axonaut: -2, folk: -2 },
      },
      {
        id: 'facturation-int',
        label: 'Un outil de facturation / comptabilité',
        icon: '🧮',
        why: 'Lien facturation/compta',
        effects: { sellsy: 3, axonaut: 3, zoho: 1 },
      },
      {
        id: 'erp',
        label: 'Un ERP',
        icon: '🏭',
        why: 'Intégration ERP',
        effects: { salesforce: 3, hubspot: 1, zoho: 1, sellsy: 1, nocrm: -2, folk: -2, brevo: -2 },
      },
      {
        id: 'telephonie',
        label: 'La téléphonie',
        icon: '☎️',
        why: 'Couplage téléphonie',
        effects: { salesforce: 3, hubspot: 3, zoho: 3, pipedrive: 3, monday: 1, brevo: 1 },
      },
      { id: 'aucune', label: 'Aucun en particulier', icon: '➖', effects: {} },
    ],
  },
  {
    id: 'budget',
    question: 'Quel budget par utilisateur et par mois ?',
    multi: false,
    options: [
      {
        id: 'gratuit',
        label: 'Gratuit uniquement',
        icon: '🆓',
        why: 'Dispose d’une offre gratuite',
        filter: ['hubspot', 'brevo', 'zoho', 'monday'],
      },
      {
        id: 'moins-15',
        label: 'Moins de 15 €',
        icon: '💶',
        why: 'Très bon marché',
        effects: {
          zoho: 3,
          brevo: 3,
          nocrm: 3,
          axonaut: 3,
          pipedrive: 1,
          folk: 1,
          salesforce: -2,
          hubspot: -2,
        },
      },
      {
        id: '15-50',
        label: '15 à 50 €',
        icon: '💵',
        why: 'Bon rapport qualité-prix',
        effects: {
          pipedrive: 3,
          hubspot: 3,
          sellsy: 3,
          monday: 3,
          zoho: 3,
          folk: 3,
          nocrm: 3,
          axonaut: 1,
          salesforce: -2,
        },
      },
      {
        id: 'plus-50',
        label: 'Plus de 50 €',
        icon: '💎',
        why: 'Justifie un budget premium',
        effects: { salesforce: 3, hubspot: 3, sellsy: 3, monday: 1, zoho: 1 },
      },
      {
        id: 'peu-importe-budget',
        label: "Peu importe si l'outil est le bon",
        icon: '🎯',
        effects: {},
      },
    ],
  },
  {
    id: 'prise-en-main',
    question: 'Quel niveau de prise en main visez-vous ?',
    multi: false,
    options: [
      {
        id: 'simple',
        label: 'Le plus simple possible',
        icon: '🪶',
        why: 'Prise en main immédiate',
        effects: {
          nocrm: 3,
          pipedrive: 3,
          folk: 3,
          axonaut: 3,
          brevo: 3,
          monday: 1,
          salesforce: -2,
          hubspot: -2,
          zoho: -2,
        },
      },
      {
        id: 'equilibre',
        label: 'Équilibré',
        icon: '⚖️',
        effects: { pipedrive: 1, hubspot: 1, monday: 1, zoho: 1, sellsy: 1, brevo: 1 },
      },
      {
        id: 'puissance',
        label: 'De la puissance, quitte à ce que ce soit plus complexe',
        icon: '🚀',
        why: 'Profondeur et puissance',
        effects: {
          salesforce: 3,
          hubspot: 3,
          zoho: 3,
          monday: 1,
          sellsy: 1,
          nocrm: -2,
          axonaut: -2,
          folk: -2,
        },
      },
    ],
  },
  {
    id: 'hebergement',
    question: "L'hébergement des données en France ou en UE est-il important ?",
    multi: false,
    options: [
      {
        id: 'heberg-oui',
        label: 'Oui, c’est un critère',
        icon: '🇫🇷',
        why: 'Données hébergées en France/UE',
        effects: {
          sellsy: 3,
          axonaut: 3,
          nocrm: 3,
          brevo: 3,
          zoho: 1,
          pipedrive: 1,
          hubspot: -2,
          salesforce: -2,
          monday: -2,
          folk: -2,
        },
      },
      { id: 'heberg-non', label: 'Non', icon: '🌍', effects: {} },
      { id: 'heberg-peu-importe', label: 'Peu importe', icon: '🤷', effects: {} },
    ],
  },
  {
    id: 'secteur',
    question: 'Votre secteur d’activité ?',
    hint: 'Optionnel : affine la recommandation.',
    multi: false,
    optional: true,
    options: [
      { id: 'immobilier', label: 'Immobilier', icon: '🏠', effects: { pipedrive: 1, nocrm: 1 } },
      { id: 'btp', label: 'BTP', icon: '🏗️', effects: { axonaut: 1, sellsy: 1 } },
      { id: 'ecommerce-sec', label: 'E-commerce', icon: '🛍️', effects: { brevo: 1, hubspot: 1 } },
      { id: 'association', label: 'Association', icon: '🤝', effects: { brevo: 1, hubspot: 1 } },
      {
        id: 'courtier',
        label: 'Courtier / assurance',
        icon: '📋',
        effects: { sellsy: 1, zoho: 1 },
      },
      { id: 'agence', label: 'Agence', icon: '🎨', effects: { folk: 1, monday: 1 } },
      { id: 'industrie', label: 'Industrie', icon: '⚙️', effects: { salesforce: 1, sellsy: 1 } },
      { id: 'autre', label: 'Autre / non concerné', icon: '➖', effects: {} },
    ],
  },
];

export interface Reco {
  id: string;
  name: string;
  monogram: string;
  color: string;
  pct: number;
  reasons: string[];
}
export interface RecoResult {
  status: 'ok' | 'none';
  results: Reco[];
}

/** answers : { [stepId]: optionId | optionId[] } */
export function recommend(answers: Record<string, string | string[]>): RecoResult {
  const scores: Record<string, number> = {};
  const plus3: Record<string, Set<string>> = {}; // crmId -> set d'option labels « why »
  for (const c of CRMS) {
    scores[c.id] = 0;
    plus3[c.id] = new Set();
  }
  let eligible = new Set(CRMS.map((c) => c.id));

  const optById = new Map<string, Option>();
  for (const step of STEPS) for (const o of step.options) optById.set(`${step.id}:${o.id}`, o);

  for (const step of STEPS) {
    const raw = answers[step.id];
    if (raw == null) continue;
    const chosen = Array.isArray(raw) ? raw : [raw];
    for (const optId of chosen) {
      const opt = optById.get(`${step.id}:${optId}`);
      if (!opt) continue;
      if (opt.filter) eligible = new Set([...eligible].filter((id) => opt.filter!.includes(id)));
      if (opt.effects) {
        for (const [crm, pts] of Object.entries(opt.effects)) {
          scores[crm] = (scores[crm] ?? 0) + pts;
          if (pts >= 3 && opt.why) plus3[crm].add(opt.why);
        }
      }
    }
  }

  const ranked = CRMS.filter((c) => eligible.has(c.id))
    .map((c) => ({ c, score: scores[c.id] }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  if (ranked.length === 0) return { status: 'none', results: [] };

  const top = ranked[0].score;
  // On ne garde que les CRM « nettement positifs » : >= 50 % du meilleur score, top 3 max.
  const kept = ranked.filter((x) => x.score >= Math.max(top * 0.5, 3)).slice(0, 3);

  const results: Reco[] = kept.map((x) => {
    const pct = Math.max(55, Math.min(98, Math.round(55 + (x.score / top) * 43)));
    const reasons = [x.c.pitch, ...[...plus3[x.c.id]].slice(0, 2)].slice(0, 3);
    return { id: x.c.id, name: x.c.name, monogram: x.c.monogram, color: x.c.color, pct, reasons };
  });

  return { status: 'ok', results };
}
