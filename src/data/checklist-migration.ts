/**
 * Checklist de migration CRM — données du composant ChecklistMigration.
 *
 * Six phases, chacune avec des items cochables. Complément actionnable du guide
 * /migration-crm/ (la méthode y est détaillée ; ici on suit l'exécution).
 * L'état est conservé en localStorage, aucune donnée n'est envoyée au serveur.
 */

export interface ChecklistItem {
  id: string;
  label: string;
}

export interface Phase {
  id: string;
  title: string;
  items: ChecklistItem[];
}

function phase(id: string, title: string, labels: string[]): Phase {
  return { id, title, items: labels.map((label, i) => ({ id: `${id}-${i}`, label })) };
}

export const PHASES: Phase[] = [
  phase('preparation', 'Préparation et cadrage', [
    "Définir l'objectif de la migration et son périmètre",
    'Désigner un responsable et fixer une date de bascule',
    "Sauvegarder intégralement l'ancien système (export complet)",
    "Informer l'équipe du calendrier et de ce qui va changer",
  ]),
  phase('nettoyage', 'Nettoyage des données', [
    'Supprimer les doublons de contacts et d’entreprises',
    'Uniformiser les formats (téléphones, dates, civilités…)',
    'Compléter ou retirer les champs vides importants',
    'Ne conserver que les contacts et affaires encore vivants',
  ]),
  phase('parametrage', 'Choix et paramétrage', [
    'Recréer les étapes de vente (le pipeline) dans le nouvel outil',
    'Recréer les champs personnalisés nécessaires',
    "Recréer les droits d'accès et les rôles des utilisateurs",
  ]),
  phase('mapping', 'Mapping et import', [
    'Faire correspondre chaque colonne du fichier à un champ',
    'Importer un échantillon test (quelques dizaines de lignes)',
    "Vérifier l'échantillon importé, champ par champ",
    'Importer le volume complet une fois le test validé',
  ]),
  phase('tests', 'Tests et vérification', [
    'Contrôler les données importées (comptages, cas limites)',
    'Rejouer les scénarios clés (créer une affaire, une relance…)',
    'Former les utilisateurs sur leurs cas réels',
  ]),
  phase('bascule', 'Bascule et suivi', [
    'Basculer officiellement sur le nouveau CRM',
    "Garder l'ancien outil accessible en lecture un temps (double roulement)",
    "Arrêter l'ancien CRM une fois la reprise confirmée",
    "Contrôler l'adoption de l'équipe après quelques semaines",
  ]),
];

export const TOTAL_ITEMS = PHASES.reduce((n, p) => n + p.items.length, 0);

/** Clé de stockage local de l'état des coches. */
export const STORAGE_KEY = 'crmlog:checklist-migration';
