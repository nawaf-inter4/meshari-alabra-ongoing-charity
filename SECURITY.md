# Security Policy

## Reporting a vulnerability

Please do not disclose security vulnerabilities in a public issue.

Use GitHub's private vulnerability reporting feature for this repository when available. Include the affected component, reproduction steps, impact, and any suggested mitigation. If private reporting is unavailable, contact the repository owner through their GitHub profile without including exploit details publicly.

You should receive an acknowledgment as soon as practical. Confirmed issues will be prioritized based on impact to visitors, privacy, content integrity, and donation links.

## Supported versions

The latest production release and the current `main` branch receive security fixes. Older releases may not receive patches.

## Scope

Reports involving exposed secrets, cross-site scripting, unsafe redirects, compromised external links, dependency vulnerabilities with a practical impact, or unauthorized changes to religious or donation content are especially important.

## Automated checks

Every pull request targeting `sandbox` or `main` runs Security CI:

| Check | What |
| --- | --- |
| **Dependency review** | GitHub `dependency-review-action` on `pull_request` (fails on high/critical) |
| **npm audit** | `npm audit --audit-level=high` |
| **gitleaks** | Secret scanning with `.gitleaks.toml` |

### Dependabot

Dependabot opens routine npm and GitHub Actions update PRs against **`sandbox`** (see `.github/dependabot.yml`), so dependency bumps go through the integration lane before production. Production and development dependencies are grouped; selected major upgrades are ignored so they can be handled in dedicated PRs.

HTTP security headers and CSP posture are documented in [docs/SECURITY-HEADERS.md](./docs/SECURITY-HEADERS.md).
