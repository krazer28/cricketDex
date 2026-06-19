const CACHE_NAME = "cricketDex-v1.1";

const CACHE_NAME = "cricketDex-v1.2";

const filesToCache = [
    "./",
    "./index.html",
    "./player.html",
    "./style.css",
    "./playercard.css",
    "./script.js",
    "./playercard.js",
    "./players.js",
    "./manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(filesToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );

  self.clients.claim();
});
