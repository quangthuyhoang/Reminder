
// if ('serviceWorker in navigator') {
//   navigator.serviceWorker
//   // register path to service work --> scopes allows which local folder directory to provide direct control
//   // only requirement is since this specific service work is in the script directory 
//   // and not in a parent or same directory as /brand, this will error out
//   .register('/scripts/sw.js', {scope: '/brand' }) //
//   .catch(err => console.log("There's a problem \n"))
// }

console.log(navigator)
if('serviceWorker' in navigator) {
navigator.serviceWorker.register('./sw-min.js')
.then(r => console.log('Service Worker Registered'))
.catch(console.error);
}