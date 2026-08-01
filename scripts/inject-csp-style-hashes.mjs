/**
 * experimental.inlineCss embeds CSS into the static HTML shell. That shell is
 * rendered without a per-request nonce, so nonce-only style-src would block it.
 * CSP style hashes of the built CSS chunks allow those tags without
 * 'unsafe-inline'.
 *
 * Run after `next build`. Patches compiled server/edge bundles that embed the
 * %%CSP_STYLE_HASHES%% marker from src/lib/csp.ts.
 */
import { createHash } from "node:crypto";
import { existsSync, readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const MARKER = "%%CSP_STYLE_HASHES%%";
const cssDir = join(ROOT, ".next/static/chunks");

function walk(dir, out = []) {
  if (!existsSync(dir)) return out;
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    // Next may leave dangling locale shells as broken symlinks; skip them.
    let st;
    try {
      st = statSync(full);
    } catch {
      continue;
    }
    if (st.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

if (!existsSync(cssDir)) {
  console.error("inject-csp-style-hashes: missing", cssDir);
  process.exit(1);
}

const hashes = [];
for (const name of readdirSync(cssDir)) {
  if (!name.endsWith(".css")) continue;
  const body = readFileSync(join(cssDir, name));
  hashes.push(createHash("sha256").update(body).digest("base64"));
}

if (hashes.length === 0) {
  console.error("inject-csp-style-hashes: no CSS chunks found");
  process.exit(1);
}

// Inserted into a JS/JSON string that already has surrounding quotes in source:
//   '%%CSP_STYLE_HASHES%%'  →  'sha256-…' 'sha256-…'
const replacement = hashes.map((h) => `sha256-${h}`).join("' '");

let patched = 0;
for (const file of walk(join(ROOT, ".next"))) {
  if (!/\.(js|mjs|json|js\.map)$/.test(file)) continue;
  const src = readFileSync(file, "utf8");
  if (!src.includes(MARKER)) continue;
  writeFileSync(file, src.split(MARKER).join(replacement));
  patched += 1;
  console.log("patched", relative(ROOT, file));
}

console.log(
  `inject-csp-style-hashes: ${hashes.length} hash(es), ${patched} bundle file(s) patched`,
);
if (patched === 0) {
  console.warn(
    "warning: marker not found in .next bundles — CSP may block inlined CSS",
  );
}
