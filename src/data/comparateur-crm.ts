/**
 * Comparateur CRM : données + rendu partagé.
 *
 * But de l'outil : COMPARER deux CRM côte à côte sur des faits (jamais
 * recommander « le bon » : c'est le rôle du configurateur de
 * /comment-choisir-crm/). Pour chaque CRM : une fiche factuelle (catégorie,
 * profil, tailles, prix, offre gratuite, essai, hébergement, support) et des
 * points forts et points d'attention formulés de façon factuelle.
 * Aucune note chiffrée : pas de score, pas de classement.
 *
 * `panelHTML()` produit le panneau de comparaison sous forme de CHAÎNE HTML,
 * utilisée à l'identique côté serveur (rendu initial, sans JS) et côté client
 * (île interactive qui reconstruit le panneau au changement de sélection). Les
 * données proviennent de notre propre module (aucune saisie utilisateur) : pas
 * d'échappement requis.
 *
 * Tarifs : voir LAST_VERIFIED. Indicatifs, HT, hors promotions, à vérifier sur
 * le site de l'éditeur.
 */

/** Mois/année de dernière vérification des tarifs et des données. */
export const LAST_VERIFIED = 'juillet 2026';

export type SizeId = 'solo' | 'tpe' | 'pme' | 'eti' | 'grand-compte';

export const SIZE_LABELS: Record<SizeId, string> = {
  solo: 'Solo',
  tpe: 'TPE',
  pme: 'PME',
  eti: 'ETI',
  'grand-compte': 'Grand compte',
};

export interface CrmEntry {
  id: string;
  name: string;
  monogram: string;
  color: string;
  /** Positionnement court (ex. « Généraliste marketing + vente »). */
  categorie: string;
  /** Pour qui, en une phrase. */
  ideal_pour: string;
  tailles: SizeId[];
  /** Prix du 1er palier PAYANT, €/utilisateur/mois. null si modèle atypique (ex. Brevo). */
  prix_entree_eur: number | null;
  prix_note: string;
  gratuit: { dispo: boolean; note: string };
  essai_jours: number;
  hebergement_ue: { dispo: boolean; note: string };
  support_fr: boolean;
  points_forts: string[];
  /** Points d'attention, formulés de façon factuelle (aucun jugement dépréciatif). */
  limites: string[];
}

/* -------------------------------------------------------------------------- */
/* Données CRM : 14 outils. Tarifs et faits relevés en LAST_VERIFIED.          */
/* -------------------------------------------------------------------------- */

