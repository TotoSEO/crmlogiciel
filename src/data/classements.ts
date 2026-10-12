/**
 * Catalogue des outils présentés dans les classements « Les meilleurs CRM ».
 *
 * Données factuelles uniquement (prix publics, hébergement, origine), relevées
 * sur les pages officielles des éditeurs en octobre 2026. Les avis (verdict,
 * points forts, points de vigilance, « idéal pour ») sont propres à chaque page
 * et passés au composant <CrmFiche> depuis le MDX : un même outil n'est jamais
 * décrit de la même façon d'un classement à l'autre.
 *
 * Prix : HT, par utilisateur et par mois, facturation annuelle, sauf mention.
 * Lorsqu'un éditeur n'affiche pas de grille en euros vérifiable, on décrit le
 * modèle tarifaire sans avancer de montant.
 */

export const TARIFS_RELEVES = 'octobre 2026';

export interface Capture {
  src: string;
  alt: string;
  /** Légende courte (sans le crédit, ajouté automatiquement). */
  legende: string;
  /** Titulaire des droits, affiché en crédit. */
  credit: string;
  width: number;
  height: number;
}

export interface CrmClasse {
  id: string;
  nom: string;
  editeur: string;
  origine: string;
  /** Logo carré (PNG 128 px). Absent : monogramme coloré. */
  logo?: string;
  monogram: string;
  color: string;
  capture?: Capture;
  prix: string;
  hebergement?: string;
}

