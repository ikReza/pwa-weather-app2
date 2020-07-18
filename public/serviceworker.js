const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html"];

const self = this;
//install SW
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");

      return cache.addAll(urlsToCache);
    })
  );
});

//Listen for requests
self.addEventListener("fetch", (e) => {
  e.respondWith(
    //matching all the request that our page is saving i.e. request to show the image, request for the API call
    caches.match(e.request).then(() => {
      //again fetching because we always want the updated data
      return (
        fetch(e.request)
          //but if there is no internet connection we simply load previous saved data
          .catch(() => caches.match("offline.html"))
      );
    })
  );
});

//Activate SW
//We don't want to store all the caches. We just want to save the latest one and remove the previous data
self.addEventListener("activate", (e) => {
  const cacheWhiteList = [];
  //Now we'll push all things that we want to keep/save
  cacheWhiteList.push(CACHE_NAME);

  e.waitUntil(
    caches.keys().then((cacheNames) => {
      Promise.all(
        cacheNames.map((cacheName) => {
          //if it doesn't include the specific cache name, just delete it
          if (!cacheWhiteList.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