export const CRMS: CrmEntry[] = [
  {
    id: 'hubspot',
    name: 'HubSpot',
    monogram: 'H',
    color: '#ff7a59',
    categorie: 'Généraliste marketing + vente',
    ideal_pour: 'PME et scale-ups qui veulent aligner marketing et vente',
    tailles: ['solo', 'tpe', 'pme', 'eti'],
    prix_entree_eur: 15,
    prix_note: 'Sales Hub Starter 15 €/util./mois ; les paliers Pro/Enterprise grimpent vite',
    gratuit: { dispo: true, note: 'CRM gratuit et illimité dans le temps (jusqu’à 2 utilisateurs)' },
    essai_jours: 0,
    hebergement_ue: { dispo: true, note: 'Hébergement UE (Allemagne) au choix à la création' },
    support_fr: true,
    points_forts: [
      'CRM gratuit très complet',
      'Marketing, vente et service unifiés',
      'Écosystème et marketplace immenses',
    ],
    limites: ['Fonctions avancées réservées aux paliers Pro et Entreprise', 'Facturation par siège et frais d’onboarding sur certains paliers'],
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    monogram: 'S',
    color: '#00a1e0',
    categorie: 'Plateforme CRM d’entreprise',
    ideal_pour: 'PME structurées, ETI et grands comptes aux processus complexes',
    tailles: ['pme', 'eti', 'grand-compte'],
    prix_entree_eur: 25,
    prix_note: 'Starter Suite 25 €/util./mois ; le standard Enterprise atteint ~175 €',
    gratuit: { dispo: false, note: 'Pas de plan gratuit (essai 30 jours)' },
    essai_jours: 30,
    hebergement_ue: { dispo: true, note: 'Hyperforce disponible en France (données dans l’UE)' },
    support_fr: true,
    points_forts: [
      'Personnalisation quasi illimitée',
      'Écosystème AppExchange géant',
      'IA Einstein et reporting de référence',
    ],
    limites: ['Déploiement souvent confié à un intégrateur', 'Add-ons et éditions supérieures facturés en sus'],
  },
  {
    id: 'pipedrive',
    name: 'Pipedrive',
    monogram: 'P',
    color: '#1f7a3d',
    categorie: 'CRM de vente orienté pipeline',
    ideal_pour: 'PME et équipes commerciales qui veulent un pipeline simple',
    tailles: ['solo', 'tpe', 'pme', 'eti'],
    prix_entree_eur: 13,
    prix_note: 'Palier d’entrée ~13 €/util./mois ; monte vite sur les paliers hauts',
    gratuit: { dispo: false, note: 'Pas de version gratuite (essai 14 jours)' },
    essai_jours: 14,
    hebergement_ue: { dispo: true, note: 'Hébergement UE (AWS Francfort/Dublin)' },
    support_fr: true,
    points_forts: [
      'Pipeline visuel très clair',
      'Prise en main rapide',
      'Bon rapport qualité-prix + 500+ intégrations',
    ],
    limites: ['Reporting avancé et IA réservés aux formules supérieures', 'Certaines extensions (add-ons) facturées en sus'],
  },
  {
    id: 'close',
    name: 'Close',
    monogram: 'C',
    color: '#2f6fed',
    categorie: 'CRM de vente avec téléphonie intégrée',
    ideal_pour: 'Startups et équipes outbound à fort volume d’appels',
    tailles: ['solo', 'tpe', 'pme'],
    prix_entree_eur: 32,
    prix_note: 'Solo ~8 € (1 utilisateur) ; 1er plan équipe Essentials ~32 €/util./mois, appels/SMS en sus',
    gratuit: { dispo: false, note: 'Pas de version gratuite (essai 14 jours)' },
    essai_jours: 14,
    hebergement_ue: { dispo: false, note: 'Données aux États-Unis (clauses contractuelles RGPD)' },
    support_fr: false,
    points_forts: [
      'Téléphonie, SMS et e-mail nativement intégrés',
      'Power dialer et automatisation de prospection',
      'Agent IA commercial inclus',
    ],
    limites: ['Interface et support uniquement en anglais', 'Coûts d’appels/SMS à l’usage'],
  },
  {
    id: 'monday',
    name: 'monday CRM',
    monogram: 'm',
    color: '#ff3d57',
    categorie: 'CRM visuel tout-en-un',
    ideal_pour: 'Équipes qui veulent un CRM visuel connecté à la gestion de projet',
    tailles: ['tpe', 'pme', 'eti'],
    prix_entree_eur: 12,
    prix_note: 'Basic 12 €/util./mois (min. 3 sièges) ; Standard 17 € souvent le vrai point d’entrée',
    gratuit: { dispo: false, note: 'Pas de version gratuite pour le CRM (essai 14 jours)' },
    essai_jours: 14,
    hebergement_ue: { dispo: true, note: 'Région de données UE (Allemagne) disponible' },
    support_fr: true,
    points_forts: [
      'Interface visuelle et personnalisable',
      'Automatisations no-code et tableaux de bord flexibles',
      'Relié à l’écosystème monday (projets)',
    ],
    limites: ['Minimum de 3 sièges', 'Prévisions et IA réservées aux forfaits supérieurs'],
  },
  {
    id: 'zoho',
    name: 'Zoho / Bigin',
    monogram: 'Z',
    color: '#e0452f',
    categorie: 'CRM complet et économique',
    ideal_pour: 'TPE/PME cherchant un CRM riche à petit prix ; Bigin pour débuter',
    tailles: ['solo', 'tpe', 'pme', 'eti'],
    prix_entree_eur: 7,
    prix_note: 'Bigin dès ~7 €/util./mois ; Zoho CRM Standard 14 €',
    gratuit: { dispo: true, note: 'Zoho CRM gratuit (3 utilisateurs) ; Bigin gratuit (1 utilisateur)' },
    essai_jours: 15,
    hebergement_ue: { dispo: true, note: 'Datacenters UE (Amsterdam/Dublin) via zoho.eu' },
    support_fr: true,
    points_forts: [
      'Rapport fonctionnalités/prix exceptionnel',
      'Écosystème Zoho très complet',
      'IA Zia et automatisations avancées',
    ],
    limites: ['Nombreuses éditions et options à paramétrer', 'Bigin et Zoho CRM sont deux produits distincts'],
  },
  {
    id: 'sellsy',
    name: 'Sellsy',
    monogram: 'Se',
    color: '#3b5bdb',
    categorie: 'Suite CRM + facturation (FR)',
    ideal_pour: 'TPE/PME B2B voulant CRM et facturation unifiés',
    tailles: ['tpe', 'pme', 'eti'],
    prix_entree_eur: 29,
    prix_note: 'Vente + Facturation dès ~29-39 €/util./mois, min. 2 utilisateurs, engagement 12 mois',
    gratuit: { dispo: false, note: 'Pas d’offre gratuite (essai 15 jours)' },
    essai_jours: 15,
    hebergement_ue: { dispo: true, note: 'Serveurs en France, ISO 27001, RGPD' },
    support_fr: true,
    points_forts: [
      'Devis/factures conformes (Factur-X)',
      'Suite CRM + facturation + trésorerie',
      'Support français et intégrations riches',
    ],
    limites: ['Minimum 2 utilisateurs et engagement de 12 mois', 'Comptabilité via export vers un logiciel comptable (Sage, Pennylane)'],
  },
  {
    id: 'axonaut',
    name: 'Axonaut',
    monogram: 'A',
    color: '#6c3ff5',
    categorie: 'ERP/CRM tout-en-un TPE-PME (FR)',
    ideal_pour: 'TPE et petites PME françaises voulant CRM + factures + compta',
    tailles: ['solo', 'tpe', 'pme'],
    prix_entree_eur: 30,
    prix_note: 'Par entreprise : socle ~34,99 €/mois (1 utilisateur) + 29,99 €/utilisateur en plus',
    gratuit: { dispo: false, note: 'Pas d’offre gratuite (essai 15 jours)' },
    essai_jours: 15,
    hebergement_ue: { dispo: true, note: 'Données hébergées en France' },
    support_fr: true,
    points_forts: [
      'Tout inclus : CRM, factures, compta, trésorerie, stock',
      'Facturation électronique 2026 (PDP) incluse',
      'Compte pro (IBAN FR) intégré et support FR',
    ],
    limites: ['Tarif sans engagement plus élevé qu’avec un engagement de 1 à 3 ans', 'Positionné sur les TPE et petites PME'],
  },
  {
    id: 'nocrm',
    name: 'noCRM',
    monogram: 'no',
    color: '#0ea5a0',
    categorie: 'Prospection commerciale ultra-simple',
    ideal_pour: 'Vendeurs et indépendants qui veulent prospecter sans complexité',
    tailles: ['solo', 'tpe', 'pme'],
    prix_entree_eur: 12,
    prix_note: 'Starter 12 €/util./mois (500 leads, 1 pipeline) ; Expert 20 € pour l’illimité',
    gratuit: { dispo: false, note: 'Pas de plan gratuit (essai 15 jours)' },
    essai_jours: 15,
    hebergement_ue: { dispo: true, note: 'Éditeur français, données dans l’UE (RGPD)' },
    support_fr: true,
    points_forts: [
      'Prise en main immédiate, orientée action',
      'Éditeur et support français',
      'Relances, devis/factures et 3000+ intégrations (Expert)',
    ],
    limites: ['Centré sur le suivi des leads plutôt que sur la gestion de comptes', 'Automatisations avancées réservées aux formules supérieures'],
  },
  {
    id: 'brevo',
    name: 'Brevo',
    monogram: 'B',
    color: '#0b996e',
    categorie: 'Emailing + marketing, CRM léger',
    ideal_pour: 'TPE/PME qui combinent campagnes marketing et vente légère',
    tailles: ['solo', 'tpe', 'pme'],
    prix_entree_eur: null,
    prix_note: 'CRM et pipeline inclus gratuitement ; plans payants (emailing) dès ~7 €/mois au volume',
    gratuit: { dispo: true, note: 'Plan gratuit à vie : CRM + pipeline, 300 e-mails/jour, contacts illimités' },
    essai_jours: 0,
    hebergement_ue: { dispo: true, note: 'Éditeur français, données en Europe (RGPD natif)' },
    support_fr: true,
    points_forts: [
      'Emailing et marketing automation natifs',
      'Contacts illimités, facturation au volume',
      'Éditeur français, RGPD natif, CRM gratuit inclus',
    ],
    limites: ['Fonctions de vente avancées dans un module payant', 'Support téléphonique réservé aux plans supérieurs'],
  },
  {
    id: 'folk',
    name: 'folk',
    monogram: 'f',
    color: '#7c5cff',
    categorie: 'Carnet d’adresses moderne Gmail/LinkedIn',
    ideal_pour: 'Solos et petites équipes qui vendent au réseau',
    tailles: ['solo', 'tpe', 'pme'],
    prix_entree_eur: 22,
    prix_note: 'Standard ~22 €/util./mois ; Premium ~44 € pour séquences, objets et dashboards',
    gratuit: { dispo: false, note: 'Pas de plan gratuit (essai 14 jours)' },
    essai_jours: 14,
    hebergement_ue: { dispo: false, note: 'Hébergé aux États-Unis (RGPD via Data Privacy Framework)' },
    support_fr: false,
    points_forts: [
      'Interface moderne et très simple',
      'Extension folkX pour capturer LinkedIn/web',
      'Synchro Gmail/Workspace, enrichissement et IA',
    ],
    limites: ['Hébergement aux États-Unis (RGPD via Data Privacy Framework)', 'Interface et support en anglais'],
  },
  {
    id: 'freshsales',
    name: 'Freshsales',
    monogram: 'Fs',
    color: '#12b886',
    categorie: 'CRM de vente avec IA Freddy',
    ideal_pour: 'PME/ETI voulant un CRM de vente complet avec IA',
    tailles: ['tpe', 'pme', 'eti'],
    prix_entree_eur: 8,
    prix_note: 'Growth ~8 €/util./mois (9 $) ; Pro 39 $ et Enterprise 59 $ ; IA avancée dès Pro',
    gratuit: { dispo: true, note: 'Plan gratuit jusqu’à 3 utilisateurs (Kanban, e-mail, téléphone/chat)' },
    essai_jours: 21,
    hebergement_ue: { dispo: true, note: 'Option d’hébergement en Europe (Francfort)' },
    support_fr: true,
    points_forts: [
      'CRM de vente complet (pipeline, séquences, tél/e-mail)',
      'IA Freddy : scoring, insights, rédaction d’e-mails',
      'Bon rapport qualité-prix à l’entrée',
    ],
    limites: ['Fonctions d’IA avancées réservées aux plans Pro et Enterprise'],
  },
  {
    id: 'dynamics',
    name: 'Dynamics 365',
    monogram: 'D',
    color: '#0b74c4',
    categorie: 'CRM + ERP entreprise (Microsoft)',
    ideal_pour: 'ETI et grands comptes déjà équipés Microsoft (365, Azure, Teams)',
    tailles: ['pme', 'eti', 'grand-compte'],
    prix_entree_eur: 56,
    prix_note: 'Sales Professional 56,30 € HT/util./mois ; Enterprise 91 €, Premium 130 €',
    gratuit: { dispo: false, note: 'Pas d’offre gratuite (essai 30 jours)' },
    essai_jours: 30,
    hebergement_ue: { dispo: true, note: 'Datacenters Azure en France (résidence paramétrable)' },
    support_fr: true,
    points_forts: [
      'Intégration native Microsoft 365, Teams, Power BI',
      'Copilot IA et prévisions avancées',
      'Personnalisation via la Power Platform',
    ],
    limites: ['Licences et modules facturés séparément', 'Mise en œuvre généralement confiée à un partenaire Microsoft'],
  },
  {
    id: 'odoo',
    name: 'Odoo CRM',
    monogram: 'O',
    color: '#714b67',
    categorie: 'Suite open source modulaire ERP/CRM',
    ideal_pour: 'TPE et PME voulant un CRM/ERP économique et évolutif',
    tailles: ['solo', 'tpe', 'pme', 'eti'],
    prix_entree_eur: 20,
    prix_note: '1 app (dont CRM) gratuite ; suite complète 19,90 € HT/util./mois (Standard)',
    gratuit: { dispo: true, note: 'Offre « One App Free » : 1 application, utilisateurs illimités' },
    essai_jours: 15,
    hebergement_ue: { dispo: true, note: 'Éditeur belge (UE), Odoo Online hébergé en Europe' },
    support_fr: true,
    points_forts: [
      'Suite très complète (CRM, ventes, compta, stock) à bas prix',
      'Open source et modulaire, très personnalisable',
      'Offre gratuite 1 app + écosystème d’intégrateurs',
    ],
    limites: ['Projet souvent mené avec un intégrateur', 'Abonnement par utilisateur dès la deuxième application'],
  },
];

