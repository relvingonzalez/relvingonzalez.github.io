'use strict';

// Retired service worker.
// The 2019 site registered /sw.js and cached its assets. This replacement
// takes over from that worker, deletes every cache it left behind and
// unregisters itself, so returning visitors go straight to the network.
// Keep this file published for a while so old installs pick it up.

self.addEventListener('install', function () {
    self.skipWaiting();
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys()
            .then(function (keys) {
                return Promise.all(keys.map(function (key) {
                    return caches.delete(key);
                }));
            })
            .then(function () {
                return self.registration.unregister();
            })
    );
});
