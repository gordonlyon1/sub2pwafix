importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
    console.log(`Workbox berhasil dimuat`);
else
    console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: '1'},
    { url: '/nav.html', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/push.js', revision: '1'},
    { url: '/manifest.json', revision: '1'},
    { url: '/detail.html', revision: '1'},
    { url: '/js/api.js', revision: '1'},
    { url: '/js/db.js', revision: '1'},
    { url: '/js/idb.js', revision: '1'},
    { url: '/js/index.js', revision: '1'},
    { url: '/js/nav.js', revision: '1'},
]);

workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

const CACHE_NAME = "infobola";
const urlsToCache = [
  "/",
  "/manifest.json",
  "/nav.html",
  "/index.html",
  "/detail.html",
  "/pages/contact.html",
  "/pages/klasemen.html",
  "/pages/teams.html",
  "/pages/saved.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/js/api.js",
  "/js/index.js",
  "/icon.png",
  "/js/db.js",
  "/js/idb.js",
  "/icons/icon-72x72.png",
  "/icons/icon-96x96.png",
  "/icons/icon-128x128.png",
  "/icons/icon-144x144.png",
  "/icons/icon-152x152.png",
  "/icons/icon-192x192.png",
  "/icons/icon-384x384.png",
  "/icons/icon-512x512.png",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2"
];


self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});


self.addEventListener("fetch", function (event) {
  const base_url = "https://api.football-data.org/v2";
  const online = navigator.onLine;
  if (event.request.url.includes(base_url) && online){
    event. respondWith(
      caches.open(CACHE_NAME).then(function (cache) {
        return fetch(event.request).then(function(response){
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request, {'ignoreSearch': true}).then(function(response){
        return response || fetch (event.request);
      })
    )
  }
});


self.addEventListener("activate", function (event) {
  clients.claim();
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});


self.addEventListener('push', event => {
  let body;
  if (event.data){
      body = event.data.text();
  } else {
      body = 'Push message payload kosong !';
  }
  const options = {
    icon: 'icons/icon-512x512.png',
    body: body,
    vibrate: [150, 50, 150],
    data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
    }
  };
  event.waitUntil(
      self.registration.showNotification('Push Notification', options)
  );
});