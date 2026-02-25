# AGENTS.md

## Cursor Cloud specific instructions

This is a **Next.js (App Router) marketing website** for BluePort Studio — a single-service TypeScript project with no database, Docker, or external dependencies.

### Key commands

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (port 3000) |
| Build | `npm run build` |
| Lint | `npx eslint src --ext .ts,.tsx` |
| Format | `npm run format` |

### Notes

- **No test framework** is configured (no Jest, Vitest, Playwright, or Cypress). Manual/browser testing is the only option.
- **ESLint uses flat config** (`eslint.config.mjs`) with `typescript-eslint`. The `npm run lint` script uses `--ext` flags which are ignored by flat config; run `npx eslint src --ext .ts,.tsx` directly for consistent results.
- All content is static/hardcoded in TypeScript and `src/messages/pl.json` (Polish). No i18n library is used.
- The `/api/contact` endpoint is referenced in the calculator form but the route file does not exist — form submissions will 404. This is a known gap, not a bug you introduced.
- The project uses **npm** (lockfile: `package-lock.json`).
