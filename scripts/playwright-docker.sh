#!/usr/bin/env bash
# Runs Playwright inside the official Linux image (same as CI) so screenshots are comparable byte for byte.
# Linux node_modules and .next live in named volumes so they never mix with the host's macOS builds.
# --workers=1: running visual specs concurrently lets Chromium's renderer processes contend for the
# same CPU/GPU, which shows up as font hinting/antialiasing jitter between runs; serial execution
# removes that source of pixel diffs. Stability matters more than speed for this parity gate.
set -euo pipefail

PW_VERSION="$(node -p "require('./node_modules/@playwright/test/package.json').version")"

docker run --rm --ipc=host \
  -v "$PWD":/work -w /work \
  -v blueport-pw-node-modules:/work/node_modules \
  -v blueport-pw-next:/work/.next \
  -e CI=1 -e PW_SERVER=prod -e PW_PORT=3100 \
  -e NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321 \
  -e SUPABASE_SERVICE_ROLE_KEY=ci-dummy \
  -e RESEND_API_KEY=re_ci_dummy \
  -e "RESEND_FROM=Blueport <ci@example.com>" \
  -e NOTIFICATION_EMAIL=ci@example.com \
  "mcr.microsoft.com/playwright:v${PW_VERSION}-noble" \
  bash -c 'npm ci --no-audit --no-fund && npm run build && npx playwright test --workers=1 "$@"' _ "$@"
