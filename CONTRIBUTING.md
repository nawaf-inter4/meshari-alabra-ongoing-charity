# Contributing

Thank you for helping improve Meshari's Continuous Charity. This is a memorial project, so every contribution must remain respectful, accurate, accessible, and aligned with its charitable purpose.

## Development workflow

1. Fork the repository and create a focused branch from `main`.
2. Install dependencies with `npm ci`.
3. Make a small, documented change.
4. Run the quality checks:

   ```bash
   npm run lint
   npm run type-check
   npm run build
   ```

5. Commit using [Conventional Commits](https://www.conventionalcommits.org/):

   ```text
   fix: correct a broken link
   feat: add a new accessible section
   docs: improve contributor guidance
   ```

6. Open a pull request describing the change and how it was verified.

## Release policy

Releases follow Semantic Versioning and are automated with Release Please:

- `fix:` produces a patch release.
- `feat:` produces a minor release.
- A commit containing `BREAKING CHANGE:` produces a major release.
- `docs:`, `chore:`, `ci:`, and `test:` are included where relevant but do not normally trigger a version bump by themselves.

Release Please maintains a release pull request on `main`. Merging that pull request updates the version and changelog, creates a `vX.Y.Z` tag, and publishes the GitHub release.

## Memorial and content standards

- Treat Meshari's memory and all Islamic content with care and respect.
- Cite authentic sources for Quran, hadith, and supplications.
- Do not introduce advertising, tracking, or unrelated commercial content.
- Preserve multilingual, RTL, accessibility, privacy, and mobile behavior.
- Never commit credentials or private personal information.
