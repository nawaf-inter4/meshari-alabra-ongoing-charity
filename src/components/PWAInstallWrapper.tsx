"use client";

import dynamic from "next/dynamic";

const PWAInstallPrompt = dynamic(() => import("./PWAInstallPrompt"));

export default function PWAInstallWrapper() {
  return <PWAInstallPrompt />;
}
