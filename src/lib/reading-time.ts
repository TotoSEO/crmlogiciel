/**
 * Durée de lecture — calculée au build à partir du nombre de mots.
 * Vitesse retenue : ~200 mots/minute (lecture FR moyenne).
 */

const WORDS_PER_MINUTE = 200;

/** Compte les mots d'un texte (Markdown ou brut), balises/markup ignorés. */
export function countWords(text: string): number {
  const plain = text
    .replace(/```[\s\S]*?```/g, ' ') // blocs de code
    .replace(/`[^`]*`/g, ' ') // code inline
    .replace(/<\/?[^>]+>/g, ' ') // balises HTML
    .replace(/[#>*_~\-]+/g, ' ') // syntaxe Markdown
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // liens → texte
    .trim();
  if (!plain) return 0;
  return plain.split(/\s+/).filter(Boolean).length;
}

/** Durée de lecture en minutes (minimum 1). */
export function readingMinutes(text: string): number {
  const words = countWords(text);
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/** Libellé prêt à afficher, ex. « 6 min de lecture ». */
export function readingTimeLabel(text: string): string {
  return `${readingMinutes(text)} min de lecture`;
}
