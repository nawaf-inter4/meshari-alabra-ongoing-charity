/**
 * React 19 treats `nonce` as script-only when it is a string:
 *   nonceStyle = typeof nonce === "string" ? void 0 : nonce.style
 * Next.js passes a string CSP nonce into Fizz, so experimental.inlineCss
 * <style precedence> tags ship without nonce and break nonce-only style-src.
 *
 * Patch: reuse the string nonce for styles as well.
 * Safe for script tags (unchanged) and matches React's object form
 * `{ script, style }` when both should share one value.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const NEEDLE =
  'nonceStyle = "string" === typeof nonce ? void 0 : nonce && nonce.style';
const REPLACEMENT =
  'nonceStyle = "string" === typeof nonce ? nonce : nonce && nonce.style';

const SEARCH_ROOTS = [
  path.join(ROOT, "node_modules/react-dom"),
  path.join(ROOT, "node_modules/next/dist/compiled/react-dom"),
  path.join(ROOT, "node_modules/next/dist/compiled/react-dom-experimental"),
];

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile() && entry.name.endsWith(".js")) out.push(full);
  }
  return out;
}

let patched = 0;
let already = 0;
for (const root of SEARCH_ROOTS) {
  for (const file of walk(root)) {
    const src = fs.readFileSync(file, "utf8");
    if (!src.includes(NEEDLE)) {
      if (src.includes(REPLACEMENT)) already += 1;
      continue;
    }
    fs.writeFileSync(file, src.split(NEEDLE).join(REPLACEMENT));
    patched += 1;
    console.log("patched", path.relative(ROOT, file));
  }
}

console.log(
  `react style-nonce patch: ${patched} file(s) updated, ${already} already patched`,
);
if (patched === 0 && already === 0) {
  console.warn(
    "warning: no react-dom nonceStyle sites found — Next/React layout may have changed",
  );
}
