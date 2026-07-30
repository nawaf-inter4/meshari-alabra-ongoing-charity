"use client";

import dynamic from "next/dynamic";

const PWAClient = dynamic(() => import("./PWAClient"));

export default function PWAInstallWrapper() {
  return <PWAClient />;
}
