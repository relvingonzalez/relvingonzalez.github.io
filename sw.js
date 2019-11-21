'use strict';

// Licensed under a CC0 1.0 Universal (CC0 1.0) Public Domain Dedication
// http://creativecommons.org/publicdomain/zero/1.0/

(function() {

    // Update 'version' if you need to refresh the cache
    var staticCacheName = 'static';
    var version = 'v1::';

    // Store core files in a cache (including a page to display when offline)
    function updateStaticCache() {
        return caches.open(version + staticCacheName)
            .then(function (cache) {
                return cache.addAll([
                    'js/main.js',
                    'js/photoswipe-ui-default.min.js',
                    'js/photoswipe.min.js',
                    'js/scripts.js',
                    'js/smoothscroll.js',
                    'css/style.css',
                    'css/photoswipe.css',
                    'images/addressicon.png',
                    'images/arrow-up.png',
                    'images/book2.png',
                    'images/drumicon.png',
                    'images/email-icon.png',
                    'images/example3.webp',
                    'images/example4.webp',
                    'images/example5.webp',
                    'images/feedback-sign.png',
                    'images/kt_app_backoffice.webp',
                    'images/logo.png',
                    'images/logo_otsan.png',
                    'images/msbadge.webp',
                    'images/map-image.png',
                    'images/noteicon.png',
                    'images/Otsan presen2t.jpg',
                    'images/p2.webp',
                    'images/pencil.png',
                    'images/phoneicon.png',
                    'images/portfolio.png',
                    'images/ralf.webp',
                    'images/relvin.webp',
                    'images/screenicon.png',
                    'images/search.png',
                    'images/setting-icon.png',
                    'images/team1.png',
                    'images/team2.png',
                    'images/team3.png',
                    '/',
                    '/offline.html'
                ]);
            });
    };

    self.addEventListener('install', function (event) {
        event.waitUntil(updateStaticCache());
    });

    self.addEventListener('activate', function (event) {
        event.waitUntil(
            caches.keys()
                .then(function (keys) {
                    // Remove caches whose name is no longer valid
                    return Promise.all(keys
                        .filter(function (key) {
                          return key.indexOf(version) !== 0;
                        })
                        .map(function (key) {
                          return caches.delete(key);
                        })
                    );
                })
        );
    });

    self.addEventListener('fetch', function (event) {
        var request = event.request;
        // Always fetch non-GET requests from the network
        if (request.method !== 'GET') {
            event.respondWith(
                fetch(request)
                    .catch(function () {
                        return caches.match('/offline.html');
                    })
            );
            return;
        }

        // For HTML requests, try the network first, fall back to the cache, finally the offline page
        if (request.headers.get('Accept').indexOf('text/html') !== -1) {
            // Fix for Chrome bug: https://code.google.com/p/chromium/issues/detail?id=573937
            if (request.mode != 'navigate') {
                request = new Request(request.url, {
                    method: 'GET',
                    headers: request.headers,
                    mode: request.mode,
                    credentials: request.credentials,
                    redirect: request.redirect
                });
            }
            event.respondWith(
                fetch(request)
                    .then(function (response) {
                        // Stash a copy of this page in the cache
                        var copy = response.clone();
                        caches.open(version + staticCacheName)
                            .then(function (cache) {
                                cache.put(request, copy);
                            });
                        return response;
                    })
                    .catch(function () {
                        return caches.match(request)
                            .then(function (response) {
                                return response || caches.match('/offline.html');
                            })
                    })
            );
            return;
        }

        // For non-HTML requests, look in the cache first, fall back to the network
        event.respondWith(
            caches.match(request)
                .then(function (response) {
                    return response || fetch(request)
                        .catch(function () {
                            // If the request is for an image, show an offline placeholder
                            if (request.headers.get('Accept').indexOf('image') !== -1) {
                                return new Response('<svg width="400" height="300" role="img" aria-labelledby="offline-title" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><title id="offline-title">Offline</title><g fill="none" fill-rule="evenodd"><path fill="#D8D8D8" d="M0 0h400v300H0z"/><text fill="#9B9B9B" font-family="Helvetica Neue,Arial,Helvetica,sans-serif" font-size="72" font-weight="bold"><tspan x="93" y="172">offline</tspan></text></g></svg>', { headers: { 'Content-Type': 'image/svg+xml' }});
                            }
                        });
                })
        );
    });

})();