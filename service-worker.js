self.addEventListener('install', (event) => {
    console.log('Service Worker installiert.');
});

self.addEventListener('push', (event) => {
    const data = event.data.json();
    self.registration.showNotification(data.title, {
        body: data.body,
        icon: 'icon-192x192.png'
    });
});
