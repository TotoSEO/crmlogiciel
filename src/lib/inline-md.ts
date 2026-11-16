/**
 * Rendu Markdown INLINE minimal pour les chaînes issues du frontmatter (encarts
 * « En bref », FAQ) : ces textes sont saisis en Markdown mais affichés comme
 * chaînes, donc `**gras**` apparaîtrait littéralement. Cette fonction échappe le
 * HTML puis convertit le gras (`**`), l'italique (`*` ou `_`) et le code (`` ` ``).
 * À utiliser avec `set:html`.
 */
export function inlineMd(input: string): string {
  // Espaces insécables à la française : milliers (« 9 600 ») et unités (« 70 € »).
  let text = input;
  for (let i = 0; i < 3; i++) text = text.replace(/(^|[^\d])(\d{1,3}) (\d{3})(?!\d)/g, '$1$2\u202F$3');
  text = text.replace(/(\d) (€|%|k€|M€|HT|TTC|\$)(?=[\s.,;:!?)]|$)/g, '$1\u00A0$2');
  const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  return escaped
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/_(.+?)_/g, '<em>$1</em>');
}
