"use client";

import dynamic from "next/dynamic";

const PWAInstallPrompt = dynamic(() => import("./PWAInstallPrompt"), {
  ssr: false,
});

export default function PWAInstallWrapper() {
  return <PWAInstallPrompt />;
}
