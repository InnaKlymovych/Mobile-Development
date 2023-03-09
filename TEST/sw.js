//Current version
const VERSION = "1.0.0";

//Name for our app cache
const CACHE_NAME = "test";

//Assets to be cached
const cachedAssets = [
   "TEST/index.html",
   "manifest.json",
   "images/icons-192.png",
   "images/icons-512.png",
   "images/icons-vector.svg",
   "images/maskable_icon.png"
   
];

self.addEventListener("install", async (event) => {
   console.log("install sw");

   const cache = await caches.open(CACHE_NAME);
   await cache.addAll(cachedAssets);
   await self.skipWaiting();

  // Store the current version number in the cache
   await cache.put("version", new Response(VERSION));
   console.log(cache);
});

self.addEventListener("activate", async (event) => {
   console.log("activate sw");
  //Clean old cached versions still in memory.
   const oldCache = await caches.open(CACHE_NAME);
   if (oldCache) await oldCache.delete(CACHE_NAME);

  // Check the version number stored in the cache
   const cache = await caches.open(CACHE_NAME);
   const cachedVersion = await cache.match("version");
   const currentVersion = new Response(VERSION);

   if (cachedVersion !== currentVersion) {
    // If the version numbers don't match it means there is an update, reload the page
   await clients.claim();
   await self.clients.matchAll({ type: "window" }).then((clients) => {
      clients.forEach((client) => client.navigate(client.url));
   });
   }
});
self.addEventListener("fetch", (event) => {
   console.log("fetch sw");
   const responsePromise = (async function () {
   const cachedResponse = await caches.match(event.request);
   return cachedResponse || fetch(event.request);
   })();

   event.respondWith(responsePromise);
});