/* -------------------------------------------------------------------------- */
/* Helpers de rendu (partagés serveur/client)                                  */
/* -------------------------------------------------------------------------- */

const BY_ID = new Map(CRMS.map((c) => [c.id, c]));

export function getCrm(id: string): CrmEntry | undefined {
  return BY_ID.get(id);
}

function facts(a: CrmEntry, b: CrmEntry): { label: string; a: string; b: string }[] {
  const price = (c: CrmEntry) => {
    const head = c.prix_entree_eur != null ? `dès <b>${c.prix_entree_eur} €</b>` : '<b>Gratuit</b>';
    return `${head}<small class="cmp-fact__sub">${c.prix_note}</small>`;
  };
  const yesno = (ok: boolean, note = '') =>
    `<span class="${ok ? 'cmp-yes' : 'cmp-no'}">${ok ? 'Oui' : 'Non'}</span>` +
    (note ? `<small class="cmp-fact__sub">${note}</small>` : '');
  const trial = (c: CrmEntry) => (c.essai_jours ? `${c.essai_jours} jours` : 'Aucun');
  const sizes = (c: CrmEntry) => c.tailles.map((s) => SIZE_LABELS[s]).join(', ');
  return [
    { label: 'Catégorie', a: a.categorie, b: b.categorie },
    { label: 'Idéal pour', a: a.ideal_pour, b: b.ideal_pour },
    { label: 'Tailles visées', a: sizes(a), b: sizes(b) },
    { label: 'Prix d’entrée', a: price(a), b: price(b) },
    { label: 'Offre gratuite', a: yesno(a.gratuit.dispo, a.gratuit.note), b: yesno(b.gratuit.dispo, b.gratuit.note) },
    { label: 'Essai gratuit', a: trial(a), b: trial(b) },
    { label: 'Hébergement UE', a: yesno(a.hebergement_ue.dispo, a.hebergement_ue.note), b: yesno(b.hebergement_ue.dispo, b.hebergement_ue.note) },
    { label: 'Support en français', a: yesno(a.support_fr), b: yesno(b.support_fr) },
  ];
}

