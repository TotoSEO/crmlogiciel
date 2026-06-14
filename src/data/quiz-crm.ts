/**
 * Banque de questions du test de connaissances CRM (brief Test-connaissance-crm).
 * 42 questions, 7 thèmes. Une seule bonne réponse par question (index `answer`).
 * Conçu pour s'étendre (ajouter des entrées par thème). Le contenu (énoncés,
 * options, explications) est repris fidèlement du brief fourni.
 *
 * Note : crm-ia retiré du site → le thème « Données, RGPD et IA » ne renvoie
 * que vers crm-rgpd et fichier-client.
 */

export interface QuizTheme {
  id: string;
  label: string;
  /** Guides du site vers lesquels renvoyer (maillage des résultats). */
  guides: { label: string; href: string }[];
}

export interface QuizQuestion {
  id: number;
  theme: string;
  question: string;
  options: string[];
  /** Index de la bonne réponse dans `options`. */
  answer: number;
  explanation: string;
}

export const THEMES: QuizTheme[] = [
  {
    id: 'fondamentaux',
    label: 'Les fondamentaux',
    guides: [
      { label: "Qu'est-ce qu'un CRM ?", href: '/qu-est-ce-qu-un-crm/' },
      { label: 'Le lexique du CRM', href: '/lexique-crm/' },
      { label: 'La gestion de la relation client', href: '/gestion-relation-client/' },
    ],
  },
  {
    id: 'roi',
    label: "L'utilité et le ROI",
    guides: [
      { label: "Avantages et inconvénients d'un CRM", href: '/avantages-inconvenients-crm/' },
    ],
  },
  {
    id: 'fonctionnalites',
    label: 'Les fonctionnalités',
    guides: [{ label: "Les fonctionnalités d'un CRM", href: '/fonctionnalites-crm/' }],
  },
  {
    id: 'types',
    label: "Les types et l'écosystème",
    guides: [
      { label: 'Les types de CRM', href: '/types-de-crm/' },
      { label: 'CRM vs ERP', href: '/crm-vs-erp/' },
    ],
  },
  {
    id: 'choix',
    label: 'Choisir et déployer',
    guides: [
      { label: 'Comment choisir son CRM', href: '/comment-choisir-crm/' },
      { label: 'Le cahier des charges CRM', href: '/cahier-des-charges-crm/' },
      { label: 'Changer de CRM (migration)', href: '/migration-crm/' },
      { label: 'Mettre en place un CRM', href: '/mise-en-place-crm/' },
      { label: "Le prix d'un CRM", href: '/prix-crm/' },
    ],
  },
  {
    id: 'vente',
    label: 'Piloter la vente',
    guides: [
      { label: 'Le pipeline commercial', href: '/pipeline-commercial/' },
      { label: 'Le lead scoring', href: '/lead-scoring/' },
      { label: 'La segmentation client', href: '/segmentation-client/' },
      { label: 'Le tableau de bord commercial', href: '/tableau-de-bord-commercial/' },
      { label: 'Le suivi commercial', href: '/suivi-commercial/' },
      { label: "L'automatisation commerciale", href: '/automatisation-commerciale/' },
    ],
  },
  {
    id: 'donnees',
    label: 'Données, RGPD et IA',
    guides: [
      { label: 'CRM et RGPD', href: '/crm-rgpd/' },
      { label: 'Le fichier client', href: '/fichier-client/' },
    ],
  },
];

export const THEME_LABEL: Record<string, string> = Object.fromEntries(
  THEMES.map((t) => [t.id, t.label]),
);

