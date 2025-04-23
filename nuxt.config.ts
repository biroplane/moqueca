import process from 'node:process'
import tailwindcss from '@tailwindcss/vite'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css',
  ],

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' },
      ],
    },
  },
  runtimeConfig: {
    MIXCLOUD_CLIENT_SECRET: process.env.MIXCLOUD_CLIENT_SECRET,
    public: {
      MIXCLOUD_CLIENT_ID: process.env.MIXCLOUD_CLIENT_ID,
      MIXCLOUD_MIX: process.env.MIXCLOUD_MIX,
    },
  },
  fonts: {
    defaults: { weights: [100, 200, 300, 400, 500, 600, 700, 800] },
    families: [
      { name: 'Montserrat', provider: 'google' },

    ],
  },

  modules: [
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
  ],
  vite: {
    plugins: [

      tailwindcss(),
    ],

  },
})
