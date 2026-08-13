/**
 * Keep `public/pdf.worker.min.mjs` aligned with the installed `pdfjs-dist`
 * version so client rendering never hits API/worker mismatches.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const src = path.join(root, "node_modules/pdfjs-dist/build/pdf.worker.min.mjs");
const dest = path.join(root, "public/pdf.worker.min.mjs");

if (!fs.existsSync(src)) {
  console.warn("[sync-pdf-worker] pdfjs-dist worker not found; skip");
  process.exit(0);
}

fs.copyFileSync(src, dest);
console.log("[sync-pdf-worker] synced public/pdf.worker.min.mjs");
