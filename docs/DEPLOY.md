# Deploy na Hetzner

Push to `prod` (`npm run deploy` merges `main` → `prod`) runs `.github/workflows/deploy.yml`:
tests and e2e, then the `deploy` job builds the app in CI with `output: "standalone"`, uploads
`release.tar.gz` over SSH and runs [`deploy/release.sh`](../deploy/release.sh) on the server.
That script unpacks the release, points `/srv/blueport/current` at it, restarts the service and
rolls back automatically if `http://127.0.0.1:3000/` does not answer within ~30 s.

The server only runs Node; nothing is built there and no `npm ci` runs there.

```
Internet ─▶ Caddy :443 (TLS, Let's Encrypt) ─▶ node server.js 127.0.0.1:3000 (systemd: blueport)
/srv/blueport/
  .env                 runtime secrets (chmod 600)
  current -> releases/<sha>
  releases/<sha>/      last 5 releases
```

## Environment variables

Read at runtime only (the build needs none). Template: [`deploy/env.example`](../deploy/env.example).

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | yes | Resend API key for `/api/contact` |
| `RESEND_FROM` | yes | Sender, on a domain verified in Resend, e.g. `Blueport Studio <kontakt@blueport.studio>` |
| `NOTIFICATION_EMAIL` | yes, unless `OWNER_EMAIL` is set | Inbox for contact-form notifications |
| `OWNER_EMAIL` | no | Overrides `NOTIFICATION_EMAIL` when set |

`PORT`, `HOSTNAME` and `NODE_ENV` are set in the systemd unit.

## GitHub secrets (Settings → Secrets → Actions)

| Secret | Value |
|---|---|
| `SERVER_IP` | Server IP or hostname |
| `SERVER_USER` | `deploy` |
| `SSH_PRIVATE_KEY` | Private half of a key made only for deploys (no passphrase) |
| `SSH_KNOWN_HOSTS` | Output of `ssh-keyscan -t ed25519 <SERVER_IP>`, checked against the server's fingerprint |

The `RESEND_*`, `NOTIFICATION_EMAIL` and `SUPABASE_*` repository secrets are no longer used by
the workflow; the app's runtime values live in `/srv/blueport/.env` on the server.

## Server setup (once)

Ubuntu 24.04 on an **x86_64** Hetzner server (CX/CPX, not the ARM CAX line: the bundle ships
the linux-x64 `sharp` binary built on the GitHub runner). As root:

```bash
# Node 22 (same major as CI) and Caddy
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt-get install -y nodejs caddy curl
ufw allow OpenSSH && ufw allow 80,443/tcp && ufw enable

# deploy user, allowed to restart only this service
adduser --disabled-password --gecos "" deploy
install -d -o deploy -g deploy -m 700 /home/deploy/.ssh
echo "<public half of SSH_PRIVATE_KEY>" > /home/deploy/.ssh/authorized_keys
chown deploy:deploy /home/deploy/.ssh/authorized_keys && chmod 600 /home/deploy/.ssh/authorized_keys
echo "deploy ALL=(root) NOPASSWD: /usr/bin/systemctl restart blueport" > /etc/sudoers.d/blueport
chmod 440 /etc/sudoers.d/blueport

# app directories and secrets
install -d -o deploy -g deploy /srv/blueport /srv/blueport/releases
install -o deploy -g deploy -m 600 /dev/null /srv/blueport/.env   # then fill it in from deploy/env.example

# service and proxy: copy deploy/blueport.service and deploy/Caddyfile from the repo
cp blueport.service /etc/systemd/system/blueport.service
cp Caddyfile /etc/caddy/Caddyfile
systemctl daemon-reload && systemctl enable blueport
systemctl reload caddy
```

DNS: `A` (and `AAAA` if used) records for `blueport.studio` and `www.blueport.studio` pointing
at the server. Caddy issues the certificates once DNS resolves to it.

The old setup (`~/blueport.studio` checkout run by PM2 as `blueport`) can be stopped after the
first successful deploy: `pm2 delete blueport && pm2 save` as its user.

## First deploy

1. Server setup above done, `/srv/blueport/.env` filled in, GitHub secrets set.
2. `npm run deploy` (or push `main` to `prod`).
3. Watch the `Deploy na Hetzner` job. It ends with `Deployed <sha>`.
4. On the server: `systemctl status blueport`, `journalctl -u blueport -n 50`.
5. Check `https://blueport.studio`, a redirect (`/uslugi` → `/oferta`, 308) and send the contact form.
6. Vercel: once Hetzner serves the domain, stop Vercel production deploys from `main`
   (keep PR previews) so two production copies do not drift apart.

## Rollback

Automatic: a release that does not answer on port 3000 is switched back to the previous one
and the job fails.

Manual, to any of the last five releases (as `deploy`):

```bash
ls -1t /srv/blueport/releases/                       # newest first; names are commit SHAs
ln -sfn /srv/blueport/releases/<sha> /srv/blueport/current
sudo systemctl restart blueport
```

Then fix forward or `git revert` on `prod`, otherwise the next push redeploys the bad commit.

## Changing secrets

Edit `/srv/blueport/.env`, then `sudo systemctl restart blueport`. No rebuild needed.
