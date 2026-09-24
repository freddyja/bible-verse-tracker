import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'

const pagesBase = '/bible-verse-tracker/'

export default defineConfig(({ command }) => {
  const base = process.env.VITE_BASE_PATH ?? (command === 'serve' ? '/' : pagesBase)

  return {
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'apple-touch-icon.png',
        'icons/icon-192.png',
        'icons/icon-512.png',
      ],
      manifest: {
        name: 'Bible Verse Tracker',
        short_name: 'Scripture',
        description: 'A study Bible to read, with private notes that stay on this device.',
        theme_color: '#f4efe6',
        background_color: '#f4efe6',
        id: base,
        display: 'standalone',
        scope: base,
        start_url: base,
        lang: 'en',
        icons: [
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,woff2,webmanifest,json}'],
        globIgnores: [
          '**/scripture/web/**',
          '**/scripture/asv/**',
          '**/scripture/ylt/**',
          '**/scripture/darby/**',
          '**/scripture/webster/**',
          '**/scripture/nheb/**',
          '**/scripture/bsb/**',
          '**/scripture/geneva/**',
          '**/scripture/rv1865/**',
          '**/scripture/nva/**',
          '**/scripture/blivre-tr/**',
          '**/scripture/lexicon/**',
          '**/scripture/study/**',
          '**/scripture/context/**',
        ],
        navigateFallback: 'index.html',
        runtimeCaching: [
          {
            urlPattern: /\/scripture\/.+\.json$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'scripture',
              expiration: {
                maxEntries: 1400,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
  }
})
