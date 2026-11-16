// オフライン用（ネット優先：つながれば常に最新、つながらないときだけ前回保存した分を出す）
const C = "apps-1794800543170", B = "/app-e87542qer3x9/";
const PRE = ["", "takehome/", "cashflow/", "asset-value/", "asset-value/data/index.js", "manifest.webmanifest", "icons/icon-192.png"].map((p) => B + p);
self.addEventListener("install", (e) => { self.skipWaiting(); e.waitUntil(caches.open(C).then((c) => c.addAll(PRE)).catch(() => {})); });
self.addEventListener("activate", (e) => e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== C).map((k) => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener("fetch", (e) => {
  const r = e.request;
  if (r.method !== "GET" || !r.url.includes(B)) return;
  e.respondWith(fetch(r).then((res) => {
    if (res.ok) { const cp = res.clone(); caches.open(C).then((c) => c.put(r, cp)); }
    return res;
  }).catch(() => caches.match(r, { ignoreSearch: true })));
});
