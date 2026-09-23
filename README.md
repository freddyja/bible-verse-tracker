# Bible Verse Tracker

A study Bible Freddy can read on his phone, with a private place for the verses that stay with him. Scripture is bundled in the app. Personal notes, categories, and voice recordings stay on the device.

## Read

Open a book, then a chapter. From there the reading continues as he scrolls: the next chapter follows, and after the last chapter the next book, in the order of the Bible. The list of chapters is still there when he wants to jump. Tap a verse. Related Verses lists a few passages often read beside it, with the words themselves, so he can follow them. It is a reading help, not a sermon or a commentary.

Each book opens with a small picture drawn for this app. The drawings are original, the same in English, Spanish, and Portuguese, and they are not copied from a study Bible.

The home screen offers a verse for the calendar day. The same date always chooses the same passage. The words are the Bible version selected under the title, and the card shows that version’s abbreviation. Tapping the card opens the passage, where it can be saved. The photographs on the card were made for this app. They are original, and they rotate with the date. Past verses, under the card, lists earlier days on this phone. Each one is the passage that date would have shown. Nothing about those days is stored in an account.

Listen reads the Scripture aloud with the phone’s own voice: this verse, this chapter, or Read Out Loud, which continues through the books until he taps Stop. The verse being spoken is marked. English, Spanish, and Portuguese follow the language he chose, when the phone has that voice. No account and no audio service. A voice note is still his own recording, kept apart from this reading.

The version under the title is the one he is reading. He can change it there. English, Spanish, and Portuguese each keep their own choice on that phone. Commercial translations are not bundled.

These are the texts, and the license for each:

**English**

- King James Version (1769) — public domain
- World English Bible — public domain. The wording is the public-domain World English Bible. The name “World English Bible” is a trademark of eBible.org, used here to name that text.
- American Standard Version (1901) — public domain
- Young’s Literal Translation (1898) — public domain
- Darby Translation (1889) — public domain
- Webster Bible (1833) — public domain
- New Heart English Bible — public domain
- Berean Standard Bible — Creative Commons CC0
- Geneva Bible (1599) — public domain

**Spanish**

- Reina-Valera 1909 — public domain
- Reina-Valera 1865 — public domain

**Portuguese**

- Bíblia Livre — Creative Commons Attribution 3.0 Brazil
- Bíblia Livre (Textus Receptus) — Creative Commons Attribution 3.0 Brazil
- Nova Versão de Acesso Livre — Creative Commons Attribution-ShareAlike 4.0

The King James Version, Reina-Valera 1909, and Bíblia Livre were already in the app. The World English Bible copy is the public-domain text. The other added translations were prepared from the public-domain and Creative Commons editions in the scrollmapper Bible databases, using the license stated for each translation.

The Open English Bible is published under CC0. Its Old Testament is still unfinished in the public text, so it is not offered as a choice. Cross-references are a short selection from [Open Bible](https://www.openbible.info/labs/cross-references/), used under Creative Commons Attribution. Book names follow the language he chose. Verse numbers are the traditional Protestant numbering.

Words of Jesus are shown in red, in the manner of a red-letter Bible. The spans come from the public-domain World English Bible `\wj` markers published by [eBible.org](https://ebible.org/Scriptures/engwebp_usfm.zip), not from a commercial red-letter edition. The same verse spans are used for every bundled translation. Where the public-domain text itself names God as the speaker — the Father’s voice from heaven, and Old Testament speeches introduced as the LORD speaking — those words use the same red. A verse is left in the ordinary color when the speaker is not clear. “Red letter words of Jesus,” under the title, turns this off. The phone still reads the verse aloud as plain text.

## Language

The first visit follows the phone’s language when that language is English, Spanish, or Portuguese. Any other phone language opens in English. EN, ES, and PT in the header remember the choice on that phone. Each install keeps its own choice, along with its own notes. Nothing is tied to an account.

Buttons, empty states, and the four starter categories follow that language. Comfort, Courage, Marriage, and Leadership appear as Consuelo, Valentía, Matrimonio, and Liderazgo in Spanish, and as Consolo, Coragem, Casamento, and Liderança in Portuguese, until someone renames them. A renamed category, a category someone added, a verse, and a personal note stay exactly as typed. The line under the home title stays “Designed by Freddy Jara-Almonte.” The line under the title is the Bible version he selected for that language.

## Keep

Saved verses can hold a personal note, one or more categories he defines, and an optional voice recording. Search looks through Scripture and through the reference, text, and note of what he has saved. Categories can be created, renamed, and deleted. Deleting a category leaves the verse.

Record / Stop / Play keeps the voice note in this browser. If the microphone is not available, the written note still saves.

The line under the home title always reads “Designed by Freddy Jara-Almonte.”

## Demo

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

The first visit includes three example verses and those four starter categories, so the saved shelf is not empty. Edit or delete them like anything else. They are not restored after you remove them. The example verses stay in the wording they were saved with.

## Production build

```bash
npm run build
npm run preview
```

The production build is an installable PWA (web app manifest and a service worker that caches the app, including the Scripture files). After opening the preview or a deployed site over HTTPS, use the browser’s install action or “Add to Home Screen.” Friends can install it on their own phones. Each install keeps its own notes. The dev server does not register a service worker, so installability is checked from the production build.

## On this device

Verses, written notes, categories, and voice recordings live only in this browser’s storage (IndexedDB). Nothing is uploaded. Refreshing, closing the app, or installing it does not clear them. The Bible text is part of the app, not an account or a paid Bible service.

Clearing this site’s data — or deleting the installed app’s storage — wipes the verses, notes, categories, and recordings. There is no cloud copy. An export can be added later if you want a backup.

## On a phone

Open the app here:

https://quiet-firefly-4219.zerodeploy.app/

That address is public HTTPS and works on a phone. Add it to the home screen from the browser menu. Notes stay on that phone.

GitHub Pages is prepared for the same path as the other apps, https://freddyja.github.io/bible-verse-tracker/. The workflow in `.github/workflows/pages.yml` builds this branch and deploys when Pages is set to GitHub Actions in the repository settings. `npm run build` uses `/bible-verse-tracker/` for that host. `npm run dev` stays at the site root so local work is unchanged. No API keys are required.

**Vercel:** import the repo, use the Vite preset, set the output directory to `dist`, and set `VITE_BASE_PATH=/` so asset paths match a root domain. `vercel.json` tells the CDN not to cache `sw.js` for long, so an updated shell can replace the old one, and it serves the manifest with the right content type. The app does not use client-side URL routes.

Verse records use stable ids plus `createdAt` / `updatedAt`, behind the functions in `src/data/db.ts`. When a saved verse is a passage in the bundled text, it also keeps that passage so it can be opened again in the chapter. Voice audio is stored beside the verse, keyed by that same id. `schemaVersion` on the local meta record is the hook for a later migration. A sync or account layer can mirror that model later without replacing the screens. None of that is required to use the app.
