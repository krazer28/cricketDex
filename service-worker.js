const CACHE_NAME = "cricketDex-v1";

const filesToCache = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./players.js"
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
