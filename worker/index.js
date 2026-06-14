/**
 * Worker de redirection placé DEVANT les assets statiques (pas de SSR).
 *
 * Rôle unique : rattraper les anciennes URLs WordPress à QUERY STRING
 * (?p=, ?page_id=, ?cat=, ?m=, ?paged=, ?s=, ?attachment_id=) et les flux
 * RSS (/feed/, /xxx/feed/) — que public/_redirects ne peut pas matcher car il
 * ne lit que le CHEMIN — et les renvoyer en 301 vers l'accueil (cohérent avec le
 * plan : ?p=5 → /). Préserve le « jus » des vieux backlinks indexés en ?p=N.
 *
 * Tout le reste (pages, assets, redirections de chemin de _redirects, en-têtes
 * de _headers) est délégué tel quel à ASSETS. Filet de sécurité : toute erreur
 * retombe sur ASSETS, le site ne peut jamais être cassé par ce Worker.
 *
 * Les paramètres NON WordPress (utm_*, gclid, fbclid, etc.) passent sans
 * redirection : ils ne déclenchent pas la règle.
 */
const WP_QUERY_KEYS = ['p', 'page_id', 'cat', 'm', 'paged', 's', 'attachment_id', 'feed'];

export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);

      // 1) Anciennes URLs WordPress à query string → 301 vers l'accueil.
      if (WP_QUERY_KEYS.some((k) => url.searchParams.has(k))) {
        return Response.redirect(`${url.origin}/`, 301);
      }

      // 2) Flux RSS WordPress (/feed/, /comments/feed/, /slug/feed/) → 301 accueil.
      if (/\/feed\/?$/i.test(url.pathname)) {
        return Response.redirect(`${url.origin}/`, 301);
      }

      // 3) Tout le reste : assets statiques (qui appliquent _redirects et _headers).
      return env.ASSETS.fetch(request);
    } catch {
      return env.ASSETS.fetch(request);
    }
  },
};
