---
title: 'Tableau de bord commercial : 12 KPI avec formules'
metaDescription: 'Douze KPI commerciaux avec leur formule, leur fréquence et leur piège, trois rythmes de pilotage et la méthode pour construire le tableau dans le CRM.'
h1: 'Le tableau de bord commercial qui tient sur un mur'
excerpt: 'Un tableau de bord commercial réunit les indicateurs qui pilotent la vente. Les douze qui servent, avec leurs formules, leurs pièges, et les trois rythmes pour les regarder.'
cluster: utiliser
type: satellite
datePublished: 2026-06-14
enBref:
  - 'Un bon tableau de bord commercial se limite à **six chiffres par écran et par public** : commercial, manager, dirigeant ne regardent pas la même chose.'
  - "Chaque indicateur doit avoir une formule écrite, un propriétaire et une action associée ; sinon c'est de la décoration."
  - "Les douze KPI du tableau ci-dessous couvrent l'entrée, la transformation, la valeur et l'hygiène de la donnée."
  - "L'indicateur le plus prédictif est aussi le moins suivi : le nombre d'affaires sans prochaine action datée."
  - "Les compteurs d'activité bruts (appels passés, emails envoyés) mesurent l'agitation, pas la performance."
faq:
  - question: 'Quels sont les KPI commerciaux les plus importants ?'
    answer: "Pour piloter court : la prévision pondérée, les affaires nouvelles de la semaine et les affaires sans prochaine action. Pour juger le fond : le taux de conversion par cohorte, la durée de cycle et le panier moyen. Le bon jeu d'indicateurs dépend du métier, mais six chiffres bien choisis suffisent à un dirigeant de PME."
  - question: 'Quelle différence entre un tableau de bord et un reporting ?'
    answer: "Le reporting raconte le passé à date fixe, sous forme de document qu'on envoie ; le tableau de bord montre le présent en continu, sous forme d'écran qu'on consulte. Le premier sert à rendre compte, le second à corriger pendant qu'il est encore temps. Les deux existent dans un CRM moderne, et la confusion des deux produit des réunions qui commentent au lieu de décider."
  - question: "Combien d'indicateurs faut-il suivre ?"
    answer: "Six par écran et par public est un plafond sain, douze pour l'ensemble de l'entreprise. Au-delà, l'attention se dilue et le tableau devient un paysage. Le test simple : si vous ne savez pas dire quelle décision dépend d'un indicateur, retirez-le, et si personne ne le réclame dans le mois, il ne manquait à personne."
  - question: 'Faut-il un outil de BI en plus du CRM ?'
    answer: "Pas avant d'avoir épuisé le reporting natif, ce qui prend plus de temps qu'on ne croit. La BI devient pertinente quand le pilotage exige de croiser le CRM avec d'autres sources : facturation, web, support. Brancher une BI sur une donnée commerciale mal tenue ne produit qu'une chose : les mêmes erreurs, avec de plus beaux graphiques."
  - question: 'Pourquoi mon tableau de bord affiche-t-il des chiffres faux ?'
    answer: "Dans l'ordre des causes constatées : des affaires mortes laissées ouvertes qui faussent le pipe, des formules jamais écrites donc calculées différemment selon les rapports, des champs de montant ou de date mal remplis, et des doublons. Le remède commence côté saisie et côté règles, jamais côté graphique : un tableau de bord est un miroir, on ne répare pas un miroir."
---

Le tableau de bord commercial concentre un paradoxe : tout le monde en veut un, et la plupart de ceux qui existent ne servent à rien. La cause est presque toujours la même, l'accumulation : quarante graphiques, toutes les couleurs du CRM, et plus personne ne sait quelle décision regarder. Un tableau de bord n'est pas un rapport d'activité, c'est un instrument d'alerte : il doit dire en trente secondes si la machine commerciale va bien, et où intervenir si elle va mal.

