
// const CACHE_NAME = 'offline';
// const OFFLINE_URL = './offline.html';

// self.addEventListener('install', function (event) {
//     console.log('[ServiceWorker] Install');

//     event.waitUntil((async () => {
//         const cache = await caches.open(CACHE_NAME);
//         // Setting {cache: 'reload'} in the new request will ensure that the response
//         // isn't fulfilled from the HTTP cache; i.e., it will be from the network.
//         await cache.add(new Request(OFFLINE_URL, { cache: 'reload' }));
//     })());

//     self.skipWaiting();
// });

// self.addEventListener('activate', (event) => {
//     console.log('[ServiceWorker] Activate');
//     event.waitUntil((async () => {
//         // Enable navigation preload if it's supported.
//         // See https://developers.google.com/web/updates/2017/02/navigation-preload
//         if ('navigationPreload' in self.registration) {
//             await self.registration.navigationPreload.enable();
//         }
//     })());

//     // Tell the active service worker to take control of the page immediately.
//     self.clients.claim();
// });

// self.addEventListener('fetch', function (event) {
//     // console.log('[Service Worker] Fetch', event.request.url);
//     if (event.request.mode === 'navigate') {
//         event.respondWith((async () => {
//             try {
//                 const preloadResponse = await event.preloadResponse;
//                 if (preloadResponse) {
//                     return preloadResponse;
//                 }

//                 const networkResponse = await fetch(event.request);
//                 return networkResponse;
//             } catch (error) {
//                 console.log('[Service Worker] Fetch failed; returning offline page instead.', error);

//                 const cache = await caches.open(CACHE_NAME);
//                 const cachedResponse = await cache.match(OFFLINE_URL);
//                 return cachedResponse;
//             }
//         })());
//     }
// });

// This is the "serving cached media" service worker

// This is the "Offline page" service worker

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = "pwabuilder-page";
const HTML_CACHE = "html";
const JS_CACHE = "javascript";
const STYLE_CACHE = "stylesheets";
const IMAGE_CACHE = "images";
const FONT_CACHE = "fonts";
const QUEUE_NAME = "bgSyncQueue";

// TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
const offlineFallbackPage = "offline.html";

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.add(offlineFallbackPage))
  );
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResp = await event.preloadResponse;

        if (preloadResp) {
          return preloadResp;
        }

        const networkResp = await fetch(event.request);
        return networkResp;
      } catch (error) {

        const cache = await caches.open(CACHE);
        const cachedResp = await cache.match(offlineFallbackPage);
        return cachedResp;
      }
    })());
  }
});
// Offline copy of pages
workbox.routing.registerRoute(
  new RegExp('/*'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE
  })
);


workbox.routing.registerRoute(
  ({event}) => event.request.destination === 'document',
  new workbox.strategies.NetworkFirst({
    cacheName: HTML_CACHE,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 10,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  ({event}) => event.request.destination === 'script',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: JS_CACHE,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 15,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  ({event}) => event.request.destination === 'style',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: STYLE_CACHE,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 15,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  ({event}) => event.request.destination === 'image',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: IMAGE_CACHE,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 15,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  ({event}) => event.request.destination === 'font',
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: FONT_CACHE,
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 15,
      }),
    ],
  })
);





const bgSyncPlugin = new workbox.backgroundSync.BackgroundSyncPlugin(QUEUE_NAME, {
  maxRetentionTime: 24 * 60 // Retry for max of 24 Hours (specified in minutes)
});

workbox.routing.registerRoute(
  new RegExp('/*'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE,
    plugins: [
      bgSyncPlugin
    ]
  })
);

workbox.loadModule('workbox-cacheable-response');
workbox.loadModule('workbox-range-requests');

workbox.routing.registerRoute(
  /.*\.mp3/,
  new workbox.strategies.CacheFirst({
    cacheName: CACHE,
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({statuses: [200]}),
      new workbox.rangeRequests.RangeRequestsPlugin(),
    ],
  }),
);
async function registerPeriodicNewsCheck() {
  const registration = await navigator.serviceWorker.ready;
  try {
    await registration.periodicSync.register('get-latest-news', {
      minInterval: 24 * 60 * 60 * 1000,
    });
  } catch {
    console.log('Periodic Sync could not be registered!');
  }
}