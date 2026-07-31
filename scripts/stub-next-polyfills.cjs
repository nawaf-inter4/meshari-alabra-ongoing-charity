/**
 * Next.js always ships `polyfill-module` (Array.at/flat, Object.fromEntries/hasOwn,
 * String.trimStart/trimEnd, …) aimed at Chrome 61 / Safari 10.1 — regardless of
 * browserslist. Turbopack resolves that file via a relative require inside
 * `next/dist/client/app-globals.js`, so `resolveAlias` does not replace it.
 *
 * This script empties the module before build/dev. Safe for our browserslist
 * (Chrome/Edge/Firefox ≥111, Safari/iOS ≥16.4) where those APIs are native.
 * Re-applied after every `npm ci` via the npm scripts that invoke it.
 */
const fs = require("fs");
const path = require("path");

const MARKER = "__MESHARI_EMPTY_POLYFILL__";
const STUB = `/* ${MARKER}: modern browserslist — see scripts/stub-next-polyfills.cjs */\nmodule.exports = {};\n`;
const ESM_STUB = `/* ${MARKER}: modern browserslist — see scripts/stub-next-polyfills.cjs */\nexport {};\n`;

const targets = [
  {
    file: path.join(
      __dirname,
      "..",
      "node_modules/next/dist/build/polyfills/polyfill-module.js"
    ),
    stub: STUB,
  },
  {
    file: path.join(
      __dirname,
      "..",
      "node_modules/next/dist/esm/build/polyfills/polyfill-module.js"
    ),
    stub: ESM_STUB,
  },
];

for (const { file, stub } of targets) {
  if (!fs.existsSync(file)) continue;
  const current = fs.readFileSync(file, "utf8");
  if (current.includes(MARKER)) continue;
  fs.writeFileSync(file, stub);
  console.log(`[stub-next-polyfills] emptied ${path.relative(process.cwd(), file)}`);
}
