import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Eldocare',
        short_name: 'Eldocare',
        description: 'Triage & Referral System for Kenya',
        theme_color: '#15803d',
        background_color: '#ffffff',
        display: 'standalone',
        workbox: {
  runtimeCaching: [
    {
      urlPattern: ({ url }) => url.pathname.startsWith('/api'),
      handler: 'NetworkOnly'
    }
  ]
},
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
