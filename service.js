const version = '1.0';

self.addEventListener('install', event => {
  console.log('Log from event "INSTALL" in service worker version ' + version);
  return self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('Log from event "ACTIVATE" in service worker version ' + version);
return self.clients.claim();
});


//Gestion du cache

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  workbox.precaching.precacheAndRoute([
    {
      "url": "index.html"
    },
    {
      "url": "about.html"
    },
    {
      "url" : "manifest.json"
    },
    {
      "url": "icon-96-96.png"
    },
    {
      "url": "main.js"
    },
    {
      "url": "main.css"
    },
    /* {
       "url": "https://api.irail.be/stations/?format=json"
     },*/
    {
      "url" : "https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"
    }
  ]);

  workbox.routing.registerRoute(
      /(.*)\.(?:png|gif|jpg|css)$/,
      workbox.strategies.cacheFirst({
        cacheName: 'design-cache',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 50,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          })
        ]
      })
  );

  workbox.routing.registerRoute(
      "https://api.irail.be/stations/?format=json",
      workbox.strategies.networkFirst({
        cacheName: 'api-cache',
        plugins: [
          new workbox.expiration.Plugin({
            maxEntries: 50,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
          })
        ]
      })
  );

} else {
  console.log(`Boo! Workbox didn't load 😬`);
}





  