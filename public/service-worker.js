const CACHE_NAME = "moni-buni-cache-v2";
const DYNAMIC_CACHE_NAME = "moni-buni-dynamic-cache";
const URLS_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/launchericon-192-192.png",
  "/assets/logo/full-ver.svg",
  "/offlineFallback.html",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME && key !== DYNAMIC_CACHE_NAME)
          .map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Skip non-HTTP requests

  if (!event.request.url.startsWith("http")) {
    return;
  }

  // HTML navigation requests - network first, then cache
  if (
    event.request.mode === "navigate" ||
    (event.request.headers.get("accept") &&
      event.request.headers.get("accept").includes("text/html"))
  ) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Only cache valid responses
          if (response.ok && response.type === "basic") {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match("/offlineFallback.html");
        })
    );
  } else {
    // Other assets - cache first, then network
    event.respondWith(
      caches.match(event.request).then((cached) => {
        return (
          cached ||
          fetch(event.request).then((response) => {
            // Only cache valid responses for our own domain
            if (response.ok && response.type === "basic") {
              const responseClone = response.clone();
              caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
                cache.put(event.request, responseClone);
              });
            }
            return response;
          }).catch(() => {
            if (event.request.url.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
              return caches.match("/icons/launchericon-192-192.png"); 
            }
          })
        );
      })
    );
  }
});
