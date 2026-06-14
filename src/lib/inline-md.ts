/**
 * Rendu Markdown INLINE minimal pour les chaînes issues du frontmatter (encarts
 * « En bref », FAQ) : ces textes sont saisis en Markdown mais affichés comme
 * chaînes, donc `**gras**` apparaîtrait littéralement. Cette fonction échappe le
 * HTML puis convertit le gras (`**`), l'italique (`*` ou `_`) et le code (`` ` ``).
 * À utiliser avec `set:html`.
 */
export function inlineMd(input: string): string {
  const escaped = input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  return escaped
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/_(.+?)_/g, '<em>$1</em>');
}
