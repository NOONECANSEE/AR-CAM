const cacheName = "v3";

const cacheAssets = [
  "index.html",
  "./arrow2.png",
  "./ccd.gltf",
  "./civil.gltf",
  "./dg.gltf",
  "./gtac.gltf",
  "./iit.gltf",
  "./lc.gltf",
  "./karma.gltf",
  "./lib.gltf",
  "./lt1.gltf",
  "./scene.gltf",
  "./scene.bin",
  "./sb.gltf",
  "./sryia.gltf",
  "./Welcome.gltf",
  "./Welcome.bin",
  "./direction2atccd.bin",
  "./direction2atcivil.bin",
  "./direction2atdg.bin",
  "./direction2atgamcha.bin",
  "./direction2atkarma.bin",
  "./directionatiitlogo.bin",
  "./direction2atlc.bin",
  "./direction2atlib.bin",
  "./direction2atsb.bin",
  "./direction2atviswarayya.bin",
  "./directionatLT1.bin",
  "./directionatvt.bin",
  "./csi.svg",
  "./augnex.svg",
  "./Technex.svg",
  "./ar.js",
  "./canvas.js"
];

// Call Install Event
self.addEventListener("install", e => {
  console.log("Service Worker: Installed");

  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log("Service Worker: Caching Files");
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

// Call Activate Event
self.addEventListener("activate", e => {
  console.log("Service Worker: Activated");
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log("Service Worker: Clearing Old Cache");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call Fetch Event
self.addEventListener("fetch", e => {
  console.log("Service Worker: Fetching");
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
