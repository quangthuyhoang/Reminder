const version = 'v1';

self.addEventListener('istall', function (event) {
  event.waitUntil(
    caches.open(version)
    .then(function(cache) {
      return cache.addAll('/')
    })
  )
})