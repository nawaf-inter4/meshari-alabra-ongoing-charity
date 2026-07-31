"use client";

import { useEffect, useRef, useState } from "react";
import { RefreshCw, X } from "lucide-react";
import PWAInstallPrompt from "./PWAInstallPrompt";
import { useLanguage } from "./LanguageProvider";
import { localeDirection, RTL_LOCALES, siteConfig, SUPPORTED_LOCALES } from "@/config/site";
import { pwaCopy } from "@/lib/pwa-copy";

const UPDATE_CHECK_INTERVAL = 60 * 60 * 1000;

export default function PWAClient() {
  const { locale } = useLanguage();
  const copy = pwaCopy[locale];
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [isApplyingUpdate, setIsApplyingUpdate] = useState(false);
  const shouldReload = useRef(false);

  useEffect(() => {
    localStorage.setItem("offline-site-config", JSON.stringify({
      supportedLocales: SUPPORTED_LOCALES,
      rtlLocales: Array.from(RTL_LOCALES),
      defaultLocale: siteConfig.identity.defaultLocale,
      shortName: siteConfig.identity.shortName,
      colors: siteConfig.colors,
    }));
  }, []);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    if (process.env.NODE_ENV !== "production") {
      // A production worker can otherwise keep controlling localhost after the
      // app switches back to `next dev`, serving the offline shell during dev
      // recompiles and making healthy locale/section links look disconnected.
      void navigator.serviceWorker.getRegistrations().then((registrations) =>
        Promise.all(
          registrations
            .filter((item) => item.scope.startsWith(window.location.origin))
            .map((item) => item.unregister()),
        ),
      );
      if ("caches" in window) {
        void caches.keys().then((names) =>
          Promise.all(names.filter((name) => name.startsWith("ongoing-charity-")).map((name) => caches.delete(name))),
        );
      }
      return;
    }

    let lastUpdateCheck = 0;
    let active = true;

    const announceWaitingWorker = (currentRegistration: ServiceWorkerRegistration) => {
      if (currentRegistration.waiting && navigator.serviceWorker.controller) {
        setUpdateAvailable(true);
      }
    };

    const register = async () => {
      try {
        const serviceWorkerUrl = new URL("/sw.js", window.location.origin);
        serviceWorkerUrl.searchParams.set("favicon", siteConfig.assets.favicon);
        serviceWorkerUrl.searchParams.set("icon192", siteConfig.assets.pwaIcon192);
        serviceWorkerUrl.searchParams.set("icon512", siteConfig.assets.pwaIcon512);
        serviceWorkerUrl.searchParams.set("appleIcon", siteConfig.assets.appleTouchIcon);
        const currentRegistration = await navigator.serviceWorker.register(serviceWorkerUrl.href, {
          scope: "/",
          updateViaCache: "none",
        });
        if (!active) return;

        setRegistration(currentRegistration);
        announceWaitingWorker(currentRegistration);

        currentRegistration.addEventListener("updatefound", () => {
          const installing = currentRegistration.installing;
          if (!installing) return;
          installing.addEventListener("statechange", () => {
            if (installing.state === "installed" && navigator.serviceWorker.controller) {
              setUpdateAvailable(true);
            }
          });
        });
      } catch (error) {
        console.error("[PWA] Service worker registration failed", error);
      }
    };

    const checkForUpdate = () => {
      if (document.visibilityState !== "visible") return;
      const now = Date.now();
      if (now - lastUpdateCheck < UPDATE_CHECK_INTERVAL) return;
      lastUpdateCheck = now;
      navigator.serviceWorker.getRegistration("/").then((currentRegistration) => {
        currentRegistration?.update().catch(() => undefined);
      });
    };

    const handleControllerChange = () => {
      if (shouldReload.current) window.location.reload();
    };

    window.addEventListener("load", register, { once: true });
    document.addEventListener("visibilitychange", checkForUpdate);
    navigator.serviceWorker.addEventListener("controllerchange", handleControllerChange);

    if (document.readyState === "complete") void register();

    return () => {
      active = false;
      window.removeEventListener("load", register);
      document.removeEventListener("visibilitychange", checkForUpdate);
      navigator.serviceWorker.removeEventListener("controllerchange", handleControllerChange);
    };
  }, []);

  const applyUpdate = () => {
    if (!registration?.waiting) return;
    setIsApplyingUpdate(true);
    shouldReload.current = true;
    registration.waiting.postMessage({ type: "SKIP_WAITING" });
  };

  return (
    <>
      <PWAInstallPrompt />
      {updateAvailable ? (
        <aside
          className="safe-fixed-bottom-left fixed z-[60] max-w-[min(22rem,calc(100vw-6.75rem-env(safe-area-inset-left,0px)-env(safe-area-inset-right,0px)))] rounded-full border border-islamic-gold/20 bg-white/90 p-3 text-gray-900 shadow-lg backdrop-blur-sm dark:bg-gray-800/90 dark:text-white sm:rounded-2xl sm:p-4"
          role="status"
          aria-live="polite"
          dir={localeDirection(locale)}
          data-pwa-update-prompt
        >
          <div className="flex items-center gap-3">
            <RefreshCw className="h-5 w-5 shrink-0 self-center text-islamic-gold" aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-sm leading-tight">{copy.updateTitle}</p>
              <p className="mt-0.5 text-xs leading-snug text-gray-600 dark:text-gray-300 sm:text-sm">
                {copy.updateDescription}
              </p>
              <button
                type="button"
                onClick={applyUpdate}
                disabled={isApplyingUpdate}
                className="mt-2 min-h-10 rounded-full bg-gradient-to-r from-islamic-gold to-islamic-green px-4 py-2 text-sm font-bold text-white disabled:opacity-60"
              >
                {isApplyingUpdate ? copy.updating : copy.updateNow}
              </button>
            </div>
            <button
              type="button"
              onClick={() => setUpdateAvailable(false)}
              className="grid min-h-10 min-w-10 shrink-0 place-items-center self-center rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label={copy.dismissUpdate}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </aside>
      ) : null}
    </>
  );
}
