import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const [nextConfig, ...remainingNextConfigs] = nextVitals;

export default defineConfig([
  {
    ...nextConfig,
    rules: {
      ...nextConfig.rules,
      "@next/next/no-page-custom-font": "off",
      "@next/next/no-img-element": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/immutability": "off",
      "react/no-unescaped-entities": "off",
    },
  },
  ...remainingNextConfigs,
  globalIgnores([
    ".next/**",
    ".next-playwright/**",
    ".next-verify/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "public/sw.js",
    "public/pdf.worker.min.mjs",
  ]),
]);
