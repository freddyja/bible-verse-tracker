# Bible Verse Tracker

A personal, private place for Freddy to keep biblical verses that matter to him. Save a reference and the words, add an optional written note or a voice recording of why it hit, and group verses into categories he defines.

This is not a study Bible, concordance, or commentary. There is no account, no server, and no Bible API. Verses, notes, categories, and voice recordings stay in the browser on this device.

## Demo

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

The first visit includes three example verses (KJV) and starter categories — Comfort, Courage, Marriage, and Leadership — so the shelf is not empty. Edit or delete them like anything else. They are not restored after you remove them.

Search looks through the reference, the verse, and the written note. Category chips filter the list. A verse can sit in more than one category. On the verse itself, Record / Stop / Play keeps an optional voice note. If the microphone isn’t available, the written note still saves.

Related Verses, on the verse you are reading or saving, opens a short panel. It shows other verses you saved in the same categories, and a handful of cross-references when the reference is one the app knows. That list lives in the app — no account and no Bible service. Add starts a new verse with the reference filled in, so you can paste the words yourself. If nothing is related yet, the panel says so.

EN, ES, and PT switch the app’s own labels. Verses, notes, and category names stay as you wrote them. The line under the home title always reads “Designed by Freddy Jara-Almonte.”

## Production build

```bash
npm run build
npm run preview
```

The production build is an installable PWA (web app manifest and a service worker that caches the app shell). After opening the preview or a deployed site over HTTPS, use the browser’s install action or “Add to Home Screen.” The installed app opens like a home-screen app, and the library stays between launches. The dev server does not register a service worker, so installability is checked from the production build.

## On this device

Verses, written notes, categories, and voice recordings live only in this browser’s storage (IndexedDB). Nothing is uploaded. Refreshing, closing the app, or installing it does not clear them.

Clearing this site’s data — or deleting the installed app’s storage — wipes the verses, notes, categories, and recordings. There is no cloud copy. An export can be added later if you want a backup.

## Deploy later

The app is a static Vite build in `dist/`. Any static host works. No environment variables are required.

**Vercel:** import the repo, use the Vite preset, and leave the output directory as `dist`. `vercel.json` tells the CDN not to cache `sw.js` for long, so an updated shell can replace the old one, and it serves the manifest with the right content type. The app does not use client-side URL routes; it lives on `/`.

Verse records use stable ids plus `createdAt` / `updatedAt`, behind the functions in `src/data/db.ts`. Voice audio is stored beside the verse, keyed by that same id. `schemaVersion` on the local meta record is the hook for a later migration. A sync or account layer can mirror that model later without replacing the screens. None of that is required to use the app.
