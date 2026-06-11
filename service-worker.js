const CACHE_NAME = "cricketdex-v1";

const filesToCache = [
  "/",
  "/cricke web page.html",
  "/style.css",
  "/script.js",
  "/players.js"
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