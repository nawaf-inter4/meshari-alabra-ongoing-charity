# Quran Stories PDF Files

Educational Quran story PDFs served from this directory.

## Layout

Prefer per-slug, per-locale files:

```text
public/stories/
├── README.md
├── al-khidr-or-destiny/
│   └── ar.pdf          # original Arabic (required)
│   └── en.pdf          # optional translated PDF
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

Supported UI locales: `ar`, `en`, `ur`, `tr`, `id`, `ms`, `bn`, `fr`, `zh`, `it`, `ja`, `ko`, `es`, `pt`, `hi`.

## Resolution rules

`resolveStoryPdf(slug, locale)` in `src/content/stories/pdf-paths.ts`:

1. Uses `/stories/{slug}/{locale}.pdf` when that locale is listed in `STORY_PDF_LOCALES`.
2. Otherwise falls back to `/stories/{slug}/ar.pdf` (never 404 for a supported UI locale).

When you add a translated PDF, place it at `/stories/{slug}/{locale}.pdf` and add that locale to `STORY_PDF_LOCALES` for the slug.

## Regenerate non-Arabic PDFs

Non-Arabic PDFs are generated from locale JSON titles/descriptions plus
`src/content/stories/stories.ts` body text:

```bash
npx playwright install chromium
npm run generate:story-pdfs
```

Arabic `ar.pdf` files are never overwritten.

## Legacy filenames

Arabic-named PDFs may still exist at the root of `public/stories/` for backwards compatibility. New code should use the slug/locale layout above. Static `/stories/*` paths continue to be served without locale rewriting (see `src/proxy.ts`).

## Features

- Home section cards link to `/{locale}/stories/{slug}`
- Indexable hub + story routes with metadata and JSON-LD
- Preview, download, and open-in-browser use the resolved PDF path
