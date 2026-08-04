# Contributing

Thank you for helping improve Meshari's Continuous Charity. This is a memorial project, so every contribution must remain respectful, accurate, accessible, and aligned with its charitable purpose.

## Branch flow

| Branch | Purpose |
| --- | --- |
| `sandbox` | Default integration branch. Open feature PRs here only. Vercel **Preview** deploys for this branch only (stable alias: [sandbox.meshari.charity](https://sandbox.meshari.charity); not for feature branches). |
| `main` | Production branch for [meshari.charity](https://meshari.charity), Release Please, and GitHub Releases. |

1. Create your feature branch from `sandbox` (`git fetch origin && git checkout -b my-change origin/sandbox`).
2. Open a pull request **into `sandbox`** and wait for CI (quality + security). Preview deploys come from the `sandbox` branch after merge (or from pushes to `sandbox`), not from every feature branch.
3. When sandbox is stable, promote with a **conventional** PR title into `main` (see [Promoting to production](#promoting-to-production)).
4. After the feature branch is fully merged and no follow-up work remains on it, delete the remote and local feature branch. Never delete `sandbox` or `main`.

Do **not** rebase or sync `main` → `sandbox` after a release. Promote once when ready; Release Please versions on `main`. An automated workflow (`.github/workflows/sync-release-to-sandbox.yml`) opens a small PR that copies only `package.json`, `CHANGELOG.md`, and `.release-please-manifest.json` onto sandbox — merge that when it appears; do not rebase the full `main` history into sandbox.

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
   npm audit --audit-level=high
   ```

5. Commit using [Conventional Commits](https://www.conventionalcommits.org/) (enforced locally by commitlint via Husky when hooks are installed):

   ```text
   fix: correct a broken link
   feat: add a new accessible section
   docs: improve contributor guidance
   ```

   Prefer conventional **pull request titles** as well (enforced by CI on PRs to `sandbox`/`main`) when squash-merging, so Release Please can classify the landed commit once it reaches `main`.

6. Open a pull request into `sandbox` describing the change and how it was verified.
7. After merge, delete the feature branch (`gh pr merge` with delete-branch, or `git push origin --delete <branch>` / `git branch -d <branch>`). Keep `sandbox` and `main`.

## Promoting to production

Promote only when sandbox is green and ready for [meshari.charity](https://meshari.charity):

```bash
./scripts/promote-sandbox-to-main.sh fix "ship CSP and CI hardening"
# or
./scripts/promote-sandbox-to-main.sh feat "add new locale support"
```

Equivalent `gh` form:

```bash
gh pr create --base main --head sandbox \
  --title "fix: promote sandbox to production" \
  --body "Promote sandbox integration lane."
```

Rules:

- PR title **must** start with `fix:` or `feat:` (optionally `fix(scope):` / `feat(scope):`). Bare titles like `Promote sandbox…` are not conventional and block Release Please from opening a useful release.
- Prefer squash or merge commit with that conventional title/message.
- One full CI run on the promote PR is required. Promote lands commits on `main` for Release Please — **production deploy happens when the Release Please PR merges** (configure Vercel Ignored Build Step to `bash scripts/vercel-ignore-build.sh` so promote does not double-deploy).

## Release policy

Releases follow Semantic Versioning and are automated with Release Please on `main`:

- `fix:` produces a **patch** bump and is batched into the open release PR.
- `feat:` produces a **minor** bump and is batched into the same release PR until it is merged.
- A commit containing `BREAKING CHANGE:` produces a **major** release.
- `docs:`, `chore:`, `ci:`, and `test:` are included where relevant but do not normally trigger a version bump by themselves.

Release Please maintains one release pull request on `main`. Merging it updates `CHANGELOG.md` and `package.json`, creates a `vX.Y.Z` tag, publishes the GitHub release, and (with the Ignored Build Step) is the **sole** production deploy for that release. Do not ship production changes without that release notes path. Do not push version tags by hand unless recovering a failed automation run.

### After a release

Release Please bumps version files on `main` only. Do **not** rebase `main` into `sandbox` or open a full main→sandbox sync for routine releases.

Instead, `.github/workflows/sync-release-to-sandbox.yml` opens (or updates) a PR that copies **only**:

- `package.json`
- `CHANGELOG.md`
- `.release-please-manifest.json`

Merge that version-sync PR when CI is green. Feature work on sandbox continues from the integration tip; the next promote carries whatever is ready for production.

## CI

Pull requests targeting `sandbox` or `main` run:

| Job | What |
| --- | --- |
| **Preflight** | Skips duplicate `push` runs when the same content already passed on `pull_request`; marks Release Please / version-sync PRs that only touch version files |
| **Dependency review** | GitHub Dependency Review on pull requests (fails on high/critical advisories) |
| **Security** | `npm audit --audit-level=high` (fails on high/critical) and gitleaks secret scan |
| **Quality** | lint, type-check, Playwright e2e (includes axe a11y smoke), production build — short-circuited for version-only PRs |
| **PR title** | Separate workflow: Conventional Commits title via `amannn/action-semantic-pull-request` |
| **PR labeler** | Path labels from `.github/labeler.yml` plus type labels from the PR title prefix (`feat` → enhancement, `fix` → bug, …). Separate from Release Please version tags |

Feature PRs → `sandbox`: one full CI path on the PR. After merge, the follow-up `push` run is detected as a duplicate and no-ops so required checks stay green without re-linting / re-testing. Promote PRs → `main`: same pattern. Version-only Release Please / sync PRs skip the heavy quality matrix.

Locally, Husky runs `commitlint` on commit messages and `lint-staged` (eslint on staged JS/TS only) — not a full-repo lint.

### Dependabot

Dependabot PRs target **`sandbox`**, not `main`. Review and merge them like other integration-lane changes after Security + Quality CI are green. See [SECURITY.md](./SECURITY.md) for the full Security CI matrix.

## Memorial and content standards

- Treat Meshari's memory and all Islamic content with care and respect.
- Cite authentic sources for Quran, hadith, and supplications.
- Do not introduce advertising, tracking, or unrelated commercial content.
- Preserve multilingual, RTL, accessibility, privacy, and mobile behavior.
- Never commit credentials or private personal information.
- Do not add emoji-heavy marketing copy to documentation; prefer plain text and icon badges.
