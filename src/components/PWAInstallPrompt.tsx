"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Download, Share, X } from "lucide-react";
import { localeDirection, siteConfig } from "@/config/site";
import { useLanguage } from "./LanguageProvider";
import { pwaCopy } from "@/lib/pwa-copy";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
  prompt(): Promise<void>;
}

const DISMISS_KEY = "pwa-install-prompt-dismissed-at";
const DISMISS_FOR_MS = 14 * 24 * 60 * 60 * 1000;

export default function PWAInstallPrompt() {
  const { locale } = useLanguage();
  const reduceMotion = useReducedMotion();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      Boolean((navigator as Navigator & { standalone?: boolean }).standalone);
    if (standalone) {
      setIsInstalled(true);
      return;
    }

    const dismissedAt = Number(localStorage.getItem(DISMISS_KEY) || 0);
    if (Date.now() - dismissedAt < DISMISS_FOR_MS) return;

    const iosDevice =
      /iphone|ipad|ipod/i.test(navigator.userAgent) ||
      (/macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints > 1);
    setIsIOS(iosDevice);

    let revealTimer: ReturnType<typeof setTimeout> | undefined;
    const reveal = () => {
      revealTimer = setTimeout(() => setShowInstallPrompt(true), 8000);
    };

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      reveal();
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
      localStorage.removeItem(DISMISS_KEY);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    if (iosDevice) reveal();

    return () => {
      if (revealTimer) clearTimeout(revealTimer);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const install = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === "dismissed") {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    }
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const dismiss = () => {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
    setShowInstallPrompt(false);
    setDeferredPrompt(null);
  };

  if (isInstalled || !showInstallPrompt || (!deferredPrompt && !isIOS)) return null;

  const direction = localeDirection(locale);
  const copy = pwaCopy[locale];
  const offsetX = direction === "rtl" ? 16 : -16;

  return (
    <AnimatePresence>
      <motion.aside
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: offsetX }}
        animate={{ opacity: 1, x: 0 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: offsetX }}
        transition={{ duration: reduceMotion ? 0.15 : 0.28, ease: "easeOut" }}
        className="safe-fixed-bottom-left fixed z-50 max-w-[min(20rem,calc(100vw-6.75rem-env(safe-area-inset-left,0px)-env(safe-area-inset-right,0px)))] bg-white/90 p-3 text-gray-900 shadow-lg backdrop-blur-sm dark:bg-gray-800/90 dark:text-white rounded-full border border-islamic-gold/20"
        role="dialog"
        aria-labelledby="pwa-install-title"
        dir={direction}
        data-pwa-install-prompt
      >
        <div className="flex flex-row items-center gap-2.5">
          <div
            className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full ring-1 ring-islamic-gold/30"
            data-pwa-app-icon
          >
            {/* Configurable white-label icons may be hosted on any HTTPS origin. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={siteConfig.assets.pwaIcon192}
              alt=""
              loading="eager"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h2 id="pwa-install-title" className="truncate text-sm font-bold leading-tight">
              {siteConfig.identity.shortName}
            </h2>
          </div>
          {isIOS && !deferredPrompt ? (
            <Share className="h-5 w-5 shrink-0 self-center text-islamic-gold" aria-hidden="true" />
          ) : (
            <button
              type="button"
              onClick={install}
              className="inline-flex min-h-10 shrink-0 items-center gap-1.5 self-center rounded-full bg-gradient-to-r from-islamic-gold to-islamic-green px-3 py-2 text-xs font-bold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-islamic-gold focus-visible:ring-offset-2"
            >
              <Download className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="leading-none whitespace-nowrap">{copy.install}</span>
            </button>
          )}
          <button
            type="button"
            onClick={dismiss}
            className="grid min-h-10 min-w-10 shrink-0 place-items-center self-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-islamic-gold dark:hover:bg-gray-700"
            aria-label={copy.dismissInstall}
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
