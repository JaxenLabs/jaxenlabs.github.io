# JaxenLabs website

Next.js 16 + React 19 + Tailwind CSS 4 + TypeScript, exported as static HTML
and hosted free on GitHub Pages at **https://jaxenlabs.github.io**.

## Pages

| URL | What |
|---|---|
| `/` | Studio home, lists every app |
| `/jaxbudget/` | JaxBudget home page |
| `/jaxbudget/privacy-policy/` | JaxBudget Privacy Policy |
| `/jaxbudget/terms/` | JaxBudget Terms & Conditions |

## Run locally

```
npm install
npm run dev        # http://localhost:3000
npm run build      # writes the static site to out/
```

## Publish (first time)

1. Create a **public** repo named exactly `jaxenlabs.github.io` in the JaxenLabs account.
2. Push this folder to its `main` branch.
3. Repo **Settings > Pages > Source: GitHub Actions**.
4. Every push to `main` now rebuilds and publishes the site (see `.github/workflows/deploy.yml`).

## Edit content

All text lives in `src/content/`. Pages only render it.

- Studio details (name, email): `src/content/site.ts`
- An app's home page: `src/content/apps/<app>/index.ts`
- Its legal text: `src/content/apps/<app>/privacy.ts` and `terms.ts`

The JaxBudget legal text is copied from the app (`legal_content.dart`).
When one changes, change the other and the effective date.

## Add another app

1. Copy `src/content/apps/jaxbudget/` to `src/content/apps/<newapp>/` and edit it.
2. Add it to the list in `src/content/apps/index.ts`.
3. Put its icon at `public/<newapp>/icon.png`.

Its three pages are generated automatically.

## Google Search Console

Download the `googleXXXX.html` verification file and put it in `public/`.
It is published at the site root.
