/**
 * Grille de qualification BANT — données du composant GrilleBant.
 *
 * Quatre critères (Budget, Autorité, Besoin, Timing), chacun noté de 0 à 3.
 * Score sur 12, verdict par palier. Qualification HUMAINE, en entretien
 * (à distinguer du lead scoring automatique). Aucune donnée collectée.
 */

export interface BantOption {
  label: string;
  points: 0 | 1 | 2 | 3;
}

export interface Criterion {
  key: string;
  /** Lettre BANT (B, A, N, T). */
  letter: string;
  title: string;
  /** Question à se poser. */
  question: string;
  options: BantOption[];
  /** Conseil affiché quand ce critère est le point faible. */
  weakAdvice: string;
}

export const CRITERIA: Criterion[] = [
  {
    key: 'budget',
    letter: 'B',
    title: 'Budget',
    question: 'A-t-il les moyens, et où en est le budget ?',
    options: [
      { label: 'Aucun budget', points: 0 },
      { label: 'Budget flou', points: 1 },
      { label: 'Budget identifié', points: 2 },
      { label: 'Budget validé et disponible', points: 3 },
    ],
    weakAdvice: 'Budget encore flou : cherchez qui tient les cordons de la bourse et à quelle échéance il se débloque, avant d’investir du temps.',
  },
  {
    key: 'autorite',
    letter: 'A',
    title: 'Autorité',
    question: 'Parlez-vous à la personne qui décide ?',
    options: [
      { label: 'Simple utilisateur', points: 0 },
      { label: 'Influenceur', points: 1 },
      { label: 'Accès au décideur', points: 2 },
      { label: "C'est le décideur", points: 3 },
    ],
    weakAdvice: 'Vous n’êtes pas face au décideur : identifiez-le, et donnez à votre interlocuteur de quoi le convaincre en interne.',
  },
  {
    key: 'besoin',
    letter: 'N',
    title: 'Besoin',
    question: 'Son besoin est-il réel et exprimé ?',
    options: [
      { label: 'Pas de besoin clair', points: 0 },
      { label: 'Besoin latent', points: 1 },
      { label: 'Besoin exprimé', points: 2 },
      { label: 'Besoin urgent ou critique', points: 3 },
    ],
    weakAdvice: 'Besoin encore latent : faites verbaliser le problème et son coût pour le transformer en besoin exprimé.',
  },
  {
    key: 'timing',
    letter: 'T',
    title: 'Échéance',
    question: 'Le projet est-il pour maintenant ?',
    options: [
      { label: 'Aucun projet', points: 0 },
      { label: 'À moyen terme', points: 1 },
      { label: 'Dans les prochains mois', points: 2 },
      { label: 'Maintenant', points: 3 },
    ],
    weakAdvice: 'Échéance lointaine : gardez le contact et fixez un prochain point plutôt que de pousser la vente tout de suite.',
  },
];

export const MAX_SCORE = CRITERIA.length * 3; // 12

export interface Verdict {
  id: 'chaud' | 'tiede' | 'froid';
  label: string;
  /** Couleur de charte. */
  palette: string;
  action: string;
}

export function verdictFor(score: number): Verdict {
  if (score >= 9)
    return {
      id: 'chaud',
      label: 'Lead chaud',
      palette: 'green',
      action: 'À traiter en priorité : proposez un rendez-vous ou une étape ferme.',
    };
  if (score >= 5)
    return {
      id: 'tiede',
      label: 'Lead tiède',
      palette: 'orange',
      action: 'À nourrir : relances utiles, contenu, et recontact dès qu’un critère se débloque.',
    };
  return {
    id: 'froid',
    label: 'Lead froid',
    palette: 'blue',
    action: 'À écarter pour l’instant, sans fermer la porte pour autant.',
  };
}