/** Vignette logo (tuile blanche uniforme ; les favicons ont des fonds variés). */
function logo(c: CrmEntry): string {
  return `<img class="cmp-logo" src="/images/crm/${c.id}.png" alt="" width="48" height="48" loading="lazy" decoding="async">`;
}

function headCard(c: CrmEntry, side: 'a' | 'b'): string {
  return `<article class="cmp-head cmp-head--${side}" style="--c:${c.color}">
    <span class="cmp-head__mono" aria-hidden="true">${logo(c)}</span>
    <span class="cmp-head__name">${c.name}</span>
    <span class="cmp-head__cat">${c.categorie}</span>
  </article>`;
}

function prosCons(c: CrmEntry, side: 'a' | 'b'): string {
  const forts = c.points_forts.map((p) => `<li class="cmp-pc__plus">${p}</li>`).join('');
  const limites = c.limites.map((p) => `<li class="cmp-pc__minus">${p}</li>`).join('');
  return `<div class="cmp-pc cmp-pc--${side}" style="--c:${c.color}">
    <p class="cmp-pc__name"><span class="cmp-pc__mono" aria-hidden="true">${logo(c)}</span>${c.name}</p>
    <ul class="cmp-pc__list">${forts}${limites}</ul>
  </div>`;
}

/**
 * Panneau de comparaison complet (chaîne HTML). Utilisé côté serveur pour le
 * rendu initial ET côté client à chaque changement de sélection.
 */
export function panelHTML(aId: string, bId: string): string {
  const a = getCrm(aId) ?? CRMS[0];
  const b = getCrm(bId) ?? CRMS[1];
  const heads =
    headCard(a, 'a') + `<span class="cmp-vs" aria-hidden="true">VS</span>` + headCard(b, 'b');
  const factRows = facts(a, b)
    .map(
      (f) =>
        `<div class="cmp-fact"><span class="cmp-fact__a">${f.a}</span><span class="cmp-fact__label">${f.label}</span><span class="cmp-fact__b">${f.b}</span></div>`,
    )
    .join('');
  return `<div class="cmp-heads">${heads}</div>
    <div class="cmp-facts">${factRows}</div>
    <div class="cmp-proscons">${prosCons(a, 'a')}${prosCons(b, 'b')}</div>`;
}
