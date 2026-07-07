/**
 * Script d'appel de prospection téléphonique — données du composant ScriptAppel.
 *
 * Le script est rendu comme un déroulé d'appel : chaque étape porte les phrases
 * exactes à dire (« bulles »), copiables en un clic. Les mentions [entre crochets]
 * sont surlignées à l'affichage ; le texte copié les conserve pour personnalisation.
 */

export interface ScriptLine {
  /** Phrase exacte à dire (mentions [entre crochets] à personnaliser). */
  text: string;
  /** Précision de contexte affichée au-dessus de la bulle. */
  hint?: string;
}

export interface ScriptStep {
  id: string;
  title: string;
  /** Quand / pourquoi cette étape. */
  context?: string;
  lines: ScriptLine[];
}

export interface Objection {
  says: string;
  reply: string;
}

export const STEPS: ScriptStep[] = [
  {
    id: 'barrage',
    title: 'Passer le barrage',
    context: 'Si un standard ou un secrétariat décroche, restez simple et assuré.',
    lines: [
      { text: "Bonjour, [votre nom] à l'appareil. Pourriez-vous me passer [le décideur], s'il vous plaît ?" },
      { text: "C'est au sujet de [sujet précis], il saura de quoi il s'agit.", hint: 'Si on vous demande le motif' },
    ],
  },
  {
    id: 'accroche',
    title: "L'accroche : les 15 premières secondes",
    context: 'Ouvrez par une phrase honnête qui demande la permission : c\'est ce qui désarme le mieux.',
    lines: [
      { text: 'Bonjour [Prénom], [votre nom] de [votre entreprise]. Je vous appelle à froid : est-ce que je tombe à un mauvais moment ?' },
    ],
  },
  {
    id: 'raison',
    title: "La raison de l'appel",
    context: 'Annoncez un bénéfice, jamais un produit, et laissez une porte de sortie.',
    lines: [
      { text: "J'aide [type d'entreprise] à [bénéfice concret, chiffré si possible]. J'ignore encore si c'est pertinent pour vous, c'est justement pour ça que je vous appelle. Je peux vous poser deux questions rapides ?" },
    ],
  },
  {
    id: 'decouverte',
    title: 'La découverte : faites parler le prospect',
    context: 'Trois questions ouvertes suffisent, et c\'est lui qui doit parler le plus.',
    lines: [
      { text: 'Aujourd\'hui, comment gérez-vous [le domaine concerné] ?' },
      { text: 'Qu\'est-ce qui vous prend le plus de temps, ou vous agace le plus, là-dessus ?' },
      { text: 'Si vous pouviez changer une seule chose, ce serait quoi ?' },
    ],
  },
  {
    id: 'rdv',
    title: 'Décrocher le rendez-vous',
    context: 'Proposez un choix entre deux créneaux, jamais une question fermée.',
    lines: [
      { text: "D'après ce que vous me dites, ça vaut le coup qu'on prenne 20 minutes ensemble. Vous êtes plutôt disponible en début ou en fin de semaine ?" },
    ],
  },
  {
    id: 'messagerie',
    title: 'Si vous tombez sur la messagerie',
    context: 'Un message court, avec une raison claire, vaut mieux qu\'un long monologue.',
    lines: [
      { text: "Bonjour [Prénom], [votre nom] de [votre entreprise]. J'ai une idée précise pour [bénéfice concret] chez [leur entreprise]. Je vous rappelle [demain matin], sinon je suis joignable au [numéro]." },
    ],
  },
];

export const OBJECTIONS: Objection[] = [
  {
    says: "Je n'ai pas le temps",
    reply: "Je comprends, c'est pour ça que je propose 20 minutes, pas plus. Qu'est-ce qui vous arrange le moins mal, mardi ou jeudi ?",
  },
  {
    says: 'Envoyez-moi un email',
    reply: "Avec plaisir. Pour vous envoyer quelque chose d'utile et pas un mail de plus, je vous pose juste une question : [question de découverte] ?",
  },
  {
    says: 'On a déjà un prestataire',
    reply: "C'est une bonne chose, la plupart de mes clients en avaient un aussi. Ma vraie question : il vous convient à 100 %, ou il y a un point qui vous agace ?",
  },
  {
    says: "Ça ne m'intéresse pas",
    reply: "Aucun souci, je n'insiste pas. Juste par curiosité : c'est le sujet qui ne vous parle pas, ou le moment qui tombe mal ?",
  },
  {
    says: "C'est quel prix ?",
    reply: "Ça dépend vraiment de votre situation, je préfère ne pas vous annoncer un chiffre à côté de la plaque. C'est ce qu'on cadrerait en 20 minutes. Vous préférez quand ?",
  },
  {
    says: 'Rappelez-moi plus tard',
    reply: "Je note. Pour viser juste, il se passe quoi d'ici là de votre côté ? Parfait, je vous rappelle le [date précise] et je vous envoie une confirmation.",
  },
];

/** Échappe le HTML puis surligne les [mentions] entre crochets. */
export function highlight(text: string): string {
  const esc = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return esc.replace(/\[([^\]]+)\]/g, '<mark class="sx-ph">[$1]</mark>');
}
