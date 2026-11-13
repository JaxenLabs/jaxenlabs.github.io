# Jaxen Labs website

The website of **Jaxen Labs**, a technology and software company. It presents the company, its products and each product's privacy policy and terms.

- **Live site:** https://jaxenlabs.github.io
- **Built with:** [Next.js](https://nextjs.org) 16, [React](https://react.dev) 19, [Tailwind CSS](https://tailwindcss.com) 4 and [TypeScript](https://www.typescriptlang.org)
- **Hosted on:** GitHub Pages (free). Every push to `main` publishes the site automatically.

New to the project? Read sections 1 to 4 in order. Afterwards, sections 5 and 6 are recipes and rules you can come back to.

---

## 1. Run it on your computer

You need **[Node.js](https://nodejs.org) 22** or newer (it includes `npm`).

```bash
npm install          # once: downloads the libraries into node_modules/
npm run dev          # starts the site at http://localhost:3000 and reloads on every save
```

Other commands:

| Command | What it does |
|---|---|
| `npm run dev` | Development server at http://localhost:3000. Use this while editing. |
| `npm run build` | Builds the final website into the `out/` folder. Also checks types. |
| `npm start` | Serves the built `out/` folder, to preview exactly what will be published. |
| `npm run typecheck` | Checks the TypeScript for mistakes without building. |
| `npm run lint` | Checks the code for mistakes and risky patterns with ESLint (official Next.js rules). |
| `npm run check` | Runs typecheck, lint and build in one go. **Run this before every publish.** |
| `npm run update:play` | Copies the latest Google Play title, descriptions and download counts for every product (see recipe 5.3). |

---

## 2. How the site works

```
 src/content/   →   src/app/ + src/components/   →   out/ (plain HTML)   →   GitHub Pages
 the WORDS          the PAGES that show them         built by npm run build   the live site
```

- **All text lives in `src/content/`.** Pages never contain product wording; they read it from there. To change what the site *says*, edit `src/content/`. To change how it *looks*, edit `src/app/` or `src/components/`.
- **The site is "static".** `npm run build` turns every page into a ready-made HTML file in `out/`. No server runs code when someone visits, which is why free GitHub Pages can host it.
- **Two designs, one code base.** Below 1024px (phones and tablets) the site behaves like a native **app**: a compact app bar with a back button, a bottom tab bar (Home · Products · Services · Contact), a Products bottom sheet, swipeable rows, grouped lists and no website footer. From 1024px up it is the **desktop website**. Large screens and TVs scale up automatically. Tailwind prefixes control this: no prefix = phone first, `sm:` from 640px, `lg:` from 1024px, `max-sm:` phones only.
- **Products drive the pages.** Each product folder in `src/content/apps/` produces its own pages automatically. You never create a page file per product.

---

## 3. Folder map

```
.github/workflows/deploy.yml   Builds and publishes the site on every push to main
scripts/
  update-play-listings.mjs     `npm run update:play`: copies Google Play listings into store.ts files
public/                        Files served as-is at the site root
  logo.png                     Company logo (transparent, 512×512)
  og.png                       Preview image shown when the site is shared (1200×630)
  icon-512.png                 Home-screen icon used by the web manifest
  <product>/icon.png           Each product's icon (512×512)
  google88897a4d8dc2d04e.html  Google Search Console verification. Do not delete
src/
  app/                         PAGES. Each folder is a web address (this is the Next.js "App Router")
    layout.tsx                 The frame around every page: header, footer, fonts, theme, metadata
    page.tsx                   Home page  →  /
    globals.css                Colours (dark and light), animations and shared styles
    contact/page.tsx           Contact page  →  /contact/
    [slug]/page.tsx            Product page  →  /babyshop/, /jaxbudget/, … (one per product)
    [slug]/privacy-policy/     Privacy Policy page for each product that has one
    [slug]/terms/              Terms page for each product that has them
    not-found.tsx              The 404 page
    sitemap.ts, robots.ts      Files that tell search engines what to read
    manifest.ts                Name and icon used when the site is added to a phone's home screen
    icon.png, favicon.ico,     Browser-tab and home-screen icons (made from the logo)
    apple-icon.png
  components/                  Reusable building blocks. Key ones:
    SiteHeader.tsx             Top bar (desktop nav / app bar); AppBarTitle.tsx adds the app back button
    BottomNav.tsx              App tab bar and Products sheet (phones and tablets)
    SiteFooter.tsx             Website footer (desktop only)
    SolarSystem.tsx            Home hero: logo with every product on its orbit
    Effects.tsx                Scroll reveals, card spotlight, progress bar, back-to-top
  content/                     THE WORDS
    site.ts                    Company name, tagline, description, email, Facebook link
    company.ts                 Home page text: values, "What we engineer", tech list, "How we work"
    types.ts                   The "shape" every piece of content must have (see 2.)
    apps/index.ts              The list of products and their order on the site
    apps/<slug>/index.ts       One product: name, features, links, icon
    apps/<slug>/store.ts       Its Google Play listing. GENERATED, do not edit
    apps/<slug>/privacy.ts     Its Privacy Policy (own products only)
    apps/<slug>/terms.ts       Its Terms (if it has them)
  lib/seo.ts                   Helpers for search engines (page descriptions, share cards, structured data)
```

---

## 4. Words you'll meet in the code

| Word | Meaning |
|---|---|
| **Component** | A reusable piece of the page written as a function that returns HTML-like code (JSX), e.g. `<SiteHeader />`. |
| **JSX** | The HTML-looking code inside `.tsx` files. `className` is the JSX name for HTML's `class`. |
| **Tailwind class** | Short style names in `className`, e.g. `mt-6` (margin-top), `text-muted` (our grey text colour), `sm:` (from small screens up). |
| **Slug** | The short URL name of a product, e.g. `jaxscan` → `/jaxscan/`. |
| **`[slug]` folder** | A placeholder in `src/app/`: one page file builds a page for every product. |
| **`"use client"`** | Marks a component that runs in the visitor's browser because it reacts to clicks or scrolling (theme switch, menu, copy button, animations). Everything else is turned into HTML at build time. |
| **Hydration** | When the browser's JavaScript takes over the ready-made HTML. "Hydration mismatch" means the two disagree (see Troubleshooting). |
| **Metadata / SEO** | Page titles, descriptions and share images that search engines and social apps read. |
| **JSON-LD** | Hidden structured data (in `src/lib/seo.ts`) that tells search engines "this is a company, this is an app, this is its logo". |

---

## 5. Recipes

### 5.1 Change the company name, email, tagline or Facebook link
Edit `src/content/site.ts`. Every page, title and footer updates.

### 5.2 Change the home page text
Edit `src/content/company.ts` (values, "What we engineer", tech list, "How we work"). The big headline is in `src/app/page.tsx`.
Only list skills and tools that our products really use.

### 5.3 Update product descriptions and download counts from Google Play
1. Change the listing in **Google Play Console** first, if needed.
2. Run `npm run update:play`.
3. Check the result with `npm run dev`, then publish (recipe 5.9).

This rewrites every `src/content/apps/<slug>/store.ts`, including the download counts behind "Total users" on the home page. Never edit `store.ts` by hand: your changes would be lost on the next update.

### 5.4 Add a new product
1. **Create a folder** `src/content/apps/<slug>/`. The slug is lowercase with no spaces, e.g. `jaxnotes`. It becomes the address `/jaxnotes/`, so never change it later.
2. **Add the icon** at `public/<slug>/icon.png` (square, 512×512).
3. **Create `index.ts`.** The easiest way is to copy another product's `index.ts` and edit it:
   - our own product → copy `jaxscan/index.ts`
   - a client project → copy `babyshop/index.ts` and set `client: "Client Name"`
   - set `slug`, `name`, `iconSrc`, `playStoreUrl`, `category`, `keywords` and six `features` (icons are listed in `IconName` in `types.ts`)
4. **Generate `store.ts`** by running `npm run update:play` (it uses the `playStoreUrl`).
5. **Legal pages** (own products only): add `privacy.ts` (and `terms.ts` if the app has terms), copying the text **word for word** from the app. Copy the format of `jaxscan/privacy.ts`. Add `privacy` and `terms` to the object in `index.ts`.
6. **Add it to the list** in `src/content/apps/index.ts`. The position in the list is its position on the site.

The product page, policy pages, menu entry, footer links, sitemap entry and solar-system planet all appear automatically.
The solar system has room for **4** products. A 5th would need another place in `PLACES` in `src/components/SolarSystem.tsx`.

### 5.5 Update a privacy policy or terms
The website copy must match the text **inside the app**, word for word.
1. Change the text in the app first.
2. Copy the same wording into `src/content/apps/<slug>/privacy.ts` or `terms.ts`.
3. Update `effectiveDate` to the app's date.

Use `p("…")` for a paragraph and `ul("…", "…")` for a bullet list. `**text**` makes text bold, and web links and email addresses become clickable automatically.

### 5.6 Change colours or the dark/light themes
All colours are defined once, as "tokens", at the top of `src/app/globals.css`: one set for dark mode and one for light mode. Change a token (e.g. `--accent`) and every button, link and glow updates. The `@theme inline` block below them turns the tokens into Tailwind classes such as `bg-accent` and `text-muted`.

### 5.7 Change the logo
These files are all made from the same logo:

| File | Size | Notes |
|---|---|---|
| `public/logo.png` | 512×512 | Transparent background, logo centred |
| `src/app/icon.png` | 192×192 | Browser tab and Google results (Google wants multiples of 48px) |
| `src/app/favicon.ico` | 16, 32, 48, 96 | Classic favicon. Any favicon generator can make it from `logo.png` |
| `src/app/apple-icon.png` | 180×180 | iPhone home screen. White background, logo inset |
| `public/icon-512.png` | 512×512 | Android home screen. White background, logo inset |
| `public/og.png` | 1200×630 | Preview image when the site is shared |

### 5.8 Change the share preview image (`public/og.png`)
It is a regular 1200×630 PNG. Make it in any design tool and replace the file.

### 5.9 Publish
```bash
npm run check                 # typecheck + lint + build: must finish without errors
git add -A
git commit -m "Describe your change"
git push origin main
```
GitHub builds and publishes the site in about one minute. You can watch progress in the repository's **Actions** tab. The workflow is `.github/workflows/deploy.yml`.

---

## 6. Rules that matter

1. **Never change JaxBudget's addresses.** `/jaxbudget/`, `/jaxbudget/privacy-policy/` and `/jaxbudget/terms/` are registered in **Google Cloud** for JaxBudget's Google Drive sign-in. Keep the "How JaxBudget uses your Google account" section on its page.
2. **Legal text is copied, never rewritten.** Privacy policies and terms must match the apps word for word.
3. **Client projects stay labelled.** Products published by someone else (like Baby Shop) keep `client` set and have no policy pages here.
4. **Only true claims.** Features, capabilities and numbers must reflect what the products really do. Download counts come from Google Play via `npm run update:play`.
5. **Design for every screen.** Each change must look right on a phone (~390px), tablet (~820px), desktop (1440px) and TV (3840px). Phones and tablets should feel like an app; desktop keeps the website design.
6. **Keep the Search Console file.** `public/google88897a4d8dc2d04e.html` proves to Google that we own the site.

---

## 7. Troubleshooting

| Problem | Fix |
|---|---|
| **"Hydration mismatch"** error in the browser after editing a component | The browser is using an old copy. Stop `npm run dev`, delete the `.next` folder, start it again and refresh the page. |
| **`EPERM: operation not permitted, rename … .next`** on Windows | Antivirus or file indexing locked a file during the first build. Run the command again, or exclude the project folder from real-time scanning. |
| **Port 3000 is already in use** | Another dev server is running. Close it, or run `npx next dev -p 3001`. |
| **Build fails with a type error** | Read the file and line in the message. Usually a product file is missing a field or has a typo. `npm run typecheck` shows the same errors faster. |
| **`npm run update:play` says it "could not find" a field** | Google Play changed its page layout. Update the matching pattern in `fetchListing()` in `scripts/update-play-listings.mjs`. |
| **Google or Brave still show the old name or logo** | Search engines show a saved copy until they re-crawl. For Google, use Search Console: *URL inspection → Request indexing*, and submit `/sitemap.xml`. |
| **Changes don't appear on the live site** | Check the **Actions** tab on GitHub. A red ❌ means the build failed, and the log shows why. |
