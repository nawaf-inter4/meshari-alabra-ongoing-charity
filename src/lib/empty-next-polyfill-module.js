/**
 * Empty stand-in for Next.js `polyfill-module`.
 *
 * Next always injects runtime polyfills (Array.at/flat, Object.fromEntries/hasOwn,
 * String.trimStart/trimEnd, …) aimed at Edge 16 / Chrome 61 / Safari 10.1 — far
 * below this project's browserslist (Chrome/Edge/Firefox 111+, Safari/iOS 16.4+).
 * Those APIs are native in our targets, so shipping the polyfill chunk only costs
 * ~14 KiB and triggers PageSpeed "Legacy JavaScript".
 *
 * Aliased from next.config.js (webpack + turbopack). Safe for modern-only targets.
 */
module.exports = {};
