#!/usr/bin/env bash
# Runs on the server (piped over SSH by .github/workflows/deploy.yml):
# unpacks releases/<sha>.tar.gz, points `current` at it, restarts, and rolls back if the app does not answer.
set -euo pipefail
SHA="$1"
APP=/srv/blueport
REL="$APP/releases/$SHA"
PREV="$(readlink "$APP/current" || true)"

mkdir -p "$REL"
tar -xzf "$REL.tar.gz" -C "$REL"
rm "$REL.tar.gz"

ln -sfn "$REL" "$APP/current"
sudo systemctl restart blueport

for _ in $(seq 1 15); do
  if curl -fsS -o /dev/null http://127.0.0.1:3000/; then
    echo "Deployed $SHA"
    # Keep the five newest releases for manual rollback.
    ls -1dt "$APP"/releases/*/ | tail -n +6 | xargs -r rm -rf
    exit 0
  fi
  sleep 2
done

echo "Health check failed; rolling back to ${PREV:-nothing}" >&2
if [ -n "$PREV" ]; then
  ln -sfn "$PREV" "$APP/current"
  sudo systemctl restart blueport
fi
exit 1
