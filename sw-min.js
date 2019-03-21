// SW installed and activate will only occur because of the Cache-Control: max-age=<seconds> in browser header 
// network.
const version = 2;

self.addEventListener('install', function(event) {
  console.log('SW installed at ', new Date().toLocaleDateString());
  self.skipWaiting();
});

self.('activate', function(event) {
  console.log('SW  v%s activated at', version, new Date().toLocaleDateString());
})

self.addEventListener('fetch', function (event) {
  console.log(navigator)
  if(!navigator.onLine) { // if you know you're offlilne
    event.respondWith(new Response(
    '<h1>Offline..<h1>', {headers: { 'Content-Type': 'text/html'}}))
  } else {
  console.log(event.request.url);
  event.respondWith(fetch(event.request));
  }
})
