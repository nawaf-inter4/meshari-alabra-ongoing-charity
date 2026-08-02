#!/usr/bin/env node
/**
 * Draft per-locale story PDFs under public/stories/{slug}/{locale}.pdf.
 * Arabic originals are preserved; other locales are rendered from localized
 * titles/descriptions (locale JSON) + body paragraphs (stories.ts).
 *
 * IMPORTANT: Do not list incomplete/synopsis PDFs in STORY_PDF_LOCALES.
 * The app only serves locales listed there; everything else falls back to ar.pdf.
 *
 * Usage:
 *   npx playwright install chromium
 *   npm run generate:story-pdfs
 */
import { mkdirSync, writeFileSync, existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const LOCALES = [
  "ar",
  "en",
  "ur",
  "tr",
  "id",
  "ms",
  "bn",
  "fr",
  "zh",
  "it",
  "ja",
  "ko",
  "es",
  "pt",
  "hi",
];
const RTL = new Set(["ar", "ur"]);

function loadStoriesFromTs() {
  const path = join(root, "src/content/stories/stories.ts");
  const source = readFileSync(path, "utf8");
  const body = source
    .replace(/^import[\s\S]*?;\n/gm, "")
    .replace(/: QuranStoryDefinition\[\]/g, "")
    .replace(/pdfs: buildStoryPdfs\("[^"]+"\),\n/g, "")
    .replace(/export const QURAN_STORIES =/, "return ");
  const fn = new Function(`${body}`);
  return fn();
}

function loadLocaleMessages(locale) {
  const path = join(root, "src/locales", `${locale}.json`);
  return JSON.parse(readFileSync(path, "utf8"));
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function storyHtml({ title, description, paragraphs, locale, slug }) {
  const dir = RTL.has(locale) ? "rtl" : "ltr";
  const note =
    locale === "ar"
      ? "النسخة العربية الأصلية محفوظة كملف PDF معتمد."
      : "Generated from the localized educational narrative. Arabic remains the original authored PDF.";

  const fontFamily =
    locale === "zh"
      ? "'Noto Sans SC'"
      : locale === "ja"
        ? "'Noto Sans JP'"
        : locale === "ko"
          ? "'Noto Sans KR'"
          : locale === "bn"
            ? "'Noto Sans Bengali'"
            : locale === "hi"
              ? "'Noto Sans Devanagari'"
              : RTL.has(locale)
                ? "'Noto Naskh Arabic', 'Noto Sans Arabic'"
                : "'Noto Sans'";

  return `<!doctype html>
<html lang="${locale}" dir="${dir}">
<head>
  <meta charset="utf-8" />
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Naskh+Arabic:wght@400;700&family=Noto+Sans:wght@400;700&family=Noto+Sans+Arabic:wght@400;700&family=Noto+Sans+Bengali:wght@400;700&family=Noto+Sans+Devanagari:wght@400;700&family=Noto+Sans+JP:wght@400;700&family=Noto+Sans+KR:wght@400;700&family=Noto+Sans+SC:wght@400;700&display=swap');
    body {
      font-family: ${fontFamily}, sans-serif;
      color: #1a1a1a;
      margin: 48px;
      line-height: 1.7;
      font-size: 14px;
    }
    h1 { font-size: 26px; margin: 0 0 12px; color: #0f5c4c; }
    .desc { color: #444; margin-bottom: 28px; font-size: 15px; }
    p { margin: 0 0 16px; }
    .meta { margin-top: 32px; font-size: 11px; color: #777; border-top: 1px solid #ddd; padding-top: 12px; }
  </style>
</head>
<body>
  <h1>${escapeHtml(title)}</h1>
  <p class="desc">${escapeHtml(description)}</p>
  ${paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join("\n  ")}
  <p class="meta">${escapeHtml(note)} · ${escapeHtml(slug)} · ${escapeHtml(locale)}</p>
</body>
</html>`;
}

async function main() {
  const stories = loadStoriesFromTs();
  if (!Array.isArray(stories) || stories.length === 0) {
    throw new Error("Failed to load QURAN_STORIES");
  }

  const messagesByLocale = Object.fromEntries(
    LOCALES.map((locale) => [locale, loadLocaleMessages(locale)]),
  );

  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const story of stories) {
    const dir = join(root, "public/stories", story.slug);
    mkdirSync(dir, { recursive: true });

    for (const locale of LOCALES) {
      const out = join(dir, `${locale}.pdf`);
      if (locale === "ar" && existsSync(out)) {
        console.log(`keep original ${story.slug}/ar.pdf`);
        continue;
      }

      const messages = messagesByLocale[locale];
      const titleKey = `quran_stories.stories.${story.slug}.title`;
      const descKey = `quran_stories.stories.${story.slug}.description`;
      const title = messages[titleKey];
      const description = messages[descKey];
      if (!title || !description) {
        throw new Error(`Missing ${titleKey} or ${descKey} in ${locale}.json`);
      }
      const paragraphs = story.body?.[locale] || story.body?.ar;
      if (!paragraphs?.length) {
        throw new Error(`Missing body for ${story.slug}/${locale}`);
      }

      const html = storyHtml({
        title,
        description,
        paragraphs,
        locale,
        slug: story.slug,
      });
      await page.setContent(html, { waitUntil: "networkidle" });
      const pdf = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: { top: "16mm", bottom: "16mm", left: "14mm", right: "14mm" },
      });
      writeFileSync(out, pdf);
      console.log(`wrote ${story.slug}/${locale}.pdf (${pdf.length} bytes)`);
    }
  }

  await browser.close();

  for (const story of stories) {
    for (const locale of LOCALES) {
      const path = join(root, "public/stories", story.slug, `${locale}.pdf`);
      if (!existsSync(path)) throw new Error(`Missing ${path}`);
    }
  }

  const sample = readdirSync(join(root, "public/stories", stories[0].slug));
  console.log(`Done. Sample files for ${stories[0].slug}:`, sample.sort().join(", "));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
