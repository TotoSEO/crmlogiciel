/**
 * Modèles d'email de relance commerciale — données du composant RelanceModeles.
 *
 * Chaque modèle est rendu dans une « fiche » avec un bouton Copier (presse-papiers).
 * Les mentions entre crochets [xxx] sont surlignées à l'affichage ; le texte copié
 * les conserve telles quelles pour que l'utilisateur les remplace.
 */

export interface Modele {
  id: string;
  title: string;
  when: string;
  subject: string;
  /** Corps de l'email, sauts de ligne compris (\n). */
  body: string;
}

export const MODELES: Modele[] = [
  {
    id: 'devis-1',
    title: 'Relance après un devis sans réponse',
    when: 'À envoyer 3 à 5 jours après un devis resté sans réponse.',
    subject: 'Votre devis pour [projet]',
    body: `Bonjour [Prénom],

Je me permets de revenir vers vous au sujet du devis envoyé le [date] pour [produit ou service]. Avez-vous eu l'occasion de le regarder ?

Je reste à votre disposition pour en discuter ou l'ajuster si besoin.

Bonne journée,
[Signature]`,
  },
  {
    id: 'devis-2',
    title: 'Deuxième relance de devis',
    when: 'À envoyer une semaine à dix jours après la première relance.',
    subject: 'Un point sur votre projet [produit] ?',
    body: `Bonjour [Prénom],

Je n'ai pas eu de retour sur ma précédente proposition, et je voulais m'assurer que le projet est toujours d'actualité de votre côté.

Y a-t-il un point qui vous fait hésiter, le budget, le délai ou autre chose ? Je serais ravi d'en parler.

Bien à vous,
[Signature]`,
  },
  {
    id: 'rdv',
    title: 'Relance après un rendez-vous ou une démo',
    when: "À envoyer dans les 24 heures suivant l'échange.",
    subject: 'Suite à notre échange',
    body: `Bonjour [Prénom],

Merci pour le temps que vous m'avez accordé [jour]. Comme convenu, voici [récapitulatif ou proposition].

Quelle serait la prochaine étape la plus utile pour vous ?

À très vite,
[Signature]`,
  },
  {
    id: 'dormant',
    title: "Relance d'un client dormant",
    when: 'À envoyer à un client sans nouvelle depuis plusieurs mois.',
    subject: 'Ça fait un moment, [Prénom] !',
    body: `Bonjour [Prénom],

Cela fait quelque temps que nous n'avons pas échangé, et je pensais à vous au sujet de [nouveauté ou occasion].

Est-ce que ce serait le bon moment pour refaire un point ensemble ?

Au plaisir de vous relire,
[Signature]`,
  },
  {
    id: 'silencieux',
    title: "Relance d'un prospect silencieux",
    when: "À envoyer à un prospect qui s'est montré intéressé puis a disparu.",
    subject: 'Toujours partant pour [sujet] ?',
    body: `Bonjour [Prénom],

Vous aviez manifesté de l'intérêt pour [produit ou service], et je voulais savoir où vous en êtes dans votre réflexion.

Si le moment n'est pas idéal, dites-le-moi simplement, je me permettrai de revenir vers vous plus tard.

Bien cordialement,
[Signature]`,
  },
  {
    id: 'rupture',
    title: 'Dernière relance (email de rupture)',
    when: 'À envoyer en dernier recours, après 4 ou 5 tentatives sans réponse.',
    subject: 'Je clôture votre dossier ?',
    body: `Bonjour [Prénom],

Sans retour de votre part, je vais considérer que le sujet n'est plus prioritaire et je clôture le dossier, pour ne pas vous importuner.

Si les choses évoluent, ma porte reste ouverte : n'hésitez pas à me recontacter quand vous le souhaitez.

Bien à vous,
[Signature]`,
  },
];

/** Texte prêt à copier (objet + corps). */
export function copyText(m: Modele): string {
  return `Objet : ${m.subject}\n\n${m.body}`;
}

/** Échappe le HTML puis surligne les [mentions] entre crochets. */
export function highlight(text: string): string {
  const esc = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  return esc.replace(/\[([^\]]+)\]/g, '<mark class="tpl-ph">[$1]</mark>');
}
