# Living Word Prayer Guide proxy

Thin Cloudflare Worker so the GitHub Pages app never sees `ANTHROPIC_API_KEY`.

## Contract

`POST` JSON:

```json
{ "topic": "string", "language": "en" | "es" | "pt" }
```

Success: prayer card JSON (`titleHow`, `titleFor`, `tagline`, `items[6]`, `footer`).

CORS: `https://freddyja.github.io` and localhost Vite/preview ports.

Guards: JSON content-type, non-empty topic (max 80 chars), language enum, ~10 requests / IP / minute (per isolate).

## Freddy setup

1. Install Wrangler once in this folder (or use `npx`):

   ```bash
   cd workers/prayer-proxy
   npm install
   npx wrangler login
   ```

2. Set the Anthropic secret on the Worker (not in Vite, not in the browser):

   ```bash
   npx wrangler secret put ANTHROPIC_API_KEY
   ```

3. Deploy and copy the Worker URL (something like `https://living-word-prayer-proxy.<account>.workers.dev`):

   ```bash
   npx wrangler deploy
   ```

4. Point the Pages build at that URL (public; not a secret key):

   - Repo → **Settings → Secrets and variables → Actions**
   - Add Actions secret **`VITE_PRAYER_PROXY_URL`** = the Worker URL (no trailing slash)
   - In `.github/workflows/pages.yml`, under the Build step `env:`, add:

     ```yaml
     VITE_PRAYER_PROXY_URL: ${{ secrets.VITE_PRAYER_PROXY_URL }}
     ```

     (alongside the existing `VITE_BASE_PATH`)

5. Local Vite: put the same URL in `.env.local`:

   ```bash
   VITE_PRAYER_PROXY_URL=https://living-word-prayer-proxy.<account>.workers.dev
   ```

If `VITE_PRAYER_PROXY_URL` is unset, suggested templates still work; custom topics show a clear not-configured message.
