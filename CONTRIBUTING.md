# Contributing

Thank you for helping improve Meshari's Continuous Charity. This is a memorial project, so every contribution must remain respectful, accurate, accessible, and aligned with its charitable purpose.

## Branch flow

| Branch | Purpose |
| --- | --- |
| `sandbox` | Default integration branch. Open feature PRs here first. This is the default branch for the Vercel **Sandbox** environment (non-production). |
| `main` | Production branch for [meshari.charity](https://meshari.charity), Release Please, and GitHub Releases. |

1. Create your feature branch from `sandbox`.
2. Open a pull request into `sandbox` and verify the Sandbox deployment.
3. When sandbox is stable, open a pull request from `sandbox` into `main` to promote; `sandbox` is branch-protected and must not be deleted (feature branches still auto-delete on merge).
4. After the feature branch is fully merged and no follow-up work remains on it, delete the remote and local feature branch.

## Development workflow

1. Fork the repository and branch from `sandbox`.
2. Install dependencies with `npm ci --legacy-peer-deps`.
3. Make a small, documented change.
4. Run the quality checks:

   ```bash
   npm run lint
   npm run type-check
   npm run test:e2e
   npm run build
   ```

5. Commit using [Conventional Commits](https://www.conventionalcommits.org/):

   ```text
   fix: correct a broken link
   feat: add a new accessible section
   docs: improve contributor guidance
   ```

   Prefer conventional **pull request titles** as well when squash-merging, so Release Please can classify the landed commit.

6. Open a pull request describing the change and how it was verified.
7. After merge, delete the feature branch (`gh pr merge` with delete-branch, or `git push origin --delete <branch>` / `git branch -d <branch>`). Keep `sandbox` and `main`.

## Release policy

Releases follow Semantic Versioning and are automated with Release Please on `main`:

- `fix:` produces a **patch** bump and is batched into the open release PR.
- `feat:` produces a **minor** bump and is batched into the same release PR until it is merged.
- A commit containing `BREAKING CHANGE:` produces a **major** release.
- `docs:`, `chore:`, `ci:`, and `test:` are included where relevant but do not normally trigger a version bump by themselves.

Release Please maintains one release pull request on `main`. Merging it updates `CHANGELOG.md` and `package.json`, creates a `vX.Y.Z` tag, and publishes the GitHub release. Do not push version tags by hand unless recovering a failed automation run.

## Memorial and content standards

- Treat Meshari's memory and all Islamic content with care and respect.
- Cite authentic sources for Quran, hadith, and supplications.
- Do not introduce advertising, tracking, or unrelated commercial content.
- Preserve multilingual, RTL, accessibility, privacy, and mobile behavior.
- Never commit credentials or private personal information.
- Do not add emoji-heavy marketing copy to documentation; prefer plain text and icon badges.
