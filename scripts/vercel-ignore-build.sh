#!/usr/bin/env bash
# Vercel "Ignored Build Step" helper.
# Exit 0 = skip build/deploy · Exit 1 = continue build/deploy
#
# Set Project → Git → Ignored Build Step to:
#   bash scripts/vercel-ignore-build.sh
#
# Policy:
# - sandbox: always build (Preview)
# - main: build only for Release Please merges (`chore: release v*`)
# - everything else: skip (feature branches already disabled in vercel.json)

set -euo pipefail

REF="${VERCEL_GIT_COMMIT_REF:-}"
MSG="${VERCEL_GIT_COMMIT_MESSAGE:-}"

# Normalize newlines; Release Please squash titles often include "(#N)".
MSG_ONE_LINE="$(printf '%s' "$MSG" | tr '\n' ' ')"

if [[ "$REF" == "sandbox" ]]; then
  echo "▶ Build: sandbox preview"
  exit 1
fi

if [[ "$REF" == "main" ]]; then
  # Match `chore: release v1.2.0` and optional scope / PR suffix.
  release_re='^chore(\([^)]*\))?: release v[0-9]'
  if [[ "$MSG_ONE_LINE" =~ $release_re ]]; then
    echo "▶ Build: production release — $MSG_ONE_LINE"
    exit 1
  fi
  echo "⏭ Skip: main commit is not a Release Please publish — $MSG_ONE_LINE"
  exit 0
fi

echo "⏭ Skip: branch '$REF' is not sandboxed for Vercel builds"
exit 0
