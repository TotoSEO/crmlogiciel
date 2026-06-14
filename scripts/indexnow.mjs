/**
 * Ping IndexNow après déploiement : notifie Bing et ses partenaires des URLs du
 * sitemap. Lancé par `npm run deploy` APRÈS `wrangler deploy` (la clé de
 * vérification est alors déjà en ligne). Ne fait jamais échouer le déploiement.
 */
import fs from 'node:fs';

const KEY = '017fea6afc354788ba1f0c1770d58ca2';
const HOST = 'crm-logiciel.fr';

try {
  const xml = fs.readFileSync('./dist/sitemap.xml', 'utf8');
  const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (!urlList.length) {
    console.log('IndexNow : aucune URL dans le sitemap, ping ignoré.');
    process.exit(0);
  }
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList,
    }),
  });
  console.log(`IndexNow : ${urlList.length} URLs soumises, HTTP ${res.status}`);
} catch (e) {
  console.log('IndexNow : ping ignoré (' + e.message + ')');
}
process.exit(0);
