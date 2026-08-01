#!/usr/bin/env bash
# Promote sandbox → main with a conventional PR title so Release Please
# can open/publish the next patch or minor release.
#
# Usage:
#   ./scripts/promote-sandbox-to-main.sh
#   ./scripts/promote-sandbox-to-main.sh feat "ship locale polish and CSP fixes"
#   ./scripts/promote-sandbox-to-main.sh fix "correct referrer policy override"
#
# First argument must be feat or fix (default: fix).
# Remaining args form the summary (default: promote sandbox to production).

set -euo pipefail

TYPE="${1:-fix}"
shift || true
SUMMARY="${*:-promote sandbox to production}"

case "$TYPE" in
  feat|fix) ;;
  *)
    echo "error: type must be 'feat' or 'fix' (got '$TYPE')" >&2
    echo "usage: $0 [feat|fix] [summary...]" >&2
    exit 1
    ;;
esac

TITLE="${TYPE}: ${SUMMARY}"

if ! command -v gh >/dev/null 2>&1; then
  echo "error: GitHub CLI (gh) is required" >&2
  exit 1
fi

git fetch origin sandbox main

echo "Creating promote PR: $TITLE"
gh pr create \
  --base main \
  --head sandbox \
  --title "$TITLE" \
  --body "$(cat <<EOF
## Summary
- Promote the current \`sandbox\` integration lane to production (\`main\`).
- Conventional title (\`${TYPE}:\`) so Release Please can batch a patch/minor release after merge.

## Test plan
- [ ] CI (quality + security) is green on this PR
- [ ] Sandbox Vercel deployment looks correct
- [ ] After merge, confirm Release Please opens or updates the release PR on \`main\`
- [ ] Do **not** sync \`main\` → \`sandbox\` after release; sandbox stays the integration tip
EOF
)"
