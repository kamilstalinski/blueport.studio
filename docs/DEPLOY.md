# Deploy na Hetzner

`npm run deploy` merges `main` → `prod` and pushes. The push runs `.github/workflows/deploy.yml`:
tests and e2e, then the `deploy` job SSHes to the server and runs, in `~/blueport.studio`:

```bash
git pull origin prod && npm ci && npm run build && pm2 restart blueport
```

The server keeps a git checkout of this repo and builds it there; PM2 runs it as `blueport`.

## Environment variables

Runtime only (the build needs none), in `~/blueport.studio/.env` on the server:

| Variable | Required | Purpose |
|---|---|---|
| `RESEND_API_KEY` | yes | Resend API key for `/api/contact` |
| `RESEND_FROM` | yes | Sender on a domain verified in Resend, e.g. `Blueport Studio <kontakt@blueport.studio>` |
| `NOTIFICATION_EMAIL` | yes, unless `OWNER_EMAIL` is set | Inbox for contact-form notifications |
| `OWNER_EMAIL` | no | Overrides `NOTIFICATION_EMAIL` |

After changing `.env`: `pm2 restart blueport`.

## GitHub secrets

`SERVER_IP`, `SERVER_USER`, `SSH_PRIVATE_KEY`. The `RESEND_*`, `NOTIFICATION_EMAIL` and
`SUPABASE_*` repository secrets are not used by the workflow.

## Server setup (already done; for a new server)

Node 22, PM2, a reverse proxy with TLS in front of port 3000, then as `SERVER_USER`:

```bash
git clone https://github.com/kamilstalinski/blueport.studio.git ~/blueport.studio
cd ~/blueport.studio && git checkout prod
# create .env (table above)
npm ci && npm run build
pm2 start npm --name blueport -- start && pm2 save
```

## Rollback

Preferred: `git revert` the bad commit on `main`, then `npm run deploy`.

Fast, on the server (the next deploy fast-forwards back to `prod`):

```bash
cd ~/blueport.studio
git log --oneline -5 origin/prod
git reset --hard <good-sha>
npm ci && npm run build && pm2 restart blueport
```