export const QUESTIONS: QuizQuestion[] = [
  // --- Thème 1 : Les fondamentaux ---
  {
    id: 1,
    theme: 'fondamentaux',
    question: "Que signifie l'acronyme CRM ?",
    options: [
      'Customer Relationship Management',
      'Client Resource Management',
      'Commercial Relationship Manager',
      'Customer Retention Marketing',
    ],
    answer: 0,
    explanation:
      'CRM signifie Customer Relationship Management, soit la gestion de la relation client.',
  },
  {
    id: 2,
    theme: 'fondamentaux',
    question: "Quel est l'objectif principal d'un CRM ?",
    options: [
      'Centraliser les informations clients et prospects pour piloter la relation et les ventes',
      'Remplacer le logiciel de comptabilité',
      "Héberger le site web de l'entreprise",
      'Gérer la paie des salariés',
    ],
    answer: 0,
    explanation:
      'Un CRM centralise la donnée client pour améliorer la relation, la vente et le service.',
  },
  {
    id: 3,
    theme: 'fondamentaux',
    question: "Dans le vocabulaire CRM, qu'est-ce qu'un « lead » ?",
    options: [
      'Un contact ayant manifesté un intérêt, pas encore qualifié',
      'Un client ayant déjà acheté plusieurs fois',
      'Un fournisseur référencé',
      "Un membre de l'équipe commerciale",
    ],
    answer: 0,
    explanation: "Un lead est un contact entrant dont l'intérêt n'est pas encore qualifié.",
  },
  {
    id: 4,
    theme: 'fondamentaux',
    question: 'Que désigne le « pipeline » commercial dans un CRM ?',
    options: [
      'La représentation des opportunités par étape du cycle de vente',
      'La liste des factures impayées',
      'Le carnet d’adresses des fournisseurs',
      "L'historique des connexions au logiciel",
    ],
    answer: 0,
    explanation:
      'Le pipeline visualise les affaires en cours, étape par étape, jusqu’à la signature.',
  },
  {
    id: 5,
    theme: 'fondamentaux',
    question: 'Que mesure le « churn » ?',
    options: [
      'La proportion de clients perdus sur une période',
      "Le chiffre d'affaires mensuel",
      'Le nombre de nouveaux leads',
      "La durée moyenne d'un appel",
    ],
    answer: 0,
    explanation:
      'Le churn est le taux d’attrition, soit les clients perdus sur une période donnée.',
  },
  {
    id: 6,
    theme: 'fondamentaux',
    question: 'Une « opportunité » dans un CRM, c’est :',
    options: [
      "Une affaire potentielle chiffrée et suivie jusqu'à la signature",
      'Un ticket de support technique',
      "Une campagne d'emailing",
      'Un rendez-vous annulé',
    ],
    answer: 0,
    explanation:
      'Une opportunité est une affaire identifiée, à laquelle on associe un montant et une probabilité.',
  },

  // --- Thème 2 : L'utilité et le ROI ---
  {
    id: 7,
    theme: 'roi',
    question:
      "Quel bénéfice est le plus directement attendu d'un CRM pour une équipe commerciale ?",
    options: [
      'Un suivi structuré des prospects qui évite les oublis de relance',
      "La réduction de la facture d'électricité",
      "L'automatisation des bulletins de paie",
      "La création du logo de l'entreprise",
    ],
    answer: 0,
    explanation:
      "Le premier gain d'un CRM est un suivi fiable qui évite de laisser filer des affaires.",
  },
  {
    id: 8,
    theme: 'roi',
    question: "Pourquoi dit-on qu'un CRM réduit la dépendance aux personnes ?",
    options: [
      "Parce que l'historique client reste dans l'entreprise même si un commercial part",
      'Parce qu’il recrute automatiquement',
      'Parce qu’il supprime les congés',
      'Parce qu’il remplace les managers',
    ],
    answer: 0,
    explanation: "La donnée centralisée appartient à l'entreprise, pas au carnet d'un individu.",
  },
  {
    id: 9,
    theme: 'roi',
    question: "Lequel de ces éléments est un coût caché fréquent d'un projet CRM ?",
    options: [
      'La formation et la conduite du changement',
      'Le prix du nom de domaine',
      "L'achat de mobilier de bureau",
      "La licence du système d'exploitation",
    ],
    answer: 0,
    explanation: "L'accompagnement et la formation sont souvent sous-estimés dans le budget.",
  },
  {
    id: 10,
    theme: 'roi',
    question: 'Quel frein réel pèse souvent sur la réussite d’un CRM ?',
    options: [
      "La charge de saisie perçue par les commerciaux, qui freine l'adoption",
      "L'absence de couleurs dans l'interface",
      'Le manque de ports USB',
      "La langue d'affichage par défaut",
    ],
    answer: 0,
    explanation:
      "Si la saisie est vécue comme une corvée, l'outil est mal alimenté et perd sa valeur.",
  },
  {
    id: 11,
    theme: 'roi',
    question: "Le retour sur investissement d'un CRM se mesure surtout via :",
    options: [
      'Le taux de conversion, la rétention et la productivité commerciale',
      'Le nombre de polices de caractères installées',
      'La vitesse du wifi',
      'Le nombre d’onglets ouverts',
    ],
    answer: 0,
    explanation: 'Le ROI se lit dans la conversion, la fidélisation et le temps commercial gagné.',
  },
  {
    id: 12,
    theme: 'roi',
    question: 'Pour qui un CRM est-il généralement le moins indispensable ?',
    options: [
      'Un indépendant avec très peu de clients et un cycle de vente simple',
      'Une PME avec plusieurs commerciaux',
      'Un e-commerçant à fort volume',
      "Un centre d'appels",
    ],
    answer: 0,
    explanation: 'À très faible volume, un tableur peut encore suffire un temps.',
  },

  // --- Thème 3 : Les fonctionnalités ---
  {
    id: 13,
    theme: 'fonctionnalites',
    question: 'Quelle fonction est au cœur de tout CRM ?',
    options: [
      'La gestion centralisée des contacts et de leur historique',
      'Le montage vidéo',
      "L'administration de serveurs",
      'La retouche photo',
    ],
    answer: 0,
    explanation: 'La fiche contact et son historique sont la brique de base de tout CRM.',
  },
  {
    id: 14,
    theme: 'fonctionnalites',
    question: "À quoi sert l'automatisation dans un CRM ?",
    options: [
      'À déclencher des tâches et des relances selon des règles (workflows)',
      'À augmenter la mémoire vive',
      'À imprimer des documents',
      'À mettre à jour le BIOS',
    ],
    answer: 0,
    explanation:
      "L'automatisation enchaîne des actions sans intervention manuelle, via des règles.",
  },
  {
    id: 15,
    theme: 'fonctionnalites',
    question: "À quoi sert le reporting d'un CRM ?",
    options: [
      "À suivre des indicateurs et des tableaux de bord sur l'activité commerciale",
      'À corriger les bugs du logiciel',
      'À gérer les mots de passe wifi',
      'À écrire du code',
    ],
    answer: 0,
    explanation: 'Le reporting transforme la donnée en indicateurs de pilotage.',
  },
  {
    id: 16,
    theme: 'fonctionnalites',
    question: 'Qu’apporte une intégration entre le CRM et la messagerie (Gmail, Outlook) ?',
    options: [
      "La synchronisation des emails et de l'agenda avec les fiches contacts",
      'Le doublement de la mémoire',
      'Un antivirus intégré',
      'La traduction automatique du site',
    ],
    answer: 0,
    explanation:
      "L'intégration messagerie rattache automatiquement échanges et rendez-vous aux contacts.",
  },
  {
    id: 17,
    theme: 'fonctionnalites',
    question: 'La gestion des opportunités sert à :',
    options: [
      'Suivre chaque affaire par étape, montant et probabilité jusqu’à la clôture',
      "Gérer les stocks de l'entrepôt",
      'Éditer les bulletins de paie',
      'Héberger des vidéos',
    ],
    answer: 0,
    explanation: "C'est le suivi structuré de chaque affaire jusqu'à sa conclusion.",
  },
  {
    id: 18,
    theme: 'fonctionnalites',
    question: 'Pour une TPE qui démarre, laquelle relève plutôt du « nice-to-have » ?',
    options: [
      'Le lead scoring prédictif par intelligence artificielle',
      'La fiche contact',
      'Le suivi des tâches',
      'Un pipeline simple',
    ],
    answer: 0,
    explanation:
      'Le scoring prédictif est utile à l’échelle, mais secondaire pour une TPE qui débute.',
  },

  // --- Thème 4 : Les types et l'écosystème ---
  {
    id: 19,
    theme: 'types',
    question: 'Quels sont les trois grands types fonctionnels de CRM ?',
    options: [
      'Opérationnel, analytique, collaboratif',
      'Gratuit, payant, premium',
      'Local, national, mondial',
      'Petit, moyen, grand',
    ],
    answer: 0,
    explanation: "C'est la typologie classique selon l'usage dominant.",
  },
  {
    id: 20,
    theme: 'types',
    question: 'À quoi sert avant tout un CRM analytique ?',
    options: [
      'À exploiter les données pour comprendre et segmenter les clients',
      'À passer les appels téléphoniques',
      'À héberger le site',
      'À gérer les congés',
    ],
    answer: 0,
    explanation: "L'analytique met l'accent sur l'analyse de la donnée et l'aide à la décision.",
  },
  {
    id: 21,
    theme: 'types',
    question: 'Quelle est la différence clé entre un CRM et un ERP ?',
    options: [
      "Le CRM gère la relation client, l'ERP gère les processus internes (finance, stocks, production)",
      'Ils font exactement la même chose',
      "L'ERP est uniquement gratuit",
      'Le CRM ne sert qu’à la comptabilité',
    ],
    answer: 0,
    explanation:
      'CRM côté client et vente, ERP côté opérations internes, avec des zones de recouvrement.',
  },
  {
    id: 22,
    theme: 'types',
    question: 'Que signifie un CRM en mode SaaS (cloud) ?',
    options: [
      "Hébergé en ligne par l'éditeur, accessible par navigateur, en abonnement",
      'Installé uniquement sur une clé USB',
      'Réservé aux serveurs internes',
      'Fonctionnant sans connexion internet',
    ],
    answer: 0,
    explanation:
      'Le SaaS est un logiciel en ligne facturé par abonnement, sans installation locale.',
  },
  {
    id: 23,
    theme: 'types',
    question: 'Un CRM vertical (ou métier) est :',
    options: [
      'Un CRM spécialisé pour les besoins d’un secteur précis (immobilier, BTP…)',
      'Un CRM affiché en mode portrait',
      'Un CRM réservé aux grands groupes',
      'Un CRM toujours open source',
    ],
    answer: 0,
    explanation: 'Le vertical répond aux besoins particuliers d’un secteur donné.',
  },
  {
    id: 24,
    theme: 'types',
    question: "L'open source, pour un CRM, implique surtout :",
    options: [
      "Un code librement accessible, mais des coûts d'hébergement et de maintenance à assumer",
      'Une gratuité totale et sans effort',
      "L'impossibilité de personnaliser l'outil",
      'Un fonctionnement sans serveur',
    ],
    answer: 0,
    explanation:
      "Le code est libre, mais l'hébergement, la maintenance et la sécurité restent à charge.",
  },

  // --- Thème 5 : Choisir et déployer ---
  {
    id: 25,
    theme: 'choix',
    question: 'Par quoi devrait commencer le choix d’un CRM ?',
    options: [
      "La définition des besoins et des objectifs de l'entreprise",
      'Le choix de la couleur du logo',
      "L'achat immédiat du plus cher",
      "Le recrutement d'un développeur",
    ],
    answer: 0,
    explanation: 'On part des besoins, pas de l’outil.',
  },
  {
    id: 26,
    theme: 'choix',
    question: 'À quoi sert un cahier des charges CRM ?',
    options: [
      'À formaliser et prioriser les besoins pour consulter les éditeurs objectivement',
      'À décorer la salle de réunion',
      'À calculer la TVA',
      'À héberger le site',
    ],
    answer: 0,
    explanation: 'Le cahier des charges cadre le besoin et sert de base de comparaison.',
  },
  {
    id: 27,
    theme: 'choix',
    question: 'À quoi sert la méthode MoSCoW ?',
    options: [
      'À prioriser les besoins (Must, Should, Could, Won’t have)',
      'À choisir un fuseau horaire',
      'À nommer les serveurs',
      'À fixer les salaires',
    ],
    answer: 0,
    explanation: 'MoSCoW hiérarchise les besoins par niveau d’importance.',
  },
  {
    id: 28,
    theme: 'choix',
    question: "Lors d'une migration de CRM, quelle étape est critique ?",
    options: [
      'Le nettoyage et le mapping des données avant la bascule',
      'Le changement de logo',
      "L'achat de nouveaux ordinateurs",
      'La fermeture du site web',
    ],
    answer: 0,
    explanation:
      'Des données propres et bien mappées évitent de transférer le désordre dans le nouvel outil.',
  },
  {
    id: 29,
    theme: 'choix',
    question: 'En quoi consiste le « double-run » lors d’un changement de CRM ?',
    options: [
      "Faire fonctionner l'ancien et le nouveau système en parallèle le temps de sécuriser la bascule",
      'Lancer deux fois la même requête',
      'Doubler définitivement les licences',
      'Recruter deux chefs de projet',
    ],
    answer: 0,
    explanation:
      "Le double-run réduit le risque en gardant l'ancien système actif pendant la transition.",
  },
  {
    id: 30,
    theme: 'choix',
    question: 'Quel facteur conditionne le plus la réussite d’un déploiement CRM ?',
    options: [
      "L'adoption par les utilisateurs, soutenue par un sponsor interne",
      "La marque de l'ordinateur",
      'La police de caractères',
      "La couleur de l'interface",
    ],
    answer: 0,
    explanation: 'Un CRM non adopté échoue, quelle que soit sa qualité technique.',
  },

  // --- Thème 6 : Piloter la vente ---
  {
    id: 31,
    theme: 'vente',
    question: 'Construire les étapes d’un pipeline revient à :',
    options: [
      "Modéliser les phases réelles du cycle de vente de l'entreprise",
      'Lister les fournisseurs',
      'Trier les emails par date',
      'Calculer un amortissement',
    ],
    answer: 0,
    explanation:
      'Les étapes doivent refléter le cycle de vente réel, pas un modèle générique plaqué.',
  },
  {
    id: 32,
    theme: 'vente',
    question: 'En quoi consiste le lead scoring ?',
    options: [
      'Attribuer un score aux leads selon des critères pour prioriser les efforts commerciaux',
      'Compter les visites du site',
      'Mesurer la vitesse du serveur',
      'Classer les factures',
    ],
    answer: 0,
    explanation: "Le scoring concentre l'effort commercial sur les leads les plus prometteurs.",
  },
  {
    id: 33,
    theme: 'vente',
    question: 'Sur quoi repose la segmentation RFM ?',
    options: [
      'Récence, Fréquence, Montant des achats',
      'Région, Format, Marque',
      'Rapidité, Fiabilité, Maintenance',
      'Revenu, Frais, Marge',
    ],
    answer: 0,
    explanation: 'RFM segmente selon la récence, la fréquence et le montant des achats.',
  },
  {
    id: 34,
    theme: 'vente',
    question: 'Qu’est-ce qu’un « vanity metric » dans un tableau de bord commercial ?',
    options: [
      'Un indicateur flatteur mais peu actionnable',
      'Le KPI le plus important',
      'Une formule de calcul de la TVA',
      'Un type de graphique en 3D',
    ],
    answer: 0,
    explanation: 'Un vanity metric impressionne mais n’aide pas à décider.',
  },
  {
    id: 35,
    theme: 'vente',
    question: 'Qu’automatise-t-on typiquement en « sales automation » ?',
    options: [
      'Les relances, séquences et tâches répétitives',
      'La signature électronique à valeur légale',
      'La création du site web',
      'La paie',
    ],
    answer: 0,
    explanation: 'On automatise les actions répétitives, en gardant l’humain sur ce qui compte.',
  },
  {
    id: 36,
    theme: 'vente',
    question: 'Un bon rythme de pilotage commercial implique :',
    options: [
      'Des revues régulières du pipeline et des indicateurs',
      'Une seule revue par an',
      'Aucune revue',
      'Des revues uniquement en cas de crise',
    ],
    answer: 0,
    explanation: 'Le pilotage est une routine régulière, pas une réaction ponctuelle.',
  },

  // --- Thème 7 : Données, RGPD et IA ---
  {
    id: 37,
    theme: 'donnees',
    question:
      'En B2B, sur quelle base légale traite-t-on le plus souvent des données prospects sous le RGPD ?',
    options: [
      "L'intérêt légitime ou le consentement, selon le cas",
      "Aucune base n'est nécessaire",
      "L'accord verbal suffit toujours",
      'Le secret professionnel',
    ],
    answer: 0,
    explanation:
      "En prospection B2B, l'intérêt légitime (avec information et droit d'opposition) ou le consentement s'appliquent selon le contexte.",
  },
  {
    id: 38,
    theme: 'donnees',
    question: 'Que prévoit notamment le RGPD pour les données d’un CRM ?',
    options: [
      'Une durée de conservation limitée et le respect des droits des personnes',
      'La gratuité du logiciel',
      "L'hébergement obligatoire aux États-Unis",
      'La suppression de tous les emails',
    ],
    answer: 0,
    explanation:
      'Conservation encadrée, registre des traitements et droits des personnes font partie des obligations.',
  },
  {
    id: 39,
    theme: 'donnees',
    question: "Pour la conformité d'un CRM, la question de l'hébergement des données est :",
    options: [
      "Importante, notamment la localisation et l'accès aux données",
      'Sans aucune incidence',
      'Réglée par la couleur du thème',
      'Purement esthétique',
    ],
    answer: 0,
    explanation:
      'La localisation et la souveraineté des données pèsent, surtout pour les données sensibles.',
  },
  {
    id: 40,
    theme: 'donnees',
    question: "Quel est un cas d'usage concret de l'IA dans un CRM ?",
    options: [
      "Le résumé automatique d'appels ou d'emails, et le scoring prédictif",
      'Le remplacement total des commerciaux',
      "L'impression 3D",
      'La gestion du wifi',
    ],
    answer: 0,
    explanation:
      'Résumés automatiques, rédaction assistée et scoring prédictif sont des usages réels.',
  },
  {
    id: 41,
    theme: 'donnees',
    question: "Quelle précaution s'impose avec l'IA dans un CRM ?",
    options: [
      'Vérifier les résultats produits et la confidentialité des données envoyées au modèle',
      'Désactiver toute sécurité',
      'Diffuser publiquement toutes les données',
      'Supprimer les sauvegardes',
    ],
    answer: 0,
    explanation: "On contrôle les sorties de l'IA et ce que l'on transmet au modèle.",
  },
  {
    id: 42,
    theme: 'donnees',
    question: 'La qualité des données (doublons, champs vides) dans un CRM impacte directement :',
    options: [
      'La fiabilité du reporting et l’efficacité des actions',
      'La vitesse de la souris',
      "La luminosité de l'écran",
      'Le poids du clavier',
    ],
    answer: 0,
    explanation: 'Une base sale fausse les indicateurs et dégrade les campagnes et relances.',
  },
];
