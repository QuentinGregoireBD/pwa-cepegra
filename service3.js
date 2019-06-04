
  
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
    

  