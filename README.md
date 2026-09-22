# Bible Verse Tracker

A personal, private place for Freddy to keep biblical verses that matter to him. Save a reference and the words, add an optional note about why it hit, and group verses into categories he defines.

This is not a study Bible, concordance, or commentary. There is no account, no server, and no Bible API. Verses stay in the browser on this device.

## Demo

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

The first visit includes three example verses (KJV) and starter categories — Comfort, Courage, Marriage, and Leadership — so the shelf is not empty. Edit or delete them like anything else. They are not restored after you remove them.

Search looks through the reference, the verse, and the note. Category chips filter the list. A verse can sit in more than one category.

## Production build

```bash
npm run build
npm run preview
```

The production build is an installable PWA (web app manifest and a service worker that caches the app shell). After opening the preview or a deployed site, use the browser’s install action or “Add to Home Screen.” The dev server does not register a service worker, so installability is checked from the production build.

Refreshing keeps the library. Clearing site data, or opening a new browser profile, starts fresh.

## Deploy later

The app is a static Vite build in `dist/`. Any static host works. No environment variables are required.

**Vercel:** import the repo, use the Vite preset, and leave the output directory as `dist`. `vercel.json` tells the CDN not to cache `sw.js` for long, so an updated shell can replace the old one, and it serves the manifest with the right content type. The app does not use client-side URL routes; it lives on `/`.

Data never leaves the device. Records use stable ids plus `createdAt` / `updatedAt`, behind the functions in `src/data/db.ts`. `schemaVersion` on the local meta record is the hook for a later migration. A sync or account layer can mirror that model later without replacing the screens.
