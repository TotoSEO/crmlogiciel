# crm-logiciel.fr

Média de référence sur les logiciels CRM en France. Site statique **Astro**,
déployé sur **Cloudflare Pages**, optimisé pour la performance, le SEO et le GEO
(tout le contenu essentiel dans le HTML source, sans JavaScript).

## Stack

- **Astro** — génération statique, HTML sans JS par défaut.
- **Tailwind v4** — moteur d'utilitaires alimenté par les tokens de la charte
  (`src/styles/tokens.css`, bloc `@theme`).
- **TypeScript** strict, **Prettier** (avec `prettier-plugin-astro`).
- **Polices auto-hébergées** en woff2 (`public/fonts`) : Space Grotesk (titres),
  Archivo (corps/UI), IBM Plex Mono (données). Aucune requête Google Fonts.
- **Contenu** en Markdown versionné (content collections) — pas de CMS, pas de BDD.

## Conventions

- URLs en minuscules, mots séparés par des tirets, **slash final** partout
  (`trailingSlash: 'always'` + `build.format: 'directory'`).
- i18n mono-langue `fr` (architecture prête pour `/en/` ultérieur).
- Styles et animations en **CSS classique** (`src/styles/`), pilotés par les
  variables de la charte. Markup sémantique, JS limité aux îlots interactifs.

## Structure

```
src/
  layouts/      BaseLayout, ArticleLayout…
  components/   Nav, Footer, Head, bibliothèque de blocs
  content/      collections Markdown
  pages/        routes Astro
  styles/       global.css, tokens.css, fonts.css, base.css, animations.css
public/
  fonts/        woff2 auto-hébergés
  images/       médias
  downloads/    lead magnets (Excel, cahier des charges)
```

## Commandes

| Commande          | Action                                  |
| ----------------- | --------------------------------------- |
| `npm run dev`     | Serveur de développement (`localhost`)  |
| `npm run build`   | Build de production dans `dist/`        |
| `npm run preview` | Prévisualise le build local             |
| `npm run check`   | Vérification TypeScript (`astro check`) |
| `npm run format`  | Formatage Prettier                      |

## Roadmap

Le développement suit `Roadmap-developpement-crm-logiciel.md`, phase par phase.
**Phase 0 (Fondations) : terminée.**
