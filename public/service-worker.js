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
    { url: '/pages/contact.html', revision: '1'},
    { url: '/pages/klasmen.html', revision: '1'},
    { url: '/pages/teams.html', revision: '1'},
    { url: '/pages/saved.html', revision: '1'},
    { url: '/icon.png', revision: '1'},
    { url: '/icons/icon-72x72.png', revision: '1'},
    { url: '/icons/icon-96x96.png', revision: '1'},
    { url: '/icons/icon-128x128.png', revision: '1'},
    { url: '/icons/icon-144x144.png', revision: '1'},
    { url: '/icons/icon-152x152.png', revision: '1'},
    { url: '/icons/icon-192x192.png', revision: '1'},
    { url: '/icons/icon-384x384.png', revision: '1'},
    { url: '/icons/icon-512x512.png', revision: '1'},
    { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1'},
    { url: 'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2', revision: '1'},
], {
ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
  new RegExp('/pages/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'pages'
  })
);

workbox.routing.registerRoute(
    new RegExp('(https://|http://)'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'data-api'
    })
);

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