/* Ongoing Charity PWA service worker.
 * Keep this file dependency-free so it works with every supported deployment target.
 */

const VERSION = "v6";
const PREFIX = "ongoing-charity";
const PRECACHE = `${PREFIX}-precache-${VERSION}`;
const PAGES = `${PREFIX}-pages-${VERSION}`;
const STATIC = `${PREFIX}-static-${VERSION}`;
const IMAGES = `${PREFIX}-images-${VERSION}`;
const OFFLINE_URL = "/offline.html";
const CONFIG = new URL(self.location.href).searchParams;
const FAVICON = CONFIG.get("favicon") || "/favicon.svg";
const ICON_192 = CONFIG.get("icon192") || "/icons/icon-192x192.png";
const ICON_512 = CONFIG.get("icon512") || "/icons/icon-512x512.png";
const APPLE_ICON = CONFIG.get("appleIcon") || "/icons/apple-icon-180.png";
const CORE_PRECACHE_URLS = [
  OFFLINE_URL,
  "/manifest.webmanifest",
  "/fonts/lexend-deca-latin.woff2",
  "/fonts/tajawal-arabic-400.woff2",
  "/fonts/tajawal-arabic-700.woff2",
  "/flags/sa.svg",
];

const OPTIONAL_LOCAL_ASSETS = [FAVICON, ICON_192, ICON_512, APPLE_ICON].filter((url) => {
  try {
    return new URL(url, self.location.origin).origin === self.location.origin;
  } catch {
    return false;
  }
});

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(PRECACHE).then(async (cache) => {
      await cache.addAll(CORE_PRECACHE_URLS.map((url) => new Request(url, { cache: "reload" })));
      await Promise.all(
        OPTIONAL_LOCAL_ASSETS.map((url) =>
          cache.add(new Request(url, { cache: "reload" })).catch(() => undefined),
        ),
      );
    }),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      caches.keys().then((names) =>
        Promise.all(
          names
            .filter((name) => name.startsWith(`${PREFIX}-`) && ![PRECACHE, PAGES, STATIC, IMAGES].includes(name))
            .map((name) => caches.delete(name)),
        ),
      ),
      self.clients.claim(),
    ]),
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

function isNextFlightRequest(request, url) {
  return (
    request.headers.has("rsc") ||
    request.headers.has("next-router-prefetch") ||
    url.searchParams.has("_rsc")
  );
}

function isCacheable(response) {
  if (!response || response.status !== 200 || response.type === "error") return false;
  const cacheControl = response.headers.get("cache-control") || "";
  return !/no-store|private/i.test(cacheControl);
}

async function trimCache(cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  await Promise.all(keys.slice(0, Math.max(0, keys.length - maxEntries)).map((key) => cache.delete(key)));
}

async function networkFirstPage(request) {
  let response;
  try {
    response = await fetch(request);
  } catch {
    try {
      const cache = await caches.open(PAGES);
      return (await cache.match(request)) || (await caches.match(OFFLINE_URL));
    } catch {
      return caches.match(OFFLINE_URL);
    }
  }

  // A full or unavailable cache must never turn a successful network
  // navigation into the offline page. Persistence is strictly best-effort.
  if (isCacheable(response)) {
    try {
      const cache = await caches.open(PAGES);
      await cache.put(request, response.clone());
      await trimCache(PAGES, 24);
    } catch {
      // Return the live response even when Cache Storage rejects the write.
    }
  }
  return response;
}

async function cacheFirst(request, cacheName, maxEntries) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (isCacheable(response)) {
    await cache.put(request, response.clone());
    await trimCache(cacheName, maxEntries);
  }
  return response;
}

async function staleWhileRevalidate(request, event) {
  const cache = await caches.open(IMAGES);
  const cached = await cache.match(request);
  const refresh = fetch(request)
    .then(async (response) => {
      if (isCacheable(response)) {
        await cache.put(request, response.clone());
        await trimCache(IMAGES, 80);
      }
      return response;
    })
    .catch(() => undefined);

  if (cached) {
    event.waitUntil(refresh);
    return cached;
  }

  return (await refresh) || Response.error();
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET" || request.headers.has("range")) return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin || isNextFlightRequest(request, url)) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirstPage(request));
    return;
  }

  if (url.pathname.startsWith("/_next/static/") || request.destination === "font") {
    event.respondWith(cacheFirst(request, STATIC, 80));
    return;
  }

  if (request.destination === "image") {
    event.respondWith(staleWhileRevalidate(request, event));
  }
});

self.addEventListener("push", (event) => {
  if (!event.data) return;

  let data;
  try {
    data = event.data.json();
  } catch {
    data = { title: "Prayer reminder", body: event.data.text() };
  }

  event.waitUntil(
    self.registration.showNotification(data.title || "Prayer reminder", {
      body: data.body || "",
      icon: data.icon || ICON_192,
      badge: data.badge || ICON_192,
      tag: data.tag || "ongoing-charity-reminder",
      renotify: false,
      data: { url: data.url || "/" },
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = new URL(event.notification.data?.url || "/", self.location.origin);
  if (target.origin !== self.location.origin) target.pathname = "/";

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then(async (clients) => {
      for (const client of clients) {
        if ("focus" in client) {
          await client.navigate(target.href);
          return client.focus();
        }
      }
      return self.clients.openWindow(target.href);
    }),
  );
});
