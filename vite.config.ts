import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'

export default defineConfig({
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
        id: '/',
        display: 'standalone',
        scope: '/',
        start_url: '/',
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
        globPatterns: ['**/*.{js,css,html,svg,png,woff2,webmanifest,json}'],
        navigateFallback: 'index.html',
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
})