La règle de conception qui élimine le superflu : **un indicateur n'entre au tableau que s'il a un propriétaire et une action associée**. Si personne ne change rien quand le chiffre baisse, le chiffre n'avait rien à faire là. Cette page donne les douze indicateurs qui passent ce filtre, leurs formules exactes, puis la façon de les monter dans votre outil, idéalement prévue dès l'[implémentation de votre CRM](https://crm-logiciel.fr/mise-en-place-crm/) plutôt que découverte un an après.

## Les douze indicateurs, formules et pièges compris

Quatre familles structurent le tableau : ce qui entre, ce qui se transforme, ce que ça vaut, et la fiabilité de la donnée elle-même. La quatrième famille est systématiquement oubliée, et c'est pourtant elle qui garantit les trois autres.

|                                  |                                                   |            |                                                                         |
| -------------------------------- | ------------------------------------------------- | ---------- | ----------------------------------------------------------------------- |
| **Indicateur**                   | **Formule**                                       | **Rythme** | **Le piège**                                                            |
| Affaires nouvelles               | Nombre d'opportunités créées sur la période       | Hebdo      | Compter les contacts au lieu des affaires qualifiées                    |
| Valeur du pipe par étape         | Somme des montants, par étape                     | Hebdo      | Laisser les zombies gonfler le total                                    |
| Prévision pondérée               | Somme des montants × probabilité d'étape          | Hebdo      | Des probabilités à l'humeur plutôt qu'à l'historique                    |
| CA signé vs objectif             | CA signé cumulé / objectif de la période          | Hebdo      | Le regarder sans la prévision : on constate au lieu d'anticiper         |
| Taux de conversion global        | Affaires gagnées / affaires créées (même cohorte) | Mensuel    | Mélanger les périodes : comparer les gagnées de mars aux créées de mars |
| Conversion proposition-signature | Gagnées / propositions envoyées                   | Mensuel    | Oublier les sans-réponse, qui sont des perdues                          |
| Durée moyenne du cycle           | Moyenne des jours entre création et signature     | Mensuel    | La moyenne cache tout : suivez aussi la médiane                         |
| Panier moyen                     | CA signé / nombre d'affaires gagnées              | Mensuel    | Un gros contrat fausse le mois : lissez sur un trimestre                |
| Taux de perte par motif          | Perdues par motif / total des perdues             | Mensuel    | Un motif « autre » à 60 % ne motive rien                                |
| CA nouveau vs récurrent          | Part du CA venant de nouveaux clients             | Mensuel    | Confondre croissance et dépendance au stock de clients                  |
| Activités en retard              | Tâches dont l'échéance est dépassée               | Quotidien  | Le traiter comme un reproche : c'est une alerte de charge               |
| Affaires sans prochaine action   | Opportunités ouvertes sans tâche datée            | Hebdo      | L'ignorer : c'est le meilleur prédicteur d'un pipe qui ment             |

Deux lectures de ce tableau valent la peine d'être faites à voix haute. La prévision pondérée n'est fiable que si [votre pipeline](https://crm-logiciel.fr/pipeline-commercial/) a des étapes à critères de sortie et des probabilités issues de l'historique : le tableau de bord hérite de la qualité du pipe, jamais l'inverse. Et les deux dernières lignes, les indicateurs d'hygiène, sont les plus prédictives du lot : **une affaire sans prochaine action est une affaire que personne ne travaille**, et un pipe rempli d'affaires que personne ne travaille produira un trimestre vide avec trois mois de préavis. C'est le chiffre que je regarde en premier dans un CRM que je découvre.

## Trois rythmes, trois écrans

L'erreur d'architecture classique consiste à construire un seul tableau pour tout le monde. Trois publics, trois rythmes, trois écrans courts font mieux.

Le commercial ouvre le sien chaque matin, et il ne contient que de l'actionnable : tâches du jour, activités en retard, affaires chaudes à relancer. C'est le prolongement direct de la [qualité du suivi commercial](https://crm-logiciel.fr/suivi-commercial/) : son tableau de bord est une liste de choses à faire, pas une notation. Le manager regarde l'hebdomadaire : entrées de la semaine, mouvement du pipe, prévision, hygiène, et il en tire l'ordre du jour de la revue. Le dirigeant lit le mensuel : CA vs objectif, prévision du trimestre, conversion, panier, part du récurrent. Six chiffres, une page, et la tendance sur douze mois glissants, parce qu'un chiffre sans sa courbe ne dit rien.

## Le construire dans le CRM, sans usine à gaz

Tout CRM correct du marché sait produire ces douze indicateurs avec ses [fonctionnalités de reporting](https://crm-logiciel.fr/fonctionnalites-crm/) natives : vues filtrées, rapports enregistrés, tableaux de bord partagés. La méthode, c'est quatre décisions plutôt que quarante widgets. **Écrivez chaque formule noir sur blanc** avant de créer le moindre graphique, périodes et exclusions comprises : la moitié des tableaux de bord faux le sont parce que deux personnes calculent « le taux de conversion » différemment. Montez les trois écrans dans l'ordre des rythmes : le quotidien d'abord, parce qu'il nourrit la donnée dont les deux autres dépendent. Affichez chaque indicateur avec sa cible et sa tendance, jamais le chiffre seul. Et résistez quatre-vingt-dix jours avant d'ajouter quoi que ce soit : un indicateur de plus, c'est une décision de plus à identifier, et si la décision n'existe pas, l'indicateur non plus.

Reste l'outillage : pour 90 % des PME, le module natif du CRM suffit, et les écarts entre outils sur ce point sont réels, c'est l'un des critères notés dans [notre comparatif de logiciels CRM](https://crm-logiciel.fr/meilleur-crm/). Les plateformes de visualisation dédiées ne se justifient qu'au moment où plusieurs sources de données doivent se croiser : avant ce stade, elles ajoutent de la tuyauterie, pas de la décision.