export const CATALOGUE: Record<string, CrmClasse> = {
  divalto: {
    id: 'divalto',
    nom: 'Divalto weavy',
    editeur: 'Divalto',
    origine: 'France',
    logo: '/images/crm/divalto.png',
    monogram: 'Dw',
    color: '#1d9bd7',
    capture: {
      src: '/images/crm/captures/divalto-weavy-ia.jpg',
      alt: "Fiche client dans Divalto weavy, avec l'Assistant Divalto IA qui résume le compte et propose un plan d'action",
      legende: "Une fiche client et l'Assistant Divalto IA, qui synthétise le compte et propose un plan d'action.",
      credit: 'Divalto',
      width: 1280,
      height: 800,
    },
    prix: 'À partir de 40 € par licence et par mois (profil Standard), 3 licences minimum',
    hebergement: 'Données hébergées en France pour les clients européens',
  },
  salesforce: {
    id: 'salesforce',
    nom: 'Salesforce Sales Cloud',
    editeur: 'Salesforce',
    origine: 'États-Unis',
    logo: '/images/crm/salesforce.png',
    monogram: 'S',
    color: '#00a1e0',
    prix: 'Suite Starter à 25 € par utilisateur et par mois ; éditions Sales de 195 à 550 €',
    hebergement: 'Infrastructure Hyperforce disponible en France',
  },
  hubspot: {
    id: 'hubspot',
    nom: 'HubSpot',
    editeur: 'HubSpot',
    origine: 'États-Unis',
    logo: '/images/crm/hubspot.png',
    monogram: 'H',
    color: '#ff7a59',
    capture: {
      src: '/images/crm/hubspot.jpg',
      alt: "Aperçu de l'interface de HubSpot CRM",
      legende: 'Le tableau de bord de HubSpot CRM.',
      credit: 'HubSpot',
      width: 1320,
      height: 694,
    },
    prix: "Gratuit jusqu'à 2 utilisateurs ; Pro à 90 € et Entreprise à 175 € par licence et par mois",
    hebergement: 'Hébergement en Europe (Allemagne) au choix',
  },
  dynamics: {
    id: 'dynamics',
    nom: 'Microsoft Dynamics 365 Sales',
    editeur: 'Microsoft',
    origine: 'États-Unis',
    logo: '/images/crm/dynamics.png',
    monogram: 'D',
    color: '#0b74c4',
    capture: {
      src: '/images/crm/captures/dynamics-365-sales.jpg',
      alt: "Fiche prospect dans Dynamics 365 Sales avec les informations clés générées par l'IA",
      legende: "Une fiche prospect dans Dynamics 365 Sales, enrichie par Copilot.",
      credit: 'Microsoft',
      width: 1280,
      height: 733,
    },
    prix: 'De 56,30 € (Professional) à 130 € (Premium) HT par utilisateur et par mois',
    hebergement: 'Datacenters Azure en France disponibles',
  },
  pipedrive: {
    id: 'pipedrive',
    nom: 'Pipedrive',
    editeur: 'Pipedrive',
    origine: 'Estonie',
    logo: '/images/crm/pipedrive.png',
    monogram: 'P',
    color: '#1f7a3d',
    capture: {
      src: '/images/crm/captures/pipedrive-pipeline.jpg',
      alt: 'Pipeline de vente en colonnes dans Pipedrive, avec les affaires par étape',
      legende: 'Le pipeline visuel de Pipedrive, organisé par étapes.',
      credit: 'Pipedrive',
      width: 1280,
      height: 803,
    },
    prix: 'À partir de 14 € par utilisateur et par mois (formule Lite)',
    hebergement: 'Hébergement en Europe (Francfort et Dublin)',
  },
  zoho: {
    id: 'zoho',
    nom: 'Zoho CRM',
    editeur: 'Zoho',
    origine: 'Inde',
    logo: '/images/crm/zoho.png',
    monogram: 'Z',
    color: '#e0452f',
    prix: 'Version gratuite ; Standard à 14 €, Professional à 23 €, Enterprise à 40 € par utilisateur et par mois',
    hebergement: 'Datacenters européens via zoho.eu',
  },
  sellsy: {
    id: 'sellsy',
    nom: 'Sellsy',
    editeur: 'Sellsy',
    origine: 'France',
    logo: '/images/crm/sellsy.png',
    monogram: 'Se',
    color: '#3b5bdb',
    capture: {
      src: '/images/crm/captures/sellsy-vente.jpg',
      alt: "Visuel de l'offre Vente de Sellsy : un devis et le suivi des opportunités",
      legende: "L'offre Vente de Sellsy : devis et suivi des opportunités.",
      credit: 'Sellsy',
      width: 1000,
      height: 500,
    },
    prix: 'CRM (offre Vente) à partir de 29 € HT par utilisateur et par mois, engagement 12 mois',
    hebergement: 'Serveurs en France',
  },
  axonaut: {
    id: 'axonaut',
    nom: 'Axonaut',
    editeur: 'Axonaut',
    origine: 'France',
    logo: '/images/crm/axonaut.png',
    monogram: 'A',
    color: '#6c3ff5',
    prix: 'De 38,80 € (engagement 3 ans) à 97 € HT par mois pour 1 utilisateur, puis 29,99 € par utilisateur',
    hebergement: 'Données hébergées en France',
  },
  odoo: {
    id: 'odoo',
    nom: 'Odoo CRM',
    editeur: 'Odoo',
    origine: 'Belgique',
    logo: '/images/crm/odoo.png',
    monogram: 'O',
    color: '#714b67',
    capture: {
      src: '/images/crm/odoo.jpg',
      alt: "Aperçu de l'interface d'Odoo CRM",
      legende: "Le tableau de bord d'Odoo CRM.",
      credit: 'Odoo',
      width: 1122,
      height: 900,
    },
    prix: 'Une application gratuite (utilisateurs illimités), puis abonnement par utilisateur',
    hebergement: 'Odoo Online hébergé en Europe',
  },
  nocrm: {
    id: 'nocrm',
    nom: 'noCRM.io',
    editeur: 'noCRM',
    origine: 'France',
    logo: '/images/crm/nocrm.png',
    monogram: 'no',
    color: '#0ea5a0',
    capture: {
      src: '/images/crm/captures/nocrm-pipeline.jpg',
      alt: 'Pipeline de leads dans noCRM.io, classés par étape de vente',
      legende: 'Le pipeline de leads de noCRM.io.',
      credit: 'noCRM.io',
      width: 1280,
      height: 800,
    },
    prix: "Abonnement par utilisateur en trois formules (Starter, Expert, Dream), remise à l'année",
    hebergement: "Développé et hébergé dans l'Union européenne",
  },
  folk: {
    id: 'folk',
    nom: 'folk',
    editeur: 'folk',
    origine: 'France',
    logo: '/images/crm/folk.png',
    monogram: 'f',
    color: '#7c5cff',
    prix: 'À partir de 22 € par utilisateur et par mois (formule Standard)',
    hebergement: "Hébergé aux États-Unis (AWS), d'après l'éditeur",
  },
  brevo: {
    id: 'brevo',
    nom: 'Brevo',
    editeur: 'Brevo',
    origine: 'France',
    logo: '/images/crm/brevo.png',
    monogram: 'B',
    color: '#0b996e',
    capture: {
      src: '/images/crm/brevo.jpg',
      alt: "Aperçu de l'interface de Brevo",
      legende: 'Le tableau de bord de Brevo.',
      credit: 'Brevo',
      width: 1002,
      height: 430,
    },
    prix: 'CRM gratuit ; module ventes Sales Essentials à 26,08 € par mois',
    hebergement: 'Données hébergées en Europe',
  },
  sap: {
    id: 'sap',
    nom: 'SAP Sales Cloud',
    editeur: 'SAP',
    origine: 'Allemagne',
    monogram: 'SAP',
    color: '#0070f2',
    prix: 'Sur devis, auprès de SAP ou de ses partenaires',
  },
  'sap-b1': {
    id: 'sap-b1',
    nom: 'SAP Business One',
    editeur: 'SAP',
    origine: 'Allemagne',
    monogram: 'B1',
    color: '#0070f2',
    prix: "Sur devis, via un partenaire intégrateur",
    hebergement: 'Cloud ou sur site',
  },
  netsuite: {
    id: 'netsuite',
    nom: 'Oracle NetSuite',
    editeur: 'Oracle',
    origine: 'États-Unis',
    monogram: 'N',
    color: '#c74634',
    prix: 'Sur devis',
  },
  efficy: {
    id: 'efficy',
    nom: 'Efficy',
    editeur: 'Efficy',
    origine: 'Belgique',
    monogram: 'E',
    color: '#d6006e',
    prix: "À partir de 59 € par utilisateur et par mois, selon l'éditeur",
    hebergement: "SaaS, cloud souverain ou serveur dédié, selon l'éditeur",
  },
  praxedo: {
    id: 'praxedo',
    nom: 'Praxedo',
    editeur: 'Praxedo',
    origine: 'France',
    logo: '/images/crm/praxedo.png',
    monogram: 'Px',
    color: '#00a0b4',
    prix: 'De 35 € à 129 € par utilisateur et par mois, à partir de 5 utilisateurs',
  },
  zendesk: {
    id: 'zendesk',
    nom: 'Zendesk',
    editeur: 'Zendesk',
    origine: 'États-Unis',
    logo: '/images/crm/zendesk.png',
    monogram: 'Zd',
    color: '#03363d',
    prix: 'De 19 € à 115 € par agent et par mois',
  },
  eudonet: {
    id: 'eudonet',
    nom: 'Eudonet',
    editeur: 'Eudonet',
    origine: 'France',
    monogram: 'Eu',
    color: '#e8553f',
    prix: 'Sur devis',
    hebergement: "Plateforme présentée comme « 100 % souveraine » par l'éditeur",
  },
};

export function getCrm(id: string): CrmClasse {
  const c = CATALOGUE[id];
  if (!c) throw new Error(`CRM inconnu dans le catalogue des classements : ${id}`);
  return c;
}
