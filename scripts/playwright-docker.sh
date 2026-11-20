#!/usr/bin/env bash
# Runs Playwright inside the official Linux image (same as CI) so screenshots are comparable byte for byte.
# --platform linux/amd64: CI (`runs-on: ubuntu-latest`) is x64. Skia/font antialiasing differ between
# arm64 and amd64, so baselines must be rendered under emulation on an arm64 dev machine (this repo's
# Macs) to match what CI will actually produce. The node_modules/.next volumes are suffixed -amd64 so
# they never mix with an arm64 install from a previous version of this script.
# --workers=1: running visual specs concurrently lets Chromium's renderer processes contend for the
# same CPU/GPU, which shows up as font hinting/antialiasing jitter between runs; serial execution
# removes that source of pixel diffs. Stability matters more than speed for this parity gate.
set -euo pipefail

PW_VERSION="$(node -p "require('./node_modules/@playwright/test/package.json').version")"

docker run --rm --ipc=host --platform linux/amd64 \
  -v "$PWD":/work -w /work \
  -v blueport-pw-node-modules-amd64:/work/node_modules \
  -v blueport-pw-next-amd64:/work/.next \
  -e CI=1 -e PW_SERVER=prod -e PW_PORT=3100 \
  -e NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321 \
  -e SUPABASE_SERVICE_ROLE_KEY=ci-dummy \
  -e RESEND_API_KEY=re_ci_dummy \
  -e "RESEND_FROM=Blueport <ci@example.com>" \
  -e NOTIFICATION_EMAIL=ci@example.com \
  "mcr.microsoft.com/playwright:v${PW_VERSION}-noble" \
  bash -c 'npm ci --no-audit --no-fund && npm run build && npx playwright test --workers=1 "$@"' _ "$@"
