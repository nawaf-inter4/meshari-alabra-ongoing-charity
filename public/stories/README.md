# Quran Stories PDF Files

Educational Quran story PDFs served from this directory.

## Layout

Prefer per-slug, per-locale files:

```text
public/stories/
├── README.md
├── al-khidr-or-destiny/
│   └── ar.pdf          # original Arabic (required)
│   └── en.pdf          # optional complete translated PDF
├── ash-shura/
│   └── ar.pdf
├── al-jinn/
│   └── ar.pdf
└── an-naml/
    └── ar.pdf
```

Story slugs:

- `al-khidr-or-destiny`
- `ash-shura`
- `al-jinn`
- `an-naml`

## Resolution rules

`resolveStoryPdf(slug, locale)` in `src/content/stories/pdf-paths.ts`:

1. Uses `/stories/{slug}/{locale}.pdf` when that locale is listed in `STORY_PDF_LOCALES`.
2. Otherwise falls back to `/stories/{slug}/ar.pdf` (never 404 for a supported UI locale).

**Only complete translations belong in `STORY_PDF_LOCALES`.** One-page synopsis PDFs must not be listed — leave locales off the list so preview/download use the Arabic original and the UI shows the Arabic PDF note.

When you add a complete translated PDF, place it at `/stories/{slug}/{locale}.pdf` and add that locale to `STORY_PDF_LOCALES` for the slug. Keep `pages` in `stories.ts` aligned with the Arabic (or translated) PDF page count.

## Regenerate non-Arabic PDFs

`npm run generate:story-pdfs` can draft locale PDFs from body copy, but drafts are not shipped until they are full translations and listed in `STORY_PDF_LOCALES`.

Arabic `ar.pdf` files are never overwritten by that script.

## Legacy filenames

Arabic-named PDFs may still exist at the root of `public/stories/` for backwards compatibility. New code should use the slug/locale layout above. Static `/stories/*` PDF paths continue to be served without locale rewriting (see `src/proxy.ts`).

Arabic `ar.pdf` files are never overwritten.

## Legacy filenames

Arabic-named PDFs may still exist at the root of `public/stories/` for backwards compatibility. New code should use the slug/locale layout above. Static `/stories/*` paths continue to be served without locale rewriting (see `src/proxy.ts`).

## Features

- Home and section cards link to `/{locale}/sections/quran-stories/{slug}`
- Section hub: `/{locale}/sections/quran-stories` (same thumbnail cards as landing)
- Preview, download, and open-in-browser use the resolved PDF path (Arabic fallback when needed)
