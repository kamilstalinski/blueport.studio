## BluePort Studio – strony, sklepy, reklamy i AI

Strona studia BluePort Studio: Next.js 16 (App Router), TypeScript, Tailwind CSS. Formularz kontaktowy wysyła maile przez Resend (`/api/contact`).

### Uruchomienie

- `npm ci`
- `npm run dev`

### Testy

- `npm test`: testy jednostkowe (Vitest)
- `npm run test:e2e`: testy e2e (Playwright)
- `npm run test:visual`: testy wizualne w obrazie Dockera Playwrighta (jak na CI)

### Deploy

`npm run deploy` (`main` → `prod`), szczegóły w [docs/DEPLOY.md](docs/DEPLOY.md). Standardy kodu: [docs/CODING_STANDARDS.md](docs/CODING_STANDARDS.md).
