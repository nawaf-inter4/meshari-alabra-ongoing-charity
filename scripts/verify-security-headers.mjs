#!/usr/bin/env node
/**
 * Local Mozilla Observatory–style checks for CSP / security headers.
 * Usage: node scripts/verify-security-headers.mjs [url]
 */

const url = process.argv[2] || "http://127.0.0.1:3456/ar";

const failures = [];
const notes = [];

function fail(msg) {
  failures.push(msg);
}
function note(msg) {
  notes.push(msg);
}

const res = await fetch(url, { redirect: "manual" });
const headers = res.headers;
const csp = headers.get("content-security-policy") || "";

console.log(`URL: ${url}`);
console.log(`Status: ${res.status}`);
console.log(`CSP: ${csp.slice(0, 200)}${csp.length > 200 ? "…" : ""}\n`);

if (!csp) fail("Content-Security-Policy missing");

const scriptSrc = (csp.match(/script-src([^;]*)/) || [, ""])[1];
const styleSrc = (csp.match(/style-src([^;]*)/) || [, ""])[1];
const defaultSrc = (csp.match(/default-src([^;]*)/) || [, ""])[1];

if (!/default-src\s+'none'/.test(csp) && !defaultSrc.includes("'none'")) {
  fail("default-src should be 'none'");
} else {
  note("default-src 'none' ✓");
}

if (/script-src[^;]*'unsafe-inline'/.test(csp)) {
  fail("script-src contains 'unsafe-inline' (Observatory −20)");
} else {
  note("script-src has no 'unsafe-inline' ✓");
}

if (/script-src[^;]*'unsafe-eval'/.test(csp) && process.env.NODE_ENV === "production") {
  fail("script-src contains 'unsafe-eval' in production");
}

if (!/'nonce-[A-Za-z0-9+/=_-]+'/.test(scriptSrc)) {
  fail("script-src missing nonce-… source");
} else {
  note("script-src nonce ✓");
}

if (!scriptSrc.includes("'strict-dynamic'")) {
  fail("script-src missing 'strict-dynamic'");
} else {
  note("script-src strict-dynamic ✓");
}

if (styleSrc.includes("'unsafe-inline'") && !/'nonce-[A-Za-z0-9+/=_-]+'/.test(styleSrc)) {
  note("style-src 'unsafe-inline' without nonce (Observatory style-src-only = 0)");
} else if (/'nonce-[A-Za-z0-9+/=_-]+'/.test(styleSrc) && !styleSrc.includes("'unsafe-inline'")) {
  note("style-src nonce without 'unsafe-inline' (Observatory no-unsafe +10 path) ✓");
} else if (/'nonce-[A-Za-z0-9+/=_-]+'/.test(styleSrc) && styleSrc.includes("'unsafe-inline'")) {
  note("style-src nonce + 'unsafe-inline' (Observatory ignores unsafe-inline when nonce present) ✓");
} else {
  fail("style-src missing nonce and has no 'unsafe-inline' fallback");
}

// Nonce/hash in style-src covers <style>/stylesheet tags only. React style={…}
// / CSSOM cssText require style-src-attr 'unsafe-inline' (CSP3). Without it,
// browsers fall back to style-src and block every inline style attribute.
if (/'nonce-[A-Za-z0-9+/=_-]+'/.test(styleSrc) || /'sha256-/.test(styleSrc)) {
  if (!/style-src-attr[^;]*'unsafe-inline'/.test(csp)) {
    fail(
      "style-src uses nonce/hash but style-src-attr 'unsafe-inline' is missing (React style props will break)",
    );
  }
  note("style-src-attr 'unsafe-inline' residual for React style attrs (Observatory ignores) ✓");
} else if (csp.includes("style-src-attr") && /style-src-attr[^;]*'unsafe-inline'/.test(csp)) {
  note("style-src-attr 'unsafe-inline' residual for React style attrs (Observatory ignores) ✓");
}

const required = {
  "strict-transport-security": /max-age=63072000/,
  "x-content-type-options": /nosniff/i,
  "x-frame-options": /DENY/i,
  "referrer-policy": /strict-origin-when-cross-origin/i,
  "cross-origin-opener-policy": /same-origin-allow-popups/i,
};

for (const [name, re] of Object.entries(required)) {
  const value = headers.get(name) || "";
  if (!re.test(value)) fail(`${name} missing or weak: ${value || "(absent)"}`);
  else note(`${name} ✓`);
}

if (!/frame-ancestors\s+'none'/.test(csp)) {
  fail("CSP frame-ancestors 'none' missing");
} else {
  note("frame-ancestors 'none' ✓");
}

// HTML nonce stamping
const html = await res.text();
const scriptTags = [...html.matchAll(/<script\b([^>]*)>/gi)];
const withNonce = scriptTags.filter((m) => /\bnonce=/.test(m[1]));
const external = scriptTags.filter((m) => /\bsrc=/.test(m[1]));
const inline = scriptTags.filter((m) => !/\bsrc=/.test(m[1]));

note(`scripts: ${scriptTags.length} total, ${withNonce.length} with nonce, ${inline.length} inline, ${external.length} external`);

if (inline.length > 0 && withNonce.length < inline.length) {
  const missing = inline.length - withNonce.filter((m) => !/\bsrc=/.test(m[1])).length;
  // recount inline without nonce
  const inlineNoNonce = inline.filter((m) => !/\bnonce=/.test(m[1]));
  if (inlineNoNonce.length > 0) {
    fail(`${inlineNoNonce.length} inline <script> tags lack nonce (page would break under strict CSP)`);
  }
}

const integrity = (html.match(/\bintegrity="/g) || []).length;
if (integrity > 0) note(`SRI integrity attrs: ${integrity} ✓`);
else note("SRI integrity attrs: 0 (enable experimental.sri / non-Turbopack path may vary)");

console.log("Notes:");
for (const n of notes) console.log(`  - ${n}`);

if (failures.length) {
  console.log("\nFAILURES:");
  for (const f of failures) console.log(`  ✗ ${f}`);
  process.exit(1);
}

console.log("\nAll Observatory-critical header checks passed.");
